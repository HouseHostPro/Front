import axios from "axios";

export class ConfiguracionsService{

  static async findAllConfiguracions(){
    return await axios.get(process.env.API + "/configuracio/listconfiguracions");
  }

  static async findConfiguracioById(id){
    return await axios.get(process.env.API + `/configuracio/config/${id}`)
  }

  static async findConfiguracionsByPropietat(id_propietat){
    return await axios.get(process.env.API + `/configuracio/configpropietat/${id_propietat}`)
  }

  static async findConfiguracioByClauAndPropietat(clau,id){
    return await axios.get(process.env.API + `/configuracio/configclaudomini/${clau}/${id}`)
  }

  static async create(config){
    try {
      return await axios.post(process.env.API + "/configuracio/createconfiguracio", config, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al crear configuracio:", error);
      throw error;
    }
  }

  static async delete(id){
    try {
      return await axios.delete(process.env.API + `/configuracio/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar la configuracio:", error);
      throw error;
    }
  }
}

