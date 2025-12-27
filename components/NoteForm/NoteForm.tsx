"use client";

import css from "./NoteForm.module.css";
import { type NoteTag, type FormValues } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import type { ChangeEvent } from "react";

const NoteForm = () => {
	const router = useRouter();

	const { draft, setDraft, clearDraft } = useNoteStore();

	const closeModal = () => {
		router.push("/notes/filter/all");
	};

	const onSubmitForm = (formData: FormData) => {
		const entries = Object.fromEntries(formData);
		const values: FormValues = {
			title: String(entries.title) ?? "",
			content: String(entries.content) ?? "",
			tag: entries.tag as NoteTag,
		};
		mutate(values);
		clearDraft();
	};

	const qClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createNote,
		onSuccess: () => {
			qClient.invalidateQueries({ queryKey: ["notes"] });
			closeModal();
		},
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setDraft({
			...draft,
			[e.target.name]: [e.target.value],
		});
	};

	return (
		<div>
			<form className={css.form} action={onSubmitForm}>
				<div className={css.formGroup}>
					<label htmlFor="title">Title</label>
					<input
						id="title"
						type="text"
						name="title"
						className={css.input}
						defaultValue={draft.title}
						onChange={handleChange}
					/>
				</div>

				<div className={css.formGroup}>
					<label htmlFor="content">Content</label>
					<textarea
						id="content"
						name="content"
						rows={8}
						className={css.textarea}
						defaultValue={draft.content}
						onChange={handleChange}
					/>
				</div>

				<div className={css.formGroup}>
					<label htmlFor="tag">Tag</label>
					<select
						id="tag"
						name="tag"
						className={css.select}
						defaultValue={draft.tag}
						onChange={handleChange}
					>
						<option value="Todo">Todo</option>
						<option value="Work">Work</option>
						<option value="Personal">Personal</option>
						<option value="Meeting">Meeting</option>
						<option value="Shopping">Shopping</option>
					</select>
				</div>

				<div className={css.actions}>
					<button
						onClick={closeModal}
						type="button"
						className={css.cancelButton}
					>
						Cancel
					</button>
					<button type="submit" className={css.submitButton} disabled={false}>
						{isPending ? "Creating note..." : "Create note"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default NoteForm;
