export type BadgeVariant = "normal" | "borderline" | "suspicious";

// 도메인 라벨 -> UI 배지 variant 매핑.
const variantByLabel = {
	정상: "normal",
	경계: "borderline",
	의심: "suspicious",
} as const;

export type CheckupStatusLabel = keyof typeof variantByLabel;

export const getBadgeVariantByLabel = (
	label: CheckupStatusLabel,
): BadgeVariant => variantByLabel[label] ?? "normal";
