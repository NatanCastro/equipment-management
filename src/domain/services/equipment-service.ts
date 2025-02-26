import { FindEquipmentsDTO, CreateEquipmentDTO, UpdateEquipmentDTO, DeleteEquipmentDTO } from "@/data/dtos";
import { Equipment, EquipmentWithLocation } from "@/domain/models";
import { EquipmentRepository } from "@/domain/repositories";

type EquipmentService = {
  findEquipments: (dto: FindEquipmentsDTO) => Promise<EquipmentWithLocation[]>;
  findOneEquipment: (dto: FindEquipmentsDTO) => Promise<EquipmentWithLocation>;
  createEquipment: (dto: CreateEquipmentDTO) => Promise<Equipment>;
  updateEquipment: (dto: UpdateEquipmentDTO) => Promise<Equipment>;
  deleteEquipment: (dto: DeleteEquipmentDTO) => Promise<void>;
}

type NewEquipmentService = (repository: EquipmentRepository) => EquipmentService;

export const newEquipmentService: NewEquipmentService = (repository: EquipmentRepository) => {
  return {
    findEquipments: async (dto) => {
      const result: EquipmentWithLocation[] = await repository.findEquipments(dto);
      return result;
    },
    findOneEquipment: async (dto) => {
      const result: EquipmentWithLocation = await repository.findOneEquipment(dto);
      return result;
    },
    createEquipment: async (dto) => {
      const result: Equipment = await repository.createEquipment(dto);
      return result;
    },
    updateEquipment: async (dto) => {
      const result: Equipment = await repository.updateEquipment(dto);
      return result;
    },
    deleteEquipment: async (dto) => {
      await repository.deleteEquipment(dto);
    },
  }
}

