"use client";
import {Badge} from "@nextui-org/react";
import {Notification} from "@styled-icons/remix-line";
import useSWR from "swr";
import {NavbarItem} from "@nextui-org/navbar";
import {useContext} from "react";
import {DialogContext} from "../../app/providers";

const NotificationButton = () => {
	const { addDialog} = useContext(DialogContext)
	const {data} = useSWR(`/stats`);
	const onOpen = () => {
		addDialog("notification")
		document.body.style.overflow = "hidden";
	};
	return (
		<NavbarItem onClick={onOpen}>
			<Badge disableOutline color="danger" isInvisible={!data || data?.notifications < 1} content={data?.notifications}>
				<Notification size={26} />
			</Badge>
		</NavbarItem>
	);
};

export default NotificationButton;
