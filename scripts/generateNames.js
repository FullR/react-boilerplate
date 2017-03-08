const {writeFile} = require("fs-promise");
const mkdirp = require("mkdirp-promise");
const fantasyNames = require("fantasy-names");
const {random, capitalize, sampleSize} = require("lodash");
const races = require("../src/dnd/races");

const backstories = getNames("description", "backstory", 1000).filter((str) => str.length);
const names = {
  characters: createNameMap("dungeon_and_dragons", races, 1000),
  backstories: {
    female: sampleSize(backstories.filter((str) => str.startsWith("She")), 100),
    male: sampleSize(backstories.filter((str) => str.startsWith("He")), 100)
  }
};

function getNames(group, individual, count, option) {
  return fantasyNames(formatNameInput(group), formatNameInput(individual), count, option).split("\n");
}

function createNameMap(group, individuals, count, option=random(0, 1)) {
  return individuals.reduce((map, individual) => {
    map[individual] = getNames(group, individual, count, option).map((name) => name.split(" ").map(capitalize).join(" "));
    return map;
  }, {});
}

function formatNameInput(string) {
  const formatted = string.toLowerCase().replace(/-|\s/g, "_");
  if(formatted.slice(-1) !== "s") {
    return formatted + "s";
  }
  return formatted;
}

mkdirp("src/dnd/generated")
  .then(() => {
    return Promise.all([
      writeFile("src/dnd/generated/characters.json", JSON.stringify(names.characters, null, 2)),
      writeFile("src/dnd/generated/backstories.json", JSON.stringify(names.backstories, null, 2))
    ]);
  })
  .catch(console.error.bind(console));
