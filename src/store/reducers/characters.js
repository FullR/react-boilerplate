import {merge, set, uniqueId, random, sample} from "lodash";
import replaceWhere from "util/replaceWhere";
import sillyname from "sillyname";
import races from "dnd/races";
import rollStat from "dnd/rollStat";

class Character {
  constructor({
    id = uniqueId("character-"),
    fields = {
      name: sillyname(),
      age: random(15, 90),
      level: 1,
      race: sample(races),
      hp: {current: 10, max: 10},
      abilityScores: [
        {name: "strength", value: rollStat()},
        {name: "dexterity", value: rollStat()},
        {name: "constitution", value: rollStat()},
        {name: "intelligence", value: rollStat()},
        {name: "wisdom", value: rollStat()},
        {name: "charisma", value: rollStat()}
      ]
    }
  }={}) {
    this.id = id;
    this.fields = fields;
  }

  updateField(field, value) {
    return new Character({
      ...this,
      fields: merge({}, {
        ...this.fields
      }, set({}, field, value))
    });
  }
}

export default [{
  selected: null,
  list: []
}, {
  create: {
    reduce(state) {
      const character = new Character();

      return {
        ...state,
        selected: character.id,
        list: [
          ...state.list,
          character
        ]
      };
    }
  },

  select: {
    create(id) {
      return {id};
    },

    reduce(state, {id}) {
      return {...state, selected: id};
    }
  },

  remove: {
    create(id) {
      return {id};
    },

    reduce(state, {id}) {
      return {
        ...state,
        selected: state.selected === id ? null : state.selected,
        list: state.list.filter((character) => character.id !== id)
      };
    }
  },

  updateField: {
    create(id, field, value) {
      return {id, field, value}
    },

    reduce(state, {id, field, value}) {
      return {
        ...state,
        list: replaceWhere(state.list,
          (character) => character.id === id,
          (character) => character.updateField(field, value)
        )
      };
    }
  }
}];
