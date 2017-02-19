
export default function getAbilityModifier(abilityScore) {
  return Math.floor(abilityScore / 2) - 5;
}
