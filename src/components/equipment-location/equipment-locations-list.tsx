import { EquipmentLocation } from "@/types/equipment-location";
import { EquipmentLocationCard } from "./equipement-card";


type EquipmentLocationsListProps = {
  equipmentLocations: EquipmentLocation[];
}

export function EquipmentLocationsList({ equipmentLocations }: EquipmentLocationsListProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {equipmentLocations.map((item) => (
          <EquipmentLocationCard key={item.id} equipmentLocation={item} />
        ))}
      </div>
    </div>
  );
}

