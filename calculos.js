const params = {
  cfil: 129.83,
  energia_h: 0.40,
  depreca_o_h: 1.03,
  perdas_perc: 5,
  margem_perc: 200
};

function resetCalcState(){
  const btnCalc = document.getElementById('btnCalc');
  if(btnCalc){ btnCalc.style.display = 'inline-block'; }
  const btnEn = document.getElementById('btnEnviar');
  if(btnEn){ btnEn.style.display = 'none'; }
  document.getElementById('result').innerHTML = '';
}

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
  const preco200 = subtotalLoss * (1 + params.margem_perc/100);
  const preco100 = subtotalLoss * (1 + 1.0);

  document.getElementById('result').innerHTML = `
    <p>Nome: ${document.getElementById('name').value}</p>
    <p>Peso: ${weightG} g</p>
    <p>Tempo: ${timeH.toFixed(2)} h</p>
    <p>Preço 100%: R$ ${preco100.toFixed(2)}</p>
    <p>Preço 200%: R$ ${preco200.toFixed(2)}</p>`;  
  // Mostrar botão de enviar após cálculo
  const btnEn = document.getElementById('btnEnviar');
  if(btnEn){ btnEn.style.display = 'inline-block'; }
  // Ocultar botão de calcular
  const btnCalc = document.getElementById('btnCalc');
  if(btnCalc){ btnCalc.style.display = 'none'; }
}

function enviarWhatsApp(recNum){
  const name = document.getElementById('name').value || '';
  const peso = parseFloat(document.getElementById('weight').value) || 0;
  const timeStr = document.getElementById('time').value || '';
  let timeH = 0;
  if(timeStr){
    const parts = timeStr.split(':');
    const h = parseInt(parts[0]) || 0;
    const m = parseInt(parts[1]) || 0;
    timeH = h + m/60;
  }
  const pesoKg = peso / 1000;
  const subtotal = (pesoKg * params.cfil) + (timeH * params.energia_h) + (timeH * params.depreca_o_h);
  const subtotalLoss = subtotal * (1 + params.perdas_perc/100);
  const preco200 = subtotalLoss * (1 + params.margem_perc/100);
  const preco100 = subtotalLoss * (1 + 1.0);
  const msg = `Nome: ${name}\nPeso: ${peso} g\nTempo: ${timeH.toFixed(2)} h\nPreço 100%: R$ ${preco100.toFixed(2)}\nPreço 200%: R$ ${preco200.toFixed(2)}`;
  const num = recNum || '551112345678';
  const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  resetCalcState();
  window.open(url, '_blank');
  resetCalcState();
}
