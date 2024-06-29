import {useState} from "react";
import {Button, Input, Textarea} from "@nextui-org/react";
import {toast} from "react-hot-toast";
import {AddToList, Trash} from "@styled-icons/entypo";
import {SendPlane} from "@styled-icons/remix-line";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {CardHeader} from "@nextui-org/card";
import {Empty, Loading} from "@ui";

const Upload = () => {
    const {data: session} = useSession();
    const state = useHookstate(ideaFormData);
    const login = useHookstate(loginPopper);
    const router = useRouter();
    const {problem, idea} = state.get();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: idea || problem,
        description: "",
        tags: [],
        targetAudience: "",
    });
    const [problems, setProblems] = useState([problem]);
    const [ideas, setIdeas] = useState([idea]);
    const [alts, setAlts] = useState([""]);
    const [step, setStep] = useState(0);

    const onChange = (name) => (event) => {
        setFormData({...formData, [name]: event?.target ? event.target.value : event});
    };

    const onSubmit = () => {
        setLoading(true);
        const data = formData;
        if (problems.length > 1 || problems[0] !== "") data.problems = problems;
        if (ideas.length > 1 || ideas[0] !== "") data.solutions = ideas;
        if (session) {
            axios
                .post(`/posts`, data)
                .then(({data}) => {
                    toast.success("Successfully created!");
                    setFormData(data);
                    setStep(1);
                    // router.push('/')
                })
                .finally(() => setLoading(false))
                .catch((e) => {
                    toast.error(e.message);
                });
        } else {
            login.set(true);
            setLoading(false);
            toast.error("Please login first");
        }
    };

    const onSubmitFinal = () => {
        setLoading(true);
        const data = formData;
        if (alts.length > 1 || alts[0] !== "") data.alternatives = alts;
        axios
            .patch(`/posts`, data)
            .then((res) => {
                toast.success("Successfully updated!");
                // setFormData(data)
                // setStep(1)
                router.push(`/ideas/${res.data?._id}`);
            })
            .finally(() => setLoading(false))
            .catch((e) => {
                toast.error(e.message);
            });
    };

    const addProblem = () => {
        const t = [...problems];
        t.push("");
        setProblems(t);
    };

    const removeProblem = (i) => (e) => {
        const t = [...problems];
        t.splice(i, 1);
        setProblems(t);
    };

    const onChangeProblem = (i) => (e) => {
        const t = [...problems];
        t[i] = e.target.value;
        setProblems(t);
    };

    const addIdeas = () => {
        const t = [...ideas];
        t.push("");
        setIdeas(t);
    };

    const removeIdeas = (i) => (e) => {
        const t = [...ideas];
        t.splice(i, 1);
        setIdeas(t);
    };

    const onChangeIdeas = (i) => (e) => {
        const t = [...ideas];
        t[i] = e.target.value;
        setIdeas(t);
    };

    const addAlts = () => {
        const t = [...alts];
        t.push("");
        setAlts(t);
    };

    const removeAlts = (i) => (e) => {
        const t = [...alts];
        t.splice(i, 1);
        setAlts(t);
    };

    const onChangeAlts = (i) => (e) => {
        const t = [...alts];
        t[i] = e.target.value;
        setAlts(t);
    };

    const disabled = formData.title === "" || loading;

    return (
        <>
            <div className={"py-20 bg-violet-50"}>
                <div className="container">
                    <h1>
                        Start <span className={"text-primary"}>Ideation</span> <span className={"font-normal"}>and brainstorm</span>
                    </h1>
                    {step === 0 && (
                        <>
                            <div className={"bg-white  rounded-3xl mb-5"}>
                                <div className="p-4">
                                    <Input
                                        label={"Title"}
                                        value={formData.title}
                                        onChange={onChange("title")}
                                        required
                                        size={"lg"}
                                        className={"mb-3"}
                                        fullWidth
                                        // underlined
                                        placeholder={"Choose a name or small explanation"}
                                    />

                                    <Textarea
                                        size={"lg"}
                                        value={formData.description}
                                        onChange={onChange("description")}
                                        // className={"mb-6"}
                                        // underlined
                                        fullWidth
                                        label="Description"
                                        placeholder="Enter your amazing ideas."
                                    />
                                </div>
                            </div>
                            <div className="grid gap-5 grid-cols-2  mb-5">
                                <div className={"bg-red-50 px-1 rounded-3xl"}>
                                    <CardHeader className={"pb-0 block"}>
                                        <h3 className={"text-red-500"}>Problems to be solved</h3>
                                        <p className={"-mt-3 text-gray-500"}>What problems are you solving?</p>
                                    </CardHeader>
                                    {problems.map((p, i) => (
                                        <div key={i} className="flex w-full px-4 pb-4">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    addProblem();
                                                }}
                                                className={"flex-1"}>
                                                <Input
                                                    autoFocus
                                                    variant="underlined"
                                                    fullWidth
                                                    value={p}
                                                    placeholder={"A problem to fix"}
                                                    onChange={onChangeProblem(i)}
                                                    required
                                                    size={"lg"}
                                                />
                                            </form>
                                            {i === problems.length - 1 ? (
                                                <Button
                                                    disableRipple
                                                    onClick={addProblem}
                                                    disabled={p === ""}
                                                    variant="light"
                                                    color={"danger"}
                                                    className={"ml-2 hover:text-red-800"}>
                                                    <AddToList size={24} />
                                                </Button>
                                            ) : (
                                                <Button
                                                    disableRipple
                                                    onClick={removeProblem(i)}
                                                    variant="light"
                                                    color={"danger"}
                                                    className={"ml-2 hover:text-red-800"}>
                                                    <Trash size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className={"bg-green-50 px-1 rounded-3xl"}>
                                    <CardHeader className={"pb-0 block mb-2"}>
                                        <h3 className={"text-green-500"}>My Solutions</h3>
                                        <p className={"-mt-3 text-gray-500"}>How do you solve a problem?</p>
                                    </CardHeader>

                                    {ideas.map((p, i) => (
                                        <div key={i} className="flex w-full px-4  pb-4">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    addIdeas();
                                                }}
                                                className={"flex-1"}>
                                                <Input
                                                    autoFocus
                                                    placeholder={"Solutions or ideas"}
                                                    variant="underlined"
                                                    fullWidth
                                                    value={p}
                                                    onChange={onChangeIdeas(i)}
                                                    required
                                                    size={"lg"}
                                                />
                                            </form>
                                            {i === ideas.length - 1 ? (
                                                <Button
                                                    disableRipple
                                                    onClick={addIdeas}
                                                    disabled={p === ""}
                                                    variant="light"
                                                    color={"success"}
                                                    className={"ml-2 hover:text-green-800"}>
                                                    <AddToList size={24} />
                                                </Button>
                                            ) : (
                                                <Button
                                                    disableRipple
                                                    onClick={removeIdeas(i)}
                                                    variant="light"
                                                    color={"success"}
                                                    className={"ml-2 hover:text-green-800"}>
                                                    <Trash size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button className={"mt-5"} onClick={onSubmit} startContent={!loading && <SendPlane size={20} />} disabled={disabled}>
                                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Save & Next"}
                            </Button>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <h2>
                                <span className={"font-normal text-gray-500"}>Title:</span> {formData.title}
                            </h2>
                            <p>{formData.description}</p>
                            <div className="grid gap-5 my-5 grid-cols-2">
                                <div className="bg-green-50 rounded-3xl px-1">
                                    <CardHeader className={"pb-0 block mb-2"}>
                                        <h3 className={"text-green-500"}>Solutions</h3>
                                    </CardHeader>
                                    {formData.solutions.length === 0 ? (
                                        <Empty />
                                    ) : (
                                        formData.solutions.map((p, i) => (
                                            <div key={i} className="flex w-full px-4  pb-4">
                                                <p>{p}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="bg-red-50 rounded-3xl px-1">
                                    <CardHeader className={"pb-0 block"}>
                                        <h3 className={"text-red-500"}>Problems</h3>
                                    </CardHeader>

                                    {formData.problems.length === 0 ? (
                                        <Empty />
                                    ) : (
                                        formData.problems.map((p, i) => (
                                            <div key={i} className="flex w-full px-4  pb-4">
                                                <p>{p}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <h4>Existing Alternatives</h4>
                            <p className={"-mt-2 mb-3"}>List how these problems are solved today</p>
                            <div className="bg-white rounded-3xl pt-2 mb-5">
                                {alts.map((p, i) => (
                                    <div key={i} className="flex w-full px-4  pb-4">
                                        <Input variant="underlined" value={p} onChange={onChangeAlts(i)} required size={"lg"} />
                                        {i === alts.length - 1 ? (
                                            <Button
                                                disableRipple
                                                onClick={addAlts}
                                                disabled={p === ""}
                                                variant="light"
                                                className={"ml-2 hover:text-green-800"}>
                                                <AddToList size={24} />
                                            </Button>
                                        ) : (
                                            <Button disableRipple onClick={removeAlts(i)} variant="light" className={"ml-2 hover:text-green-800"}>
                                                <Trash size={16} />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <h4>Early adopters ( Target audience )</h4>
                            <p className={"-mt-2 mb-3"}>List characteristics of your ideal customer</p>
                            <div className="bg-white rounded-3xl pt-2 px-4 mb-5">
                                <Input
                                    value={formData.targetAudience}
                                    onChange={onChange("targetAudience")}
                                    required
                                    size={"lg"}
                                    className={"mb-3 "}
                                    fullWidth
                                    variant="underlined"
                                    placeholder={"Who is eligible to use your product or service or who has the problems?"}
                                />
                            </div>

                            <h4>
                                Tags <small className={"text-gray-500 ml-1"}> Enter to add</small>
                            </h4>
                            <TagsInput
                                tagProps={{
                                    className: "react-tagsinput-tagd rounded-xl px-2 pb-1 pt-0 border border-solid border-gray-300 mr-2",
                                    classNameRemove: "before:content-['×'] text-gray-500 hover:text-gray-800 cursor-pointer pl-2 ",
                                }}
                                className={"rounded-3xl bg-white px-4 pt-3 pb-2"}
                                // maxTags={5} addOnBlur
                                value={formData.tags}
                                onChange={onChange("tags")}
                            />

                            <Button
                                className={"mt-5 "}
                                onClick={onSubmitFinal}
                                startContent={!loading && <SendPlane size={20} />}
                                disabled={disabled}>
                                {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : "Save"}
                            </Button>
                        </>
                    )}
                </div>

                {/*<Input required value={formData.date} onChange={onChange("date")} size={"lg"} bordered className={"mb-3"} label={"Month of the trip *"} type="month"/>*/}
                {/*<div>*/}
                {/*    <Button auto disabled={loading || disabled} onClick={onSubmit} className={"mb-10 mt-3"}  iconRight={!loading && <SendPlane size={20}/>}>*/}
                {/*        {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> :*/}
                {/*        "Publish" }*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default Upload;
