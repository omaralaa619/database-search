const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
const cairoFilter = document.getElementById("cairo-filter");
let hpCharacters = [];

const onType = searchBar.addEventListener("keyup", (e) => {
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
