"use client";
import {useState} from "react";
import {Button,  Textarea} from "@nextui-org/react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import {SendPlane} from "@styled-icons/remix-line"
// import {loginPopper} from "../../../1/_app";
import {useSession} from "next-auth/react";
import {Loading} from "@ui";

const CommentForm = ({ideaId}) => {
	const [loading, setLoading] = useState(false);
	// const state = useHookstate(loginPopper);  fixme context
 	const {data: session} = useSession();

	const [formData, setFormData] = useState({
		description: "",
		idea: ideaId,
	});

	const router = useRouter();

	const onChange = name => event => {
		setFormData({...formData, [name]: event?.target ? event.target.value : event});
	};

	const onSubmit = () => {
		setLoading(true);
		if (session) {
			// todo axios
			axios
				.post(`/comments`, formData)
				.then(() => {
					router.replace(router.asPath);
					toast.success("Successfully posted!");
				})
				.finally(() => {
					onChange("description")("");
					setLoading(false);
				});
		} else {
			// state.set(true); fixme context
			setLoading(false);
			toast.error("Please login first");
		}
	};

	return (
		<div className={"mb-10 w-full"}>
			<Textarea
				fullWidth
				required
				onChange={onChange("description")}
				value={formData.description}
				// rows={1}
				size={"lg"}
				variant="bordered"
				placeholder={"We want your honest opinion!"}
			/>
			{/*</div>*/}
			<Button

				className={"mt-4 z-0"}
				disabled={loading || formData.description === ""}
				onClick={onSubmit}
				startContent={!loading && <SendPlane size={20} />}>
				{loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Post"}
			</Button>
		</div>
	);
};

export default CommentForm;
