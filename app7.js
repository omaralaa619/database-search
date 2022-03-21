const charactersList = document.getElementById("charactersList");
const characterList = document.getElementById("characterList");
const searchBar = document.getElementById("searchBar");
const btns = document.querySelectorAll("button[id^=filter]");
let container = document.querySelector(".container");
let hpCharacters = [];

const onType = searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log("function");
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.institution.toLowerCase().includes(searchString) ||
      character.adress.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("http://localhost:4000/api");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  console.log(characters);
  const htmlString = characters
    .map((character) => {
      return `
            
            <li class="character">
                <h2>instituti: ${character.institution}</h2>
                <p>city: ${character.house}</p>
                <p>institution: ${character._id}<p/>
                <p>institution: ${character.adress}</p>
               <a href = "/entry.html"><button data-id = "${character._id}"> read more <button/><a/>
            </li>
            
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
