export default class Slide {
  constructor(slide, wrapper) {
    // Armazena o slide que vai ser animado.
    this.slide = document.querySelector(slide);

    // Armazena o wrapper do elemento que vai ser animado.
    this.wrapper = document.querySelector(wrapper);
  }

  // Função que inicia os eventos de slide, ela 
  // adiciona o evento de mousemove ao wrapper.
  onStart(event) {
    event.preventDefault();
    console.log('mousedown');
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    console.log('moveu');
  }

  // Função que termina os eventos do slide, ela 
  // remove o mousemove do wrapper.
  onEnd(event) {
    console.log('acabou');
    this.wrapper.removeEventListener('mousemove', this.onMove);
  }

  // Função que adiciona os eventos ao wrapper 
  // para que haja a interação com o elemento.
  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  // Função que ativa os binds necessários 
  // para os callbacks.
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Função que inicia os métodos da classe,
  // ela começa pelo bindEvents() para que o 
  // "this" dos métodos esteja correto.
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}