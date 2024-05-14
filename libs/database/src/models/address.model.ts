import { BaseModel } from "./base.model";


export interface AddressModel extends BaseModel {

  // ID do usuário associado ao endereço.
  user_id: string;
  // Nome da rua.
  street: string;
  // Número da rua.
  number: string;
  // Complemento do endereço (opcional).
  complement: string;
  // Cidade.
  city: string;
  // Estado ou província.
  state: string;
  // País.
  country: string;
  // CEP.
  zipCode: string;

  latitude?: number;

  longitude?: number;


}
