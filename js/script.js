// Quando eu clico em alguma tarefa ela vai riscar e ser marcada como "concluída"
const tarefaConcluida = document.getElementById("minhaUL");
tarefaConcluida.addEventListener("click", function(evento) {
    if (evento.target.tagName === "LI") {
        evento.target.classList.toggle("tarefa-concluida");
    }
});

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
    input.value = "";

    // Serve pra criar um checkbox juntamente quando um item da lista é adicionado
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.append(checkbox);

    
    // Limpamos o input
    input.value = "";
}






