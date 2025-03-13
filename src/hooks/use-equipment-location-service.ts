import { equipmentLocationTauriRepository } from "@/domain/repositories/implementations"
import { equipmentLocationServiceFactory } from "@/domain/services"
import { createContext, useContext } from "react"

const equipmentLocationServiceContext = createContext(
	equipmentLocationServiceFactory(equipmentLocationTauriRepository)
)

export const useEquipmentLocationService = () =>
	useContext(equipmentLocationServiceContext)
