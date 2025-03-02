pub struct ShortEquipement {
    pub id: String,
    pub service_tag: String,
}

pub struct History {
    pub id: String,
    pub title: String,
    pub description: String,
    pub equipments: Vec<ShortEquipement>,
    pub created_at: String,
    pub updated_at: String,
}
