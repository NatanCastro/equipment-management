import type { EquipmentLocation, EquipmentWithLocation } from "@/domain/models"

export type CreateRecordStore = {
  equipments: EquipmentWithLocation[]
  setEquipments: (partialState: EquipmentWithLocation[]) => void
  locations: EquipmentLocation[]
  setLocations: (locations: EquipmentLocation[]) => void
  selectedEquipments: EquipmentWithLocation[]
  setSelectedEquipments: (selectedEquipments: EquipmentWithLocation[]) => void
}
