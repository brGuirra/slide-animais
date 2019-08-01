export default class Slide {
  constructor(slide, wrapper) {
    // Armazena o slide que vai ser animado.
    this.slide = document.querySelector(slide);

    // Armazena o wrapper do elemento que vai ser animado.
    this.wrapper = document.querySelector(wrapper);

    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  // Função que adiciona a proprieda "tranform" no
  // elemento no DOM para que ela se mova conforme o
  // valor de "distX", que contém a posição final do e
  // elemento.
  moveSlide(distX) {
    // Essa propriedade armazena a posição 
    // onde o elemento esteve a última vez. 
    // Esse valor é utlizado com referência 
    // para começar o loop de eventos de onde 
    // o elemento tinha parado anteriormente.
    this.dist.movedPosition = distX;

    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  // Função que atualiza a posição do elemento 
  // conforme o mouse se move pela tela.
  updatePosition(clientX) {
    // O cálculo do movimento é feito pegando 
    // a distância inicial onde ocorreu o primeiro
    // click do usuário e subtraindo esse valor 
    // da propriedade "clientX" do evento que é
    // atualiza quando o mouse é movido. Esse valor 
    // então é multiplicado por 1.6 para que o 
    // movimento do elemento seja mais fluido.
    this.dist.movement = (this.dist.startX - clientX) * 1.6;

    // Retorna a distância final do elemento 
    // subtraída a distância de movimento para que 
    // quando o elemento precisar se mover novamente
    // isso comece de onde ele parou, se o valor for
    // somando ao invés de subtraído inverte o eixo de
    // movimentação.
    return this.dist.finalPosition - this.dist.movement;
  }

  // Função que inicia os eventos de slide, ela 
  // adiciona o evento de mousemove ao wrapper.
  onStart(event) {
    let moveType;

    // Verifica qual tipo de evento que ocorreu.
    if (event.type === 'mousedown') {
      event.preventDefault();

      // O valor da propriedade "clientX" 
      // indica em que lugar da página 
      // foi feito o click. Isso serve como
      // referência para identificar o 
      // movimento do elemento.
      this.dist.startX = event.clientX;
      
      // Atribiu o evento de mousemove.
      moveType = 'mousemove';
    } else {
      // No caso to toque as propriedades não 
      // iguais, no valor abaixo é pego a posição
      // onde ocorreu o primeiro toque do usuráio.
      this.dist.startX = event.changedTouches[0].clientX;

      // Atribui o evento de touchmove
      moveType = 'touchmove';
    }
    
    this.wrapper.addEventListener(moveType, this.onMove);
  }

  // Função que move o elemento pela tela
  // com base nos valores cálculados.
  onMove(event) {
    // Essa variável armazena a posição do ponteiro,
    // foi criado um ternáro porque o nome da propriedade
    // que armazena esse valor muda conforme o tipo do evento.
    const pointerPosition = (event.type === 'mousemove') ? event.clientX 
      : event.changedTouches[0].clientX;

    // Armazena a posição final do elemento,
    // ou seja, onde o usuário soltou o click.
    const finalPosition = this.updatePosition(pointerPosition);

    // Ativa a função para mover o elemento no
    // DOM com base no valor da posição final 
    // do mouse.
    this.moveSlide(finalPosition);
  }

  // Função que termina os eventos do slide, ela 
  // remove o mousemove do wrapper.
  onEnd(event) {
    // Essa variável identifica o tipo de evento
    // que está sendo usado para movimentar 
    // o elemento na tela. É preciso saber isso 
    // para que o evento seja encerrado corretamente.
    const moveType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';

    // Remove o evento de "mousemove" do wrapper.
    this.wrapper.removeEventListener(moveType, this.onMove);

    this.dist.finalPosition = this.dist.movedPosition;
  }

  // Função que adiciona os eventos ao wrapper 
  // para que haja a interação com o elemento.
  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
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