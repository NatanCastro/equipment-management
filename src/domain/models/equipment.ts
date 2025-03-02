export type Equipment = {
	id: string
	service_tag: string
	name: string
	description: string
	location_id: string
	created_at: string
	updated_at: string
}

export type EquipmentWithLocation = Equipment & {
	location_name: string
}

export type EquipmentLocation = {
	id: string
	name: string
	description: string
	created_at: string
	updated_at: string
}
