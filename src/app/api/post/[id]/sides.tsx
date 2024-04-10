import nextConnect from "next-connect";
import {dbConnect} from "@utils";
import Idea from "@models/Idea";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.delete(async (req, res) => {

    await dbConnect();
    try {
        const update = { $pull: {
                [req.query.type]: {_id : req.query.commentId} ,
            },};
        const deleted = await Idea.findByIdAndUpdate(req.query.id, update)
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({error});
    }
    res.end()
})


export default apiRoute;
