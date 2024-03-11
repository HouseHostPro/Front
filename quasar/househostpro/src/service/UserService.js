import axios from "axios";

export class UserService{

  static async login(user){
    try {
      const response = await axios.post(process.env.API + "/usuari/login",{
        email: user.email,
        contrasenya: user.contrasenya
      })
      return response;
    }catch (error){
      console.log(error,"el login no ha funcionado");
    }
  }

  static async create(user){
    try {
      const repuesta = await axios.post(process.env.API + "/usuari/create",user,{
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

  static async addRol(userRol){
    try {
      return await axios.post(process.env.API + "/usuari/addroluser", userRol, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch (error){
      console.error("Error al agregar el rol:", error);
      throw error;
    }
  }

  static async findAllUsers(){
    return await axios.get(process.env.API + "/usuari/list");
  }

  static async findAllRols(){
    return await axios.get(process.env.API + "/usuari/listrols");
  }

  static async findUserById(id){
    return await axios.get(process.env.API + `/usuari/usuaribyid/${id}`)
  }

  static async findUserByEmail(email){
    return await axios.get(process.env.API + `/usuari/usuaribyemail/${email}`)
  }

  static async findAllCiutats(){
    return await axios.get(process.env.API + "/ciutats");
  }

  static async delete(id){
    try {
      return await axios.delete(process.env.API + `/usuari/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }

  static fromJSONToUser(json){
    const user = new User(json.id,json.url);

    return user;
  }

}
