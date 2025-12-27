import NotesClient from "./Notes.client";
import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";

interface Props {
	params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const res = slug?.[0];

	const tag: NoteTag | string =
		!res || res.toLowerCase() === "all" ? "All" : (res as NoteTag);

	const title = `${tag} | Notehub`;
	const description = `Notes by tag ${tag}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: "vercelURL",
			images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
		},
	};
}

const NotesPage = async ({ params }: Props) => {
	const { slug } = await params;
	const res = slug?.[0];

	const tag: NoteTag | undefined =
		!res || res.toLowerCase() === "all" ? undefined : (res as NoteTag);

	const queryClient = new QueryClient();

	const initialNotes = await queryClient.fetchQuery({
		queryKey: ["notesFetch", 1, tag],
		queryFn: () => fetchNotes(1, "", tag),
	});

	return (
		<div>
			<NotesClient initialNotes={initialNotes} initialTag={tag}></NotesClient>
		</div>
	);
};

export default NotesPage;
