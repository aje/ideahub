"use client";
import clsx from "clsx";
import {Block} from "@styled-icons/entypo";

type Props = {
	label?: string;
	noIcon?: boolean;
	inline?: boolean
}

export const Empty = ({label, noIcon, inline}: Props) => {
	return (
		<div className={clsx(" py-2 flex  w-full ", inline ? "items-center" : "flex-col justify-center items-center")}>
			{!noIcon && <Block color={"#aaa"} size={inline ? 20 : 40} />}
			<h5 className={"mb-0 ml-2 text-gray-500"}>
				{label || " Empty"}
			</h5>
		</div>
	);
};
