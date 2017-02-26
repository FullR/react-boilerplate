import {merge, set, uniqueId, random, sample} from "lodash";
import replaceWhere from "util/replaceWhere";
import randomName from "dnd/randomName";
import randomBackstory from "dnd/randomBackstory";
import races from "dnd/races";
import alignments from "dnd/alignments";
import genders from "dnd/genders";
import rollStat from "dnd/rollStat";

class Character {
  constructor(options) {
    if(!options) {
      const race = sample(races);
      const name = randomName(race);
      const gender = sample(genders);
      const backstory = randomBackstory(gender);
      options = {
        id: uniqueId(name),
        fields: {
          name,
          race,
          backstory,
          gender,
          age: random(15, 90),
          alignment: sample(alignments),
          level: 1,
          hp: {current: 10, max: 10},
          abilityScores: [
            {name: "strength", value: rollStat()},
            {name: "dexterity", value: rollStat()},
            {name: "constitution", value: rollStat()},
            {name: "intelligence", value: rollStat()},
            {name: "wisdom", value: rollStat()},
            {name: "charisma", value: rollStat()}
          ],
          items: []
        },
      };
    }

    Object.assign(this, options);
  }

  updateField(field, value) {
    return new Character({
      ...this,
      fields: merge({}, {
        ...this.fields
      }, set({}, field, value))
    });
  }

  createItem() {
    const item = {id: uniqueId("item-"), name: "", weight: 0, description: ""};
    return this.updateField("items", [...this.fields.items, item]);
  }

  removeItem(itemId) {
    return new Character({
      ...this,
      fields: {
        ...this.fields,
        items: this.fields.items.filter((item) => item.id !== itemId)
      }
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

  createItem: {
    create(id) {
      return {id};
    },

    reduce(state, {id}) {
      return {
        ...state,
        list: replaceWhere(
          state.list,
          (character) => character.id === id,
          (character) => character.createItem()
        )
      };
    }
  },

  removeItem: {
    create(id, itemId) {
      return {id, itemId};
    },

    reduce(state, {id, itemId}) {
      log({id, itemId})
      return {
        ...state,
        list: replaceWhere(
          state.list,
          (character) => character.id === id,
          (character) => character.removeItem(itemId)
        )
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
