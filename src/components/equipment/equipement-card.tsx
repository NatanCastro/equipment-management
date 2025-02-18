import { Equipment } from "@/types";
import { Card, CardContent } from "../ui/card";

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
      <CardContent className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span-2">
          <p className="font-bold text-center">{equipment.service_tag}</p>
        </div>
        <div className="col-span-2">
          <p className="text-center">{equipment.name}</p>
        </div>
        <div className="col-span-2">
          <p className="text-justify">{truncateText(equipment.description, 50)}</p>
        </div>
        <div>data de criação: {formatDateString(equipment.created_at)}</div>
        <div>data de atualização: {formatDateString(equipment.updated_at)}</div>
      </CardContent>
    </Card>
  );
}
