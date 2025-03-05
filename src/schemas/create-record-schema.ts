import { z } from "zod"

export const createRecordSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	updated_equipments: z.array(
		z.object({
			id: z.string(),
			service_tag: z.string().min(1),
			name: z.string().min(1),
			description: z.string().min(1),
			updated_at: z.string().min(1),
			location_id: z.string()
		})
	)
})

export type CreateRecordSchema = z.infer<typeof createRecordSchema>
