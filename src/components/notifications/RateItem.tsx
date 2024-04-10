"use client";
import {Avatar, Link} from "@nextui-org/react";
import {MyRating} from "@ui";


const RateItem = ({item}) => {
	return (
		<Link href={`/ideas/${item.content.idea._id}`} className={"flex p-3 min-w-full hover:bg-gray-100 rounded-xl"}>
			<Avatar src={item.content.author.image} />
			<span className="flex-1 ml-3">
				<p>
					<strong>{item.content.author.name}</strong> <span className={"text-gray-400"}>rated </span> {item.content.idea.title}
				</p>
				<MyRating readonly value={item.content.rate} size={"sm"} />
				<p className={"text-xs text-gray-400"}>
					{/*<Moment format={"LL, HH:mm"}>{item.createdAt}</Moment>  // fixme moment */}
				</p>
			</span>
		</Link>
	);
};

export default RateItem;
