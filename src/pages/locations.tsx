import { EquipmentLocationSearch, EquipmentLocationsList, CreateEquipmentLocationDialog } from "@/components";
import { Button } from "@/components/ui/button";
import { useEquipmentLocationStore } from "@/hooks/use-equipment-location";
import { EquipmentLocation, FindEquipmentLocationsDTO } from "@/types/equipment-location";
import { invoke } from "@tauri-apps/api/core";
import { JSX, useEffect, useState } from "react";

export default function Locations(): JSX.Element {
  const {
    equipmentLocations,
    setEquipmentLocations,
    equipmentLocationSearchState,
    setEquipmentLocationSearchState
  } = useEquipmentLocationStore();
  const [isCreateEquipmentDialogOpen, setIsCreateEquipmentDialogOpen] = useState(false);


  async function handleSearch(params: FindEquipmentLocationsDTO) {
    const equipments: EquipmentLocation[] = await invoke("find_equipment_locations", {
      dto: params,
    });
    setEquipmentLocations(equipments);
  }

  useEffect(() => {
    (async () => handleSearch(equipmentLocationSearchState))();
  }, [equipmentLocationSearchState]);

  return (
    <main className="dark bg-background text-foreground min-h-screen grid grid-cols-1 md:grid-cols-12">
      <section className="bg-background md:col-span-10">
        <div className="bg-card p-4 flex">
          <Button
            onClick={() => setIsCreateEquipmentDialogOpen(true)}>
            Criar Localização de Equipamento
          </Button>
        </div>

        <EquipmentLocationsList equipmentLocations={equipmentLocations} />

        <CreateEquipmentLocationDialog
          isOpen={isCreateEquipmentDialogOpen}
          onClose={() => setIsCreateEquipmentDialogOpen(false)}
        />
      </section>
      <aside className="bg-background-secondary p-4 md:col-span-2 md:min-h-screen">
        <h2 className="text-2xl font-bold text-center">Pesquisa</h2>
        <EquipmentLocationSearch setSearchState={setEquipmentLocationSearchState} />
      </aside>
    </main >
  );
}
