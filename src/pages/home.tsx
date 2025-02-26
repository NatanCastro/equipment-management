import { CreateEquipmentDialog, EquipmentsList } from "@/components";
import { Button } from "@/components/ui/button";
import { FindEquipmentsDTO } from "@/data/dtos";
import { Equipment } from "@/domain/models";
import { equipmentService } from "@/domain/services";
import { useEquipmentStore } from "@/hooks/use-equipement";
import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EquipmentSearch } from "../components/equipment/equipment-search";

export default function Home(): JSX.Element {
  const {
    equipments,
    setEquipments,
    equipmentSearchState,
    setEquipmentSearchState
  } = useEquipmentStore();
  const [isCreateEquipmentDialogOpen, setIsCreateEquipmentDialogOpen] = useState(false);
  const navigate = useNavigate();


  async function handleSearch(params: FindEquipmentsDTO) {
    const equipments: Equipment[] = await equipmentService.findEquipments(params);
    setEquipments(equipments);
  }

  function onDialogOpen() {
    setIsCreateEquipmentDialogOpen(true);
  }

  function onDialogClose() {
    setIsCreateEquipmentDialogOpen(false);
    navigate(0);
  }

  useEffect(() => {
    (async () => handleSearch(equipmentSearchState))();
  }, [equipmentSearchState]);

  return (
    <main className="bg-background text-foreground min-h-screen grid grid-cols-1 md:grid-cols-12">
      <section className="bg-background md:col-span-10">
        <div className="bg-background p-4 flex">
          <Button onClick={onDialogOpen} variant="default">
            Criar Equipamento
          </Button>
        </div>
        <EquipmentsList equipments={equipments} />

        <CreateEquipmentDialog
          isOpen={isCreateEquipmentDialogOpen}
          onClose={onDialogClose}
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
