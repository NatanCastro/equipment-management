import { EquipmentLocation, FindEquipmentLocationDTO } from "@/types/equipment-location";
import { create } from "zustand";

type UseEquipmentLocation = {
  equipmentLocations: EquipmentLocation[];
  setEquipmentLocations: (equipmentLocations: EquipmentLocation[]) => void;
  equipmentLocationSearchState: FindEquipmentLocationDTO;
  setEquipmentLocationSearchState: (state: FindEquipmentLocationDTO) => void;
}


export const useEquipmentLocation = create<UseEquipmentLocation>()((set) => ({
  equipmentLocations: [],
  setEquipmentLocations: (equipmentLocations) => set({ equipmentLocations }),
  equipmentLocationSearchState: {
    name: "",
    description: "",
  },
  setEquipmentLocationSearchState: (state) => set({ equipmentLocationSearchState: state }),
}))
