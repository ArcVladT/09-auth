import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { logErrorResponse } from "./logErrorResponse";

export const handleHttpError = (error: unknown): NextResponse => {
	if (isAxiosError(error)) {
		logErrorResponse(error.response?.data);

		return NextResponse.json(
			{
				error: error.message ?? "Request failed",
				response: error.response?.data ?? null,
			},
			{ status: error.response?.status ?? 500 }
		);
	}

	logErrorResponse({ message: (error as Error).message });
	return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};
