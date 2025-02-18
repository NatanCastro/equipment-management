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
        <p><strong>Tag de Serviço:</strong> {equipment.service_tag}</p>
        <p><strong>Nome:</strong> {equipment.name}</p>
        <p><strong>Descrição:</strong> {truncateText(equipment.description)}</p>
        <p><strong>Data de Criação:</strong> {formatDateString(equipment.created_at)}</p>
        <p><strong>Ultima Atualização:</strong> {formatDateString(equipment.updated_at)}</p>
      </CardContent>
    </Card>
  );
}
