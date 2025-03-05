import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { EquipmentWithLocation } from "@/domain/models"
import { NavLink } from "react-router"

type EquipmentCardProps = {
	equipment: EquipmentWithLocation
}

function formatDateString(dateString: string) {
	const date = new Date(dateString)
	return date.toLocaleString()
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
	return (
		<Card className="shadow-2xl shadow-accent rounded-lg border-2 border-accent-foreground/50 bg-accent/60">
			<CardContent className="p-4 gap-4 flex flex-col">
				<h3 className="text-2xl text-center truncate-text-1 text-foreground">
					{equipment.name}
				</h3>
				<p className="font-bold text-foreground">{equipment.service_tag}</p>
				<pre className="truncate-text-4 text-accent-foreground">
					{equipment.description}
				</pre>
				{equipment.location_name && (
					<p className="text-foreground">
						Localização: {equipment.location_name}
					</p>
				)}
				<p className="text-foreground">
					Última atualização: {formatDateString(equipment.updated_at)}
				</p>
				<Button size={null} className="px-4 py-2 w-full" asChild>
					<NavLink to={`/equipment/${equipment.id}`}>Ver mais detalhes</NavLink>
				</Button>
			</CardContent>
		</Card>
	)
}
