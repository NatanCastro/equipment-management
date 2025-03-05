import { Card, CardContent } from "@/components/ui/card"
import type { Record } from "@/domain/models"
import { formatDateString } from "@/lib/format-date"
import { NavLink } from "react-router"

type RecordCardProps = {
	record: Record
}

export function RecordCard({ record }: RecordCardProps) {
	return (
		<Card className="shadow-2xl shadow-accent rounded-lg border-2 border-accent-foreground/50 bg-accent/60">
			<CardContent className="p-4 gap-4 flex flex-col">
				<h3 className="text-2xl text-center truncate-text-1 text-foreground">
					{record.title}
				</h3>
				<pre className="truncate-text-4 text-accent-foreground">
					{record.description}
				</pre>
				<p className="text-foreground truncate-text-1">
					equipamentos:{" "}
					{record.equipments.map((item) => item.service_tag).join(", ")}
				</p>
				<p className="text-foreground">
					ultima atualização: {formatDateString(record.updated_at)}
				</p>
				<NavLink
					to={`/equipment-location/${record.id}`}
					className="bg-primary text-center text-foreground rounded-lg py-2 hover:bg-primary-dark transition-colors duration-200"
				>
					Ver mais detalhes
				</NavLink>
			</CardContent>
		</Card>
	)
}
