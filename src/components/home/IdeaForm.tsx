"use client";

import {Button, Textarea} from "@nextui-org/react";
import {Plus} from "@styled-icons/entypo"
import Image from "next/image";
import {useRouter} from "next/router";
// import {ideaFormData} from "../../../../1/_app";

const IdeaForm = () => {
	// const state = useHookstate(ideaFormData); // fixme context
	// const {idea} = state.get();
	const router = useRouter();
	const onChange = e => {
		// state.set(prevState => ({...prevState, idea: e.target.value}));
	};

	const onSubmit = e => {
		e.preventDefault();
		router.push("/new");
	};
	return (
		<div className={"bg-blue-50"} id={"ideaform"}>
			<div className={"container"}>
				<main className={"flex items-center"}>
					<form onSubmit={onSubmit} className="w-3/5 pr-20">
						<h2 className={"mb-6 font-sans"}>
							Write your <span className={"text-blue-500"}>idea</span> down{" "}
							<span className={"font-normal  font-serif"}>and ask other people opinion</span>
						</h2>
						<Textarea
							required
							onChange={onChange}
							// value={idea}
							variant="bordered"
							className={"mb-6 bg-white"}
							placeholder={"Something that makes ..."}
							fullWidth
							size={"lg"}
						/>
						<div className="flex items-center">
							<Button type={"submit"}startContent={<Plus size={32} />} className={"z-0 uppercase font-bold bg-blue-500"} size={"lg"}>
								Add idea
							</Button>
							{/*<Button  auto  variant="light" className={" uppercase font-bold ml-3"} size={"lg"}>Login or Sign up</Button>*/}
						</div>
					</form>
					<div style={{lineHeight: 0}} className="w-2/5 relative h-full">
						<Image alt={"Add idea"} style={{lineHeight: 0}} src={"/homepageAddIdea.png"} width={500} height={500} objectFit="cover" />
					</div>
				</main>
			</div>
		</div>
	);
};

export default IdeaForm;
