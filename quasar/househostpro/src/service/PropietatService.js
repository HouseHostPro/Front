import axios from "axios";

export class PropietatService{

  static async findAllPropietats(){
    return await axios.get(process.env.API + "/propietat/listpropietats");
  }

  static async findPropietatByid(id){
    return await axios.get(process.env.API + `/propietat/propietat/${id}`)
  }

  static async findPlantillas(){
    return await axios.get(process.env.API + "/propietat/listplantillas")
  }
  static async findPropietatsByUserId(id_user){
    return await axios.get(process.env.API + `/propietat/userpropietat/${id_user}`);
  }

  static async findPropietatByNom(nom){
    return await axios.get(process.env.API + `/propietat/propietatbynom/${nom}`);
  }

  static async create(propietat){
    try {
      return await axios.post(process.env.API + "/propietat/createpropietat", propietat, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al crear domini:", error);
      throw error;
    }
  }

  static async addEspai(dominiEspai){
    try {
      return await axios.post(process.env.API + "/propietat/addespai", dominiEspai, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al agregar el espai:", error);
      throw error;
    }
  }

  static async delete(id){
    try {
      return await axios.delete(process.env.API + `/propietat/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar la propietat:", error);
      throw error;
    }
  }
}
