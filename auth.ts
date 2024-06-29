import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// import crypto from "crypto";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import {clientPromise} from "@db";
// import Credentials from "next-auth/providers/credentials";
// import {User} from "@models";

// function generateUniqueIdentifier() {
//     const randomBytes = crypto.randomBytes(16); // Generate 16 random bytes
//     return randomBytes.toString("hex"); // Convert to hexadecimal string
// }

export const config = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Credentials({
        //     id: "anonymous",
        //     credentials: {},
        //     async authorize(credentials) {
        //         return {
        //             id: generateUniqueIdentifier(),
        //             name: "Anonymous User",
        //             credentials,
        //         };
        //     },
        // }),
        // Custom({
        //     id: "anonymous",
        //     async signIn(user, account, profile) {
        //         // Logic to handle anonymous user creation
        //         return {
        //             id: generateUniqueIdentifier(), // Generate a unique ID
        //             name: "Anonymous User",
        //             // Add any other relevant user data (optional)
        //         };
        //     },
        // }),
    ],
    // callbacks: {
    //     async jwt({token, account, user}) {
    //         console.log("account", account);
    //         console.log("user", user);
    //         // const tokenUser = user;
    //
    //         // const id_token = account?.id_token || tokenUser?.tokens?.id_token || "";
    //         // const access_token = account?.access_token || tokenUser?.tokens?.access_token;
    //
    //         // if (id_token) {
    //         //     token.id_token = id_token;
    //         // }
    //         //
    //         // if (access_token) {
    //         //     token.access_token = access_token;
    //         // }
    //
    //         return token;
    //     },
    //     // async signIn({ user, account, profile, email, credentials }) {
    //     //     console.log(account, profile, email, credentials);
    //     //     await dbConnect();
    //     //     try {
    //     //         const driverFromDB = await User.findOne({user: user.id});
    //     //         if(driverFromDB) {
    //     //             //
    //     //             // driverFromDB.xp  += 100;
    //     //             // driverFromDB.save();
    //     //             // const driver  = new Driver({user: user.id, xp: 100});
    //     //         } else {
    //     //             const driver  = new User({user: user.id});
    //     //             driver.save();
    //     //         }
    //     //     } catch (e) {
    //     //         console.log(e);
    //     //     }
    //     //
    //     //     return true
    //     // },
    //     async session({session, token}: {session; token; user}) {
    //         console.log(token);
    //         await dbConnect();
    //         const result = await User.findOne({email: session.user.email});
    //         if (result) {
    //             session.user = result;
    //         }
    //         return session;
    //     },
    //     // jwt({ token, trigger, session }) {
    //     //     if (trigger === "update") token.name = session.user.name
    //     //     return token
    //     // },
    // },
};

export const {handlers, auth, signIn, signOut} = NextAuth(config);
