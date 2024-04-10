"use client";
import {NavbarContent, NavbarItem} from "@nextui-org/navbar";
import NextLink from "next/link";

const Footer = () => {
	return (
		<div className={"py-12 bg-red-200 "}>
			<div className={"container flex justify-between items-center"} >
				<h6 className={"mb-0"}>
					All right reserved for IdeaStorm
				</h6>
				<NavbarContent>
					<NavbarItem>
						<NextLink href="/">Home</NextLink>
						<NextLink href="/explore">Explore</NextLink>
						{/*<Navbar.NextLink href="#">Blog</Navbar.NextLink>*/}
						<NextLink href="/about">About</NextLink>
						<NextLink href="/contact">Support</NextLink>
					</NavbarItem>

				</NavbarContent>
			</div>
		</div>
	);
};

export default Footer;
