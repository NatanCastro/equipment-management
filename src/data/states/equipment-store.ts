import type { FindEquipmentsDTO } from "../dtos"
import type { EquipmentWithLocation } from "@/domain/models"

export type UseEquipmentStore = {
	equipments: EquipmentWithLocation[]
	setEquipments: (equipments: EquipmentWithLocation[]) => void
	equipmentSearchState: FindEquipmentsDTO
	setEquipmentSearchState: (state: FindEquipmentsDTO) => void
}
