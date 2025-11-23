import { initAuth, logout } from '../assets/js/utils/auth.js';

document.addEventListener("DOMContentLoaded", () => {
    initAuth(); // verifica se o usuário tá logado e controla a sidebar

    // Botão de logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', logout);
    }

    /* ========================================
                    PESQUISA NA TABELA
    ========================================*/

    const inputPesquisa = document.getElementById("pesquisa");
    const linhasTabela = document.querySelectorAll(".table_conteudo tbody tr");

    function limparDestaques(elemento) {
        elemento.innerHTML = elemento.textContent;
    }

    function destacarTexto(celula, termo) {
        const textoOriginal = celula.textContent;
        const regex = new RegExp(`(${termo})`, "gi");
        celula.innerHTML = textoOriginal.replace(regex, `<span class="highlight">$1</span>`);
    }

    function filtrarTabela() {
        const termo = inputPesquisa.value.trim().toLowerCase();
        const termos = termo.split(",").map(t => t.trim()).filter(t => t !== "");

        linhasTabela.forEach(linha => {
            const celulas = linha.querySelectorAll("td");
            let corresponde = false;

            celulas.forEach(celula => {
                limparDestaques(celula);

                if (termos.some(termo => celula.textContent.toLowerCase().includes(termo))) {
                    corresponde = true;
                    termos.forEach(termo => {
                        if (celula.textContent.toLowerCase().includes(termo)) {
                            destacarTexto(celula, termo);
                        }
                    });
                }
            });

            linha.style.display = corresponde || termos.length === 0 ? "" : "none";
        });
    }

    inputPesquisa.addEventListener("input", filtrarTabela);



    /* ========================================
                    FILTRO POPUP
    ======================================== */

    const filterButton = document.getElementById("filter-button");
    const popupFiltro = document.getElementById("popupFiltro");

    filterButton.addEventListener("click", (e) => {
        e.stopPropagation();
        popupFiltro.style.display = popupFiltro.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
        if (!popupFiltro.contains(e.target) && e.target !== filterButton) {
            popupFiltro.style.display = "none";
        }
    });



    /* ========================================
                DESMARCAR RADIOS
    ======================================== */

    const radios = popupFiltro.querySelectorAll('input[type="radio"]');
    let radioSelecionado = null;

    radios.forEach(radio => {
        radio.addEventListener('click', () => {
            if (radioSelecionado === radio) {
                radio.checked = false;
                radioSelecionado = null;
            } else {
                radioSelecionado = radio;
            }
        });
    });



    /* ========================================
            FILTRO FUNCIONAL
    ======================================== */

    document.querySelector(".btn_filtrar").addEventListener("click", (e) => {
        e.preventDefault();

        const sexoFiltro = popupFiltro.querySelector('input[name="sexo"]:checked')?.value;
        const tipoFiltro = popupFiltro.querySelector('input[name="tipoUsuario"]:checked')?.value;
        const ordenar = popupFiltro.querySelector('input[name="ordenar"]:checked')?.value;

        const linhas = [...document.querySelectorAll("tbody tr")];

        linhas.forEach(linha => {
            const nomeLinha = linha.children[1].textContent.trim().toLowerCase();
            const tipoLinha = linha.children[2].textContent.trim().toLowerCase();
            const sexoLinha = linha.children[4].textContent.trim().toLowerCase();

            let mostrar = true;

            if (sexoFiltro) {
                if (sexoFiltro === "masculino" && sexoLinha !== "m") mostrar = false;
                if (sexoFiltro === "feminino" && sexoLinha !== "f") mostrar = false;
            }

            if (tipoFiltro) {
                if (tipoFiltro === "usuario" && tipoLinha !== "comum") mostrar = false;
                if (tipoFiltro === "administrador" && tipoLinha !== "administrador") mostrar = false;
            }

            linha.style.display = mostrar ? "" : "none";
        });

        if (ordenar) {
            const tbody = document.querySelector("tbody");

            const ordenado = linhas.sort((a, b) => {
                const nomeA = a.children[1].textContent.trim().toLowerCase();
                const nomeB = b.children[1].textContent.trim().toLowerCase();

                return ordenar === "asc"
                    ? nomeA.localeCompare(nomeB)
                    : nomeB.localeCompare(nomeA);
            });

            ordenado.forEach(l => tbody.appendChild(l));
        }

        popupFiltro.style.display = "none";
    });



    /* ========================================
            GERAR PDF DA TABELA
    ======================================== */

    document.getElementById("download-button").addEventListener("click", async () => {
        const { jsPDF } = window.jspdf;

        const tabelaOriginal = document.querySelector(".envoltura_tabela");
        const cloneTabela = tabelaOriginal.cloneNode(true);

        const ths = cloneTabela.querySelectorAll("th");
        let indiceOpcoes = -1;

        ths.forEach((th, i) => {
            if (th.textContent.trim().toLowerCase() === "opções") indiceOpcoes = i;
        });

        if (indiceOpcoes !== -1) {
            cloneTabela.querySelectorAll("tr").forEach(tr => {
                const cells = tr.querySelectorAll("th, td");
                if (cells[indiceOpcoes]) cells[indiceOpcoes].remove();
            });
        }

        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.left = "-9999px";
        tempDiv.appendChild(cloneTabela);
        document.body.appendChild(tempDiv);

        const botao = document.getElementById("download-button");
        botao.innerHTML = '<i class="bi bi-hourglass-split"></i>';
        botao.disabled = true;

        const canvas = await html2canvas(tempDiv, { scale: 2, useCORS: true, logging: false });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 190;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight + 10;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("Tabela de Usuários.pdf");
        document.body.removeChild(tempDiv);

        botao.innerHTML = '<i class="bi bi-download"></i>';
        botao.disabled = false;
    });



    /* ========================================
            ALERTS E MODAIS
    ======================================== */

    const alert_modelo_1 = document.getElementById("alert1");
    const alert_modelo_2 = document.getElementById("alert2");
    const backdrop = document.getElementById("backdrop");

    // Função genérica para abrir um alert
    function abrirAlert(id) {
        const alerta = document.getElementById(id);
        if (!alerta) return;
        alerta.classList.add("aberto");
        if (backdrop) backdrop.classList.add("on");
    }

    // Função genérica para fechar um alert
    function fecharAlert(id) {
        const alerta = document.getElementById(id);
        if (!alerta) return;
        alerta.classList.remove("aberto");
        if (backdrop) backdrop.classList.remove("on");
    }

    // Fecha alert1
    document.querySelectorAll("#alert1 .fechar_modal, #alert1 .botao_delete")
        .forEach(btn => btn.addEventListener("click", () => fecharAlert("alert1")));

    // Fecha alert2
    document.querySelectorAll("#alert2 .fechar_modal, #alert2 .botao_cancelar, #alert2 .botao_delete")
        .forEach(btn => btn.addEventListener("click", () => fecharAlert("alert2")));

    // Ativa alert1 ao clicar no botão ou no texto “Excluir”
    document.querySelectorAll(".botao_acao[aria-label='Excluir usuário']").forEach(botao => {
        botao.addEventListener("click", () => abrirAlert("alert1"));
    });


    /* ========================================
                 MENUS DE OPÇÕES 
 ======================================== */

     const buttons = document.querySelectorAll(".botao_opcoes");
     const menuUnico = document.getElementById("menuUnico");
     let produtoSelecionado = null;

     if (buttons.length > 0 && menuUnico) {
          buttons.forEach(btn => {
               btn.addEventListener("click", (e) => {
                    e.stopPropagation();

                    const rect = btn.getBoundingClientRect();

                    // Posição inicial
                    let top = rect.bottom + window.scrollY + 5;
                    let left = rect.left + window.scrollX;

                    // Verifica largura do menu para evitar sair da tela
                    const menuWidth = menuUnico.offsetWidth;
                    const screenWidth = window.innerWidth;

                    // Se o menu passar da tela, reposiciona mais pra esquerda
                    if (left + menuWidth > screenWidth) {
                         left = screenWidth - menuWidth - 10; // 10px de margem
                    }

                    // Aplica as posições finais
                    menuUnico.style.top = `${top}px`;
                    menuUnico.style.left = `${left}px`;
                    menuUnico.style.display = 'block';
                    // PEGA TODOS OS DADOS DA LINHA AUTOMATICAMENTE
                    const linha = btn.closest('tr');
                    produtoSelecionado = {
                         id: linha.dataset.idUser
                    };

                    console.log("Produto selecionado:", produtoSelecionado);
               });
          });

          document.addEventListener("click", () => {
               menuUnico.style.display = 'none';
          });

          menuUnico.querySelectorAll('.botao_acao').forEach(btn => {
               btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const acao = btn.textContent.trim().split(' ')[0].toLowerCase();

                    // Agora temos TODOS os dados do produto
                    alert(`${acao} produto:\nID: ${produtoSelecionado.id}\nNome: ${produtoSelecionado.nome}\nCategoria: ${produtoSelecionado.categoria}`);

                    // Para usar na integração:
                    console.log(`Ação: ${acao}`, produtoSelecionado);

                    menuUnico.style.display = 'none';
               });
          });
     }
});
