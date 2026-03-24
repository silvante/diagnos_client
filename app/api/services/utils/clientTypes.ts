export type CreateClientType = {
  name: string;
  surname: string;
  born_in: number;
  origin: string;
  price: number;
  type_ids: [number];
};

export type UpdateClientType = {
  name: string;
  surname: string;
  born_in: number;
  origin: string;
  price: number;
  type_ids: [number];
};
