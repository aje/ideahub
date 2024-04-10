import {dbConnect} from "@utils";
import nextConnect from "next-connect";
import Notification from "@models/Notification";
import {getSession} from "next-auth/react";

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({error: `Sorry something Happened! ${error.message}`});
	},
	onNoMatch(req, res) {
		res.status(405).json({error: `Method '${req.method}' Not Allowed`});
	},
});

apiRoute.get(async (req, res) => {
    await dbConnect();
    const session = await getSession({ req });
    try {
        const notifications = await Notification.find({user: session.user._id, seen: false}).count();
        res.status(200).json({notifications});
    } catch (error) {
        res.status(400).json(error);
    }
    res.end()
})

export default apiRoute
