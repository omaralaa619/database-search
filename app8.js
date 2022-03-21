const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
const btn = document.querySelector("#btn");

const radioButtons = document.querySelectorAll(
  'input[name="institutionTypeFilter"]'
);
let hpCharacters = [];
let searchQuery = [];
let selectedSize;

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.institution.includes(searchString) ||
      character.institutionType.includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch("https://omar-admin-system.herokuapp.com/api");
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
                <div class = "list-header">
                <p><span>الصفة: </span> ${character.institutionType}</p>
                <h2><span>الجهة: </span> ${character.institution} </h2>
                </div>
                <p class = "field"><span>المجال: </span> ${character.field}</p>
                
                <div class = "list-header">
                <p><span>العنوان: </span>${character.adress}</p>
                <p><span>رقم الهاتف: </span> ${character.number}</p>
                </div>
                <div class = "list-header">
                <p> ${character.email}<span> :البريد الإلكتروني</span></p>
                <p> ${character.website}<span> :الموقع</span></p>
                </div>
                
            </li>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
