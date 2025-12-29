import { NextRequest, NextResponse } from "next/server";

import { api } from "../api";
import { type FormValues } from "@/types/note";
import { cookies } from "next/headers";
import { handleHttpError } from "@/lib/server/httpError";

export const GET = async (request: NextRequest) => {
	try {
		const cookieStore = await cookies();
		const search = request.nextUrl.searchParams.get("search") ?? "";
		const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
		const rawTag = request.nextUrl.searchParams.get("tag") ?? "";
		const tag = rawTag === "All" ? "" : rawTag;

		const res = await api("/notes", {
			params: {
				...(search !== "" && { search }),
				page,
				perPage: 12,
				...(tag && { tag }),
			},
			headers: {
				Cookie: cookieStore.toString(),
			},
		});

		return NextResponse.json(res.data, { status: res.status });
	} catch (error) {
		return handleHttpError(error);
	}
};

export const POST = async (request: NextRequest) => {
	try {
		const cookieStore = await cookies();
		const params: FormValues = await request.json();
		const res = await api.post("/notes", params, {
			headers: { Cookie: cookieStore.toString() },
		});

		return NextResponse.json(res.data);
	} catch (error) {
		return handleHttpError(error);
	}
};
