import type { Record } from "@/domain/models"
import { RecordCard } from "./record-card"

type EquipmentLocationsListProps = {
	records: Record[]
}

export function RecordList({
	records: equipmentLocations
}: EquipmentLocationsListProps) {
	return (
		<div className="p-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{equipmentLocations.map((item) => (
					<RecordCard key={item.id} record={item} />
				))}
			</div>
		</div>
	)
}
