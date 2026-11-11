// Pegamos os elementos principais uma única vez, para usar no arquivo todo
const lista = document.getElementById("minhaUL");
const input = document.getElementById("meuInput");

// Salva todas as tarefas da tela no localStorage
function salvarTarefas() {
    const tarefas = [];
    const itens = lista.querySelectorAll("li");

    itens.forEach(function(li) {
        tarefas.push({
            // firstChild é o texto da tarefa (sem o texto do botão "Remover")
            texto: li.firstChild.textContent,
            // true se o item está riscado, false se não está
            concluida: li.classList.contains("tarefa-concluida")
        });
    });

    // localStorage só guarda texto, por isso transformamos a lista em JSON
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cria um LI na tela com o checkbox e o botão de remover
function criarTarefa(texto, concluida) {
    // Criamos um novo elemento li e colocamos o texto da tarefa dentro dele
    let li = document.createElement("li");
    li.textContent = texto;

    // Adiciona um botão de remover quando um item é adicionado na lista
    let botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("remover");

    // Serve pra remover algum item que foi criado pela lista
    botaoRemover.addEventListener("click", function() {
        li.remove();
        salvarTarefas();
    });

    li.appendChild(botaoRemover);

    // Serve pra criar um checkbox juntamente quando um item da lista é adicionado
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = concluida;
    li.append(checkbox);

    // Se a tarefa já estava concluída, ela volta riscada
    if (concluida) {
        li.classList.add("tarefa-concluida");
    }

    lista.appendChild(li);
}

// Lê o que foi salvo e recria as tarefas na tela
function carregarTarefas() {
    const salvas = localStorage.getItem("tarefas");

    // Se nunca salvou nada, não tem o que carregar
    if (salvas === null) {
        return;
    }

    // Transforma o texto JSON de volta em uma lista de tarefas
    const tarefas = JSON.parse(salvas);

    tarefas.forEach(function(tarefa) {
        criarTarefa(tarefa.texto, tarefa.concluida);
    });
}

// Clicar na tarefa OU no checkbox risca o texto e sincroniza os dois
lista.addEventListener("click", function(evento) {
    const alvo = evento.target;

    // Se clicou na tarefa (LI): inverte o checkbox e risca conforme ele ficou
    if (alvo.tagName === "LI") {
        const checkbox = alvo.querySelector("input");
        checkbox.checked = !checkbox.checked;
        alvo.classList.toggle("tarefa-concluida", checkbox.checked);
        salvarTarefas();
    }

    // Se clicou no checkbox (INPUT): risca ou desrisca o LI conforme o checkbox
    if (alvo.tagName === "INPUT") {
        alvo.parentElement.classList.toggle("tarefa-concluida", alvo.checked);
        salvarTarefas();
    }
});

// Chamada pelo botão "Adicionar" e também pela tecla Enter
function newElement() {
    // Pegamos o valor digitado no input
    let tarefa = input.value.trim();

    // Verificamos se o usuário digitou alguma coisa
    if (tarefa === "") {
        alert("Digite uma tarefa!");
        return;
    }

    criarTarefa(tarefa, false);
    salvarTarefas();

    // Limpamos o input
    input.value = "";
}

// Apertar Enter dentro do campo também adiciona a tarefa
input.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        newElement();
    }
});

// Quando a página abre, recupera as tarefas salvas
carregarTarefas();
