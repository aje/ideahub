"use client";
import {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {Check} from "@styled-icons/entypo"
import {Plus} from "@styled-icons/entypo"
import {Close} from "@styled-icons/remix-line";
import {useRouter} from "next/router";
import CustomListItem from "./CustomListItem";
import {Empty, Loading} from "@ui";

const CustomList = ({item, isOwner}) => {
	const [title, setListTitle] = useState("");
	const [openAdd, setOpenAdd] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(item.customField);
	const router = useRouter();

	const onChangeItem = index => newArray => {
		const t = [...formData];
		t[index].items = newArray;
		setFormData(t);
	};

	const onAddList = () => {
		setLoading(true);
		axios
			.post(`/post/${item.id}/customLists`, {title})
			.then(r => {
				router.replace(router.asPath);
				setOpenAdd(false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onSave = item => () => {
		return axios.patch(`/post/${item.id}/customLists`, item);
	};

	return (
		<div className={"p-4 w-full"}>
			<div className="flex justify-between items-center">
				<h3>Custom lists</h3>
				{isOwner && (
					<Button   variant="light"   onClick={() => setOpenAdd(!openAdd)}>
						{openAdd ? <Close size={24} /> : <Plus size={24} />}
					</Button>
				)}
			</div>

			{openAdd && (
				<Input
					autoFocus
					variant="bordered"
					label={"List title"}
					// placeholder={"List title"}
					startContent={
						<Button
							disabled={loading}
							onClick={onAddList}
							className={"min-w-min px-2 -ml-2 z-0"}

							startContent={loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : <Check size={22} />}
						/>
					}
					size={"lg"}
					fullWidth
					className={"mb-4"}
					value={title}
					onChange={e => setListTitle(e.target.value)}
					required
				/>
			)}
			{!!formData && formData.length > 0 ? (
				formData?.map((_, index) => {
					return (
						<CustomListItem
							deletable
							onSave={onSave(_)}
							custom
							key={_.id}
							items={_.items}
							title={_.title}
							item={_}
							isOwner={isOwner}
							onChange={onChangeItem(index)}
						/>
					);
				})
			) : (
				<Empty />
			)}
		</div>
	);
};

export default CustomList;
