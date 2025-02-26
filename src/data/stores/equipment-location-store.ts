import { FindEquipmentLocationsDTO } from "../dtos";
import { EquipmentLocation } from "../models";

export type UseEquipmentLocation = {
  equipmentLocations: EquipmentLocation[];
  setEquipmentLocations: (equipmentLocations: EquipmentLocation[]) => void;
  equipmentLocationSearchState: FindEquipmentLocationsDTO;
  setEquipmentLocationSearchState: (state: FindEquipmentLocationsDTO) => void;
}
