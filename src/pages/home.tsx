import { JSX, useEffect, useState } from "react";
import { CreateEquipmentDialog, EquipmentsList } from "@/components";
import { invoke } from "@tauri-apps/api/core";
import { Equipment, FindEquipmentsDTO } from "../types";
import { EquipmentSearch } from "../components/equipment/equipment-search";
import { Button } from "@/components/ui/button";

export default function Home(): JSX.Element {
  const [isCreateEquipmentDialogOpen, setIsCreateEquipmentDialogOpen] = useState(false);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchState, setSearchState] = useState<FindEquipmentsDTO>({
    service_tag: "",
    name: "",
    description: "",
  });

  function setSearchStateHandler(state: FindEquipmentsDTO) {
    setSearchState(state);
  }

  async function handleSearch(params: FindEquipmentsDTO) {
    const equipments: Equipment[] = await invoke("find_equipments", {
      dto: params,
    });
    setEquipments(equipments);
  }

  useEffect(() => {
    (async () => handleSearch(searchState))();
  }, [searchState]);

  return (
    <main className="dark bg-gray-900 text-white min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-12">
        <div className="bg-gray-900 md:col-span-10">
          <div className="bg-gray-800 p-4 flex">
            <Button onClick={() => setIsCreateEquipmentDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Criar Equipamento
            </Button>
          </div>
          <EquipmentsList equipments={equipments} />

          <CreateEquipmentDialog
            isOpen={isCreateEquipmentDialogOpen}
            onClose={() => setIsCreateEquipmentDialogOpen(false)}
          />
        </div>
        <div className="bg-gray-800 p-4 md:col-span-2 md:min-h-screen">
          <h2 className="text-2xl font-bold text-center">Pesquisa</h2>
          <EquipmentSearch setSearchState={setSearchStateHandler} />
        </div>
      </section>
    </main>
  );
}
