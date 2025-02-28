import { equipmentLocationTauriRepository } from "@/domain/repositories/impl";
import { newEquipmentLocationService } from "@/domain/services";
import { createContext, useContext } from "react";

const equipmentLocationServiceContext = createContext(newEquipmentLocationService(equipmentLocationTauriRepository));

export const useEquipmentLocationService = () => useContext(equipmentLocationServiceContext);
