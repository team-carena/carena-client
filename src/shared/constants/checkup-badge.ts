export const CHECKUP_BADGE_CODE = [
	"normal",
	"borderline",
	"suspicious",
] as const;

export type CheckupBadgeCode = (typeof CHECKUP_BADGE_CODE)[number];

export const CHECKUP_BADGE_LABEL: Record<CheckupBadgeCode, string> = {
	normal: "정상",
	borderline: "경계",
	suspicious: "의심",
};
