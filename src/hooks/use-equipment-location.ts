import { UseEquipmentLocation } from "@/data/stores/equipment-location-store";
import { create } from "zustand";



export const useEquipmentLocationStore = create<UseEquipmentLocation>()((set) => ({
  equipmentLocations: [],
  setEquipmentLocations: (equipmentLocations) => set({ equipmentLocations }),
  equipmentLocationSearchState: {
    name: "",
    description: "",
  },
  setEquipmentLocationSearchState: (state) => set({ equipmentLocationSearchState: state }),
}))
