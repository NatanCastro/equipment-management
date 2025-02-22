import { EquipmentLocation, FindEquipmentLocationsDTO } from "@/types/equipment-location";
import { create } from "zustand";

type UseEquipmentLocation = {
  equipmentLocations: EquipmentLocation[];
  setEquipmentLocations: (equipmentLocations: EquipmentLocation[]) => void;
  equipmentLocationSearchState: FindEquipmentLocationsDTO;
  setEquipmentLocationSearchState: (state: FindEquipmentLocationsDTO) => void;
}


export const useEquipmentLocationStore = create<UseEquipmentLocation>()((set) => ({
  equipmentLocations: [],
  setEquipmentLocations: (equipmentLocations) => set({ equipmentLocations }),
  equipmentLocationSearchState: {
    name: "",
    description: "",
  },
  setEquipmentLocationSearchState: (state) => set({ equipmentLocationSearchState: state }),
}))
