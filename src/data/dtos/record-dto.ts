import type { UpdateEquipmentDTO } from "./equipment-dto"

export type CreateRecordDTO = {
	title: string
	description: string
	updated_equipments: UpdateEquipmentDTO[]
}

export type UpdateRecordDTO = {
	id: string
	title: string
	description: string
}

export type DeleteRecordDTO = {
	id: string
}

export type FindRecordsDTO = {
	title: string
	description: string
	equipment_id: string
}

export type FindOneRecordDTO = {
	id: string
}
