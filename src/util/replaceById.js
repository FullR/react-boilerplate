import replaceWhere from './replaceWhere';

export default function replaceById(items, id, replaceFn) {
  return replaceWhere(items, (v) => v.id === id, replaceFn);
}
