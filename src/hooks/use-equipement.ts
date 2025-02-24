import { Equipment, FindEquipmentsDTO } from "@/types/equipment";
import { create } from "zustand";

type UseEquipmentStore = {
  equipments: Equipment[];
  setEquipments: (equipments: Equipment[]) => void;
  equipmentSearchState: FindEquipmentsDTO;
  setEquipmentSearchState: (state: FindEquipmentsDTO) => void;
};

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
