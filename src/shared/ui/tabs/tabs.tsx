import { useState } from "react";
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
		<div className={className} {...props}>
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
			className={className}
			data-selected={isSelected} // CSS에서 [data-selected="true"]와 같이 선택 상태 노출 가능 -> 외부에서 스타일링 하기에 용이
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
