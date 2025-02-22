import { Equipment } from "@/types";
import { Card, CardContent } from "../ui/card";
import { NavLink } from "react-router";

type EquipmentCardProps = {
  equipment: Equipment;
};

function truncateText(text: string, maxLength = 30) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Card className="shadow-2xl rounded-lg border-0 bg-gray-800">
      <CardContent className="p-4 gap-4 flex flex-col">
        <h3 className="text-2xl text-center">{equipment.name}</h3>
        <p className="font-bold">{equipment.service_tag}</p>
        <p className="text-justify">{truncateText(equipment.description, 50)}</p>
        <p>ultima atualização: {formatDateString(equipment.updated_at)}</p>
        <NavLink
          to={`/equipment/${equipment.id}`}
          className="bg-blue-700 text-center text-white rounded-lg py-2 hover:bg-blue-600 transition-colors duration-200">
          Ver mais detalhes
        </NavLink>
      </CardContent>
    </Card>
  );
}
