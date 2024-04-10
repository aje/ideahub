import "react-tagsinput/react-tagsinput.css";
import {getSession} from "next-auth/react";
import {dbConnect} from "@utils";
import mongoose from "mongoose";
import {Empty} from "@ui";
import {Comments, IdeaInfoBar, IdeaSides} from "@com";

const IdeaPage = ({item, isOwner}) => {
	if (!item)
		return (
			<div className={"my-28"}>
				<Empty label={"Error 404"} />
			</div>
		);

	return (
		<div   className=" bg-gray-300 md:pt-20 -full container">
			<div className="grid-cols-4 bg-blue-50 ">
				<div className="relative h-full flex flex-col flex-1">
					<IdeaInfoBar item={item} isOwner={isOwner} />
				</div>
			</div>
			<div className={"grid-cols-3"}>
				<IdeaSides item={item} isOwner={isOwner} />
			</div>
			<div  className={"grid-cols-5"}>
				<div  className={" overflow-y-auto h-full container"}>
					<Comments item={item} isOwner={isOwner} />
				</div>
			</div>
		</div>
	);
};

export default IdeaPage;

export async function getServerSideProps({params, req}) {
	const {id} = params;
	const session = await getSession({req});

	let isOwner = false;
	let item = null;
	try {
		await dbConnect();
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
			// Schema.Types.ObjectId
			const tquery = {
				user: mongoose.Types.ObjectId(session.user._id),
				"content.idea": mongoose.Types.ObjectId(id),
				seen: false,
			};
			const t = await models.Notification.updateMany(tquery, {seen: true});
		}
	} catch (e) {
		console.log(e);
	}

	return {
		props: {
			item: JSON.parse(JSON.stringify(item)),
			isOwner,
			id,
		},
	};
}
