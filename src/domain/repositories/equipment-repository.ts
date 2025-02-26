import { FindEquipmentsDTO, CreateEquipmentDTO, UpdateEquipmentDTO, DeleteEquipmentDTO } from "@/data/dtos";
import { Equipment, EquipmentWithLocation } from "@/domain/models";

export type EquipmentRepository = {
  findEquipments: (dto: FindEquipmentsDTO) => Promise<EquipmentWithLocation[]>;
  findOneEquipment: (dto: FindEquipmentsDTO) => Promise<EquipmentWithLocation>;
  createEquipment: (dto: CreateEquipmentDTO) => Promise<Equipment>;
  updateEquipment: (dto: UpdateEquipmentDTO) => Promise<Equipment>;
  deleteEquipment: (dto: DeleteEquipmentDTO) => Promise<void>;
}
