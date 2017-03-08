import { createAction, handleActions } from 'redux-actions';
import { merge, set, uniqueId, random, sample } from 'lodash';
import removeById from 'util/removeById';
import replaceById from 'util/replaceById';
import randomName from 'dnd/randomName';
import randomBackstory from 'dnd/randomBackstory';
import races from 'dnd/races';
import alignments from 'dnd/alignments';
import genders from 'dnd/genders';
import rollStat from 'dnd/rollStat';

export const createCharacter = createAction('CREATE_CHARACTER');
export const removeCharacter = createAction('REMOVE_CHARACTER');
export const updateCharacterField = createAction('UPDATE_CHARACTER_FIELD', (id, key, value) => ({id, key, value}));
export const createItem = createAction('CREATE_ITEM');
export const removeItem = createAction('REMOVE_ITEM', (id, itemId) => ({id, itemId}));

const initialState = [];

const reducer = handleActions({
  CREATE_CHARACTER: (characters) => [...characters, createRandomCharacter()],
  REMOVE_CHARACTER: (characters, {payload}) => removeById(characters, payload),
  UPDATE_CHARACTER_FIELD: (characters, action) => {
    const {id, key, value} = action.payload;
    return replaceById(characters, id, (character) => ({
      ...character,
      fields: merge({}, character.fields, set({}, key, value))
    }));
  },
  CREATE_ITEM: (characters, {payload : id}) => setCharacterField(characters, id, 'items', (items) => [...items, createRandomItem()]),
  REMOVE_ITEM: (characters, {payload : {id, itemId}}) => setCharacterField(characters, id, 'items', (items) => removeById(items, itemId)),
}, initialState);

export default reducer;

function setCharacterField(characters, characterId, key, value) {
  return replaceById(characters, characterId, (character) => ({
    ...character,
    fields: {
      ...character.fields,
      [key]: typeof value === 'function' ? value(character.fields[key]) : value
    }
  }));
}

function createRandomCharacter() {
  const race = sample(races);
  const name = randomName(race);
  const gender = sample(genders);
  const backstory = randomBackstory(gender);

  return {
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

function createRandomItem() {
  return {
    id: uniqueId("item-"),
    name: '',
    weight: 0,
    description: ''
  };
}
