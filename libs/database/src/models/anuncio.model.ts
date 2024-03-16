import { BaseModel } from "./base.model"

export class AnuncioModel extends BaseModel {
    id : string
    descricao : string
    disponivel : boolean
    doacao : boolean
    user_id : string
    created_at : Date
    updated_at : Date
}