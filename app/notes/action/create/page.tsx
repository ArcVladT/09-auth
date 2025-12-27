import css from "@/app/Home.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Note | Notehub",
	description: "You can create your note here",
	openGraph: {
		title: "Create Note | Notehub",
		description: "You can create your note here",
		url: "vercelURL",
		images: [
			{
				url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
				width: 1200,
				height: 630,
				alt: "NoteHub OpenGraph",
			},
		],
	},
};

const createNote = () => {
	return (
		<>
			<main className={css.main}>
				<div className={css.container}>
					<h1 className={css.title}>Create note</h1>
					<NoteForm />
				</div>
			</main>
		</>
	);
};

export default createNote;
