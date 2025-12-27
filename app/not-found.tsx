import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
	title: "404 not found | Notehub",
	description: "You can store your notes here",
	openGraph: {
		title: "404 not found | Notehub",
		description: "You can store your notes here",
		url: "vercelUrl",
		images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
	},
};

const NotFound = () => {
	return (
		<div>
			<h1 className={css.title}>404 - Page not found</h1>
			<p className={css.description}>
				Sorry, the page you are looking for does not exist.
			</p>
		</div>
	);
};

export default NotFound;
