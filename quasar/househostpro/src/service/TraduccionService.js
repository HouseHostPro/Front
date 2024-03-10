import axios from "axios";

export class TraduccionService{

  static async findTraduccionByCode(code){
    return await axios.get(process.env.API + `/traduccion/traduccion/${code}`)
  }
}
