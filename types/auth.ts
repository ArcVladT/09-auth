export type AuthFormValues = {
	email: string;
	password: string;
};

export type User = {
	username: string;
	email: string;
	password: string;
	avatar: string;
};

export type checkSessionRequest = {
	success: boolean;
};
