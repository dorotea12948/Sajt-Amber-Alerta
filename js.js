function savePerson() {
  const ime = document.getElementById("name").value;
  const prezime = document.getElementById("surname").value;
  const dodatneInfo = document.getElementById("info").value;
  const grad = document.getElementById("city").value;
  const opis = document.getElementById("description").value;
  const slika = document.getElementById("image").files[0];

  const reader = new FileReader();
  reader.onloadend = function () {
    const newPerson = {
      ime,
      prezime,
      dodatneInfo,
      grad,
      opis,
      slika: reader.result,
    };

    let peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    peopleList.push(newPerson);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    console.log("Nova osoba je dodata u listu.");
  };
  reader.readAsDataURL(slika);
  startLoad();
}
function loadPeople() {
  const peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
  peopleList.forEach((person) => {
    console.log("Ime:", person.ime);
    console.log("Prezime:", person.prezime);
    console.log("Dodatne informacije:", person.dodatneInfo);
    console.log("Grad:", person.grad);
    console.log("Opis:", person.opis);
    console.log("Slika:", person.slika);
  });
}
function clearStorage() {
  localStorage.clear();
}
var map;
function load() {
  map = L.map("map").setView([44.7866, 20.4489], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
  }).addTo(map);
}

async function getCoordinatesForCity(city) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } else {
    alert("Grad nije pronađen. Pokušajte ponovo.");
    return null;
  }
}

async function addPersonToMap(person) {
  const coordinates = await getCoordinatesForCity(person.grad);
  if (coordinates) {
    console.log("Map instance:", map);
    console.log("Is map instance of L.Map?", map instanceof L.Map);
    const marker = L.marker(coordinates).addTo(map);

    // Sadržaj popupa sa informacijama o osobi
    const popupContent = `
            <strong>Ime:</strong> ${person.ime}<br>
            <strong>Prezime:</strong> ${person.prezime}<br>
            <strong>Grad:</strong> ${person.grad}<br>
            <strong>Dodatne informacije:</strong> ${person.dodatneInfo}<br>
            <img src="${person.slika}" alt="Slika" width="100">
        `;

    marker.bindPopup(popupContent);
  }
}

function showAllPeopleOnMap() {
  const peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
  peopleList.forEach((person) => {
    addPersonToMap(person);
  });
}

function startLoad() {
  load();
  loadPeople();
  showAllPeopleOnMap();
}
