import { invoke } from "@tauri-apps/api/core";
import { EquipmentLocationRepository } from "../equipment-location-repository";

export const equipmentLocationTauriRepository: EquipmentLocationRepository = {
  findEquipmentLocations: async (dto) => {
    return await invoke("find_equipment_locations", { dto });
  },
  findOneEquipmentLocation: async (dto) => {
    return await invoke("find_one_equipment_location", { dto });
  },
  createEquipmentLocation: async (dto) => {
    return await invoke("create_equipment_location", { dto });
  },
  updateEquipmentLocation: async (dto) => {
    return await invoke("update_equipment_location", { dto });
  },
  deleteEquipmentLocation: async (dto) => {
    await invoke("delete_equipment_location", { dto });
  },
}
