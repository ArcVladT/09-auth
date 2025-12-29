import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { handleHttpError } from "@/lib/server/httpError";
import { cookies } from "next/headers";

type Props = {
	params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
	try {
		const cookieStore = await cookies();
		const { id } = await params;
		const res = await api.get(`/notes/${id}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});
		return NextResponse.json(res.data, { status: res.status });
	} catch (error) {
		return handleHttpError(error);
	}
}

export const DELETE = async (request: Request, { params }: Props) => {
	try {
		const cookieStore = await cookies();

		const { id } = await params;
		const res = await api.delete(`/notes/${id}`, {
			headers: { Cookie: cookieStore.toString() },
		});

		return NextResponse.json(res.data, { status: res.status });
	} catch (error) {
		return handleHttpError(error);
	}
};

export const PATCH = async (request: NextRequest, { params }: Props) => {
	try {
		const cookieStore = await cookies();

		const payload = request.json();
		const { id } = await params;
		const res = await api.patch(`/notes/${id}`, payload, {
			headers: { Cookie: cookieStore.toString() },
		});

		return NextResponse.json(res.data, { status: res.status });
	} catch (error) {
		return handleHttpError(error);
	}
};
