import { useCallback, useRef, useState } from "react";
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
	const scrollPositions = useRef<Record<string, number>>({}); // <탭, 스크롤 y좌표>

	const changeTab = useCallback(
		(newTab: string) => {
			// 같은 탭 클릭 시 최상단으로 이동
			if (selectedTab === newTab) {
				window.scrollTo({ top: 0, behavior: "smooth" });
				return;
			}

			// 현재 탭의 스크롤 위치 저장
			scrollPositions.current[selectedTab] = window.scrollY;

			// 새 탭으로 전환
			setSelectedTab(newTab);

			// 새 탭의 저장된 위치로 이동 (없으면 0)
			window.scrollTo({
				top: scrollPositions.current[newTab] ?? 0,
				behavior: "instant",
			});
		},
		[selectedTab],
	);

	return (
		<TabsContext value={{ selectedTab, changeTab }}>
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
			className={cn(
				"sticky top-0 z-10 flex w-full border-b border-gray-300 bg-white",
				className,
			)}
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
	const { selectedTab, changeTab } = useTabsContext();
	const isSelected = selectedTab === value;

	return (
		<button
			type="button"
			role="tab"
			className={cn(
				"relative flex-1 py-[1.2rem] text-center transition-colors duration-200",
				isSelected ? "text-gray-900 head03-sb-16" : "text-gray-500 head04-m-16",
				// 인디케이터 (항상 존재, 선택 시만 보임)
				"after:absolute after:bottom-[-1.5px] after:left-1/2 after:h-[2px] after:w-[60%] after:-translate-x-1/2 after:bg-gray-900 after:transition-opacity after:duration-200",
				isSelected ? "after:opacity-100" : "after:opacity-0",
				className,
			)}
			data-selected={isSelected}
			onClick={() => changeTab(value)}
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
