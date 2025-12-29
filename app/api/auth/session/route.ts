import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { handleHttpError } from "@/lib/server/httpError";

export const GET = async () => {
	try {
		const cookieStore = await cookies();

		const refreshToken = cookieStore.get("refreshToken")?.value;

		if (refreshToken) {
			const apiRes = await api.get("/auth/session", {
				headers: { Cookie: cookieStore.toString() },
			});

			const setCookie = apiRes.headers["set-cookie"];

			if (setCookie) {
				const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

				for (const cookieStr of cookieArray) {
					const parsed = parse(cookieStr);

					const options = {
						expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
						path: parsed.Path,
						maxAge: Number(parsed["Max-Age"]),
					};

					if (parsed.accessToken) {
						cookieStore.set("accessToken", parsed.accessToken, options);
					}

					if (parsed.refreshToken) {
						cookieStore.set("refreshToken", parsed.refreshToken, options);
					}
				}
				return NextResponse.json({ success: true });
			}
		}
		return NextResponse.json({ success: false });
	} catch (error) {
		return handleHttpError(error);
	}
};
