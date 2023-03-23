import { DomSelectors } from "./Dom";
import "../styles/style.css";

const history = [];

function random() {
  let number = Math.random();
  if (number >= 0.5) {
    return "https://meowfacts.herokuapp.com/?count=1";
  } else {
    return "https://dog-api.kinduff.com/api/facts?number=1";
  }
}

async function getFact(apiLink) {
  try {
    let data = await fetch(apiLink);
    let object = await data.json();
    let fact = await checkData(object);
    history.push(fact[0]);
    return fact;
  } catch (error) {
    console.log(error);
  }
}

async function checkData(object) {
  let properties = Object.keys(object);
  if (properties.includes("data")) {
    return object.data;
  } else if (properties.includes("facts")) {
    return object.facts;
  } else {
    console.log("what the heck did you do to the api?");
  }
}

async function checkHistory(fact, link) {
  if (history.includes(fact)) {
    let newFact = await getFact(link);
    if (history.includes(newFact)) {
      return await checkHistory(await getFact(link), link);
    } else {
      return newFact;
    }
  } else {
    return fact;
  }
}

function insertHTML(fact) {
  DomSelectors.parent.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card">
    <h3 class=fact>${fact}</h3>
    </div>
    `
  );
}

function clear() {
  DomSelectors.parent.innerHTML = "";
}

DomSelectors.randomButton.addEventListener(
  "click",
  async function getRandomFact() {
    let link = random();
    clear();
    let fact = await getFact(link);
    console.log(fact);
    let finalFact = await checkHistory(fact, link);
    insertHTML(finalFact);
  }
);

DomSelectors.catButton.addEventListener("click", async function getCatFacts() {
  clear();
  let fact = await getFact(DomSelectors.catLink);
  console.log(fact);
  let finalFact = await checkHistory(fact, DomSelectors.catLink);
  insertHTML(finalFact);
});

DomSelectors.dogButton.addEventListener("click", async function getDogFacts() {
  clear();
  let fact = await getFact(DomSelectors.dogLink);
  console.log(fact);
  let finalFact = await checkHistory(fact, DomSelectors.dogLink);
  insertHTML(finalFact);
});

DomSelectors.history.addEventListener(
  "click",
  async function retrieveHistory() {
    clear();
    history.forEach((fact) => {
      insertHTML(fact);
    });
  }
);
