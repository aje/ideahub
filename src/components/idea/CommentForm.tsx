"use client";
import {useContext, useState} from "react";
import {Button, Textarea} from "@nextui-org/react";
import {toast} from "react-hot-toast";
import {SendPlane} from "@styled-icons/remix-line";
// import {loginPopper} from "../../../1/_app";
import {useSession} from "next-auth/react";
import {DialogContext} from "../../app/providers";

const CommentForm = ({ideaId}) => {
    const [loading, setLoading] = useState(false);
    const {addDialog} = useContext(DialogContext);
    const {data: session} = useSession();

    const [formData, setFormData] = useState({
        description: "",
        idea: ideaId,
    });

    // const router = useRouter();

    const onChange = (name) => (event) => {
        setFormData({...formData, [name]: event?.target ? event.target.value : event});
    };

    const onSubmit = async (formData: FormData) => {
        // "use server";
        setLoading(true);
        console.log(formData);
        // if (session) {
        try {
            if (session) {
                // await dbConnect();
                // const comment = {...formData, author: session.user};
                // const result = await models.Comment.create(comment);
                // // res.status(201).json(result);
                // console.log(result);
            } else {
                addDialog("login");
                setLoading(false);
                toast.error("Please login first");
            }
        } catch (error) {
            // res.status(400).json(error);
        }
        // // todo axios
        // axios
        //     .post(`/comments`, formData)
        //     .then(() => {
        //         router.replace(router.asPath);
        //         toast.success("Successfully posted!");
        //     })
        //     .finally(() => {
        //         onChange("description")("");
        //         setLoading(false);
        //     });
        // } else {
        //     addDialog("login");
        //     setLoading(false);
        //     toast.error("Please login first");
        // }
    };

    return (
        <form action={onSubmit} className={"mb-10 w-full"}>
            <Textarea
                fullWidth
                required
                onChange={onChange("description")}
                value={formData.description}
                // rows={1}
                size={"lg"}
                variant="bordered"
                placeholder={"We want your honest opinion!"}
            />
            {/*</div>*/}
            <Button
                type="submit"
                className={"mt-4 z-0"}
                disabled={loading || formData.description === ""}
                // onClick={onSubmit}
                isLoading={loading}
                startContent={!loading && <SendPlane size={20} />}>
                Post
            </Button>
        </form>
    );
};

export default CommentForm;
