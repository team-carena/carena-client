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

export interface CreateHealthReportRequest {
	/** @format date */
	healthCheckDate: string;
	/** @minLength 1 */
	institutionName: string;
	/** @format double */
	height?: number;
	/** @format double */
	weight?: number;
	/** @format double */
	waistCircumference?: number;
	/** @format double */
	bmi?: number;
	/** @format int32 */
	systolicBp?: number;
	/** @format int32 */
	diastolicBp?: number;
	/** @format double */
	hemoglobin?: number;
	/** @format double */
	fastingGlucose?: number;
	/** @format double */
	totalCholesterol?: number;
	/** @format double */
	hdl?: number;
	/** @format double */
	ldl?: number;
	/** @format double */
	triglycerides?: number;
	/** @format double */
	serumCreatinine?: number;
	/** @format double */
	egfr?: number;
	/** @format double */
	ast?: number;
	/** @format double */
	alt?: number;
	/** @format double */
	gammaGtp?: number;
}

export interface ExtractedTextView {
	/** @format double */
	height?: number;
	/** @format double */
	weight?: number;
	/** @format double */
	waistCircumference?: number;
	/** @format double */
	bmi?: number;
	/** @format int32 */
	systolicBp?: number;
	/** @format int32 */
	diastolicBp?: number;
	/** @format double */
	hemoglobin?: number;
	/** @format double */
	fastingGlucose?: number;
	/** @format double */
	totalCholesterol?: number;
	/** @format double */
	hdl?: number;
	/** @format double */
	ldl?: number;
	/** @format double */
	triglyceride?: number;
	/** @format double */
	serumCreatinine?: number;
	/** @format double */
	egfr?: number;
	/** @format double */
	ast?: number;
	/** @format double */
	alt?: number;
	/** @format double */
	gammaGtp?: number;
}

export interface SuccessResponseExtractedTextView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: ExtractedTextView;
}

export interface AdminDietChunkRequest {
	/** @minLength 1 */
	section: string;
	/** @minLength 1 */
	content: string;
	/** @format int32 */
	chunkOrder?: number;
}

export interface CreateAdminDietRequest {
	/** @minLength 1 */
	title: string;
	/** @minLength 1 */
	content: string;
	/** @minLength 1 */
	reference: string;
	/** @minLength 1 */
	referenceUrl: string;
	chunks?: AdminDietChunkRequest[];
	recommendedFoods?: Record<string, string[]>;
	cautionaryFoods?: string[];
}

export interface RecommendedMealView {
	recommendedMealId?: string;
	meal?: string;
	description?: string;
	/** @format int64 */
	baseDietDocument?: number;
	baseDietTitle?: string;
}

export interface SuccessResponseRecommendedMealView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: RecommendedMealView;
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
	id?: string;
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

export interface ReadHealthTipTickerView {
	result?: HealthTipListElement[];
}

export interface SuccessResponseReadHealthTipTickerView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: ReadHealthTipTickerView;
}

export type RiskLevelLabel = "NONE" | "NORMAL" | "BORDERLINE" | "SUSPICIOUS";

export interface DisplayElement {
	name?: string;
	value?: number;
	riskLevelLabel?: "NONE" | "NORMAL" | "BORDERLINE" | "SUSPICIOUS";
	riskLevelValue?: string;
}

export interface EntireHealthReportView {
	id?: string;
	/** @format date */
	healthCheckDate?: string;
	basic?: DisplayElement[];
	bloodPressure?: DisplayElement[];
	diabetes?: DisplayElement[];
	liver?: DisplayElement[];
	kidney?: DisplayElement[];
	anemia?: DisplayElement[];
}

export interface SuccessResponseEntireHealthReportView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: EntireHealthReportView;
}

export interface HealthReportHistoryElement {
	value?: number;
	/** @format date */
	healthCheckDate?: string;
}

export interface HealthReportHistoryView {
	history?: HealthReportHistoryElement[];
}

export interface SuccessResponseHealthReportHistoryView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: HealthReportHistoryView;
}

export interface HealthReportDateListView {
	reportDates?: ReportDateInfo[];
	hasNext?: boolean;
}

export interface ReportDateInfo {
	healthReportId?: string;
	/** @format date */
	healthCheckDate?: string;
	institutionName?: string;
}

export interface SuccessResponseHealthReportDateListView {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: HealthReportDateListView;
}

export interface DietItem {
	id?: string;
	title?: string;
}

export interface DietListResponse {
	diets?: DietItem[];
	hasNext?: boolean;
}

export interface SuccessResponseDietListResponse {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: DietListResponse;
}

export interface DietDetailResponse {
	id?: string;
	title?: string;
	content?: string;
	recommends?: Record<string, string[]>;
	cautionary?: string[];
	reference?: string;
}

export interface SuccessResponseDietDetailResponse {
	/** @format int32 */
	status?: number;
	code?: string;
	message?: string;
	data?: DietDetailResponse;
}

export type GetLatestRecommendedMealsData = SuccessResponseRecommendedMealView;

export type CreateRecommendedMealData = SuccessResponseVoid;

export type AfterLoginData = SuccessResponseVoid;

export type RefreshTokenData = SuccessResponseVoid;

export type SignupData = SuccessResponseVoid;

export type LogoutData = SuccessResponseVoid;

export type ReadHealthTipListData = SuccessResponseReadHealthTipListView;

export type CreateHealthTipData = SuccessResponseVoid;

export type CreateHealthReportData = SuccessResponseVoid;

export interface ExtractTextPayload {
	/** @format binary */
	file: File;
}

export type ExtractTextData = SuccessResponseExtractedTextView;

export type GetDietListData = SuccessResponseDietListResponse;

export type CreateDietData = SuccessResponseVoid;

export type MyPageData = SuccessResponseMyPageResponse;

export type MemberInfoData = SuccessResponseMemberInfoResponse;

export type ReadHealthTipDetailData = SuccessResponseReadHealthTipDetailView;

export type DeleteHealthTipData = SuccessResponseVoid;

export type ReadHealthTipTickerData = SuccessResponseReadHealthTipTickerView;

export type GetEntireHealthReportData = SuccessResponseEntireHealthReportView;

export type GetWeightHistoryData = SuccessResponseHealthReportHistoryView;

export type GetWaistCircumferenceHistoryData =
	SuccessResponseHealthReportHistoryView;

export type GetHeightHistoryData = SuccessResponseHealthReportHistoryView;

export type GetBmiHistoryData = SuccessResponseHealthReportHistoryView;

export type GetGammaGtpHistoryData = SuccessResponseHealthReportHistoryView;

export type GetAstHistoryData = SuccessResponseHealthReportHistoryView;

export type GetAltHistoryData = SuccessResponseHealthReportHistoryView;

export type GetSerumCreatinineHistoryData =
	SuccessResponseHealthReportHistoryView;

export type GetEgfrHistoryData = SuccessResponseHealthReportHistoryView;

export type GetFastingGlucoseHistoryData =
	SuccessResponseHealthReportHistoryView;

export type GetReportDateListData = SuccessResponseHealthReportDateListView;

export type GetSystolicBpHistoryData = SuccessResponseHealthReportHistoryView;

export type GetDiastolicBpHistoryData = SuccessResponseHealthReportHistoryView;

export type GetHemoglobinHistoryData = SuccessResponseHealthReportHistoryView;

export type DietDetailData = SuccessResponseDietDetailResponse;
