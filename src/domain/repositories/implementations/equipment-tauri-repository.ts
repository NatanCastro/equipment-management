import type { EquipmentRepository } from "../equipment-repository"
import { invokeTauriCommand } from "./tauri-repository-utils"

export const equipmentTauriRepository: EquipmentRepository = {
	findEquipments: async (dto) => invokeTauriCommand("find_equipments", { dto }),
	findOneEquipment: async (dto) => invokeTauriCommand("find_one_equipment", { dto }),
	createEquipment: async (dto) => invokeTauriCommand("create_equipment", { dto }),
	updateEquipment: async (dto) => invokeTauriCommand("update_equipment", { dto }),
	deleteEquipment: async (dto) => invokeTauriCommand("delete_equipment", { dto })
}
