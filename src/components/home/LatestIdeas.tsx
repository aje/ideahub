"use client";
import {Button} from "@nextui-org/react";
import {IdeaItem} from "@com";


const LatestIdeas = ({topLastMonth: ideas, countLastMonth}) => {
	return (
		<div className={"py-20"}>
			<div className={"container"}>
				<main>
					<h2 className={"font-sans"}>
						Get <span className="text-primary">inspired</span> by other ideas{" "}
						<span className="font-normal font-serif"> and help them to grow the and this is the best</span>
					</h2>
					<h3>
						Last month <span className="font-normal"> best ideas ({countLastMonth})</span>
					</h3>
					<div className="grid gap-2 grid-cols-3">
						{ideas.map(idea => (
							<IdeaItem item={idea}  key={idea._id}/>
						))}
					</div>

					<div className="flex justify-center mt-5">
						<Button variant="ghost" size={"lg"} className={"z-0"}>
							SEE ALL
						</Button>
					</div>
				</main>
			</div>
		</div>
	);
};

export default LatestIdeas;
