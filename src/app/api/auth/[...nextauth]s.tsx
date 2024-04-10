import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@db/mongodb";
import {dbConnect} from "@utils";
import User from "@models/User";
import GoogleProvider from "next-auth/providers/google";

// import CredentialsProvider from "next-auth/providers/credentials"
// import dbConnect from "../../../services/dbconnect";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            httpOptions: {
                timeout: 20000,
            }
        })
        // CredentialsProvider({
        //     // The name to display on the sign in form (e.g. 'Sign in with...')
        //     name: 'Credentials',
        //     // The credentials is used to generate a suitable form on the sign in page.
        //     // You can specify whatever fields you are expecting to be submitted.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     credentials: {
        //         username: { label: "Username", type: "text", placeholder: "jsmith" },
        //         password: {  label: "Password", type: "password" }
        //     },
        //     async authorize(credentials, req) {
        //         // You need to provide your own logic here that takes the credentials
        //         // submitted and returns either a object representing a user or value
        //         // that is false/null if the credentials are invalid.
        //         // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        //         // You can also use the `req` object to obtain additional parameters
        //         // (i.e., the request IP address)
        //         const res = await fetch("/api/login", {
        //             method: 'POST',
        //             body: JSON.stringify(credentials),
        //             headers: { "Content-Type": "application/json" }
        //         })
        //         const user = await res.json()
        //
        //         // If no error and we have user data, return it
        //         if (res.ok && user) {
        //             return user
        //         }
        //         // Return null if user data could not be retrieved
        //         return null
        //     }
        // })
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        // async jwt({ token, account, user }) {
        //     // initial signin
        //     if (account && user) {
        //         return {
        //             ...token,
        //         };
        //     }
        //         return token;
        // },
        async signIn({ user, account, profile, email, credentials }) {
            // await dbConnect();
            // try {
            //     const driverFromDB = await Driver.findOne({user: user.id});
            //     if(driverFromDB) {
            //         // todo check the driverFromDB.lastSignIn and if it's the same day don't update the xp
            //         driverFromDB.xp  += 100;
            //         driverFromDB.save();
            //         // const driver  = new Driver({user: user.id, xp: 100});
            //     } else {
            //         const driver  = new Driver({user: user.id, xp: 100});
            //         driver.save();
            //     }
            // } catch (e) {
            // }

            return true
        },
        async session(session, token) {
            await dbConnect();
            const result = await User.findOne({ email: session.user.email });
            if (result) {
                session.user = result;
            }
            return session;
        },
        async error(e) {
            console.log(e);
        }
    },
}

export default NextAuth(authOptions)
