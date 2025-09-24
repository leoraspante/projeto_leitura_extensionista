// ====== PROJETO LEITURA EXTENSIONISTA ======
// Este arquivo contém o JavaScript do site
// Fiz comentários bem explicativos para ajudar no aprendizado :)

// Espera o HTML carregar antes de rodar o JS
document.addEventListener('DOMContentLoaded', () => {

    // ===== FILTRO DE BUSCA =====
    // Pega o campo de busca pelo ID
    const campoBusca = document.getElementById('busca');

    // Se o campo existir, adiciona o evento de digitar
    if (campoBusca) {
        campoBusca.addEventListener('input', function () {
            // Pega o que o usuário digitou e deixa em minúsculo
            const termo = this.value.toLowerCase();

            // Seleciona todos os <li> dentro da seção de obras
            const obras = document.querySelectorAll('#obras li');

            // Para cada obra, verifica se o texto contém o termo digitado
            obras.forEach(obra => {
                const texto = obra.textContent.toLowerCase();
                // Se encontrar, mostra; se não, esconde
                obra.style.display = texto.includes(termo) ? '' : 'none';
            });
        });
    }

    // ===== QUIZ =====
    // Função chamada quando o usuário clica no botão "Começar Quiz"
    window.iniciarQuiz = function () {
        // Perguntas simples para o usuário responder
        const perguntas = [
            { pergunta: "Você prefere histórias reais ou fictícias?", opcoes: ["Reais", "Fictícias"] },
            { pergunta: "Você gosta de reflexões filosóficas?", opcoes: ["Sim", "Não"] },
            { pergunta: "Prefere autores brasileiros ou estrangeiros?", opcoes: ["Brasileiros", "Estrangeiros"] }
        ];

        let respostas = [];

        // Para cada pergunta, abre um prompt e guarda a resposta
        perguntas.forEach(p => {
            let resposta = prompt(`${p.pergunta}\n${p.opcoes.join(" / ")}`);
            if (resposta) respostas.push(resposta.trim().toLowerCase());
        });

        // Variável que vai guardar a sugestão final
        let sugestao;

        // Regras bem simples para decidir a sugestão
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

        // Mostra o resultado na tela (em vez de só no prompt)
        document.getElementById('resultadoQuiz').textContent = `Sugestão de leitura: ${sugestao}`;
    };

    // ===== KANBAN =====
    // Função para adicionar uma tarefa em uma coluna
    function adicionarTarefa(colunaId, texto) {
        const coluna = document.getElementById(colunaId);
        if (!coluna) return; // se não achar a coluna, sai da função

        // Cria um novo item de lista (<li>)
        const li = document.createElement('li');
        li.textContent = texto;
        li.draggable = true; // deixa arrastável

        // Evento quando começa a arrastar
        li.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', texto);
            e.target.classList.add('arrastando');
        });

        // Evento quando solta o item
        li.addEventListener('dragend', e => {
            e.target.classList.remove('arrastando');
        });

        // Coloca o item dentro da coluna
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

    // Tarefas iniciais só para exemplo
    adicionarTarefa('afazer', 'Ler A República – Platão');
    adicionarTarefa('afazer', 'Ler Dom Casmurro – Machado de Assis');

});
