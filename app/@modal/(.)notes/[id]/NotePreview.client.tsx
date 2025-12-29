"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from "@/components/NotePreview/NotePreview.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface Props {
	noteId: string;
}

const NotePreviewClient = ({ noteId }: Props) => {
	const router = useRouter();

	const {
		data: note,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["note", noteId],
		queryFn: () => fetchNoteById(noteId),
		refetchOnMount: false,
	});

	const close = () => router.back();

	return (
		<Modal closeModal={close}>
			<div>
				<main className={css.main}>
					<div className={css.container}>
						{!isLoading && !error && note && (
							<div className={css.item}>
								<div className={css.header}>
									<h2>{note.title}</h2>
								</div>
								<p className={css.content}>{note.content}</p>
								<p className={css.date}>
									{note.updatedAt
										? `Updated at ${new Date(note.updatedAt).toLocaleString()}`
										: `Created at ${new Date(note.createdAt).toLocaleString()}`}
								</p>
								<button className={css.backBtn} type="button" onClick={close}>
									Close
								</button>
							</div>
						)}
					</div>
				</main>
			</div>
		</Modal>
	);
};

export default NotePreviewClient;
