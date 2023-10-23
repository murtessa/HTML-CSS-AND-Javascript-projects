//---------------------------------------------------- The Superhero Entry Class
class SuperheroEntry {
  constructor(superheroName, superheroUniverse, superheroPower) {
    this.superheroName = superheroName;
    this.superheroUniverse = superheroUniverse;
    this.superheroPower = superheroPower;
  }
}

//---------------------------------------------------- The Superhero List Class
class SuperheroList {
  // Add Superhero Function
  addSuperhero(entry) {
    const listData = document.querySelector(".superhero-list-data");
    const listContainer = document.createElement("ul");
    listContainer.setAttribute("id", "list");

    listContainer.innerHTML += `
    <li>${entry.superheroName}</li>
    <li>${entry.superheroUniverse}</li>
    <li>${entry.superheroPower}</li>
    <i class="fas fa-trash"></i>
    `;

    listData.appendChild(listContainer);
  }

  // Clear Superhero Input Fields Function
  clearSuperheroInputs() {
    [
      document.querySelector("#name").value,
      document.querySelector("#universe").value,
      document.querySelector("#power").value,
    ] = ["", "", ""];
  }

  // Validation Error Function
  validationError() {
    document.querySelector(".validate-error").classList.add("show-validation");
    setTimeout(() => {
      document
        .querySelector(".validate-error")
        .classList.remove("show-validation");
    }, 2500);
  }

  // Validation Success Function
  validationSuccess() {
    document
      .querySelector(".validate-success")
      .classList.add("show-validation");
    setTimeout(() => {
      document
        .querySelector(".validate-success")
        .classList.remove("show-validation");
    }, 1500);
  }
}

//----------------------------------------------------The StoreSuperhero Class
class StoreSuperhero {
  // Get Superheros From LS
  static getSuperhero() {
    let superheros;
    if (localStorage.getItem("superheros") === null) {
      superheros = [];
    } else {
      superheros = JSON.parse(localStorage.getItem("superheros"));
    }

    return superheros;
  }

  // Add Superheros From LS
  static addSuperhero(entry) {
    const superherosList = StoreSuperhero.getSuperhero();

    superherosList.push(entry);
    localStorage.setItem("superheros", JSON.stringify(superherosList));
  }

  // Display Superheros From LS
  static displaySuperhero() {
    const superherosList = StoreSuperhero.getSuperhero();

    superherosList.forEach((superhero) => {
      // Instantiating the SuperheroList Class
      const list = new SuperheroList();
      list.addSuperhero(superhero);
    });
  }

  // Removing Superheros from the LS
  static removeSuperhero(clickedSuperhero) {
    const superherosList = StoreSuperhero.getSuperhero();

    superherosList.forEach((superhero, index) => {
      if (superhero.superheroName === clickedSuperhero) {
        superherosList.splice(index, 1);
      }
    });

    localStorage.setItem("superheros", JSON.stringify(superherosList));
  }
}

// --------------------------------------Events----------------------------------------
document.addEventListener("DOMContentLoaded", StoreSuperhero.displaySuperhero);

// Form Submission Event Listener
const form = document.querySelector(".superhero-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let [superheroName, superheroUniverse, superheroPower] = [
    document.querySelector("#name").value,
    document.querySelector("#universe").value,
    document.querySelector("#power").value,
  ];

  // Instantiating the SuperheroEntry Class
  const entry = new SuperheroEntry(
    superheroName,
    superheroUniverse,
    superheroPower
  );

  // Instantiating the SuperheroList Class
  const list = new SuperheroList();

  // Validate the form if one or more of the input fields are empty
  if (
    superheroName === "" ||
    superheroUniverse === "" ||
    superheroPower === ""
  ) {
    list.validationError();
  } else {
    list.addSuperhero(entry);
    list.clearSuperheroInputs();
    list.validationSuccess();

    // Adding superhero to Local Storage
    StoreSuperhero.addSuperhero(entry);
  }
});

// Deleting Listed Superheros
const listData = document.querySelector(".superhero-list-data");
listData.addEventListener("click", function (e) {
  if (e.target.className === "fas fa-trash") {
    const trash = e.target.parentNode;

    const clickedSuperhero =
      e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;

    StoreSuperhero.removeSuperhero(clickedSuperhero);

    trash.remove();
  }
});
