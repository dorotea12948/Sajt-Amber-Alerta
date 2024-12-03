function loadPeople1() {
    const peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    const gallery = document.querySelector(".gallery");

    if (peopleList.length === 0) {
        gallery.innerHTML = "<p>Nema prijavljenih osoba.</p>";
        return;
    }
    console.log(peopleList);
    let content = "<div class='row'>";
    peopleList.forEach((person, index) => {
        content += `
            <div class="column">
                <div class="person-card">
                    <img src="${person.slika}" alt="Slika nestale osobe" style="width: 100%; border-radius: 8px;"/>
                    <h3>${person.ime} ${person.prezime}</h3>
                    <p><strong>Grad:</strong> ${person.grad}</p>
                    <p><strong>Informacije:</strong> ${person.opis}</p>
                    <p><strong>Opis:</strong> ${person.dodatneInfo}</p>
                </div>
            </div>
        `;
    });
    content += "</div>";

    gallery.innerHTML = content;
}
