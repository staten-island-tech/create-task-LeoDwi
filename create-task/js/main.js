console.log("hello");

const dogapis = {
  api: {
    link: "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/all",
    prefixes: {
      number: "?number=",
    },
  },
  api: {
    link: "http://dog-api.kinduff.com/api/facts",
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
      facts: "/facts",
    },
  },
};
