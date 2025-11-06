document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#sidebar-nav-links .nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Função para mostrar a seção
    function showSection(targetId) {
        // 1. Esconde todas as seções
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        // 2. Mostra a seção de destino
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            window.scrollTo(0, 0); // Rola para o topo da página ao trocar de tela
        }
    }

    // Função para atualizar o estado ativo dos links
    function setActiveLink(clickedLink) {
        // Remove a classe 'active' de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Adiciona a classe 'active' ao link clicado
        clickedLink.classList.add('active');
    }

    // Adiciona o listener de clique a cada link da barra lateral
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão de âncora (navegação)
            const targetId = this.getAttribute('href'); // Pega o ID da seção (#empresa, #produto, etc.)
            
            showSection(targetId);
            setActiveLink(this);
        });
    });

    // **Inicialização:**
    // Garante que a primeira seção (Empresa) esteja visível ao carregar
    // e os outros estejam ocultos, caso não tenha sido feito no HTML.
    showSection('#empresa'); // 'empresa' é a primeira a ser mostrada

    // --- Seu código de manipulação de formulário pode vir aqui ---
    // Exemplo de manipulação de formulário (apenas para evitar erros):
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log(`Formulário ${e.target.id} enviado! (Implemente a lógica de salvamento)`);
            alert(`Dados do formulário ${e.target.id} salvos com sucesso!`);
        });
    });
});