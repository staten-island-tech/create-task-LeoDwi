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
  api: {
    link: "https://cat-fact.herokuapp.com",
    prefixes: {
      facts: "/facts/random?animal_type=cat&amount=2",
    },
  },
};

async function getFact(apiLink) {
  try {
    let data = await fetch(apiLink);
    let object = await data.json();
    let facts = object.data;
    console.log(object);
    console.log(facts);
  } catch (error) {
    console.log(error);
  }
}

getFact("https://meowfacts.herokuapp.com/?count=1");
getFact("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2");
getFact("https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=2");
getFact("https://dog-api.kinduff.com/api/facts");
