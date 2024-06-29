"use client";
import {useState} from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Textarea, User} from "@nextui-org/react";
import {DeleteConfirmation, MyRating} from "@ui";
import {Check, DotsThreeVertical, Edit} from "@styled-icons/entypo";
import TagsInput from "react-tagsinput";
import {Close} from "@styled-icons/remix-line";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import IdeaRating from "./IdeaRating";
import {useSession} from "next-auth/react";
import ReactMarkdown from "react-markdown";
import CustomListItem from "./CustomListItem";
import {urlify} from "../../utils/utilities";

const IdeaInfoBar = ({item, isOwner}) => {
    const [editable, setEditable] = useState();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(item);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const {data: session} = useSession();
    const isRated = item.raters?.includes(session?.user?._id);

    // const refreshData = () => {
    // 	router.replace(router.asPath);
    // };
    const onDropdown = (key) => {
        switch (key) {
            case "upload":
                break;
            case "edit":
                break;
            case "delete":
                setVisible(true);
                break;
            default:
        }
    };
    const editItem = (name) => (e) => {
        if (isOwner) setEditable(name);
        if (name === null) {
            setFormData(item);
        }
    };
    const onChange = (name) => (event) => {
        setFormData({...formData, [name]: event?.target ? event.target.value : event});
    };

    function onSave() {
        return axios.patch(`/posts`, formData);
    }

    function onDelete() {
        setLoading(true);
        setVisible(false);
        axios
            .delete(`/posts?id=${item.id}`)
            .then((res) => {
                toast.success("Successfully deleted!");
                router.push("/");
            })
            .finally(() => setLoading(false));
    }

    const renderHeader = () => (
        <>
            {/*? Author */}
            <User
                className={"-ml-3"}
                // description={<Moment from={new Date()}>{item.createdAt}</Moment>}
                avatarProps={{src: item.author?.image}}
                name={item.author?.name}
            />
            {/*? title tags */}
            <div className="flex justify-center">
                <div className="flex-1">
                    {editable === "title" ? (
                        <Input
                            onChange={onChange("title")}
                            startContent={
                                <div className={"-ml-14 flex"}>
                                    <Button
                                        onClick={() => setEditable(undefined)}
                                        variant="light"
                                        className={"min-w-min px-2 mr-2 z-0"}
                                        startContent={<Close size={18} />}
                                    />
                                    <Button onClick={onSave} className={"min-w-min px-2 z-0"} startContent={<Check size={22} />} />
                                </div>
                            }
                            fullWidth
                            size={"lg"}
                            className={""}
                            variant="bordered"
                            value={item.title}
                        />
                    ) : (
                        <h3 className={"cursor-pointer hider mb-0"} onClick={editItem("title")}>
                            {item.title}
                            {isOwner && (
                                <Button
                                    onClick={editItem("title")}
                                    color={"warning"}
                                    variant="light"
                                    size={"sm"}
                                    startContent={<Edit size={16} />}
                                    className={"min-w-min ml-2 hid inline-block z-0"}
                                />
                            )}
                        </h3>
                    )}
                    <div className={"mb-3 max-w-full hider"}>
                        {editable === "tags" ? (
                            <>
                                <h4>
                                    Tags <small className={"text-gray-500 ml-1"}> Enter to add</small>
                                </h4>

                                <TagsInput
                                    tagProps={{
                                        className:
                                            "react-tagsinput-tagd break-all mb-2 inline-block rounded-xl flex-wrap px-2 pb-1 pt-0 border border-solid border-gray-300 mr-2",
                                        classNameRemove: "before:content-['×'] text-gray-500 hover:text-gray-800 cursor-pointer pl-2 ",
                                    }}
                                    className={"rounded-3xl bg-white px-3 pt-2 pb-1 "}
                                    value={formData.tags}
                                    onChange={onChange("tags")}
                                />
                                <div className="flex mt-2">
                                    <Button size={"sm"} onClick={() => setEditable(undefined)} variant="light" z-0>
                                        Cancel
                                    </Button>
                                    <Button size={"sm"} onClick={onSave} startContent={<Check size={16} />} className={" z-0"}>
                                        Save
                                    </Button>
                                </div>
                            </>
                        ) : item.tags?.length > 0 ? (
                            <>
                                {item.tags.map((t) => (
                                    <a key={t} className={"hover:underline hover:text-gray-500 transition-all font-bold  italic text-gray-300 mr-3"}>
                                        {t}
                                    </a>
                                ))}
                                {isOwner && (
                                    <Button
                                        onClick={editItem("tags")}
                                        color={"warning"}
                                        variant="light"
                                        size={"sm"}
                                        startContent={<Edit size={16} />}
                                        className={"min-w-min hid inline-block z-0"}
                                    />
                                )}
                            </>
                        ) : (
                            isOwner && (
                                <Button
                                    onClick={editItem("tags")}
                                    size={"sm"}
                                    color={"warning"}
                                    className={" -ml-3 z-0"}
                                    variant="light"
                                    startContent={<Edit size={16} />}>
                                    Add tags
                                </Button>
                            )
                        )}
                    </div>
                </div>

                {<MyRating count={item.ratingsQuantity} size={"md"} value={item.ratingsAverage} readonly />}
                {/*? Delete button */}
                {isOwner && (
                    <>
                        <DeleteConfirmation
                            renderItem={() => (
                                <div>
                                    <h5>{item.title}</h5>
                                </div>
                            )}
                            loading={loading}
                            visible={visible}
                            closeHandler={() => setVisible(false)}
                            onDelete={onDelete}
                        />

                        <Dropdown>
                            <DropdownTrigger>
                                <Button disableRipple variant="light" className={"min-w-min ml-2"} startContent={<DotsThreeVertical size={22} />} />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions" onAction={onDropdown}>
                                {/*<Dropdown.Item key="edit">Edit</Dropdown.Item>*/}
                                {/*<Dropdown.Item key="copy">Copy link</Dropdown.Item>*/}
                                {/*<Dropdown.Item key="edit">Edit file</Dropdown.Item>*/}
                                <DropdownItem key={"delete"} color="danger">
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                )}
            </div>

            {/*? description */}
            {editable === "description" ? (
                <>
                    <Textarea onChange={onChange("description")} fullWidth variant="bordered" minRows={8} value={item.description} />
                    <div className="flex mt-2">
                        <Button onClick={() => setEditable(undefined)} variant="light">
                            Cancel
                        </Button>
                        <Button onClick={onSave} startContent={<Check size={22} />}>
                            Save
                        </Button>
                    </div>
                </>
            ) : item.description ? (
                <div onClick={editItem("description")} className={" max-h-96 hider overflow-y-auto mb-5 text-gray-500 font-light cursor-pointer"}>
                    <ReactMarkdown
                    // linkTarget={"_blank"}
                    >
                        {urlify(item.description)}
                    </ReactMarkdown>
                </div>
            ) : (
                isOwner && (
                    <Button onClick={editItem("description")} color={"warning"} variant="light" startContent={<Edit size={16} />}>
                        Add description
                    </Button>
                )
            )}
        </>
    );

    return (
        <div className="hsl px-6 pb-6 flex-1 overflow-y-auto pt-24 md:pt-4">
            {renderHeader()}
            {!isRated && <IdeaRating item={item} isOwner={isOwner} />}

            <CustomListItem
                helper={<p className={"text-gray-400"}>List your problems</p>}
                title={<span className={"text-red-500"}>Problems</span>}
                items={item.problems}
                isOwner={isOwner}
                onSave={onSave}
                onChange={onChange}
                formData={formData}
                itemKey={"problems"}
            />

            <CustomListItem
                helper={<p className={"text-gray-400"}>Outline a possible solution for each problem</p>}
                title={<span className={"text-green-500"}>Solutions</span>}
                isOwner={isOwner}
                items={item.solutions}
                onSave={onSave}
                onChange={onChange}
                formData={formData}
                itemKey={"solutions"}
            />

            <CustomListItem
                helper={<p className={"text-gray-400"}>List how these problems are solved today</p>}
                title={<span>Alternatives</span>}
                isOwner={isOwner}
                items={item.alternatives}
                onSave={onSave}
                onChange={onChange}
                formData={formData}
                itemKey={"alternatives"}
            />

            <CustomListItem
                helper={<p className={"text-gray-400"}>List the characteristics of your ideal customers</p>}
                title={<span>Early adopters</span>}
                isOwner={isOwner}
                items={item.targetAudience}
                onSave={onSave}
                onChange={onChange}
                formData={formData}
                itemKey={"targetAudience"}
            />
        </div>
    );
};

export default IdeaInfoBar;
