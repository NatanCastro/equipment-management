import { FindEquipmentsDTO, CreateEquipmentDTO, UpdateEquipmentDTO, DeleteEquipmentDTO, FindOneEquipmentDTO } from "@/data/dtos";
import { Equipment, EquipmentWithLocation } from "@/domain/models";
import { EquipmentRepository } from "@/domain/repositories";
import { err, isErr, Result } from "@/types/result";

export type EquipmentService = {
  findEquipments: (dto: FindEquipmentsDTO) => Promise<Result<EquipmentWithLocation[], string>>;
  findOneEquipment: (dto: FindOneEquipmentDTO) => Promise<Result<EquipmentWithLocation, string>>;
  createEquipment: (dto: CreateEquipmentDTO) => Promise<Result<Equipment, string>>;
  updateEquipment: (dto: UpdateEquipmentDTO) => Promise<Result<Equipment, string>>;
  deleteEquipment: (dto: DeleteEquipmentDTO) => Promise<Result<void, string>>;
}

type NewEquipmentService = (repository: EquipmentRepository) => EquipmentService;

export const newEquipmentService: NewEquipmentService = (repository: EquipmentRepository) => {
  return {
    findEquipments: async (dto) => {
      const result = await repository.findEquipments(dto);
      if (isErr(result)) {
        return err(`Não foi possível buscar os equipamentos: ${result.err.message}`);
      }
      return result;
    },
    findOneEquipment: async (dto) => {
      const result = await repository.findOneEquipment(dto);
      if (isErr(result)) {
        return err(`Não foi possível buscar o equipamento com o id ${dto.id}: ${result.err.message}`);
      }
      return result;
    },
    createEquipment: async (dto: CreateEquipmentDTO) => {
      const result = await repository.createEquipment(dto);
      if (isErr(result)) {
        return err(`Não foi possível criar o equipamento: ${result.err.message}`);
      }
      return result;
    },
    updateEquipment: async (dto: UpdateEquipmentDTO) => {
      const result = await repository.updateEquipment(dto);
      if (isErr(result)) {
        return err(`Não foi possível atualizar o equipamento com o id ${dto.id}: ${result.err.message}`);
      }
      return result;
    },
    deleteEquipment: async (dto: DeleteEquipmentDTO) => {
      const result = await repository.deleteEquipment(dto);
      if (isErr(result)) {
        return err(`Não foi possível excluir o equipamento com o id ${dto.id}: ${result.err.message}`);
      }
      return result;
    },
  }
}

