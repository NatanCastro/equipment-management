import { equipmentLocationTauriRepository } from "@/domain/repositories/implementations"
import { newEquipmentLocationService } from "@/domain/services"
import { createContext, useContext } from "react"

const equipmentLocationServiceContext = createContext(
	newEquipmentLocationService(equipmentLocationTauriRepository)
)

export const useEquipmentLocationService = () =>
	useContext(equipmentLocationServiceContext)
