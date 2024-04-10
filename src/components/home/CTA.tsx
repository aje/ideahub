"use client";
import {Button} from "@nextui-org/react";
import {Flag} from "@styled-icons/entypo"

const Cta = ({shouldExplore}) => {
	return (
		<div
			className={"bg-primary/10 pt-52 pb-32 text-center"}
			style={{
				backgroundImage: "url(/homepage.png)",
				backgroundSize: "cover",
				backgroundPosition: "bottom",
			}}>
			<div className="container">
				<div>
					<main className={"flex flex-col items-center"}>
						<h1 className={"font-bold text-5xl  font-sans"}>
							Everything begins with an <span className="text-primary"> idea</span>
						</h1>
						<p className="text-3xl text-gray-600 mx-auto w-1/2 my-7 leading-10">
							Start your journey by brainstorming your ideas with other people around the globe or your friends
						</p>
						<Button
							as={"a"}
							href={shouldExplore ? "/explore" : "/new"}
							size={"lg"}
							startContent={<Flag size={30} />}

							className={"font-bold z-0 text-2xl"}
							color="primary">
							{shouldExplore ? "Explore Ideas" : "Create an Idea"}
						</Button>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Cta;
