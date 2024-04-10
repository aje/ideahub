"use client";
import {Badge, Card, Divider} from "@nextui-org/react";
import useSWR from "swr";
import CommentItem from "../idea/CommentItem";
import RateItem from "./RateItem";
import {Empty, Loading} from "@ui"


const mapToItem = {
	COMMENT: item => <CommentItem item={item} />,
	RATE: item => <RateItem item={item} />,
	REPLY: item => <CommentItem item={item} />,
};

const NotificationSidebar = () => {
	// const state = useHookstate(notificationState); // fixme context
	const {data: notif, error} = useSWR("/notifications");
	const onClose = () => {
		// state.set(false);
		document.body.style.overflow = "auto";
	};

	// if (!data && !error) return <Loading />;

	return (
		<>
			<div
				onClick={onClose}
				style={{zIndex: 400, backdropFilter: "saturate(180%) blur(6px)"}}
				className={" bg-white/30 w-screen h-screen fixed top-0 left-0"}
			/>
			<Card
				// css={{borderRadius: 0}}
				style={{zIndex: 400}}
				className="fadeInAnimated overflow-y-scroll bg-white h-screen  w-2/3 md:w-1/3 fixed top-0 right-0">
				<div className="flex justify-between items-center px-3 pt-3">
					<Badge disableOutline color="danger" isInvisible={!notif || notif?.unreadCount < 1} content={notif?.unreadCount}>
						<h3>Notifications</h3>
					</Badge>
					{/*<Button light size={"sm"} color={"primary"} icon={<Check size={18} />}>*/}
					{/*	Mark as read*/}
					{/*</Button>*/}
				</div>
				{!notif && !error ? (
					<Loading size={40} />
				) : notif?.data?.length > 0 ? (
					notif?.data.map(item => (
						<>
							<>{mapToItem[item.type](item)}</>
							<Divider />
						</>
					))
				) : (
					<Empty label={"You're allright"} />
				)}
			</Card>
		</>
	);
};

export default NotificationSidebar;
