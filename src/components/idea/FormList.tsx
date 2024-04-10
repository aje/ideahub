"use client";
import {Button, Input} from "@nextui-org/react";
import {AddToList} from "@styled-icons/entypo"
import {Trash} from "@styled-icons/entypo"
import {useEffect} from "react";

const FormList = ({value, onChange, ...rest}) => {
	const add = () => {
		const t = [...value];
		t.push("");
		onChange(t);
	};

	useEffect(() => {
		if (!value || value.length === 0) add();
	}, []);

	const remove = i => e => {
		const t = [...value];
		t.splice(i, 1);
		onChange(t);
	};

	const onChangeValue = i => e => {
		const t = [...value];
		t[i] = e.target.value;
		onChange(t);
	};

	return value?.map((p, i) => (
		<div key={i} className="flex w-full  pb-4">
			<form
				onSubmit={e => {
					e.preventDefault();
					add();
				}}
				className={" w-full"}>
				<Input
					autoFocus
					variant={"underlined"}
					fullWidth

					{...rest}
					disabled={typeof p !== "string"}
					value={typeof p === "string" ? p : p.description}
					onChange={onChangeValue(i)}
					required
				/>
			</form>
			{i === value.length - 1 ? (
				<>
					<Button  disableRipple onClick={remove(i)} variant={"light"} color={"danger"} className={"ml-2 "}  >
						<Trash size={16} />
					</Button>
					<Button
						onClick={add}
						disabled={p === ""}
						variant={"light"}
						className={"ml-2 hover:text-gray-500"}
						>
						<AddToList size={18} />
					</Button>
				</>
			) : (
				<Button   disableRipple onClick={remove(i)}  variant="light" color={"danger"} className={"ml-2 "}  >
					<Trash size={16} />
				</Button>
			)}
		</div>
	));
};

export default FormList;
