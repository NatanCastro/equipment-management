import { FindEquipmentLocationsDTO, CreateEquipmentLocationDTO, UpdateEquipmentLocationDTO, DeleteEquipmentLocationDTO, FindOneEquipmentLocationDTO } from "@/data/dtos";
import { EquipmentLocation } from "@/domain/models";
import { EquipmentLocationRepository } from "@/domain/repositories";
import { Result, isErr, err } from "@/types/result";

export type EquipmentLocationService = {
  findEquipmentLocations: (dto: FindEquipmentLocationsDTO) => Promise<Result<EquipmentLocation[], string>>;
  findOneEquipmentLocation: (dto: FindOneEquipmentLocationDTO) => Promise<Result<EquipmentLocation, string>>;
  createEquipmentLocation: (dto: CreateEquipmentLocationDTO) => Promise<Result<EquipmentLocation, string>>;
  updateEquipmentLocation: (dto: UpdateEquipmentLocationDTO) => Promise<Result<EquipmentLocation, string>>;
  deleteEquipmentLocation: (dto: DeleteEquipmentLocationDTO) => Promise<Result<void, string>>;
}

type NewEquipmentLocationService = (repository: EquipmentLocationRepository) => EquipmentLocationService;

export const newEquipmentLocationService: NewEquipmentLocationService = (repository: EquipmentLocationRepository) => ({
  findEquipmentLocations: async (dto) => {
    const result = await repository.findEquipmentLocations(dto);
    if (isErr(result)) {
      return err(`Erro ao buscar locais de equipamento: ${result.err.message}`);
    }
    return result;
  },
  findOneEquipmentLocation: async (dto) => {
    const result = await repository.findOneEquipmentLocation(dto);
    if (isErr(result)) {
      return err(`Erro ao buscar o local de equipamento com id: ${dto.id}`);
    }
    return result;
  },
  createEquipmentLocation: async (dto: CreateEquipmentLocationDTO) => {
    const result = await repository.createEquipmentLocation(dto);
    if (isErr(result)) {
      return err(`Erro ao criar local de equipamento: ${result.err.message}`);
    }
    return result;
  },
  updateEquipmentLocation: async (dto: UpdateEquipmentLocationDTO) => {
    const result = await repository.updateEquipmentLocation(dto);
    if (isErr(result)) {
      return err(`Erro ao atualizar local de equipamento com o id ${dto.id}: ${result.err.message}`);
    }
    return result;
  },
  deleteEquipmentLocation: async (dto: DeleteEquipmentLocationDTO) => {
    const result = await repository.deleteEquipmentLocation(dto);
    if (isErr(result)) {
      return err(`Erro ao excluir local de equipamento com o id ${dto.id}: ${result.err.message}`);
    }
    return result;
  }
})

