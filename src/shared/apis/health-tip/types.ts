export type {
	HealthTipListElement,
	ReadHealthTipListView,
} from "@/shared/apis/generated/data-contracts";

export interface GetHealthTipListParams {
	page: number;
	hashtagName?: string;
}
