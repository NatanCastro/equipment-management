import { equipmentTauriRepository } from "@/domain/repositories/implementations";
import { newEquipmentService } from "@/domain/services";
import { createContext, useContext } from "react";

const equipmentServiceContext = createContext(newEquipmentService(equipmentTauriRepository));

export const useEquipmentService = () => useContext(equipmentServiceContext);
