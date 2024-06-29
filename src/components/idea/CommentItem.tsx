"use client";
import {Avatar} from "@nextui-org/react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

const CommentItem = ({item}) => {
    // const onClick = () => {
    // 	// state.set(false);
    // 	document.body.style.overflow = "auto";
    // };
    // <Link href={`/ideas/${item.content.idea._id}`}>
    return (
        <a className={clsx(!item.seen && "bg-red-50", "flex p-3 min-w-full hover:bg-gray-100")}>
            <Avatar src={item.content.author.image} />
            <span className="flex-1 ml-3">
                <p>
                    <strong>{item.content.author.name}</strong> <span className={"text-gray-400"}>commented on</span> {item.content.idea.title}
                </p>
                <ReactMarkdown
                    // linkTarget={"_blank"}
                    className={"text-gray-700"}>
                    {item.content.description.substring(0, 100)}
                </ReactMarkdown>
                <p className={"text-xs text-gray-400"}>{/*<Moment format={"LL, HH:mm"}>{item.createdAt}</Moment> // fixme date  */}</p>
            </span>
        </a>
    );
};

export default CommentItem;
