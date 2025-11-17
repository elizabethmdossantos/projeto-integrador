// Aguarda o documento estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    const filterSelect = document.getElementById('supplier-filter');
    const supplierCards = document.querySelectorAll('.supplier-card');

    // Adiciona um "ouvinte" ao menu dropdown do filtro
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            
            const selectedValue = filterSelect.value;

            // Loop para verificar cada card de fornecedor
            supplierCards.forEach(card => {
                // Encontra o 'data-category' dentro do card
                const cardCategory = card.querySelector('[data-category]').getAttribute('data-category');

                // Lógica para mostrar ou esconder o card
                if (selectedValue === 'todos' || cardCategory === selectedValue) {
                    // Mostra o card
                    card.style.display = 'block'; 
                } else {
                    // Esconde o card
                    card.style.display = 'none';
                }
            });
        });
    }

});