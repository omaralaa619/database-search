const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
const cairoFilter = document.getElementById("cairo-filter");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log("function");
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.title.toLowerCase().includes(searchString) ||
      character.description.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

cairoFilter.addEventListener("click", (e) => {
  if (cairoFilter.className == "button-off") {
    const filteredCharacters = hpCharacters.filter((character) => {
      return (
        character.description.toLowerCase().includes("cairo") &&
        character.title.toLowerCase().includes(searchBar.value)
      );
    });
    displayCharacters(filteredCharacters);
    cairoFilter.className = "button-on";
    searchBar.addEventListener("keyup", (e) => {
      const searchString = e.target.value.toLowerCase();

      const filteredCharacters = hpCharacters.filter((character) => {
        return (
          character.title.toLowerCase().includes(searchString) &&
          character.description.toLowerCase().includes("cairo")
        );
      });
      displayCharacters(filteredCharacters);
    });
  } else {
    cairoFilter.className = "button-off";
    const filteredCharacters = hpCharacters.filter((character) => {
      return (
        character.title.toLowerCase().includes(searchBar.value) ||
        character.description.toLowerCase().includes(searchBar.value)
      );
    });
    displayCharacters(filteredCharacters);
    searchBar.addEventListener("keyup", (e) => {
      const searchString = e.target.value.toLowerCase();

      const filteredCharacters = hpCharacters.filter((character) => {
        return (
          character.title.toLowerCase().includes(searchString) ||
          character.description.toLowerCase().includes(searchString)
        );
      });
      displayCharacters(filteredCharacters);
    });
  }
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://localhost:5000/articles/api");
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
                <h2>name: ${character.title}</h2>
                <p>city: ${character.description}</p>
                <p>institution: ${character.markdown}</p>
                
            </li>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
