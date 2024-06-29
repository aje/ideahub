"use client";
import {useState} from "react";
import {Button} from "@nextui-org/react";
import {MyRating} from "@ui";
import {Check, EmojiSad} from "@styled-icons/entypo";
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

const IdeaRating = ({isOwner, item}) => {
    const {data: session} = useSession();
    // const state = useHookstate(loginPopper);
    const [loading, setLoading] = useState(false);
    const isRated = item.raters?.includes(session?.user?._id);
    // @ts-ignore
    const count = item.rates && Object.values(item.rates).reduce((a, b) => a + b, 0);
    const avgRating = item.ratingsAverage;

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const onReview = (value) => {
        if (!session) onNotLoggedIn();
        else {
            setLoading(true);
            axios
                .post(`/rate?value=${value}&id=${item._id}`)
                .then((res) => {
                    toast.success("Successfully updated!");
                    refreshData();
                })
                .finally(() => setLoading(false))
                .catch((error) => {
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

    return (
        <div className=" to-blue-50 pt-0  sbg-gradient-to-t sfrom-white  w-full">
            <p className={"text-2xl text-gray-400 mt-5 font-light"}>Rate this idea:</p>
            <MyRating count={count} onChange={onReview} size={"lg"} value={isRated && avgRating} />
            <div className={"justify-between mt-5 flex"}>
                <Button
                    onClick={() => onReview(1)}
                    startContent={<EmojiSad size={34} />}
                    variant="bordered"
                    size={"lg"}
                    color={"danger"}
                    className={"z-0 font-bold text-2xl"}>
                    DON&apos;T DO IT
                </Button>

                <Button
                    onClick={() => onReview(5)}
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

export default IdeaRating;
