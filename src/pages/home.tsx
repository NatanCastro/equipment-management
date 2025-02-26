import { CreateEquipmentDialog, EquipmentsList } from "@/components";
import { Button } from "@/components/ui/button";
import { useEquipmentStore } from "@/hooks/use-equipement";
import { Equipment, FindEquipmentsDTO } from "@/types/equipment";
import { invoke } from "@tauri-apps/api/core";
import { JSX, useEffect, useState } from "react";
import { EquipmentSearch } from "../components/equipment/equipment-search";

export default function Home(): JSX.Element {
  const {
    equipments,
    setEquipments,
    equipmentSearchState,
    setEquipmentSearchState
  } = useEquipmentStore();
  const [isCreateEquipmentDialogOpen, setIsCreateEquipmentDialogOpen] = useState(false);


  async function handleSearch(params: FindEquipmentsDTO) {
    const equipments: Equipment[] = await invoke("find_equipments", {
      dto: params,
    });
    setEquipments(equipments);
  }

  useEffect(() => {
    (async () => handleSearch(equipmentSearchState))();
  }, [equipmentSearchState]);

  return (
    <main className="bg-background text-foreground min-h-screen grid grid-cols-1 md:grid-cols-12">
      <section className="bg-background md:col-span-10">
        <div className="bg-background p-4 flex">
          <Button onClick={() => setIsCreateEquipmentDialogOpen(true)} variant="default">
            Criar Equipamento
          </Button>
        </div>
        <EquipmentsList equipments={equipments} />

        <CreateEquipmentDialog
          isOpen={isCreateEquipmentDialogOpen}
          onClose={() => setIsCreateEquipmentDialogOpen(false)}
        />
      </section>
      <aside className="bg-background p-4 md:col-span-2 md:min-h-screen">
        <h2 className="text-2xl font-bold text-center text-primary">
          Pesquisa
        </h2>
        <EquipmentSearch setSearchState={setEquipmentSearchState} />
      </aside>
    </main>
  );
}
