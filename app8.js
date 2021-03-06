const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
const btn = document.querySelector("#btn");

const radioButtons = document.querySelectorAll(
  'input[name="institution-type"]'
);
let hpCharacters = [];
let filteredCharacters = [];

let selectedSize;

btn.addEventListener("click", () => {
  let selectedSize;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedSize = radioButton.value;
      break;
    }
  }
  if (filteredCharacters.length === 0) {
    console.log("empty");
    filteredCharacters = hpCharacters;
  }
  result = filteredCharacters.filter((entry) => {
    return entry.institutionType.includes(selectedSize);
  });
  displayCharacters(result);
  console.log(selectedSize);
});

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;

  filteredCharacters = hpCharacters.filter((character) => {
    return character.institution.includes(searchString);
  });
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
                <div class = "list-header">
                <p><span>الاهتمام بالعمل في محافظة أسوان: </span> ${character.intrestedAswan}</p>
                <p><span>هل توجد خطة استراتيجية للتنمية: </span> ${character.stratigicPlan}</p>
                </div>
                
                <p><span>نوع المشاركة والدعم: </span> ${character.supportType}</p>
                <p><span>الاشتراطات الواجب توافرها في الجمعية طالبة المتحة: </span> ${character.demands}</p>
                
                <div class = "list-header">
                <p><span>كيفية التواصل من قبل الجمعيات: </span> ${character.communicationType}</p>
                <p><span>هل في موعد معين لتلقي الطلبات: </span> ${character.orderTime}</p>
                </div>
                
            </li>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
