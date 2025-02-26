import { UseEquipmentStore } from "@/data/stores";
import { create } from "zustand";


export const useEquipmentStore = create<UseEquipmentStore>((set) => ({
  equipments: [],
  setEquipments: (equipments) => set({ equipments }),
  equipmentSearchState: {
    service_tag: "",
    name: "",
    description: "",
    location_id: "all",
  },
  setEquipmentSearchState: (state) => set({ equipmentSearchState: state }),
}))
