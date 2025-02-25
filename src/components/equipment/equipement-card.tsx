import { Equipment } from "@/types/equipment";
import { Card, CardContent } from "@/components/ui/card";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

type EquipmentCardProps = {
  equipment: Equipment;
};

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
};

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
        <p className="text-foreground">
          Última atualização: {formatDateString(equipment.updated_at)}
        </p>
        <Button size={null} className="px-4 py-2 w-full" asChild>
          <NavLink
            to={`/equipment/${equipment.id}`}>
            Ver mais detalhes
          </NavLink>
        </Button>
      </CardContent>
    </Card>
  )
}
