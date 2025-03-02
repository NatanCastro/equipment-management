import type { EquipmentLocationRepository } from "../equipment-location-repository"
import { invokeTauriCommand } from "./tauri-repository-utils"

export const equipmentLocationTauriRepository: EquipmentLocationRepository = {
	findEquipmentLocations: async (dto) =>
		invokeTauriCommand("find_equipment_locations", { dto }),
	findOneEquipmentLocation: async (dto) =>
		invokeTauriCommand("find_one_equipment_location", { dto }),
	createEquipmentLocation: async (dto) =>
		invokeTauriCommand("create_equipment_location", { dto }),
	updateEquipmentLocation: async (dto) =>
		invokeTauriCommand("update_equipment_location", { dto }),
	deleteEquipmentLocation: async (dto) =>
		invokeTauriCommand("delete_equipment_location", { dto })
}
