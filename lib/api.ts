import { AuthFormValues, checkSessionRequest, User } from "@/types/auth";
import { type Note, type FormValues, NoteTag } from "@/types/note";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const nextServer = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

// -- NOTES --

export async function fetchNotes(
	page: number = 1,
	query: string = "",
	tag?: NoteTag
) {
	const res = await nextServer.get("/notes", {
		params: {
			page: page,
			search: query,
			perPage: 12,
			tag: tag,
		},
	});

	return res.data;
}

export async function createNote(params: FormValues): Promise<Note> {
	const res = await nextServer.post("/notes", params);

	return res.data;
}

export async function deleteNote(id: string) {
	const res = await nextServer.delete(`/notes/${id}`);

	return res.data;
}

export async function fetchNoteById(id: string) {
	const res = await nextServer.get<Note>(`/notes/${id}`);

	return res.data;
}

// -- AUTH --

export async function login(formValues: AuthFormValues) {
	const res = await nextServer.post(`/auth/login`, formValues);

	return res.data;
}

export async function register(formValues: AuthFormValues) {
	const res = await nextServer.post(`/auth/register`, formValues);

	return res.data;
}

export async function logout(): Promise<void> {
	await nextServer.post(`/auth/logout`);
}

export async function checkSession() {
	const res = await nextServer.get<checkSessionRequest>(`/auth/session`);

	return res.data;
}

// -- USERS --

export async function getMe() {
	const { data } = await nextServer.get<User>(`/users/me`);

	return data;
}

type patchMeRequest = {
	username: string;
};

export async function patchMe(username: patchMeRequest) {
	const res = await nextServer.patch(`/users/me`, username);

	return res.data;
}
