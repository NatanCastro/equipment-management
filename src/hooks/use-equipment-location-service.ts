import { equipmentLocationTauriRepository } from "@/domain/repositories/impl";
import { newEquipmentLocationService } from "@/domain/services";

export const useEquipmentLocationService = () => newEquipmentLocationService(equipmentLocationTauriRepository);
