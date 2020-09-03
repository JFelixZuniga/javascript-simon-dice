const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 10

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar();
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500);
  
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1;
    //Hacemos refencia a los botones, elementos del DOM
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
    btnEmpezar.classList.remove("hide");
    } else {
    btnEmpezar.classList.add("hide");
    }
  }

  generarSecuencia(){
    //Generamos un Array con 10 elementos
    //Con FILL cambiamos todos los elementos de un arreglo a CERO
    //Con MAP creamos un nuevo array con el resultado de una función, o sea, nos permite transformar los elementos de un arreglo, devolviéndonos un nuevo arreglo con la misma longitud que el array inicial y con todos los elementos cambiados dependiendo de la función aplicada
    //Con Math.random obtenemos un número aleatorio entre CERO y UNO, y al multiplicarlo por 4, tendremos un número entre 0 y 3 decimal
    //Aplcamos Math.floor redondeamos para abajo, cuestión de obtener número "aleatorios" entre 0 y 3
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  //Ls idea es que cada siguiente nivel se ilumine la secuencia de colores
  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero){
    switch(numero){
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color){
    switch(color){
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia(){
    for (let i = 0; i < this.nivel; i++){
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color) {
    //Agregarmos el elemento CSS .light cambiando de color
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEvetosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)   
  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEvetosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }
  ganoElJuego(){
    swal('Platzi', 'Felicitacines, ganaste el juego!', 'success')
      .then(this.inicializar)
  }

  perdioElJuego(){
    swal('Platzi', 'Lo lamentamos, perdiste :(', 'error')
      .then(() => {
        this.eliminarEvetosClick()
        this.inicializar()
    })
  }
}


function empezarJuego() {
  window.juego = new Juego();
}
