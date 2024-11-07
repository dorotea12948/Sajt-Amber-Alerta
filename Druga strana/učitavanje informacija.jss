function loadPeople() {
    const peopleList = JSON.parse(localStorage.getItem("people")) || [];
    const container = document.querySelector(".container");

    if (peopleList.length === 0) {
        container.innerHTML = "<p>Nema prijavljenih osoba.</p>";
        return;
    }

    let content = "<div class='row'>";
    peopleList.forEach((person, index) => {
        content += `
            <div class="column">
                <div class="person-card">
                    <img src="${person.imageUrl}" alt="Slika nestale osobe" style="width: 100%; border-radius: 8px;"/>
                    <h3>${person.name} ${person.surname}</h3>
                    <p><strong>Grad:</strong> ${person.city}</p>
                    <p><strong>Informacije:</strong> ${person.info}</p>
                    <p><strong>Opis:</strong> ${person.description}</p>
                </div>
            </div>
        `;
    });
    content += "</div>";

    container.innerHTML = content;
}
