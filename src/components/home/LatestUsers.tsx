"use client";
import {User} from "@nextui-org/react";

const LatestUsers = ({topEnt: users, countTopEnt}) => {
	return (
		<div className={"py-20 bg-gray-100"} style={{backgroundImage: "url(/ent.png)", backgroundSize: "cover", backgroundPosition: "bottom"}}>
			<div className={"container"} >
				<main>
					<h2 className={"font-sans"}>
						Get to know our <span className="text-primary font-serif">Entrepreneurs</span>
					</h2>
					<h3>
						Last month <span className="font-normal"> most active entrepreneurs({countTopEnt})</span>
					</h3>
					<div className="grid gap-2 grid-cols-4">
						{users.map((user) => (
							<div key={user.id} className={"flex flex-col text-center items-center mt-4 z-0"}>
								<User  avatarProps={{src:user.image}} name={""}  />
								<h3 className={"mt-4"}>
									{user.name}{" "}
									{user.role && (
										<span
											className={
												"capitalize border-gray-300 text-gray-400 text-xs font-normal border-solid border bg-amber-50 rounded-md px-2"
											}>
											{user.role}
										</span>
									)}
								</h3>
								<p className={"text-white bg-primary px-3 rounded-full mb-3 mt-1"}>{user.postCount} Ideas</p>
								<p className={"px-8"}>{user.bio}</p>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
};

export default LatestUsers;
