export type FindEquipmentLocationsDTO = {
	name: string
	description: string
}

export type FindOneEquipmentLocationDTO = {
	id: string
}

export type CreateEquipmentLocationDTO = {
	name: string
	description: string
}

export type UpdateEquipmentLocationDTO = {
	id: string
	name: string
	description: string
}

export type DeleteEquipmentLocationDTO = {
	id: string
}
