import {useState} from "react";
import {Button, Card, User} from "@nextui-org/react";
import {EmojiSad} from "@styled-icons/entypo"
import {Check} from "@styled-icons/entypo"
import clsx from "clsx";
import {dbConnect} from "@utils";
import {getSession, useSession} from "next-auth/react";
import {ChevronSmallLeft, ChevronSmallRight, Plus} from "@styled-icons/entypo";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import {CardBody, CardFooter} from "@nextui-org/card";
import {Empty, MyRating} from "@ui";

export default function Explore({ideas}) {
	const {data: session} = useSession();
	// const state = useHookstate(loginPopper); // fixme context
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [rates, setRates] = useState(new Map());
	const router = useRouter();

	const onRate = value => {
		onNext();
		onReview(value);
	};

	const onNext = () => {
		setIndex(index => (index < ideas.length - 1 ? index + 1 : index));
	};

	const onReview = value => {
		if (!session) onNotLoggedIn();
		else {
			setLoading(true);
			axios
				.post(`/rate?value=${value}&id=${ideas[index]._id}`)
				.then(res => {
					const rat = rates;
					rat.set(res.data.id, res.data.ratingsAverage);
					setRates(rat);
					toast.success("Successfully updated!");
				})
				.finally(() => setLoading(false))
				.catch(error => {
					toast.error(error?.response?.data?.message);
				});
		}
	};

	const onNotLoggedIn = () => {
		if (!session) {
			// state.set(true);
			toast.error("Please login first");
		}
	};

	const onClickItem = (idea, i) => {
		const state = index === i ? "ACTIVE" : index === i - 1 ? "NEXT" : index === i + 1 ? "PREV" : "HIDE";
		if (state === "NEXT") setIndex(index + 1);
		else router.push(`/ideas/${idea.id}`);
	};

	return (
		<div
			className={"bg-pink-50 pt-20 p-5 md:p-20"}
			style={{
				height: "calc(100vh - 117px)",
				backgroundImage: "url(/explorebg.png)",
				backgroundSize: "cover",
				backgroundPosition: "bottom",
			}}>
			<h2 className={"my-10 font-sans"}>
				Get <span className={"text-primary timing"}>inspired</span> by other ideas
			</h2>
			<div
				className={"flex relative h-full"}
				// className={clsx("flex h-full pb-32  w-160% transition-all transition duration-1000", index === 0 ?  "translate-x-0" : "-translate-x-50%" )}
			>
				{ideas?.length > 0 ? (
					ideas.map((idea, i) => {
						const state = index === i ? "ACTIVE" : index === i - 1 ? "NEXT" : index === i + 1 ? "PREV" : "HIDE";
						// const isRated = idea.raters?.includes(session?.user?._id);
						return (
							<Card
								key={idea.id}
								onClick={() => onClickItem(idea, i)}
								isPressable
								style={{borderRadius: 34, height: "calc(100% - 150px)"}}
								className={clsx(
									"absolute  duration-500 w-80% top-0",
									state === "ACTIVE" && "translate-x-0 scale-100 opacity-100",
									state === "PREV" && "-translate-x-100% scale-50 opacity-75",
									state === "HIDE" && "translate-x-200% scale-0 opacity-0",
									state === "NEXT" && "translate-x-100% top-0 scale-[0.8] opacity-75"
								)}
								// className={clsx(index === 1 ? "scale-50 opacity-75 " : " mr-10" , 'h-full ')}
								// className={"-translate-x-70% scale-75 translate-y-50% h-70%"}
							>
								{index > 0 && state === "ACTIVE" && (
									<Button
										// disabled=
										variant="light"
										onClick={() => setIndex(index => index - 1)}
										style={{top: "40%"}}
										className={"absolute z-50 h-32 hover:scale-110 left-3"}>
										<ChevronSmallLeft size={70} />
									</Button>
								)}
								{index < ideas.length - 1 && (
									<Button
										variant="light"

										onClick={onNext}
										style={{top: "40%"}}
										className={"absolute  z-50 h-32 hover:scale-110  right-3"}>
										<ChevronSmallRight size={70} />
									</Button>
								)}
								<CardBody className={"p-10 block"}>
									<User  avatarProps={{src: idea.author?.avatar}} name={idea.author?.name} />
									<h2 className={"font-sans"}>
										<span className={"font-normal"}>{idea.title}</span>
									</h2>
									<p className={"text-2xl mb-5 text-gray-500 font-light"}>{idea.description}</p>
									{idea.tags.map(t => (
										<a key={t} className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>
											{t}
										</a>
									))}
								</CardBody>
								<CardFooter className={"justify-around p-10 "}>
									<Button
										disabled={state !== "ACTIVE" || rates.has(idea._id)}
										onClick={() => onRate(1)}
										startContent={<EmojiSad size={34} />}
										variant="bordered"
										size={"lg"}
										color={"danger"}
										className={" font-bold text-2xl"}>
										DON&apos;T DO IT
									</Button>
									<MyRating size={"lg"} onChange={onRate} value={rates.get(idea._id)} readonly={rates.has(idea._id)} />
									<Button
										disabled={state !== "ACTIVE" || rates.has(idea._id)}
										onClick={() => onRate(5)}
										startContent={<Check size={40} />}
										variant="bordered"
										size={"lg"}
										color={"primary"}
										className={" font-bold text-2xl"}>
										LET&apos;S DO IT
									</Button>
								</CardFooter>
							</Card>
						);
					})
				) : (
					<div className={"justify-self-center w-full flex items-center justify-center flex-col self-center"}>
						<Empty label={"You have rated all ideas. We are out of ideas for now!"} />
						<Button isLoading={loading} href="/new" as={"a"} className={"mt-8 cursor-pointer"}startContent={<Plus size={22} />} size="lg">
							Add New Idea
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export async function getServerSideProps({params, req}) {
	const session = await getSession({req});
	let latest = [];
	try {
		await dbConnect();
		//? get latest for slider
		const latestQuery = session ? {raters: {$not: {$elemMatch: {$eq: session.user._id}}}} : "";
		latest = await Idea.find(latestQuery, "title author description tags")
			.populate({path: "author", model: models.User})
			.sort({createdAt: -1})
			.limit(50);
	} catch (e) {
		console.log(e);
	}

	return {
		props: {
			ideas: JSON.parse(JSON.stringify(latest)),
		},
	};
}
