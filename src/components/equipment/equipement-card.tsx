import { Equipment } from "@/types/equipment";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router";

type EquipmentCardProps = {
  equipment: Equipment;
};

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Card className="shadow-2xl rounded-lg border-0 bg-card">
      <CardContent className="p-4 gap-4 flex flex-col">
        <h3 className="text-2xl text-center truncate-text-1 text-foreground">
          {equipment.name}
        </h3>
        <p className="font-bold text-foreground">{equipment.service_tag}</p>
        <pre className="truncate-text-4 text-muted-foreground">
          {equipment.description}
        </pre>
        <p className="text-muted-foreground">
          Última atualização: {formatDateString(equipment.updated_at)}
        </p>
        <NavLink
          to={`/equipment/${equipment.id}`}
          className="bg-primary text-center text-primary-foreground rounded-lg py-2 hover:bg-primary-dark transition-colors duration-200"
        >
          Ver mais detalhes
        </NavLink>
      </CardContent>
    </Card>
  );
}
