import { sample } from 'lodash';
import backstories from './generated/backstories';

export default function randomBackstory(gender) {
  return sample(backstories[gender]);
}
