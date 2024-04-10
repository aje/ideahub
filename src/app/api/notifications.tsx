import {dbConnect} from "@utils";
import nextConnect from "next-connect";
import {getSession} from "next-auth/react";
import * as models from "@models/models";

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
	const session = await getSession({req});
	try {
		const unreadCount = await Notification.find({user: session.user._id, seen: false}).count();
		const data = await Notification.find({user: session.user._id})
			.populate({
				path: "content",
				populate: {
					path: "author",
					model: models.User,
				},
			})
			.populate({
				path: "content",
				populate: {
					path: "idea",
					model: models.Idea,
					select: "title",
				},
			})
			.sort({createdAt: -1});
		res.status(200).json({data, unreadCount});
	} catch (error) {
		res.status(400).json(error);
	}
	res.end();
});

export default apiRoute;
