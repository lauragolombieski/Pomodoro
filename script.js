const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBtn = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaPausar = new Audio('/sons/pause.mp3')
const musicaIniciar = new Audio('/sons/play.wav')
const terminou = new Audio('/sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const imagemPausar = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

tempoDecorridoEmSegundos = 1500
let intervaloId = null
musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else { 
        musica.pause()
}
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        terminou.play()
        alert ('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        zerar()
        iniciarOuPausarBt.textContent = 'Começar'
        imagemPausar.src = '/imagens/play_arrow.png'
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBtn.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervaloId) {
        musicaPausar.play()
        iniciarOuPausarBt.textContent = 'Retomar'
        imagemPausar.src = '/imagens/play_arrow.png'
        zerar()
        return
    }
    musicaIniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    imagemPausar.src = '/imagens/pause.png'
}

function zerar () {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()