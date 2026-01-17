/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SuccessResponseVoid {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: any;
}

export interface SignUpRequest {
	/** @minLength 1 */
	name: string;
	/** @format date */
	birthdate: string;
	gender: "MALE" | "FEMALE";
}

export interface CreateHealthTipRequest {
	/** @minLength 1 */
	title: string;
	/** @minLength 1 */
	subTitle: string;
	/** @minLength 1 */
	content: string;
	/** @minLength 1 */
	reference: string;
	hashtags: string[];
}

export interface MyPageResponse {
	name?: string;
	/** @format date */
	birthdate?: string;
}

export interface SuccessResponseMyPageResponse {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: MyPageResponse;
}

export interface MemberInfoResponse {
	name?: string;
	/** @format int32 */
	age?: number;
	gender?: "MALE" | "FEMALE";
	/** @format int64 */
	score?: number;
}

export interface SuccessResponseMemberInfoResponse {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: MemberInfoResponse;
}

export interface HealthTipListElement {
	/** @format int64 */
	id?: number;
	title?: string;
}

export interface ReadHealthTipListView {
	result?: HealthTipListElement[];
	hasNext?: boolean;
}

export interface SuccessResponseReadHealthTipListView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: ReadHealthTipListView;
}

export interface ReadHealthTipDetailView {
	/** @format int64 */
	id?: number;
	title?: string;
	subTitle?: string;
	content?: string;
	reference?: string;
	hashtags?: string[];
}

export interface SuccessResponseReadHealthTipDetailView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: ReadHealthTipDetailView;
}

export type AfterLoginData = SuccessResponseVoid;

export type RefreshTokenData = SuccessResponseVoid;

export type SignupData = SuccessResponseVoid;

export type LogoutData = SuccessResponseVoid;

export type ReadHealthTipListData = SuccessResponseReadHealthTipListView;

export type CreateHealthTipData = SuccessResponseVoid;

export type MyPageData = SuccessResponseMyPageResponse;

export type MemberInfoData = SuccessResponseMemberInfoResponse;

export type ReadHealthTipDetailData = SuccessResponseReadHealthTipDetailView;

export type DeleteHealthTipData = SuccessResponseVoid;
