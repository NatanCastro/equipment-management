import type {
	FindEquipmentsDTO,
	CreateEquipmentDTO,
	UpdateEquipmentDTO,
	DeleteEquipmentDTO,
	FindOneEquipmentDTO
} from "@/data/dtos"
import type { Equipment, EquipmentWithLocation } from "@/domain/models"
import type { Result } from "@/types/result"

export type EquipmentRepository = {
	findEquipments: (
		dto: FindEquipmentsDTO
	) => Promise<Result<EquipmentWithLocation[]>>
	findOneEquipment: (
		dto: FindOneEquipmentDTO
	) => Promise<Result<EquipmentWithLocation>>
	createEquipment: (dto: CreateEquipmentDTO) => Promise<Result<Equipment>>
	updateEquipment: (dto: UpdateEquipmentDTO) => Promise<Result<Equipment>>
	deleteEquipment: (dto: DeleteEquipmentDTO) => Promise<Result<void>>
}
