import { EquipmentLocation } from "@/domain/models";
import { EquipmentLocationRepository } from "@/domain/repositories";
import { invoke } from "@tauri-apps/api/core";

export const equipmentLocationService: EquipmentLocationRepository = {
  findEquipmentLocations: async (dto) => {
    const result: EquipmentLocation[] = await invoke("find_equipment_locations", { dto });
    return result;
  },
  findOneEquipmentLocation: async (dto) => {
    const result: EquipmentLocation = await invoke("find_one_equipment_location", { dto });
    return result;
  },
  createEquipmentLocation: async (dto) => {
    const result: EquipmentLocation = await invoke("create_equipment_location", { dto });
    return result;
  },
  updateEquipmentLocation: async (dto) => {
    const result: EquipmentLocation = await invoke("update_equipment_location", { dto });
    return result;
  },
  deleteEquipmentLocation: async (dto) => {
    const result: EquipmentLocation = await invoke("delete_equipment_location", { dto });
    return result;
  },
}
