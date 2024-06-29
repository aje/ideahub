"use client";
import {useRouter} from "next/navigation";
import {Card, User} from "@nextui-org/react";
import {CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {IdeaType} from "@models";
import {MyRating} from "@ui";

type Props = {
    item: IdeaType;
    noOwner?: boolean;
    onCallback?: () => void;
};

const IdeaItem = ({item, noOwner, onCallback}: Props) => {
    const router = useRouter();

    const onPress = () => {
        router.push(`/ideas/${item._id}`);
        if (typeof onCallback === "function") {
            onCallback();
        }
    };
    return (
        <Card isPressable onClick={onPress} className={"bg-primary/10"}>
            <CardHeader className={"flex-col pb-0 mt-2 items-start"}>
                {!noOwner && (
                    <User
                        avatarProps={{
                            src: item.author?.avatar,
                        }}
                        className={"-ml-1 mb-2"}
                        name={item.author?.name}
                    />
                )}
                <h5 className={"ml-2 mb-0"}>{item.title}</h5>
            </CardHeader>
            <CardBody>{item.description?.substring(0, 300)}</CardBody>
            <CardFooter className={"justify-end pt-0 pb-5 pr-5"}>
                <MyRating value={item.ratingsAverage} count={item.ratingsQuantity} readonly size={"md"} />
            </CardFooter>
        </Card>
    );
};

export default IdeaItem;
