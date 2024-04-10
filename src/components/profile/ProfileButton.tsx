"use client";
import {useSession} from "next-auth/react";
import {User} from "@nextui-org/react";
import {NavbarItem} from "@nextui-org/navbar";


const ProfileButton = () => {
    const { data: session } = useSession();
    // const state = useHookstate(sidebarState);
    const onOpen = () => {
        // state.set(true)
        document.body.style.overflow = "hidden";
    }

    return (<><NavbarItem  onClick={onOpen}>
            {session &&  session.user &&
            <User  avatarProps={{src:session.user.image || ""}} name={session.user.name}/>
            }
        </NavbarItem>
    </>
    );
};

export default ProfileButton;
