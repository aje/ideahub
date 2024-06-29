"use client";
import {Navbar} from "@nextui-org/react";
import Image from "next/image";
import LoginPopover from "./LoginPopover";
import {useSession} from "next-auth/react";
import ProfileButton from "../../components/profile/ProfileButton";
import {Plus} from "@styled-icons/entypo";
import NotificationButton from "./NotificationButton";
import {usePathname} from "next/navigation";
import {NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import NextLink from "next/link";

const Nav = () => {
    const {status} = useSession();
    const pathname = usePathname();

    return (
        <>
            <Navbar
            // css={{
            // 	backdropFilter: " blur(7px)",
            // 	background: "transparent",
            // }}
            // className={"h-20"}
            // containerCss={{
            // 	backdropFilter: " blur(7px)",
            // 	background: "transparent",
            // 	// filter: 'blur(5px)',
            // 	// background: "#e5f4f0ab",
            // 	position: "fixed",
            // 	top: 0,
            // 	zIndex: 1,
            // }}
            // disableShadow
            // disableBlur
            // className={"fixed "}
            >
                <NavbarBrand as={"a"} href={"/"}>
                    <Image alt={"Brainstormers"} src={"/logo.png"} width={200} quality={100} height={60} />
                </NavbarBrand>

                <NavbarContent className={"font-bold"}>
                    <NavbarItem isActive={pathname === "/"} className="font-bold">
                        <NextLink href="/"> Home</NextLink>
                    </NavbarItem>

                    <NavbarItem isActive={pathname === "/explore"}>
                        <NextLink href={"/explore"}>Explore</NextLink>
                    </NavbarItem>

                    <NavbarItem>
                        <NextLink href={"/new"}>
                            <span className={"bg-primary rounded-xl px-3 py-1 text-white active:translate-y-0.5 duration-75"}>
                                <Plus size={26} />
                            </span>
                        </NextLink>
                    </NavbarItem>
                    {status === "authenticated" ? (
                        <>
                            <NotificationButton />
                            <ProfileButton />
                        </>
                    ) : (
                        <LoginPopover />
                    )}
                </NavbarContent>
            </Navbar>
        </>
    );
};

export default Nav;
