import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { handleHttpError } from "@/lib/server/httpError";

export const GET = async () => {
	const cookieStore = await cookies();

	try {
		const res = await api.get("/users/me", {
			headers: { Cookie: cookieStore.toString() },
		});

		return NextResponse.json(res.data, { status: res.status });
	} catch (error) {
		return handleHttpError(error);
	}
};

export const PATCH = async (request: NextRequest) => {
	try {
		const cookieStore = await cookies();
		const body = await request.json();

		const res = await api.patch("/users/me", body, {
			headers: { Cookie: cookieStore.toString() },
		});

		console.log("res", res);

		return NextResponse.json(res.data);
	} catch (error) {
		return handleHttpError(error);
	}
};
