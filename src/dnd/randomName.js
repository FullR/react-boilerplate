import { sample } from 'lodash';
import characters from './generated/characters';

export default function randomName(race) {
  return sample(characters[race]);
}
