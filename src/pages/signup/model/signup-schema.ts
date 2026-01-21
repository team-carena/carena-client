import { z } from "zod";
import {
	birthDateSchema,
	genderSchema,
	nameSchema,
} from "@/shared/libs/validation";

export const signupSchema = z.object({
	name: nameSchema,
	birthDate: birthDateSchema,
	gender: genderSchema,
});

// 폼 입력 타입 (transform 전 - string)
export type SignupFormInput = z.input<typeof signupSchema>;
// 폼 출력 타입 (transform 후)
export type SignupFormData = z.infer<typeof signupSchema>;
