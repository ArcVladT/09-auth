import axios, { AxiosError } from "axios";

const BASE_URL = "https://notehub-api.goit.study";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
