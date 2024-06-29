"use client";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Textarea} from "@nextui-org/react";
import {Plus} from "@styled-icons/entypo";
import Image from "next/image";
import {useRouter} from "next/navigation";

type Inputs = {
    title: string;
};

const IdeaForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        router.push(`/new?title=${data.title}`);
    };

    return (
        <div className={"bg-blue-50"} id={"ideaform"}>
            <div className={"container"}>
                <main className={"flex items-center"}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-3/5 pr-20">
                        <h2 className={"mb-6 font-sans"}>
                            Write your <span className={"text-blue-500"}>idea</span> down <span className={"font-normal  font-serif"}></span>
                        </h2>
                        <Textarea
                            required
                            variant="bordered"
                            className={"mb-6 bg-white"}
                            placeholder={"Something that makes ..."}
                            fullWidth
                            size={"lg"}
                            {...register("title", {required: true})}
                        />
                        {errors.title && <span>This field is required</span>}
                        <div className="flex items-center">
                            <Button type={"submit"} startContent={<Plus size={32} />} size={"lg"} color="primary">
                                Add idea
                            </Button>
                            {/*<Button  auto  variant="light" className={" uppercase font-bold ml-3"} size={"lg"}>Login or Sign up</Button>*/}
                        </div>
                    </form>
                    <div style={{lineHeight: 0}} className="w-2/5 relative h-full">
                        <Image alt={"Add idea"} style={{lineHeight: 0}} src={"/homepageAddIdea.png"} width={500} height={500} objectFit="cover" />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default IdeaForm;
