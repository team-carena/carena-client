import { useState } from "react";
import { cn } from "@/shared/libs/cn";
import { TabsContext, useTabsContext } from "./use-tabs-context";

// ==== TabsRoot ====
// Root 컴포넌트 (Compound Component에서 최상위 부모 컴포넌트)
interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	defaultTab: string; // 탭 기본값
}

const TabsRoot = ({ children, defaultTab }: TabsRootProps) => {
	const [selectedTab, setSelectedTab] = useState(defaultTab);

	return (
		<TabsContext value={{ selectedTab, setSelectedTab }}>
			<div>{children}</div>
		</TabsContext>
	);
};

// ==== TabsList ====
// Trigger(탭 버튼)를 감싸는 컴포넌트
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const TabsList = ({ children, className, ...props }: TabsListProps) => {
	return (
		<div
			className={cn("flex w-full border-b border-gray-300 bg-white", className)}
			{...props}
		>
			{children}
		</div>
	);
};

// ==== TabsTrigger ====
// 탭 버튼
interface TabsTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	value: string;
}

const TabsTrigger = ({
	children,
	value,
	className,
	...props
}: TabsTriggerProps) => {
	const { selectedTab, setSelectedTab } = useTabsContext();
	const isSelected = selectedTab === value;

	return (
		<button
			type="button"
			role="tab"
			className={cn(
				"flex-1 py-[1.2rem] text-center",
				isSelected ? "text-gray-900 head03-sb-16" : "text-gray-500 head04-m-16",
				className,
			)}
			data-selected={isSelected}
			onClick={() => setSelectedTab(value)}
			{...props}
		>
			{children}
		</button>
	);
};

// ==== TabsContent ====
interface TabsContentProps {
	children: React.ReactNode;
	value: string;
}

const TabsContent = ({ children, value }: TabsContentProps) => {
	const { selectedTab } = useTabsContext();

	if (selectedTab !== value) {
		return null;
	}

	return <div>{children}</div>;
};

// ==== Export ====
export const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
});
