import css from "@/components/LayoutNotes/LayoutNotes.module.css";
import { Metadata } from "next";

interface Props {
	children: React.ReactNode;
	sidebar: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Notes",
};

const LayoutFilter = ({ children, sidebar }: Props) => {
	return (
		<>
			<div className={css.container}>
				<aside className={css.sidebar}>{sidebar}</aside>
				<main className={css.notesWrapper}>{children}</main>
			</div>
		</>
	);
};

export default LayoutFilter;
