"use client";
import {Button, Textarea} from "@nextui-org/react";
import {Plus} from "@styled-icons/entypo"
import Image from "next/image";
import {useRouter} from "next/router";

const ProblemForm = () => {
	// const state = useHookstate(ideaFormData); // fixme context
	// const {problem} = state.get();
	const router = useRouter();
	const onChange = e => {

		// state.set(prevState => ({...prevState, problem: e.target.value}));
	};

	const onSubmit = e => {
		e.preventDefault();
		router.push("/new");
	};
	return (
		<div className={"bg-red-50"}>
			<div className={"container"}>
				<main className={"flex items-center"}>
					<div style={{lineHeight: 0}} className="w-2/5 relative h-full">
						<Image alt={"Problem to solve"} style={{lineHeight: 0}} src={"/problem.png"} width={500} height={500} objectFit="cover" />
					</div>
					<form onSubmit={onSubmit} className="w-3/5 pl-20">
						<h2 className={"mb-6 font-sans"}>
							You have a <span className={"text-red-500"}>problem</span>?{" "}
							<span className={"font-normal  font-serif"}>Explain it, to find a feasable solution</span>
						</h2>
						<Textarea
							required
							variant="bordered"
							onChange={onChange}
							// value={problem}
							className={"mb-6 bg-white"}
							placeholder={"Something that makes ..."}
							fullWidth
							size={"lg"}
						/>
						<div className="flex items-center">
							<Button
								type={"submit"}
								// css={{background: "red"}}
								startContent={<Plus size={32} />}
								className={"z-0 uppercase bg-red-500 font-bold"}
								size={"lg"}>
								Add probelm
							</Button>
							{/*<Button auto light className={" uppercase font-bold ml-3"} size={"lg"}>Login or Sign up</Button>*/}
						</div>
					</form>
				</main>
			</div>
		</div>
	);
};

export default ProblemForm;
