

const buttonSearch = document.querySelector('#button-search');
const inputSearch = document.querySelector('#input-search');


buttonSearch.addEventListener('click', () => APIgeo());



async function APIgeo() {
  try {
    const ip = inputSearch.value;
    const response = await fetch (`https://geo.ipify.org/api/v2/country,city?apiKey=at_Oq9bOriVzmnmLqjrpYiNbXflfSmpZ&ipAddress=${ip}`).then(resp => resp.json());
    console.log(response)
    updateOutput(response)
  } catch (error) {
    console.log(error)
  }
}

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
  

  var map = L.map('map').setView([lat, lng], 18);
  var marker = L.marker([lat, lng]).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}