import * as SelectPrimitive from "@radix-ui/react-select";
import type * as React from "react";
import { ChevronSDown } from "../../assets/svg";
import { cn } from "../../libs/cn";

const focusReset = `
  outline-none
  focus:outline-none
  focus-visible:outline-none
  focus:ring-0
  focus-visible:ring-0
  focus-visible:shadow-none
`;

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cn(
				`group head03-sb-16 data-[disabled]:head03-sb-16 flex h-[4.7rem] w-full min-w-[33.5rem] cursor-pointer items-center rounded-[12px] border border-gray-500 bg-white px-[2rem] py-[1.2rem] data-[state=open]:border-primary-500`,
				focusReset,
				className,
			)}
			{...props}
		>
			{children}

			<SelectPrimitive.Icon className="ml-[1.2rem] transition-transform duration-500 ease-in-out group-data-[disabled]:hidden group-data-[state=open]:rotate-180">
				<ChevronSDown />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				position="popper"
				side="bottom"
				sideOffset={4}
				className={cn(
					`z-50 flex max-h-[18.4rem] w-[var(--radix-select-trigger-width)] flex-col rounded-[8px] bg-white p-[0.8rem] data-[state=open]:animate-[select-slide-down_200ms_ease-out]`,
					className,
				)}
				{...props}
			>
				<SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				`body03-r-16 flex w-full cursor-pointer items-center gap-[1rem] rounded-[8px] bg-white px-[0.8rem] py-[1rem] transition-colors hover:bg-gray-100 active:bg-gray-100`,
				focusReset,
				className,
			)}
			{...props}
		>
			{children}
		</SelectPrimitive.Item>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
};
