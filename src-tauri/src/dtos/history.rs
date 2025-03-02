use super::equipment::UpdateEquipmentDto;

pub struct NewHistoryDto {
    pub title: String,
    pub description: String,
    pub updated_equipments: Vec<UpdateEquipmentDto>,
}

pub struct UpdateHistoryDto {
    pub id: String,
    pub title: String,
    pub description: String,
    pub equipment_ids: Vec<String>,
}

pub struct DeleteHistoryDto {
    pub id: String,
}

pub struct FindHistoryDto {
    pub title: String,
    pub description: String,
    pub equipment_id: String,
}

pub struct FindOneHistoryDto {
    pub id: String,
}
