export interface BaseResponse<T = unknown> {
	status: number;
	code: string;
	message: string;
	data: T;
}

export type QueryParams =
	| Record<string, string | number | boolean | undefined>
	| object;

export type RequestBody = Record<string, unknown> | object | FormData;
