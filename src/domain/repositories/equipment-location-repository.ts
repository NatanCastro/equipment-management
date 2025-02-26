import { FindEquipmentLocationsDTO, CreateEquipmentLocationDTO, UpdateEquipmentLocationDTO, DeleteEquipmentLocationDTO } from "@/data/dtos";
import { EquipmentLocation } from "domain/models";

export type EquipmentLocationRepository = {
  findEquipmentLocations: (dto: FindEquipmentLocationsDTO) => Promise<EquipmentLocation[]>;
  findOneEquipmentLocation: (dto: FindEquipmentLocationsDTO) => Promise<EquipmentLocation>;
  createEquipmentLocation: (dto: CreateEquipmentLocationDTO) => Promise<EquipmentLocation>;
  updateEquipmentLocation: (dto: UpdateEquipmentLocationDTO) => Promise<EquipmentLocation>;
  deleteEquipmentLocation: (dto: DeleteEquipmentLocationDTO) => Promise<void>;
}
