import { FindEquipmentsDTO } from "../dtos";
import { Equipment } from "../models";

export type UseEquipmentStore = {
  equipments: Equipment[];
  setEquipments: (equipments: Equipment[]) => void;
  equipmentSearchState: FindEquipmentsDTO;
  setEquipmentSearchState: (state: FindEquipmentsDTO) => void;
};

