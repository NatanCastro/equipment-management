import { FindEquipmentsDTO, CreateEquipmentDTO, UpdateEquipmentDTO, DeleteEquipmentDTO } from "../dtos";
import { Equipment, EquipmentWithLocation } from "@/domain/models";

export type EquipmentService = {
  findEquipments: (dto: FindEquipmentsDTO) => Promise<EquipmentWithLocation[]>;
  findOneEquipment: (dto: FindEquipmentsDTO) => Promise<EquipmentWithLocation>;
  createEquipment: (dto: CreateEquipmentDTO) => Promise<Equipment>;
  updateEquipment: (dto: UpdateEquipmentDTO) => Promise<Equipment>;
  deleteEquipment: (dto: DeleteEquipmentDTO) => Promise<void>;
}
