import nextConnect from "next-connect";
import {dbConnect} from "@utils";
import {CustomField} from "@models/CustomField";

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({error: `Sorry something Happened! ${error.message}`});
	},
	onNoMatch(req, res) {
		res.status(405).json({error: `Method '${req.method}' Not Allowed`});
	},
});

apiRoute
	.post(async (req, res) => {
		await dbConnect();
		try {
			const response = await CustomField.create({...req.body, idea: req.query.id});
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({error});
		}
		res.end();
	})
	.patch(async (req, res) => {
		await dbConnect();
		try {
			const response = await CustomField.findByIdAndUpdate(req.body._id, {$set: {items: req.body.items}}, {new: true});
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({error});
		}
		res.end();
	})
	.delete(async (req, res) => {
		await dbConnect();
		try {
			const response = await CustomField.findByIdAndDelete(req.query.customId);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({error});
		}
		res.end();
	});

export default apiRoute;
