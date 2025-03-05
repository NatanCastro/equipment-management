import type { FindRecordsDTO } from "../dtos"
import type { Record } from "@/domain/models"

export type UseRecordStore = {
  records: Record[]
  setRecords: (records: Record[]) => void
  recordSearchState: FindRecordsDTO
  setRecordSearchState: (state: FindRecordsDTO) => void
}
