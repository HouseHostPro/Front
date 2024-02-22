import axios from "axios";

export class ConfiguracionsService{

  static async findAllConfiguracions(){
    return await axios.get("http://localhost:8080/configuracio/listconfiguracions");
  }

  static async findConfiguracionsByPropietat(id_propietat){
    return await axios.get(`http://localhost:8080/configuracio/configpropietat/${id_propietat}`)
  }

  static async findConfiguracioByClauAndPropietat(clau,id){
    return await axios.get(`http://localhost:8080/configuracio/configclaudomini/${clau}/${id}`)
  }

  static async create(config){
    try {
      const repuesta = await axios.post("http://localhost:8080/configuracio/createpropietat",config,{
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
      return await axios.delete(`http://localhost:8080/configuracio/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }
}

