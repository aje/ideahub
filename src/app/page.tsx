// import IdeaSlider from "@/app/components/home/IdeaSlider";
// import IdeaForm from "@/app/components/home/IdeaForm";
// import LatestIdeas from "@/app/components/home/LatestIdeas";
// import LatestUsers from "@/app/components/home/LatestUsers";
// import CTA from "@/app/components/home/CTA";
// import ProblemForm from "@/app/components/home/ProblemForm";
// import {Container, Text} from "@nextui-org/react";
// import React from "react";
// import dbConnect from "@/app/api/dbconnect";
// import Idea from "@/app/api/models/Idea";
// import User from "@/app/api/models/User";
// import {getSession} from "next-auth/react";
// import moment from "moment";

import CTA from "../components/home/CTA";
import {IdeaForm, IdeaSlider, LatestIdeas, LatestUsers, ProblemForm} from "@com";

export default function Home() {
  return (
      <>
          <CTA shouldExplore={latest?.length > 0} />
          {latest?.length > 0 && <IdeaSlider latest={latest} />}
          <IdeaForm />

          <div className={" py-20 text-center "} style={{backgroundImage: "url(/homepage.png)", backgroundSize: "50%"}}>
              <div className="container">
                  <main>
                      <p className={"text-primary font-sanse"} h2>
                          You have no idea?
                      </p>
                      <p className={"text-2xl "}>
                          Do not worry! You tell us what <span className="text-red-500">problem</span> in life you have and we will try to find a{" "}
                          <span className={"text-primary"}>solution</span> for it!{" "}
                      </p>
                  </main>
              </div>
          </div>
          <ProblemForm />
          <LatestIdeas topLastMonth={topLastMonth} countLastMonth={countLastMonth} />
          <LatestUsers topEnt={topEnt} countTopEnt={countTopEnt} />
      </>
  );
}
//
// export async function getServerSideProps({params, req}) {
//   const session = await getSession({req});
//   let latest = [];
//   let topLastMonth = [];
//   let topEnt = [];
//   let countLastMonth = 0;
//   let countTopEnt = 0;
//   try {
//     await dbConnect();
//     //? get latest for slider
//     const latestQuery = session ? {raters: {$not: {$elemMatch: {$eq: session.user._id}}}} : {};
//     latest = await Idea.find(latestQuery, "title author description tags")
//         .populate({path: "author", model: User})
//         .sort({createdAt: -1})
//         .limit(50);
//     // const topQuery = ;
//     // todo get count all last month
//     //? get count last month
//     const clmquery = {createdAt: {$gte: moment().subtract(1, "months").format()}};
//     countLastMonth = await Idea.find(clmquery).count();
//
//     topLastMonth = await Idea.find({}, "title raters author description ratingsAverage ratingsQuantity tags")
//         .populate({path: "author", model: User})
//         .sort({ratingsAverage: -1})
//         .limit(6);
//
//     //? get entp of all time
//     topEnt = await User.find({}).sort({postCount: 1});
//     countTopEnt = await User.find({createdAt: {$gte: moment().subtract(1, "months").format()}}).count();
//   } catch (e) {}
//   return {
//     props: {
//       topLastMonth: JSON.parse(JSON.stringify(topLastMonth)),
//       topEnt: JSON.parse(JSON.stringify(topEnt)),
//       countLastMonth,
//       countTopEnt,
//       latest: JSON.parse(JSON.stringify(latest)),
//     },
//   };
// }
