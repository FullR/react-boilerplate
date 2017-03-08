
export default function removeById(items, id) {
  return items.filter((v) => v.id !== id);
}
