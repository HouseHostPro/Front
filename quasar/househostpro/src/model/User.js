class User{
  #nom;
  #contrasenya;
  #email;
  #cognom1;
  #cognom2;
  #telefon;
  #direccio;
  #ciutat_id;


  constructor(nom, contrasenya, email, cognom1, cognom2, telefon, direccio, ciutat_id) {
    this.#nom = nom;
    this.#contrasenya = contrasenya;
    this.#email = email;
    this.#cognom1 = cognom1;
    this.#cognom2 = cognom2;
    this.#telefon = telefon;
    this.#direccio = direccio;
    this.#ciutat_id = ciutat_id;
  }
}
