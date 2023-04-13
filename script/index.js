const buttonSearch = document.querySelector('#button-search');
const inputSearch = document.querySelector('#input-search');

document.addEventListener('DOMContentLoaded', ipUser)

buttonSearch.addEventListener('click', APIgeo);
inputSearch.addEventListener('input', formatIP);




// Funcao para permitir somente numeros e pontos no input
function formatIP(ev) {
  ev.preventDefault()
  inputSearch.value = inputSearch.value.replace(/[^0-9.]/g, '')                            
}

// Funçao para requisitar a API os dados do IP informado
async function APIgeo(ev) {
  
  try {
    const ip = inputSearch.value;
    const response = await fetch (`https://geo.ipify.org/api/v2/country,city?apiKey=at_Oq9bOriVzmnmLqjrpYiNbXflfSmpZ&ipAddress=${ip}`).then(resp => resp.json());
    console.log(response)
    updateOutput(response)
  } catch (error) {
    alert(error)
  }
}

// Funcao para inserir os dados retornados pela API na tela
function updateOutput(data) {
  const spanIP = document.querySelector('#result-ip')
  const spanLocation = document.querySelector('#result-location')
  const spanTimezone = document.querySelector('#result-timezone')
  const spanISP = document.querySelector('#result-isp')

  spanIP.textContent = data.ip;
  spanLocation.textContent = `${data.location.region}, ${data.location.country}`;
  spanTimezone.textContent = `UTC ${data.location.timezone}`;
  spanISP.textContent = data.isp;

  const lat = data.location.lat;
  const lng = data.location.lng;
  
  // Inserindo o mapa na tela com a https://leafletjs.com/
  var map = L.map('map').setView([lat, lng], 18);
  var marker = L.marker([lat, lng]).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}


async function ipUser() {
  fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    
    inputSearch.value = ipAddress
  })
  .catch(error => {
    console.error('Erro ao obter o endereço IP:', error);
  });

}

