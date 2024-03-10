import axios from "axios";

export class EspaiService{

  static async findAllEspaisDefecte(){
    return await axios.get(process.env.API + "/espai/listespaisdefecte")
  }

  static async findEspaisByPropietat(idPropietat){
    return await axios.get(process.env.API + `/espai/listespaispropietat/${idPropietat}`)
  }

  static async createEspaiDefecte(espai){
    try {
      return await axios.post(process.env.API + "/espai/createespaidefecte", espai, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al crear el espai defecte:", error);
      throw error;
    }
  }

  static async createEspai(espai){
    try {
      return await axios.post(process.env.API + "/espai/createespai", espai, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al crear el espai:", error);
      throw error;
    }
  }

  static async deleteEspaisDefecte(id){
    try {
      return await axios.delete(process.env.API + `/espai/deleteespaidefecte/${id}`);
    }catch (error){
      console.error("Error al eliminar el espai defecte:", error);
      throw error;
    }
  }

  static async deleteEspai(id){
    try {
      return await axios.delete(process.env.API + `/espai/deleteespai/${id}`);
    }catch (error){
      console.error("Error al eliminar el espai:", error);
      throw error;
    }
  }

}
