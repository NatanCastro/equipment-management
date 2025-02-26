import { equipmentTauriRepository } from "@/domain/repositories/impl";
import { newEquipmentService } from "@/domain/services";

export const useEquipmentService = () => newEquipmentService(equipmentTauriRepository);
