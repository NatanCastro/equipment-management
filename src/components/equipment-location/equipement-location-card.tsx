import { Card, CardContent } from "@/components/ui/card";
import type { EquipmentLocation } from "@/domain/models";
import { NavLink } from "react-router";

type EquipmentCardProps = {
  equipmentLocation: EquipmentLocation;
};

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export function EquipmentLocationCard({ equipmentLocation }: EquipmentCardProps) {
  return (
    <Card className="shadow-2xl shadow-accent rounded-lg border-2 border-accent-foreground/50 bg-accent/60">
      <CardContent className="p-4 gap-4 flex flex-col">
        <h3
          className="text-2xl text-center truncate-text-1 text-foreground"
        >{equipmentLocation.name}</h3>
        <pre className="truncate-text-4 text-accent-foreground">{equipmentLocation.description}</pre>
        <p className="text-foreground">ultima atualização: {formatDateString(equipmentLocation.updated_at)}</p>
        <NavLink
          to={`/equipment-location/${equipmentLocation.id}`}
          className="bg-primary text-center text-foreground rounded-lg py-2 hover:bg-primary-dark transition-colors duration-200"
        >
          Ver mais detalhes
        </NavLink>
      </CardContent>
    </Card>
  );
}
