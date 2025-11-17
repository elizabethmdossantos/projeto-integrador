// Aguarda o documento estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    const acceptButton = document.getElementById('accept-btn');
    const rejectButton = document.getElementById('reject-btn');
    const alertContainer = document.getElementById('alert-container');
    const actionButtonCard = document.getElementById('action-buttons');
    const orderId = document.getElementById('order-id').innerText;

    // Função para criar um alerta do Bootstrap
    const createAlert = (message, type) => {
        // Limpa alertas anteriores
        alertContainer.innerHTML = ''; 
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        
        // Adiciona o alerta ao topo da página
        alertContainer.append(wrapper);
    };

    // Evento ao clicar em "Aceitar Pedido"
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // Cria o alerta de sucesso
            createAlert(`<strong>Sucesso!</strong> O ${orderId} foi aceito e o cliente será notificado.`, 'success');
            
            // Desabilita os botões e remove o card de ação
            actionButtonCard.innerHTML = '<div class="card-body text-center text-success"><h5 class="mb-0"><i class="bi bi-check-circle-fill"></i> Pedido Aceito</h5></div>';

            // Rola a tela para o topo para ver o alerta
            window.scrollTo(0, 0);
        });
    }

    // Evento ao clicar em "Rejeitar Pedido"
    if (rejectButton) {
        rejectButton.addEventListener('click', () => {
            // Pergunta o motivo (opcional, mas bom para o sistema)
            const reason = prompt("Qual o motivo para rejeitar este pedido? (Opcional)");

            // Cria o alerta de rejeição
            createAlert(`<strong>Atenção!</strong> O ${orderId} foi rejeitado.`, 'warning');

            // Desabilita os botões e remove o card de ação
            actionButtonCard.innerHTML = '<div class="card-body text-center text-danger"><h5 class="mb-0"><i class="bi bi-x-circle-fill"></i> Pedido Rejeitado</h5></div>';

            // Rola a tela para o topo
            window.scrollTo(0, 0);
        });
    }

});