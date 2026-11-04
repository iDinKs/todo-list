const tarefaConcluida = document.getElementById("minhaUL");

tarefaConcluida.addEventListener("click", function(evento) {
    if (evento.target.tagName === "LI") {
        evento.target.classList.toggle("tarefa-concluida");
    }
});
