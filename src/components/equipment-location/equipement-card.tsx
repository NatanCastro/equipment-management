import { Card, CardContent } from "@/components/ui/card";
import { EquipmentLocation } from "@/types/equipment-location";
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
    <Card className="shadow-2xl rounded-lg border-0 bg-gray-800">
      <CardContent className="p-4 gap-4 flex flex-col">
        <h3
          className="text-2xl text-center truncate-text-1"
        >{equipmentLocation.name}</h3>
        <pre className="truncate-text-4">{equipmentLocation.description}</pre>
        <p>ultima atualização: {formatDateString(equipmentLocation.updated_at)}</p>
        <NavLink
          to={`/equipment-location/${equipmentLocation.id}`}
          className="bg-blue-700 text-center text-white rounded-lg py-2 hover:bg-blue-600 transition-colors duration-200">
          Ver mais detalhes
        </NavLink>
      </CardContent>
    </Card>
  );
}
