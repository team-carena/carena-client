export interface HealthTipListItem {
	id: number;
	title: string;
}

export interface HealthTipListData {
	result: HealthTipListItem[];
	hasNext: boolean;
}

export interface GetHealthTipListParams {
	page: number;
	hashtagName?: string;
}
