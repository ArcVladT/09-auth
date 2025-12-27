import { FormValues, NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialDraft: FormValues = {
	title: "",
	content: "",
	tag: "Todo" as NoteTag,
};

interface UseDraft {
	draft: FormValues;
	setDraft: (values: FormValues) => void;
	clearDraft: () => void;
}

export const useNoteStore = create<UseDraft>()(
	persist(
		(set) => ({
			draft: initialDraft,
			setDraft: (newDraft: FormValues) => set(() => ({ draft: newDraft })),
			clearDraft: () => set(() => ({ draft: initialDraft })),
		}),
		{ name: "notehub-draft", partialize: (state) => ({ draft: state.draft }) }
	)
);
