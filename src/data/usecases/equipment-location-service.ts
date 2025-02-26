import { FindEquipmentLocationsDTO, CreateEquipmentLocationDTO, UpdateEquipmentLocationDTO, DeleteEquipmentLocationDTO } from "../dtos";
import { EquipmentLocation } from "domain/models";

export type EquipmentLocationService = {
  findEquipmentLocations: (dto: FindEquipmentLocationsDTO) => Promise<EquipmentLocation[]>;
  findOneEquipmentLocation: (dto: FindEquipmentLocationsDTO) => Promise<EquipmentLocation>;
  createEquipmentLocation: (dto: CreateEquipmentLocationDTO) => Promise<EquipmentLocation>;
  updateEquipmentLocation: (dto: UpdateEquipmentLocationDTO) => Promise<EquipmentLocation>;
  deleteEquipmentLocation: (dto: DeleteEquipmentLocationDTO) => Promise<EquipmentLocation>;
}
