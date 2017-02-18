export default function replaceWhere(array, predicate, transform) {
  return array.map((v, i, a) => predicate(v, i, a) ? transform(v, i, a) : v);
}
