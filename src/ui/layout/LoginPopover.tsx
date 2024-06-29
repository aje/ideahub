"use client";
import {useContext, useState} from "react";
import {Button, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {Login} from "@styled-icons/entypo"
import {Github, Google} from "@styled-icons/remix-line"
import {signIn} from "next-auth/react";
import {NavbarItem} from "@nextui-org/navbar";
import {DialogContext} from "../../app/providers";

const LoginPopover = () => {
	const [loading, setLoading] = useState<string>();
	const {dialogs, toggleDialog} = useContext(DialogContext)

	const onSocial = provider => () => {
		setLoading(provider);
		signIn(provider).then(r => setLoading(undefined));
	};

	return (
		<>
			{/*<Navbar.Link color="inherit" className={"text-primary hover:text-primary/80"}>*/}
			{/*    <Key2 size={20} className={"mr-2"}/>*/}
			{/*    Register as Guest*/}
			{/*</Navbar.Link>*/}
			<Popover
				showArrow={true}
				isOpen={dialogs.has("login")}
				onOpenChange={toggleDialog("login")}
			>
				<PopoverTrigger>
					<NavbarItem>
						<Login size={20} className={" mr-3"} /> Login
					</NavbarItem>
				</PopoverTrigger>
				<PopoverContent className={"p-5 w-72"}>
					{/*<h4>Guest Login</h4>*/}
					{/*<Button  className={"mb-5"}  bordered>Log me in as a guest</Button>*/}

					{/*<Button  onClick={()=>setMore(!more)}  variant="light"  icon={more ? <ArrowUpS size={20}/> :  <ArrowDownS size={20}/>} auto>More options</Button>*/}
					{/*{more && <div className={"mt-5 "}>*/}
					{/*<h4>Phone Login</h4>*/}
					{/*<Input className={"mb-2"} fullWidth bordered label={"Phone number"}/>*/}
					{/*<Input*/}
					{/*    fullWidth*/}
					{/*    bordered*/}
					{/*    label={"Code"}*/}
					{/*    contentRightStyling={false}*/}
					{/*    contentRight={*/}
					{/*        <Button size={"xs"} className={"mr-2"}>*/}
					{/*            GET CODE*/}
					{/*        </Button>*/}
					{/*    }*/}
					{/*/>*/}
					{/*<Button rounded className={"mt-5 w-full"} >Submit</Button>*/}

					<h4>Login using socials</h4>
					{/*{Object.values(providers).map((provider) =>*/}
					{/*    <Button  onClick={() => signIn(provider.id)} key={provider.name} icon={<Google size={22} fill="currentColor" />} bordered className={"w-full"} >{provider.name} Login</Button>*/}
					{/*)}*/}
					<Button
						onClick={onSocial("google")}
						disabled={!!loading}
						startContent={<Google size={22} fill="currentColor" />}
						variant={"bordered"}
						isLoading={loading === "google"}
						className={"w-full"}>
						Google Login
					</Button>
					<Button
						onClick={onSocial("github")}
						disabled={!!loading}
						startContent={<Github size={22} fill="currentColor" />}
						variant={"bordered"}
						isLoading={loading === "github"}
						className={"w-full mt-2"}>
						Github Login
					</Button>
					{/*</div>}*/}
				</PopoverContent>
			</Popover>
		</>
	);
};

export default LoginPopover;
