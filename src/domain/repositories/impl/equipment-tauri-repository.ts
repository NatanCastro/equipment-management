import { invoke } from "@tauri-apps/api/core";
import { EquipmentRepository } from "../equipment-repository";

export const equipmentTauriRepository: EquipmentRepository = {
  findEquipments: async (dto) => {
    return await invoke("find_equipments", { dto });
  },
  findOneEquipment: async (dto) => {
    return await invoke("find_one_equipment", { dto });
  },
  createEquipment: async (dto) => {
    return await invoke("create_equipment", { dto });
  },
  updateEquipment: async (dto) => {
    return await invoke("update_equipment", { dto });
  },
  deleteEquipment: async (dto) => {
    await invoke("delete_equipment", { dto });
  },

}
