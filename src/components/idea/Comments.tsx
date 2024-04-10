"use client";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import {Empty} from "@ui";

const Comments = ({item, isOwner}) => {
	return (
		<>
			<div  className={"p-7 bg-white"}>
				<div className={"w-full"}>
					<h3 className={"mb-0"}>
						What do <span className={"text-primary"}>YOU</span> think about this idea?
					</h3>
					<p  className={"mb-3"}>
						{" "}
						You can use{" "}
						<a target={"_blank"} href={"https://www.markdownguide.org/cheat-sheet/"}>
							Markdown cheatsheet
						</a>
					</p>
					<CommentForm ideaId={item._id} />
					<h3>{item.comments?.length} Comments</h3>

					{item.comments?.length > 0 ? (
						item.comments?.map((u, i) => <CommentItem isOwner={isOwner} withAction idea={item} item={u} key={u._id} isComments />)
					) : (
						<Empty />
					)}
				</div>
			</div>
		</>
	);
};

export default Comments;
