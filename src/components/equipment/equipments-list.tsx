import type { EquipmentWithLocation } from "@/domain/models"
import { EquipmentCard } from "./equipement-card"

type EquipmentsListProps = {
	equipments: EquipmentWithLocation[]
}

export function EquipmentsList({ equipments }: EquipmentsListProps) {
	return (
		<div className="p-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{equipments.map((item) => (
					<EquipmentCard key={item.id} equipment={item} />
				))}
			</div>
		</div>
	)
}
