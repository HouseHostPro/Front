import axios from "axios";

export class ReservaService{

  static async findAllReserves(){
    return await axios.get(process.env.API + "/reserva/listreservas");
  }

  static async findReservesByUserId(id_user){
    return await axios.get(process.env.API + `/reserva/reservasuser/${id_user}`);
  }

  static async findReservesByPropietatId(id_propietat){
    return await axios.get(process.env.API + `/reserva/reservaspropietat/${id_propietat}`);
  }

  static async findReservesById(id){
    return await axios.get(process.env.API + `/reserva/reserva/${id}`);
  }

  static async create(reserva){
    try {
      const repuesta = await axios.post(process.env.API + "/reserva/create",reserva,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return repuesta;
    }catch (error){
      console.error("Error al crear reserva:", error);
      throw error;
    }
  }

  static async delete(id){
    try {
      return await axios.delete(process.env.API + `/reserva/delete/${id}`);
    }catch (error){
      console.error("Error al eliminar la reserva:", error);
      throw error;
    }
  }
}
