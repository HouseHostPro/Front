import axios from "axios";

export class ReservaService{

  static async findAllReserves(){
    return await axios.get("http://localhost:8080/reserva/listreservas");
  }

  static async findReservesByUserId(id_user){
    return await axios.get(`http://localhost:8080/reserva/reservasuser/${id_user}`);
  }
}
