// calculos.js – Funções que ficam no arquivo externo

const params = {
  cfil: 129.83,
  energia_h: 0.40,
  depreca_o_h: 1.03,
  perdas_perc: 5,
  margem_perc: 200
};

// Cálculo do orçamento
function calcular(){
  const weightG = parseFloat(document.getElementById('weight').value) || 0;
  const timeStr = document.getElementById('time').value;
  let timeH = 0;

  if(timeStr){
    const parts = timeStr.split(':');
    const h = parseInt(parts[0]) || 0;
    const m = parseInt(parts[1]) || 0;
    timeH = h + m/60;
  }

  const weightKg = weightG / 1000;
  const subtotal = (weightKg * params.cfil) +
                    (timeH * params.energia_h) +
                    (timeH * params.depreca_o_h);
  const subtotalLoss = subtotal * (1 + params.perdas_perc/100);
  const precoF = subtotalLoss * (1 + params.margem_perc/100);

  document.getElementById('result').innerHTML = `
    <p>Nome: ${document.getElementById('name').value}</p>
    <p>Peso: ${weightG} g</p>
    <p>Tempo: ${timeH.toFixed(2)} h</p>
    <p>Preço: R$ ${precoF.toFixed(2)}</p>`;
}

// Envio para WhatsApp
function enviarWhatsApp(recNum){
  const name = document.getElementById('name').value;
  const peso = document.getElementById('weight').value;
  const tempo = document.getElementById('time').value;
  const preco = document.querySelector('#result p:last-child') ? document.querySelector('#result p:last-child').textContent : '';

  const msg = `Nome: ${name}\nPeso: ${peso} g\nTempo: ${tempo}\n${preco}`;
  const num = recNum || '551112345678';
  const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

  window.open(url, '_blank');
}
