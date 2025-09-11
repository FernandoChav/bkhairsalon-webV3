// Tipos para timestamps
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

// Tipos para entidades base
export interface BaseEntity extends Timestamps {
  id: string;
}
