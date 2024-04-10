import {Card, Textarea} from "@nextui-org/react";
import {CardBody, CardHeader} from "@nextui-org/card";

const EditNewIdea = () => {

	return (
		<div className={"py-20 bg-violet-50"}>
			<div className="container">
				<h1>
					Start <span className={"text-primary"}>Ideation</span> <span className={"font-normal"}>and brainstorm</span>
				</h1>

				<h3>Title of the edited lwelkhjasl h;kjnasd,m h</h3>

				<div className="grid gap-5 grid-cols-2 ">
					<div className={"bg-blue-100 px-1 rounded-3xl"}>
						<CardHeader className={"pb-0"}>
							<h3 className={"text-blue-500"}>
								Solutions
							</h3>
						</CardHeader>
					</div>
					<div className={"bg-red-100 px-1 rounded-3xl"}>
						<CardHeader className={"pb-0"}>
							<h3 className={"text-red-500"}>
								Problems
							</h3>
						</CardHeader>
					</div>
				</div>
				{
					<Card className={"mt-5 shadow-none"}>
						<CardHeader className={"pb-0 block"}>
							<h3 className={"mb-0"}>
								Description
							</h3>
							<p>Describe your idea or problem more</p>
						</CardHeader>
						<CardBody className={"px-4"}>
							<Textarea variant="bordered" rows={5} fullWidth placeholder={"Describe what you have in your mind!"} />
						</CardBody>
					</Card>
				}
			</div>
		</div>
	);
};

export default EditNewIdea;
