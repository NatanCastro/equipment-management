import { Equipment, EquipmentWithLocation } from "@/domain/models";
import { invoke } from "@tauri-apps/api/core";
import { EquipmentRepository } from "@/domain/repositories";

export const equipmentService: EquipmentRepository = {
  findEquipments: async (dto) => {
    const result: EquipmentWithLocation[] = await invoke("find_equipments", { dto });
    return result;
  },
  findOneEquipment: async (dto) => {
    const result: EquipmentWithLocation = await invoke("find_one_equipment", { dto });
    return result;
  },
  createEquipment: async (dto) => {
    const result: Equipment = await invoke("create_equipment", { dto });
    return result;
  },
  updateEquipment: async (dto) => {
    const result: Equipment = await invoke("update_equipment", { dto });
    return result;
  },
  deleteEquipment: async (dto) => {
    await invoke("delete_equipment", { dto });
  },
}
