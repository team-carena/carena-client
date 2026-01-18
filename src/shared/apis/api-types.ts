export interface BaseResponse<T = unknown> {
	status: number;
	message: string;
	data: T;
}

export type QueryParams = Record<string, string | number | boolean>;

export type RequestBody = object;
