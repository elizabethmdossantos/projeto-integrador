
document.addEventListener('DOMContentLoaded', () => {

    const paymentOptions = document.querySelectorAll('#payment-options .list-group-item');
    const allPaymentDetails = document.querySelectorAll('.payment-details');
    const confirmButton = document.getElementById('confirmar-pedido-btn');

    paymentOptions.forEach(option => {
        option.addEventListener('click', (event) => {
           
            event.preventDefault(); 

            paymentOptions.forEach(opt => {
                opt.classList.remove('active');
            });

         
            option.classList.add('active');

          
            const paymentType = option.getAttribute('data-payment');

          
            allPaymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });

        
            const targetDetail = document.getElementById('payment-details-' + paymentType);
            if (targetDetail) {
                targetDetail.style.display = 'block';
            }
        });
    });

   
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
          
            const activePayment = document.querySelector('#payment-options .list-group-item.active');
            
            if (!activePayment) {
                alert('Por favor, selecione uma forma de pagamento.');
            } else {
                const paymentType = activePayment.getAttribute('data-payment');
                alert('Pedido confirmado! Pagamento será via ' + paymentType + '.');
                
            }
        });
    }

//Para fazer com que o "Desconto de 10 reais aplicado!" seja colocado no carrinho e mude o valor total
  let cupomAplicado = false;
  document.getElementById('aplicarCupom').addEventListener('click', function() {

    if (cupomAplicado === true) {
      return;
    }
    cupomAplicado = true;

    this.disabled = true; 
    document.getElementById('cupom').disabled = true;

    document.getElementById('linha-desconto').classList.remove('d-none');
    document.getElementById('valor-total').textContent = 'R$ 50,00';

    var feedbackDiv = document.getElementById('cupom-feedback');
    feedbackDiv.style.display = 'block';
    void feedbackDiv.offsetWidth;
    feedbackDiv.classList.add('show');

    setTimeout(function() {
      feedbackDiv.classList.remove('show');
    }, 3000);
    setTimeout(function() {
      feedbackDiv.style.display = 'none';
    }, 3200); 
  });
});