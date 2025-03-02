import type { FindEquipmentsDTO } from "../dtos";
import type { Equipment } from "@/domain/models";

export type UseEquipmentStore = {
  equipments: Equipment[];
  setEquipments: (equipments: Equipment[]) => void;
  equipmentSearchState: FindEquipmentsDTO;
  setEquipmentSearchState: (state: FindEquipmentsDTO) => void;
};

