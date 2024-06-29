"use client";
import {useState} from "react";
import {Button} from "@nextui-org/react";
import {AddToList, Check, ChevronDown, ChevronUp, Edit} from "@styled-icons/entypo";
import {Close, DeleteBin} from "@styled-icons/remix-line";
import {DeleteConfirmation, Empty, Loading} from "@ui";
import CommentItem from "./CommentItem";
import {toast} from "react-hot-toast";
import {FormList} from "@com";
import {useRouter} from "next/navigation";

type Props = {
    title: any;
    custom: any;
    helper: any;
    itemKey: any;
    onSave: any;
    isOwner: any;
    deletable: any;
    item: any;
    items: any;
    onChange: any;
    formData: any;
};

const CustomListItem = ({title, custom, helper, itemKey, onSave, isOwner, deletable, item, items, onChange, formData}: Props) => {
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [toggle, setToggle] = useState(false);
    const router = useRouter();

    function onDelete() {
        setLoading(true);
        setVisible(false);
        axios
            .delete(`/post/${item.idea}/customLists?customId=${item._id}`)
            .then((res) => {
                toast.success("Successfully deleted!");
                router.replace(router.asPath);
            })
            .finally(() => setLoading(false));
    }

    const onSubmit = async () => {
        setLoading(true);
        onSave()
            .then(() => {
                toast.success("Successfully updated!");
                setEditable(false);
                router.replace(router.asPath);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={"mt-6  hider"}>
            <DeleteConfirmation
                renderItem={() => (
                    <div>
                        <h5>{title}</h5>
                    </div>
                )}
                loading={loading}
                visible={visible}
                closeHandler={() => setVisible(false)}
                onDelete={onDelete}
            />

            <div className={"flex items-center relative"}>
                <h4 className={"mb-0"}>
                    {title} <span className={"text-gray-400 font-normal text-sm"}> ( {items.length} )</span>
                </h4>

                {items.length > 1 && !editable && (
                    <Button
                        startContent={!toggle ? <ChevronUp size={20} className={"hid"} /> : <ChevronDown size={20} />}
                        onClick={() => setToggle(!toggle)}
                        size={"sm"}
                        className={"min-w-min  ml-2"}
                        variant="light"
                    />
                )}

                {isOwner &&
                    (!editable ? (
                        <>
                            <Button
                                onClick={() => setEditable(true)}
                                color={"warning"}
                                variant="light"
                                size="sm"
                                startContent={<Edit size={14} />}
                                className={"min-w-min hid ml-2 z-0"}
                            />
                            {deletable && (
                                <Button
                                    onClick={() => setVisible(true)}
                                    color={"danger"}
                                    variant="light"
                                    size="sm"
                                    startContent={<DeleteBin size={14} />}
                                    className={"min-w-min hid ml-2 z-0"}
                                />
                            )}
                        </>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => setEditable(false)}
                            variant="light"
                            color={"danger"}
                            startContent={<Close size={14} />}
                            className={"min-w-min ml-2 z-0"}
                        />
                    ))}
            </div>

            {items.length === 0 && isOwner && helper}
            {editable ? (
                <>
                    {custom ? (
                        <FormList value={items} onChange={onChange} placeholder={`Add`} />
                    ) : (
                        <FormList value={formData[itemKey]} onChange={onChange(itemKey)} placeholder={`Add a ${itemKey}`} />
                    )}
                    <div className="flex items-center">
                        <Button disabled={loading} size={"sm"} onClick={() => setEditable(false)} variant="light" className={" z-0 mb-2"}>
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            size={"sm"}
                            onClick={onSubmit}
                            className={" z-0 ml-2 mb-2"}
                            startContent={!loading && <Check size={16} />}>
                            {loading ? <Loading type="points-opacity" color="currentColor" /> : "Save"}
                        </Button>
                    </div>
                </>
            ) : items?.length === 0 ? (
                isOwner ? (
                    <Button
                        disableRipple
                        variant="light"
                        size={"sm"}
                        startContent={<AddToList size={16} />}
                        onClick={() => setEditable(true)}
                        className={"mt-2 z-0 -ml-2 opacity-50"}>
                        Add item
                    </Button>
                ) : (
                    <Empty inline />
                )
            ) : (
                !toggle && items.map((p, i) => (typeof p === "string" ? <p key={i}>{p}</p> : <CommentItem key={i} item={p} />))
            )}
        </div>
    );
};

export default CustomListItem;
