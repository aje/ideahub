import * as models from "@models";
import {dbConnect} from "@utils";
import {createEdgeRouter} from "next-connect";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@auth";
// import { authOptions } from "./auth/[...nextauth]"
// const apiRoute = nextConnect({
//     onError(error, req, res) {
//         res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//     },
//     onNoMatch(req, res) {
//         res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
// });
interface RequestContext {
    params: {
        id: string;
    };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
    .use(async (req, res, next) => {
        const start = Date.now();
        await next(); // call next in chain
        const end = Date.now();
        console.log(`Request took ${end - start}ms`);
    })
    .post(async (req) => {
        const session = await auth();
        try {
            if (session) {
                await dbConnect();
                const comment = {...req.body, author: session.user};
                const result = await models.Comment.create(comment);
                // res.status(201).json(result);
                return NextResponse.json({result});
            }
        } catch (error) {
            return NextResponse.json(error);
            // res.status(400).json(error);
        }
        return NextResponse.json({});
        // res.end()
    });
//     .delete(async (req, res) => {
//     await dbConnect();
//     const session = await getSession({ req });
//     try {
//         if(session) {
//             //
//             const deleted = await models.Comment.findByIdAndDelete(req.query.id);
//             res.status(200).json(deleted);
//         }
//     } catch (error) {
//         res.status(400).json(error);
//     }
//     res.end()
// });
//
// export default async function handler(req, res) {
//     const { method } = req;
//
//     await dbConnect();
//
//     switch (method) {
//         case 'GET':
//             // try {
//             //     const post = await Post.find({})
//             //         .populate({ path: 'user', model: User});
//             //     // const totalElements = await Post.count({});
//             //     res.status(200).json({ success: true, data: post});
//             // } catch (error) {
//             //     res.status(400).json({ success: false });
//             // }
//             break;
//         case 'POST':
//             try {
//                 const comment = {...req.body, author: session.user}
//                 const result = await models.Comment.create(comment);
//                 res.status(201).json(result);
//             } catch (error) {
//                 res.status(400).json(error);
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//             break;
//     }
// }
export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}
