import type { FindEquipmentLocationsDTO, CreateEquipmentLocationDTO, UpdateEquipmentLocationDTO, DeleteEquipmentLocationDTO, FindOneEquipmentLocationDTO } from "@/data/dtos";
import type { Result } from "@/types/result";
import type { EquipmentLocation } from "domain/models";

export type EquipmentLocationRepository = {
  findEquipmentLocations: (dto: FindEquipmentLocationsDTO) => Promise<Result<EquipmentLocation[]>>;
  findOneEquipmentLocation: (dto: FindOneEquipmentLocationDTO) => Promise<Result<EquipmentLocation>>;
  createEquipmentLocation: (dto: CreateEquipmentLocationDTO) => Promise<Result<EquipmentLocation>>;
  updateEquipmentLocation: (dto: UpdateEquipmentLocationDTO) => Promise<Result<EquipmentLocation>>;
  deleteEquipmentLocation: (dto: DeleteEquipmentLocationDTO) => Promise<Result<void>>;
}
