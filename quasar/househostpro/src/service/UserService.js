import axios from "axios";

export class UserService{

  static async login(user){
    const response = await axios.post("http://localhost:8080/usuari/login",{
      email: user.email,
      contrasenya: user.contrasenya
    })
    return response;
  }

  static async create(user){
    try {
      const repuesta = await axios.post("http://localhost:8080/usuari/create",user,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return repuesta;
    }catch (error){
      console.error("Error al crear usuario:", error);
      throw error;
    }

  }

  static async findAllUsers(){
    return await axios.get("http://localhost:8080/usuari/list");
  }

  static async findAllCiutats(){
    return await axios.get("http://localhost:8080/ciutats");
  }

  static async delete(id){
    try {
      return await axios.post("http://localhost:8080/usuari/delete",id,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }

  }

  static async update(id){
    try {
      return await axios.post("http://localhost:8080/usuari/update",id,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al editar el usuario:", error);
      throw error;
    }
  }

  static fromJSONToUser(json){
    const user = new User(json.id,json.url);

    return user;
  }

}
