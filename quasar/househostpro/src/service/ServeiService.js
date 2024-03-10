import axios from "axios";

export class ServeiService{

  static async findAllServeis(){
    return await axios.get(process.env.API + "/servei/listserveis")
  }

  static async findServeiByid(id){
    return await axios.get(process.env.API + `/servei/servei/${id}`)
  }

  static async findServeisBypropietatId(id){
    return await axios.get(process.env.API + `/propietat/serveispropietat/${id}`)
  }

  static async create(servei){
    try {
      return await axios.post(process.env.API + "/servei/createservei", servei, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al crear servei:", error);
      throw error;
    }
  }

  static async delete(id){
    try {
      return await axios.delete(process.env.API + `/servei/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar el servei:", error);
      throw error;
    }
  }
}
