import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { handleHttpError } from "@/lib/server/httpError";

export const POST = async () => {
	const cookieStore = await cookies();

	try {
		const accessToken = cookieStore.get("accessToken")?.value;
		const refreshToken = cookieStore.get("refreshToken")?.value;

		await api.post("auth/logout", null, {
			headers: {
				Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
			},
		});

		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");

		const response = NextResponse.json({ message: "Logged out successfully!" });

		response.cookies.delete("accessToken");
		response.cookies.delete("refreshToken");

		return response;
	} catch (error) {
		return handleHttpError(error);
	}
};
