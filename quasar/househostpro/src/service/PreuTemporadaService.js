import axios from "axios";

export class PreuTemporadaService{

  static async findPreuTemporadaById(id){
    return await axios.get(`http://localhost:8080/preutemporada/preutempid/${id}`);
  }

  static async findPreuTemporadaBypropietatId(id_propietat){
    return await axios.get(`http://localhost:8080/preutemporada/preutemporadapropietat/${id_propietat}`);
  }

  static async create(preutemporada){
    try {
      const repuesta = await axios.post("http://localhost:8080/preutemporada/createpreutemporada",preutemporada,{
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
      return await axios.delete(`http://localhost:8080/preutemporada/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar el preu temporada:", error);
      throw error;
    }
  }
}
