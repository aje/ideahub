import Idea from "@models/Idea";
import dbConnect from "@utils"
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

apiRoute.get(async (req, res) => {
    const session = await getSession({ req });
    try {
        if(session) {
            await dbConnect();
            const posts = await Idea.find({raters: {$elemMatch:  {$eq: session.user._id}}})
            res.status(200).json(posts);
        } else {
            res.status(401)
        }
    } catch (error) {
        res.status(400).json(error);
    }
    res.end()
})

export default apiRoute;
