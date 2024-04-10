import Idea from "@models/Idea";
import {dbConnect} from "@utils";
import nextConnect from "next-connect";
import {getSession} from "next-auth/react";
import Notification, {notificationTypes} from "@models/Notification";

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({error: `Sorry something Happened! ${error.message}`});
	},
	onNoMatch(req, res) {
		res.status(405).json({error: `Method '${req.method}' Not Allowed`});
	},
});

apiRoute.post(async (req, res) => {
	const session = await getSession({req});
	try {
		const {id, value} = req.query;
		if (id && session) {
			await dbConnect();
			try {
				const ideaFromServer = await Idea.findById(id).exec();
				if (!ideaFromServer) {
					res.status(402).json({message: "Idea not found"});
					res.end();
					return;
				}
				const hasRated = ideaFromServer?.raters?.includes(session.user._id);
				const avg = ideaFromServer.ratingsAverage ? Math.round((ideaFromServer.ratingsAverage + parseInt(value)) / 2) : value;
				if (hasRated) {
					res.status(402).json({message: "You can't rate twice!"});
					res.end();
					return;
				}
				const update = {
					$inc: {["rates." + value]: 1},
					$addToSet: {
						raters: session.user._id,
					},
					ratingsAverage: avg,
				};

				// console.log("Helo", session.user._id, ideaFromServer.author, session.user._id === session.user._id.toString());

				if (!session.user._id === session.user._id.toString())
					await Notification.create({
						type: notificationTypes.RATE.value,
						content: new Object({
							idea: ideaFromServer._id,
							author: session.user._id,
							rate: value,
						}),
						user: ideaFromServer.author,
					});

				const post = await Idea.findByIdAndUpdate(id, update, {new: true});
				// console.log(post);
				res.status(201).json(post);
			} catch (e) {
				res.status(401).json(e);
			}
		} else res.status(401).json();
	} catch (e) {
		console.log("[Error posts.js]", e);
	}
	res.end();
});

export default apiRoute;
