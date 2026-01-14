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
				`
				group
				flex w-[33.5rem] h-[4.7rem]
				px-[2rem] py-[1.2rem]
				items-center
				rounded-[12px]
				head03-sb-16 border border-gray-500
				bg-white cursor-pointer

				data-[state=open]:border-primary-500
				data-[disabled]:head03-sb-16
        	`,
				focusReset,
				className,
			)}
			{...props}
		>
			{children}

			<SelectPrimitive.Icon
				className="
          transition-transform duration-450 ease-in-out
          group-data-[state=open]:rotate-180
		  group-data-[disabled]:hidden
          ml-[1.2rem]
        "
			>
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
					`
          flex flex-col
          w-[var(--radix-select-trigger-width)]
		  max-h-[18.4rem]
          p-[0.8rem]
          rounded-[8px]
          bg-white
          z-50

          data-[state=open]:animate-[select-slide-down_200ms_ease-out]
          `,
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
				`
				flex w-full
				px-[0.8rem] py-[1rem] gap-[1rem]
				items-center rounded-[8px]
				bg-white body03-r-16
				cursor-pointer transition-colors
				hover:bg-gray-100
				active:bg-gray-100
        		`,
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
