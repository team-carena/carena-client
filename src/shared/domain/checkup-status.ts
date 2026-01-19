export type BadgeVariant = "normal" | "borderline" | "suspicious";

// 도메인 라벨 -> UI 배지 variant 매핑.
const variantByLabel: Record<string, BadgeVariant> = {
	정상: "normal",
	경계: "borderline",
	의심: "suspicious",
};

export const getBadgeVariantByLabel = (label: string): BadgeVariant =>
	variantByLabel[label as keyof typeof variantByLabel] ?? "normal";
