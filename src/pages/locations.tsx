import { CreateEquipmentLocationDialog, EquipmentLocationSearch, EquipmentLocationsList } from "@/components";
import { Button } from "@/components/ui/button";
import type { FindEquipmentLocationsDTO } from "@/data/dtos";
import { useEquipmentLocationStore } from "@/stores/use-equipment-location-store";
import { useEquipmentLocationService } from "@/hooks/use-equipment-location-service";
import { type JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Locations(): JSX.Element {
  const {
    equipmentLocations,
    setEquipmentLocations,
    equipmentLocationSearchState,
    setEquipmentLocationSearchState
  } = useEquipmentLocationStore();
  const [isCreateEquipmentDialogOpen, setIsCreateEquipmentDialogOpen] = useState(false);
  const { findEquipmentLocations } = useEquipmentLocationService();
  const navigate = useNavigate();


  async function handleSearch(params: FindEquipmentLocationsDTO) {
    const equipments = await findEquipmentLocations(params);
    switch (equipments.tag) {
      case "ok":
        setEquipmentLocations(equipments.val);
        break;
      case "err":
        console.log(equipments.err);
        break;
    }
  }

  function onDialogOpen() {
    setIsCreateEquipmentDialogOpen(true);
  }

  function onDialogClose() {
    setIsCreateEquipmentDialogOpen(false);
    navigate(0);
  }

  useEffect(() => {
    (async () => handleSearch(equipmentLocationSearchState))();
  }, [equipmentLocationSearchState]);

  return (
    <main className="dark bg-background text-foreground min-h-screen grid grid-cols-1 md:grid-cols-12">
      <section className="bg-background md:col-span-10">
        <div className="bg-card p-4 flex">
          <Button
            onClick={onDialogOpen}>
            Criar Localização de Equipamento
          </Button>
        </div>

        <EquipmentLocationsList equipmentLocations={equipmentLocations} />

        <CreateEquipmentLocationDialog
          isOpen={isCreateEquipmentDialogOpen}
          onClose={onDialogClose}
        />
      </section>
      <aside className="bg-background-secondary p-4 md:col-span-2 md:min-h-screen">
        <h2 className="text-2xl font-bold text-center">Pesquisa</h2>
        <EquipmentLocationSearch setSearchState={setEquipmentLocationSearchState} />
      </aside>
    </main >
  );
}
