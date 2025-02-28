import { FindEquipmentsDTO } from "../dtos";
import { Equipment } from "@/domain/models";

export type UseEquipmentStore = {
  equipments: Equipment[];
  setEquipments: (equipments: Equipment[]) => void;
  equipmentSearchState: FindEquipmentsDTO;
  setEquipmentSearchState: (state: FindEquipmentsDTO) => void;
};

