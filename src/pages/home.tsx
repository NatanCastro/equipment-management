import { JSX, useEffect, useState } from "react";
import { EquipmentsList } from "../components";
import { invoke } from "@tauri-apps/api/core";
import { Equipment, FindEquipmentsDTO } from "../types";
import { EquipmentSearch } from "../components/equipment/equipment-search";
import { NavLink } from "react-router";

export default function Home(): JSX.Element {
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
    <div>
      <h1>Home</h1>
      <EquipmentSearch setSearchState={setSearchStateHandler} />
      <NavLink to="/equipment/create">Create Equipment</NavLink>
      <EquipmentsList equipments={equipments} />
    </div>
  )
}
