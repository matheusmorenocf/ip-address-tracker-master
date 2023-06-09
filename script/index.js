const buttonSearch = document.querySelector('#button-search');
const inputSearch = document.querySelector('#input-search');

// Verifica se o conteudo digitado no input é um IP


document.addEventListener('DOMContentLoaded', APIgeo)

buttonSearch.addEventListener('click', (ev) => {
  const ip = /[^0-9\.]/g.test(inputSearch.value) ? `domain=${inputSearch.value}` : `ipAddress=${inputSearch.value}`;
  APIgeo(ip)
});

inputSearch.addEventListener('keypress', (ev) => {
  const ip = /[^0-9\.]/g.test(inputSearch.value) ? `domain=${inputSearch.value}` : `ipAddress=${inputSearch.value}`;
  if (ev.key == 'Enter') {
    APIgeo(ip)
  }
})

//inputSearch.addEventListener('input', formatIP);


// Funcao para permitir somente numeros e pontos no input
function formatIP(ev) { //Funcao nao esta sendo usada pois esta aceitando dominios
  ev.preventDefault()
  inputSearch.value = inputSearch.value.replace(/[^0-9.]/g, '')                            
}

// Funçao para requisitar a API os dados do IP informado
async function APIgeo(ip) {
  try {
    const response = await fetch (`https://geo.ipify.org/api/v2/country,city?apiKey=at_Oq9bOriVzmnmLqjrpYiNbXflfSmpZ&${ip}`).then(resp => resp.json());
    updateOutput(response)
    inputSearch.value = ''
  } catch (error) {
    alert('IP ou dominio inválido')
  }
}

// Funcao para inserir os dados retornados pela API na tela
function updateOutput(data) {
  const spanIP = document.querySelector('#result-ip')
  const spanLocation = document.querySelector('#result-location')
  const spanTimezone = document.querySelector('#result-timezone')
  const spanISP = document.querySelector('#result-isp')

  spanIP.textContent = data.ip;
  spanLocation.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
  spanTimezone.textContent = `UTC ${data.location.timezone}`;
  spanISP.textContent = data.isp;

  const lat = data.location.lat;
  const lng = data.location.lng;
  
  // Removendo o mapa na tela, caso já exista algum
  clearMAP()
  // Criando novo container do mapa
  createMapContainer()
  // Inserindo o mapa na tela com a https://leafletjs.com/
  var map = L.map('map').setView([lat, lng], 16);
  var marker = L.marker([lat, lng]).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}

function createMapContainer() {
  const map =   document.createElement('div');
  map.id = 'map';
  document.querySelector('main').appendChild(map)
}

function clearMAP() {
  const map = document.getElementById('map');
  if(map) {
    document.querySelector('main').removeChild(map)
  }
  
}



