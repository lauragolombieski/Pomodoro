

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const tarefasConcluidas = document.querySelector ('.listaConcluidos')
const btnRemoverConcluidas = document.querySelector ('#btn-remover-concluidas')
const btnRemoverTodos = document.querySelector ('#btn-remover-todas')
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
const btnDeletar = document.querySelector('.app__form-footer__button--delete')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let litarefaSelecionada = null


function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))}

function criarElementoTarefa (tarefa) {
    let li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" 
                fill="#01080E"></path>
        </svg>
    `
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescricao = prompt("Nova descrição da tarefa: ", tarefa.descricao)
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
            return
        } else {
            return
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg, paragrafo, botao)

    if (tarefa.status === 'concluida') {
        li.classList.add('app__section-task-list-item-complete')
        li.querySelector('button').setAttribute('disabled', 'disabled')
    }

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
        })
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            litarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        litarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        li.classList.add('app__section-task-list-item-active')
    }

    svg.onclick = () => {

        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
        item = tarefa.descricao

        if (li.classList.value == 'app__section-task-list-item app__section-task-list-item-active') {
            li.classList.add('app__section-task-list-item-complete')
            ulTarefas.removeChild(li)

            tarefasConcluidas.appendChild(li);

            tarefas = tarefas.map(tarefa => {
                if(item === tarefa.descricao ) {
                    return {...tarefa, status: 'concluida'}
                }
                return tarefa
            })

            localStorage.setItem('tarefas', JSON.stringify(tarefas))

            window.location.reload();
            
        } else {
            li.classList.remove('app__section-task-list-item-complete')
            li.querySelector('button').removeAttribute('disabled')

            tarefasConcluidas.removeChild(li)
            ulTarefas.appendChild(li)

            tarefas = tarefas.map(tarefa => {
                if(item === tarefa.descricao ) {
                    return {...tarefa, status: 'pendente'}
                }
                return tarefa
            })

            localStorage.setItem('tarefas', JSON.stringify(tarefas))
        }
    }
    
    return li
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) => {

    evento.preventDefault()
    const tarefa = {
        descricao: textarea.value,
        status: 'pendente'
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    atualizarTarefas()
    ulTarefas.append(elementoTarefa)
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)

    if (tarefa.status === 'concluida') {
        tarefasConcluidas.append(elementoTarefa)
    } else {
        ulTarefas.append(elementoTarefa)
    }
})

btnCancelar.addEventListener('click', () => {
    formAdicionarTarefa.classList.add('hidden')
})

btnDeletar.addEventListener('click', () => {
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

btnRemoverConcluidas.addEventListener('click', () => {
    tarefasConcluidas.innerHTML = ''
    tarefas = tarefas.filter(tarefa => tarefa.status !== 'concluida')
    atualizarTarefas()
})

btnRemoverTodos.addEventListener('click', () => {
    tarefasConcluidas.innerHTML = ''
    tarefas = []
    atualizarTarefas()
    window.location.reload();
})
