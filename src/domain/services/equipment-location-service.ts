import { FindEquipmentLocationsDTO, CreateEquipmentLocationDTO, UpdateEquipmentLocationDTO, DeleteEquipmentLocationDTO } from "@/data/dtos";
import { EquipmentLocation } from "@/domain/models";
import { EquipmentLocationRepository } from "@/domain/repositories";

type EquipmentLocationService = {
  findEquipmentLocations: (dto: FindEquipmentLocationsDTO) => Promise<EquipmentLocation[]>;
  findOneEquipmentLocation: (dto: FindEquipmentLocationsDTO) => Promise<EquipmentLocation>;
  createEquipmentLocation: (dto: CreateEquipmentLocationDTO) => Promise<EquipmentLocation>;
  updateEquipmentLocation: (dto: UpdateEquipmentLocationDTO) => Promise<EquipmentLocation>;
  deleteEquipmentLocation: (dto: DeleteEquipmentLocationDTO) => Promise<void>;
}

type NewEquipmentLocationService = (repository: EquipmentLocationRepository) => EquipmentLocationService;

export const newEquipmentLocationService: NewEquipmentLocationService = (repository: EquipmentLocationRepository) => ({
  findEquipmentLocations: async (dto) => {
    const result: EquipmentLocation[] = await repository.findEquipmentLocations(dto);
    return result;
  },
  findOneEquipmentLocation: async (dto) => {
    const result: EquipmentLocation = await repository.findOneEquipmentLocation(dto);
    return result;
  },
  createEquipmentLocation: async (dto) => {
    const result: EquipmentLocation = await repository.createEquipmentLocation(dto);
    return result;
  },
  updateEquipmentLocation: async (dto) => {
    const result: EquipmentLocation = await repository.updateEquipmentLocation(dto);
    return result;
  },
  deleteEquipmentLocation: async (dto) => {
    await repository.deleteEquipmentLocation(dto);
  },
})

