import type { UseRecordStore } from "@/data/states/record-store"
import { create } from "zustand"

export const useRecordStore = create<UseRecordStore>((set) => ({
	records: [],
	setRecords: (records) => set({ records }),
	recordSearchState: {
		title: "",
		description: "",
		equipment_id: "all"
	},
	setRecordSearchState: (state) => set({ recordSearchState: state })
}))
