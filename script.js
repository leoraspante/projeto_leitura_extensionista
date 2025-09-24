// ===== FILTRO DE BUSCA =====
// Filtra as obras conforme o texto digitado
document.getElementById('busca').addEventListener('input', function () {
    const termo = this.value.toLowerCase();
    const obras = document.querySelectorAll('#obras li');

    obras.forEach(obra => {
        const texto = obra.textContent.toLowerCase();
        obra.style.display = texto.includes(termo) ? '' : 'none';
    });
});

// ===== QUIZ =====
// Perguntas simples para sugerir uma obra
function iniciarQuiz() {
    const perguntas = [
        { pergunta: "Você prefere histórias reais ou fictícias?", opcoes: ["Reais", "Fictícias"] },
        { pergunta: "Você gosta de reflexões filosóficas?", opcoes: ["Sim", "Não"] },
        { pergunta: "Prefere autores brasileiros ou estrangeiros?", opcoes: ["Brasileiros", "Estrangeiros"] }
    ];

    let respostas = [];

    perguntas.forEach(p => {
        let resposta = prompt(`${p.pergunta}\n${p.opcoes.join(" / ")}`);
        if (resposta) respostas.push(resposta.trim().toLowerCase());
    });

    let sugestao;

    if (respostas.includes("sim") && respostas.includes("estrangeiros")) {
        sugestao = "Meditações – Marco Aurélio";
    } else if (respostas.includes("sim") && respostas.includes("brasileiros")) {
        sugestao = "A República – Platão";
    } else if (respostas.includes("fictícias") && respostas.includes("brasileiros")) {
        sugestao = "Dom Casmurro – Machado de Assis";
    } else if (respostas.includes("fictícias") && respostas.includes("estrangeiros")) {
        sugestao = "Romeu e Julieta – William Shakespeare";
    } else {
        sugestao = "Cartas a Lucílio – Sêneca";
    }

    document.getElementById('resultadoQuiz').textContent = `Sugestão de leitura: ${sugestao}`;
}

// ===== KANBAN =====
// Adiciona uma tarefa na coluna indicada
function adicionarTarefa(colunaId, texto) {
    const coluna = document.getElementById(colunaId);
    const li = document.createElement('li');
    li.textContent = texto;
    li.draggable = true;

    li.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', texto);
        e.target.classList.add('arrastando');
    });

    li.addEventListener('dragend', e => {
        e.target.classList.remove('arrastando');
    });

    coluna.appendChild(li);
}

// Permite arrastar e soltar entre colunas
document.querySelectorAll('.coluna ul').forEach(lista => {
    lista.addEventListener('dragover', e => e.preventDefault());

    lista.addEventListener('drop', e => {
        e.preventDefault();
        const texto = e.dataTransfer.getData('text/plain');
        adicionarTarefa(lista.id, texto);
    });
});

// Tarefas iniciais para exemplo
adicionarTarefa('afazer', 'Ler A República – Platão');
adicionarTarefa('afazer', 'Ler Dom Casmurro – Machado de Assis');
