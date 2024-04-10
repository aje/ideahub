import nextConnect from "next-connect";
import {dbConnect} from "@utils";
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

apiRoute.put(async (req, res) => {
	const session = await getSession({req});
	if (!session) {
		res.status(401).json();
		res.end();
		return;
	}
	try {
		await dbConnect();
		const response = await models.Comment.findByIdAndUpdate(req.query.id, req.body);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({error});
	}
	res.end();
});

export default apiRoute;
