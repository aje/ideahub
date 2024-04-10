import nextConnect from "next-connect";
import {dbConnect} from "@utils";
import Idea from "@models/Idea";
import * as models from "@models/models";
import mongoose from "mongoose";
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

// const getIdea = () => {
//     return Idea.findById(id)
//         .populate({path: "author", model: models.User})
//         .populate({
//             path: "comments",
//             populate: {
//                 path: "author",
//                 model: models.User,
//             },
//             select: "idea  description replies createdAt updatedAt",
//             options: {sort: {updatedAt: -1}},
//         })
//         .populate({
//             path: "customField",
//             model: models.CustomField,
//             options: {sort: {updatedAt: -1}},
//         });
// }

apiRoute.get(async (req, res) => {
	await dbConnect();
	const session = await getSession({req});
	let isOwner = false;
	let item = null;
	try {
		item = await Idea.findById(id)
			.populate({path: "author", model: models.User})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					model: models.User,
				},
				select: "idea  description replies createdAt updatedAt",
				options: {sort: {updatedAt: -1}},
			})
			.populate({
				path: "customField",
				model: models.CustomField,
				options: {sort: {updatedAt: -1}},
			});
		isOwner = session?.user?._id === item?.author._id?.toString();

		if (isOwner) {
			const tquery = {
				user: mongoose.Types.ObjectId(session.user._id),
				"content.idea": mongoose.Types.ObjectId(id),
				seen: false,
			};
			const t = await Notification.updateMany(tquery, {seen: true});
		}
		res.status(200).json({item, isOwner});
	} catch (error) {
		res.status(400).json({error});
	}
	res.end();
});

export default apiRoute;
