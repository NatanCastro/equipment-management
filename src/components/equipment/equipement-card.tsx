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
    <Card className="p-4 shadow-md rounded-lg">
      <CardContent>
        <p><strong>Service Tag:</strong> {equipment.service_tag}</p>
        <p><strong>Name:</strong> {equipment.name}</p>
        <p><strong>Description:</strong> {truncateText(equipment.description)}</p>
        <p><strong>Created At:</strong> {formatDateString(equipment.created_at)}</p>
        <p><strong>Updated At:</strong> {formatDateString(equipment.updated_at)}</p>
      </CardContent>
    </Card>
  );
}
