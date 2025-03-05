import type { CreateRecordStore } from "@/data/states/create-record-store"
import { create } from "zustand"

export const useCreateRecordStore = create<CreateRecordStore>((set) => ({
  equipments: [],
  setEquipments: (equipments) => set({ equipments }),
  locations: [],
  setLocations: (locations) => set({ locations }),
  selectedEquipments: [],
  setSelectedEquipments: (selectedEquipments) => set({ selectedEquipments })
}))
