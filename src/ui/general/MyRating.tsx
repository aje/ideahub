"use client";
import {StarOutlined} from "@styled-icons/entypo"
import {Star} from "@styled-icons/entypo"
import Rating, {RatingComponentProps} from "react-rating";


type Props = {
    count?: number;
    value?: number;
    size?: "sm" | "lg" | "md";
}

export const MyRating = ({count, value, size = "sm", ...rest}: Props & RatingComponentProps) => {
    const sizeMap = {
        lg: 32,
        xl: 48,
        sm: 20,
        md: 26
    }
    const color = "#FFC107";

    return (<div className={"flex-shrink-0"}>
        {/*// @ts-ignore*/}
        <Rating
            initialRating={value}
            {...rest}
            fullSymbol={<Star  size={sizeMap[size]} className={'-mr-1'} color={color}/>}
            emptySymbol={<StarOutlined   size={sizeMap[size]} className={'-mr-1'} color={color}/>}
        />
        {(count || count === 0) && <span  style={{fontSize: sizeMap[size] -5}} className={"ml-1 align-middle font-bold"} color={color}>({count})</span>}
    </div>);
};
