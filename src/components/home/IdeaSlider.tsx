"use client";
import {useContext, useState} from "react";
import {Check, ChevronSmallLeft, ChevronSmallRight, EmojiSad, Plus} from "@styled-icons/entypo";
import {Button, Link, User} from "@nextui-org/react";
import {Empty, MyRating} from "@ui";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import Carousel from "nuka-carousel";
import {DialogContext} from "../../app/providers";

const CarouselContent = ({item, onNext}) => {
    const {status} = useSession();
    const {addDialog} = useContext(DialogContext);

    const onNotLoggedIn = () => {
        if (status === "unauthenticated") {
            addDialog("login");
            toast.error("Please login first");
        }
    };
    const onReview = (item) => (value) => {
        console.log(item, value);
        if (status === "unauthenticated") onNotLoggedIn();
        else {
            onNext();
            // setLoading(true);
            // axios
            // 	.post(`/rate?value=${value}&id=${item._id}`)
            // 	.then(res => {
            // 		toast.success("Successfully updated!");
            // 		onNext();
            // 	})
            // 	.catch(error => {
            // 		toast.error(error?.response?.data?.message);
            // 	});
        }
    };

    return (
        <div className={"flex-1 text-center"}>
            <User className={"z-0"} avatarProps={{src: item.author?.avatar}} name={item.author?.name} />

            <h1 className={"flex font-serif justify-center"}>
                <Link href={`ideas/${item._id}`} className={"font-normal font-serif"}>
                    {item.title}
                </Link>
            </h1>
            <p className={"text-2xl mb-5 px-6 text-gray-500"}>{item.description?.substring(0, 400) || "No description"}</p>
            {item.tags.map((t, io) => (
                <a key={io} className={"hover:underline hover:text-gray-500 transition-all font-bold italic text-gray-300 mr-3"}>
                    {t}
                </a>
            ))}

            <div className="flex justify-around items-center mt-5">
                <Button
                    onClick={() => onReview(item)(1)}
                    startContent={<EmojiSad size={34} />}
                    variant="bordered"
                    size={"lg"}
                    color={"danger"}
                    className={"z-0 font-bold text-2xl"}>
                    DON&apos;T DO IT
                </Button>
                <MyRating onChange={onReview(item)} size={"lg"} />
                <Button
                    onClick={() => onReview(item)(5)}
                    startContent={<Check size={40} />}
                    variant="bordered"
                    size={"lg"}
                    color={"primary"}
                    className={"z-0 font-bold text-2xl"}>
                    LET&apos;S DO IT
                </Button>
            </div>
        </div>
    );
};

const IdeaSlider = ({latest: ideas}) => {
    const [index, setIndex] = useState(0);

    const onNext = () => {
        if (index < ideas.length - 1) setIndex(index + 1);
    };

    // const onPrev = () => {
    // 	if (index > 0) setIndex(index - 1);
    // };

    return (
        <>
            <div className={" py-20 "}>
                <div className={"container"}>
                    {ideas?.length > 0 ? (
                        <main>
                            {/*<Button disableRipple light icon={<ChevronSmallLeft size={80} />} disabled={index===0} size="xl" onClick={onPrev} css={{ minWidth: 40}}  className={"z-0 hover:text-primary active:text-primary"}/>*/}
                            <Carousel
                                renderCenterLeftControls={({previousDisabled, previousSlide}) => (
                                    <Button
                                        onClick={previousSlide}
                                        disabled={previousDisabled}
                                        disableRipple
                                        variant="light"
                                        startContent={<ChevronSmallLeft size={80} />}
                                        size="lg"
                                        // css={{minWidth: 40}}
                                        className={"z-0 hover:text-primary active:text-primary"}
                                    />
                                )}
                                renderCenterRightControls={({nextDisabled, nextSlide}) => (
                                    <Button
                                        onClick={nextSlide}
                                        disabled={nextDisabled}
                                        disableRipple
                                        startContent={<ChevronSmallRight size={80} />}
                                        size="lg"
                                        // css={{minWidth: 40}}
                                        variant="light"
                                        className={"z-0 hover:text-primary active:text-primary"}
                                    />
                                )}
                                slidesToShow={1}
                                slideIndex={index}
                                renderBottomCenterControls={() => null}>
                                {ideas.map((item) => (
                                    <CarouselContent key={item.id} item={item} onNext={onNext} />
                                ))}
                            </Carousel>
                            {/*<Button disableRipple icon={<ChevronSmallRight size={80} />} disabled={index === (ideas.length - 1)} size="xl"  css={{ minWidth: 40}}  onClick={onNext} auto light  className={"z-0 hover:text-primary active:text-primary"}/>*/}
                        </main>
                    ) : (
                        <div className={"justify-self-center w-full flex items-center justify-center flex-col self-center"}>
                            <Empty label={"We are out of ideas!"} />
                            <Button
                                variant="bordered"
                                href="/new"
                                as={"a"}
                                className={"mt-8 cursor-pointer"}
                                startContent={<Plus size={22} />}
                                size="lg">
                                Add New Idea
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default IdeaSlider;
