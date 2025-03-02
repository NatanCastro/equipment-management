import type { FindEquipmentLocationsDTO } from "../dtos";
import type { EquipmentLocation } from "@/domain/models";

export type UseEquipmentLocation = {
  equipmentLocations: EquipmentLocation[];
  setEquipmentLocations: (equipmentLocations: EquipmentLocation[]) => void;
  equipmentLocationSearchState: FindEquipmentLocationsDTO;
  setEquipmentLocationSearchState: (state: FindEquipmentLocationsDTO) => void;
}
