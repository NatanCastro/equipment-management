import type { Equipment } from "./equipment"

export type Record = {
	id: string
	title: string
	description: string
	equipments: Pick<Equipment, "id" | "service_tag">[]
	created_at: string
	updated_at: string
}
