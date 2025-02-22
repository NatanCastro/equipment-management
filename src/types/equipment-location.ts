export type EquipmentLocation = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type FindEquipmentLocationDTO = {
  name: string;
  description: string;
};

export type FindOneEquipmentLocationDTO = {
  id: string;
};

export type CreateEquipmentLocationDTO = {
  name: string;
  description: string;
};

export type UpdateEquipmentLocationDTO = {
  id: string;
  name: string;
  description: string;
};

export type DeleteEquipmentLocationDTO = {
  id: string;
};
