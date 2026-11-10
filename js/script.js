// Clicar na tarefa OU no checkbox risca o texto e sincroniza os dois
const tarefaConcluida = document.getElementById("minhaUL");
tarefaConcluida.addEventListener("click", function(evento) {
    const alvo = evento.target;

    // Se clicou na tarefa (LI): inverte o checkbox e risca conforme ele ficou
    if (alvo.tagName === "LI") {
        const checkbox = alvo.querySelector("input");
        checkbox.checked = !checkbox.checked;
        alvo.classList.toggle("tarefa-concluida", checkbox.checked);
    }

    // Se clicou no checkbox (INPUT): risca ou desrisca o LI conforme o checkbox
    if (alvo.tagName === "INPUT") {
        alvo.parentElement.classList.toggle("tarefa-concluida", alvo.checked);
    }
});

// É aqui que ta sendo criado o LI dinâmico junto com o checkbox e o botao de delete
function newElement() {
    // Pegamos o valor digitado no input
    let input = document.getElementById("meuInput");
    let tarefa = input.value.trim();

    // Verificamos se o usuário digitou alguma coisa
    if (tarefa === "") {
        alert("Digite uma tarefa!");
        return;
    }
    // Criamos um novo elemento li
    let li = document.createElement("li");
    // Colocamos o texto da tarefa dentro dele
    li.textContent = tarefa;

    // Adiciona um botão de remover quando um item é adicionado na lista
    let botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.classList.add("remover");

    // Serve pra remover algum item que foi criado pela lista 
    botaoRemover.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(botaoRemover);
    document.getElementById("minhaUL").appendChild(li);

    // Serve pra criar um checkbox juntamente quando um item da lista é adicionado
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.append(checkbox);

    // Limpamos o input
    input.value = "";
}






