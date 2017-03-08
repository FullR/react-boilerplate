import { random } from 'lodash';

export default function rollStat() {
  return [random(1, 6), random(1, 6), random(1, 6), random(1, 6)].sort().slice(1).reduce((a, b) => a + b);
}
