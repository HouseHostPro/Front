import axios from "axios";

export class PreuTemporadaService{

  static async findPreuTemporadaById(id){
    return await axios.get(process.env.API + `/preutemporada/preutempid/${id}`);
  }

  static async findPreuTemporadaBypropietatId(id_propietat){
    return await axios.get(process.env.API + `/preutemporada/preutemporadapropietat/${id_propietat}`);
  }

  static async create(preutemporada){
    try {
      const repuesta = await axios.post(process.env.API + "/preutemporada/createpreutemporada",preutemporada,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return repuesta;
    }catch (error){
      console.error("Error al crear preu temporada:", error);
      throw error;
    }
  }

  static async delete(id){
    try {
      return await axios.delete(process.env.API + `/preutemporada/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar el preu temporada:", error);
      throw error;
    }
  }
}
