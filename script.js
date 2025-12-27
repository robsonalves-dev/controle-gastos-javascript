const form = document.getElementById('formGasto');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const lista = document.getElementById('listaGastos');
const totalSpan = document.getElementById('total');

let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

function render() {
  lista.innerHTML = '';
  let total = 0;

  gastos.forEach((gasto, index) => {
    total += gasto.valor;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${gasto.descricao} - R$ ${gasto.valor.toFixed(2)}</span>
      <button onclick="remover(${index})">❌</button>
    `;

    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
  localStorage.setItem('gastos', JSON.stringify(gastos));
}

function adicionar(descricao, valor) {
  gastos.push({ descricao, valor });
  render();
}

function remover(index) {
  gastos.splice(index, 1);
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  adicionar(descricaoInput.value, Number(valorInput.value));
  descricaoInput.value = '';
  valorInput.value = '';
});

render();
