"use client";
import {Loader5} from "@styled-icons/remix-line";

type Props = {
    size?: number
}

export const Loading = ({size = 22}: Props) => {
    return <>
        <Loader5 className={"animate-spin"} size={size}/>
    </>
}
