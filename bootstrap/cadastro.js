        document.addEventListener('DOMContentLoaded', () => {
            // =======================================================
            // Lógica de Navegação entre as Abas (Tabs)
            // =======================================================
            const tabLinks = document.querySelectorAll('.tg-tab');
            const formSections = document.querySelectorAll('.form-section');

            tabLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('data-target');

                    // 1. Esconder todas as seções e remover 'active' dos links
                    formSections.forEach(section => section.style.display = 'none');
                    tabLinks.forEach(l => l.classList.remove('active'));

                    // 2. Mostrar a seção alvo e adicionar 'active' ao link clicado
                    document.getElementById(targetId).style.display = 'block';
                    this.classList.add('active');
                });
            });

            // =======================================================
            // Lógica de Submissão de Formulários (apenas simulação)
            // =======================================================
            const forms = [
                document.getElementById('form-empresa'),
                document.getElementById('form-produto'),
                document.getElementById('form-estoque'),
                document.getElementById('form-cliente'),
                document.getElementById('form-vendas')
            ];

            forms.forEach(form => {
                if (form) {
                    form.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const formId = form.id.replace('form-', '');
                        
                        // Captura os dados do formulário para demonstração
                        const formData = new FormData(form);
                        const data = Object.fromEntries(formData.entries());

                        console.log(`[SUCESSO] Formulário de ${formId} submetido. Dados:`, data);
                        
                        // Simula um feedback de sucesso (usando console, não alert)
                        // Em um projeto real, aqui você faria a chamada à API/Firebase
                        console.log('✅ Simulação: Dados salvos com sucesso!');

                        // Resetar o formulário após a submissão (exceto para Vendas, que tem lógica separada)
                        if(formId !== 'vendas') {
                            form.reset();
                        }
                    });
                }
            });
            
            // =======================================================
            // Lógica Específica para Adicionar Itens na Venda
            // =======================================================
            const btnAddItem = document.getElementById('adicionarItem');
            const listaItens = document.getElementById('listaItens');
            const totalVendaEl = document.getElementById('totalVenda');
            
            // Preços simulados para cálculo
            const precos = {
                'X-Salada Clássico': 25.00,
                'Batata Frita Média': 12.00,
                'Refrigerante Lata': 7.00
            };
            
            let totalPedido = 0;
            
            btnAddItem.addEventListener('click', () => {
                const produtoSelect = document.getElementById('produtoVenda');
                const quantidadeInput = document.getElementById('quantidadeVenda');
                
                const produtoNome = produtoSelect.value;
                const quantidade = parseInt(quantidadeInput.value);
                const precoUnitario = precos[produtoNome];
                
                if (produtoNome && precoUnitario && quantidade > 0) {
                    const subtotal = precoUnitario * quantidade;
                    totalPedido += subtotal;
                    
                    // Remove a mensagem de "Nenhum item adicionado" se existir
                    const placeholder = listaItens.querySelector('.text-muted');
                    if(placeholder) {
                        placeholder.remove();
                    }

                    // Cria o novo item da lista
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                    listItem.innerHTML = `
                        <div>
                            ${quantidade} x ${produtoNome}
                            <span class="badge bg-secondary ms-2">R$ ${precoUnitario.toFixed(2)} /un</span>
                        </div>
                        <div>
                            R$ ${subtotal.toFixed(2)}
                            <button type="button" class="btn btn-sm btn-outline-danger ms-3 remove-item" data-subtotal="${subtotal.toFixed(2)}"><i class="bi bi-x-lg"></i></button>
                        </div>
                    `;
                    
                    listaItens.appendChild(listItem);
                    
                    // Atualiza o total
                    totalVendaEl.textContent = `R$ ${totalPedido.toFixed(2)}`;
                    
                    // Limpa os campos
                    produtoSelect.value = "";
                    quantidadeInput.value = "1";

                    // Adiciona listener para remover item
                    listItem.querySelector('.remove-item').addEventListener('click', function() {
                        const valorRemovido = parseFloat(this.getAttribute('data-subtotal'));
                        totalPedido -= valorRemovido;
                        totalVendaEl.textContent = `R$ ${totalPedido.toFixed(2)}`;
                        listItem.remove();
                        
                        // Se não houver itens, volta a exibir o placeholder
                        if (listaItens.children.length === 0) {
                            listaItens.innerHTML = '<li class="list-group-item d-flex justify-content-between align-items-center text-muted">Nenhum item adicionado.</li>';
                        }
                    });
                    
                } else {
                    console.log('⚠️ Atenção: Selecione um produto e uma quantidade válida.');
                }
            });
        });