const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
const cairoFilter = document.getElementById("filter-cairo");
const sohagFilter = document.getElementById("sohag-filter");
const alexFilter = document.getElementById("alex-filter");
const sharmFilter = document.getElementById("sharm-filter");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log("function");
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

cairoFilter.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.className == "button-off") {
    const filteredCharacters = hpCharacters.filter((character) => {
      return (
        character.house.toLowerCase().includes("gryffindor") &&
        character.name.toLowerCase().includes(searchBar.value)
      );
    });
    displayCharacters(filteredCharacters);
    cairoFilter.className = "button-on";
    searchBar.addEventListener("keyup", (e) => {
      const searchString = e.target.value.toLowerCase();

      const filteredCharacters = hpCharacters.filter((character) => {
        return (
          character.name.toLowerCase().includes(searchString) &&
          character.house.toLowerCase().includes("gryffindor")
        );
      });
      displayCharacters(filteredCharacters);
    });
  } else {
    cairoFilter.className = "button-off";
    const filteredCharacters = hpCharacters.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchBar.value) ||
        character.house.toLowerCase().includes(searchBar.value)
      );
    });
    displayCharacters(filteredCharacters);
    searchBar.addEventListener("keyup", (e) => {
      const searchString = e.target.value.toLowerCase();

      const filteredCharacters = hpCharacters.filter((character) => {
        return (
          character.name.toLowerCase().includes(searchString) ||
          character.house.toLowerCase().includes(searchString)
        );
      });
      displayCharacters(filteredCharacters);
    });
  }
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://hp-api.herokuapp.com/api/characters");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <li class="character">
                <h2>name: ${character.name}</h2>
                <p>city: ${character.house}</p>
                <p>institution: ${character.markdown}</p>
                
            </li>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
