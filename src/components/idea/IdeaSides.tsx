"use client";
import {useState} from "react";
import {Button} from "@nextui-org/react";
import CommentItem from "./CommentItem";
import {Empty} from "@ui";
import {DeleteConfirmation} from "@ui";
import {DeleteBin} from "@styled-icons/remix-line";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import CustomList from "./CustomList";

const IdeaSides = ({item, isOwner}) => {
	const [delConfirm, setDelConfirm] = useState();
	const [loading, setLoading] = useState(false);
	const [comment, setComment] = useState();
	const router = useRouter();
	const refreshData = () => {
		router.replace(router.asPath);
	};

	const onDelete = () => {
		setLoading(true);
		axios
			.delete(`/post/${item.id}/sides?type=${delConfirm}&commentId=${comment._id}`)
			.then(() => {
				setDelConfirm(null);
				refreshData();
				toast.success("Successfully deleted!");
			})
			.finally(() => setLoading(false));
	};

	return (
		<div className={"flex-1 w-full bg-gray-50"}>
			<DeleteConfirmation
				renderItem={() => <CommentItem item={comment} />}
				loading={loading}
				visible={!!delConfirm}
				closeHandler={() => setDelConfirm(null)}
				onDelete={onDelete}
			/>

			<div className={"bg-green-50 p-5 w-full"}>
				<div className={"w-full"}>
					<h4 className={"text-green-500 mb-0"}>
						{item.upsides?.length} Unique Value Proposition{item.upsides?.length > 1 && "s"}
					</h4>
					<p className={"mb-4 text-green-400 inline-block"}>Set a comment as an upside</p>
					{item.upsides?.length > 0 ? (
						item.upsides?.map((u, i) => (
							<CommentItem
								key={u._id}
								action={
									isOwner && (
										<Button
											className={" z-0"}
											onClick={() => {
												setDelConfirm("upsides");
												setComment(u);
											}}
											size={"sm"}
											variant="light"
											color={"danger"}
											 >
											<DeleteBin size={"14"} />
										</Button>
									)
								}
								dense
								item={u}
							/>
						))
					) : (
						<Empty inline />
					)}
				</div>
			</div>
			<div className={"bg-red-50 p-5 w-full"}>
				<div className={"w-full"}>
					<h4 className={"text-red-500 mb-0"}>
						{item.downsides?.length} Challanges{item.downsides?.length > 1 && "s"}
					</p>
					<p className={"mb-4 text-red-400 inline-block"}>Set a comment as a challange</p>

					{item.downsides?.length > 0 ? (
						item.downsides?.map((u, i) => (
							<CommentItem
								action={
									isOwner && (
										<Button
											className={" z-0"}
											onClick={() => {
												setDelConfirm("downsides");
												setComment(u);
											}}
											size={"sm"}
											variant="light"
											color={"danger"}
											 >
											<DeleteBin size={"14"} />
										</Button>
									)
								}
								dense
								item={u}
								key={u._id}
							/>
						))
					) : (
						<Empty inline />
					)}
				</div>
			</div>

			<CustomList item={item} isOwner={isOwner} />
		</div>
	);
};

export default IdeaSides;
