"use client";
import {Button, Input, Textarea} from "@nextui-org/react";
import {useState} from "react";
import {toast} from "react-hot-toast";

const Edit = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bio: ""
    });

    const onchange = (n)=>(e) => {
        setFormData({...formData, [n]: e.target.value})
    }

    const onSubmit = () => {
        setLoading(false)
        toast.success("Succesfully saved")
    }

    return <>
        <div className={"mt-10"}>
            <div className={"mt-4"}>
                <Input
                    value={formData.name}
                    onChange={onchange("name")}
                    name={"name"}
                    className={"w-96"}
                    label={"Name"}
                    variant="bordered"
                    placeholder={"Name"}/>
            </div>
            <div className={"mt-4"}>
                <Input
                    value={formData.email}
                    onChange={onchange("email")}
                    name={"email"}
                    type={"email"}
                    className={"w-96"}
                    label={"Email"}
                    variant="bordered"
                    placeholder={"email"}/>
            </div>
            <div className={"mt-4"}>
                <Textarea
                    value={formData.bio}
                    onChange={onchange("bio")}
                    className={"w-96"}
                    label={"Bio"}
                    variant="bordered"/>
            </div>
            <Button
                isLoading={loading}
                disabled={loading}
                onClick={onSubmit} className={"mt-8"}>
                 Save
            </Button>
            {/*<div className={"mt-4"}>*/}
            {/*    <Input*/}
            {/*        className={"w-96"}*/}
            {/*        type={"password"}*/}
            {/*        label={"Password"}*/}
            {/*        bordered/>*/}
            {/*</div>*/}
        </div>
    </>
}

export default Edit
