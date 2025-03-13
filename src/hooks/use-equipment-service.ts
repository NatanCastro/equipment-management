import { equipmentTauriRepository } from "@/domain/repositories/implementations"
import { equipmentServiceFactory } from "@/domain/services"
import { createContext, useContext } from "react"

const equipmentServiceContext = createContext(
	equipmentServiceFactory(equipmentTauriRepository)
)

export const useEquipmentService = () => useContext(equipmentServiceContext)
