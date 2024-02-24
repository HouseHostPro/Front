import axios from "axios";

export class PropietatService{

  static async findAllPropietats(){
    return await axios.get("http://localhost:8080/propietat/listpropietats");
  }

  static async findPropietatByid(id){
    return await axios.get(`http://localhost:8080/propietat/propietat/${id}`)
  }

  static async findPlantillas(){
    return await axios.get("http://localhost:8080/propietat/listplantillas")
  }
  static async findPropietatsByUserId(id_user){
    return await axios.get(`http://localhost:8080/propietat/userpropietat/${id_user}`);
  }

  static async findPropietatByNom(nom){
    return await axios.get(`http://localhost:8080/propietat/propietatbynom/${nom}`);
  }

  static async create(propietat){
    try {
      const repuesta = await axios.post("http://localhost:8080/propietat/createpropietat",propietat,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return repuesta;
    }catch (error){
      console.error("Error al crear domini:", error);
      throw error;
    }
  }

  static async delete(id){
    try {
      return await axios.delete(`http://localhost:8080/propietat/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar la propietat:", error);
      throw error;
    }
  }
}
