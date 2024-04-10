import Idea from "@models/Idea";
import {dbConnect} from "@utils";
import User from "@models/User";
import nextConnect from "next-connect";
import {getSession} from "next-auth/react";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.post(async (req, res) => {
    const session = await getSession({ req });
    try {
        if(session) {
            await dbConnect();
            const data = await Idea.create({...req.body, author: session.user});
            res.status(200).json(data);
        } else
            res.status(401)
    } catch (error) {
        res.status(400).json(error);
    }
    res.end()
}).get(async (req, res) => {
    await dbConnect();
    try {
        const posts = await Idea.find({})
            .populate({path: 'user', model: User});
        res.status(200).json({data: posts});
    } catch (error) {
        res.status(400).json(error);
    }
    res.end()
}).delete(async (req, res) => {
    await dbConnect();
    try {
        const deleted = await Idea.findByIdAndDelete(req.query.id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error);
    }
    res.end()
}).patch(async (req, res) => {
    const session = await getSession({ req });
    try {
        const id = req.body._id;
        if(id && session) {
            await dbConnect();

            let update = {
                tags: req.body.tags,
                title: req.body.title,
                solutions: req.body.solutions,
                problems: req.body.problems,
                description: req.body.description,
                targetAudience: req.body.targetAudience,
                alternatives: req.body.alternatives
            }
            if(req.query.set) {
                update = { $addToSet: {
                        [req.query.set]: req.body.comment,
                    },};
            }
            if(req.query.rate) {
                const ideaFromServer = await Idea.findById(id).exec()
                const hasRated = ideaFromServer?.raters?.includes(session.user._id);
                const avg = ideaFromServer.ratingsAverage ? Math.round((ideaFromServer.ratingsAverage + parseInt(req.query.rate))/2) :  req.query.rate
                if(hasRated){
                    // res.send({ status: 402, message: 'Hello from Next.js!' });
                    res.status(402).json({message: "You can't rate twice!"})
                    res.end();
                    return;
                } else {
                    update = {
                        $inc: {['rates.' + req.query.rate]: 1},
                        $addToSet: {
                            raters: session.user._id,
                        },
                        ratingsAverage: avg
                    }
                }
            }

            const post = await Idea.findByIdAndUpdate(id, update , {new: true })
            // console.log(post);
            res.status(201).json(post)
        }
        else
        res.status(401).json()
    } catch (e) {
        console.log("[Error posts.js]", e)
    }
    res.end()
});

export default apiRoute;

// export default async function handler(req, res) {
//     const { method } = req;
//     const session = await unstable_getServerSession(req, res, authOptions)
//
//     await dbConnect();
//
//     switch (method) {
//         case 'GET':
//             try {
//                 const post = await Post.find({})
//                     .populate({ path: 'user', model: User});
//                 res.status(200).json({ success: true, data: post});
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case 'POST':
//             try {
//                 const data = await Post.create({...req.body, user: session.user });
//                 res.status(201).json({ success: true, data: data });
//             } catch (error) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//             break;
//     }
// }
