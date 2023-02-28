import { DomSelectors } from "./Dom";
import "../styles/style.css";

const dogapis = {
  /* api: {
    link: "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/all",
    prefixes: {
      number: "?number=",
    },
  }, */
  api: {
    link: "https://dog-api.kinduff.com/api/facts",
    prefixes: {
      number: "?number=",
    },
  },
};

const catapis = {
  api: {
    link: "https://meowfacts.herokuapp.com/",
    prefixes: {
      number: "?count=",
    },
  },
  /* api: {
    link: "https://cat-fact.herokuapp.com",
    prefixes: {
      facts: "/facts/random?animal_type=cat&amount=2",
    },
  }, */
};

async function getFact(apiLink) {
  try {
    let data = await fetch(apiLink);
    let object = await data.json();
    let fact = await checkData(object);
    console.log(object);
    console.log(fact);
    history.push(fact[0]);
    console.log(history);
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
  if (history.includes(`${fact}`)) {
    let newFact = await getFact(link);
    return newFact;
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

getFact("https://meowfacts.herokuapp.com/?count=1");
getFact("https://dog-api.kinduff.com/api/facts");

DomSelectors.catButton.addEventListener("click", async function getCatFacts() {
  let link = "https://meowfacts.herokuapp.com/?count=1";
  clear();
  let fact = await getFact(link).then(checkData(fact));
  let finalFact = await checkHistory(fact, link);
  insertHTML(finalFact);
});

const history = [];
