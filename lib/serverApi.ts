import { NoteTag } from "@/types/note";
import { nextServer } from "./api";
import { cookies } from "next/headers";
import { checkSessionRequest, User } from "@/types/auth";

export async function serverFetchNotes(
	page: number = 1,
	query: string = "",
	tag?: NoteTag
) {
	const cookieStore = await cookies();
	const res = await nextServer.get("/notes", {
		params: {
			page: page,
			search: query,
			perPage: 12,
			tag: tag,
		},
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	return res.data;
}

export async function getServerMe() {
	const cookieStore = await cookies();
	const { data } = await nextServer.get<User>(`/users/me`, {
		headers: { Cookie: cookieStore.toString() },
	});

	return data;
}

export async function checkServerSession() {
	const cookieStore = await cookies();

	const res = await nextServer.get(`/auth/session`, {
		headers: { Cookie: cookieStore.toString() },
	});

	return res.data;
}
