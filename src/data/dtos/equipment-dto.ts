export type CreateEquipmentDTO = {
	service_tag: string
	name: string
	description: string
}

export type UpdateEquipmentDTO = {
	id: string
	service_tag: string
	name: string
	description: string
	updated_at: string
}

export type DeleteEquipmentDTO = {
	id: string
}

export type FindEquipmentsDTO = {
	service_tag: string
	name: string
	description: string
	location_id: string
}

export type FindOneEquipmentDTO = {
	id: string
}
