"use client";

import Image from "next/image";
import css from "@/components/EditProfilePage/EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMe, patchMe } from "@/lib/api";
import { User } from "@/types/auth";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfilePage = () => {
	const router = useRouter();

	const [userData, setUserData] = useState<User>();
	const [error, setError] = useState("");

	const setUser = useAuthStore((state) => state.setUser);

	useEffect(() => {
		getMe()
			.then((user) => setUserData(user))
			.catch((error) => setError(error));
	}, [setError, setUserData]);

	const handleCancel = () => {
		router.back();
	};

	const onSubmit = async () => {
		setError("");
		try {
			if (!userData) return;
			setUser(userData);
			await patchMe({ username: userData.username });
			router.push("/profile");
		} catch {
			setError("Unable to save changes");
		}
	};

	return (
		<>
			<main className={css.mainContent}>
				<div className={css.profileCard}>
					<h1 className={css.formTitle}>Edit Profile</h1>

					{userData?.avatar && (
						<Image
							src={userData?.avatar}
							alt="User Avatar"
							width={120}
							height={120}
							className={css.avatar}
						/>
					)}

					<form className={css.profileInfo} action={onSubmit}>
						<div className={css.usernameWrapper}>
							<label htmlFor="username">Username:</label>
							<input
								id="username"
								type="text"
								className={css.input}
								defaultValue={userData?.username}
								onChange={(event) => {
									setUserData(
										userData
											? { ...userData, username: event.target.value }
											: undefined
									);
								}}
							/>
						</div>

						<p>Email: {userData?.email}</p>

						{error && <p>{error}</p>}

						<div className={css.actions}>
							<button type="submit" className={css.saveButton}>
								Save
							</button>
							<button
								onClick={handleCancel}
								type="button"
								className={css.cancelButton}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default EditProfilePage;
