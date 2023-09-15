/**
 * Translations of names for loading images
 * due to inconsistency in file names and skill/hero names
 */
const nameTranslate : { [key: string] : string } = {
  "queen_of_pain": "queenofpain",
  "magnus": "magnataur",
  "starbreaker": "fire_wreath",
  "frost_blast": "frost_nova",
  "moon_glaives": "moon_glaive",
  "omnislash": "omni_slash",
  "gust": "wave_of_silence",
  "skeleton_walk": "wind_walk",
  "heavenly_grace": "repel",
  "spear_of_mars": "spear"
}

/**
 * Remove special characters in names
 * @param name string
 * @returns cleansedName
 */
const cleanseName = (name: string): string => {
  let cleansedName = name.toLowerCase().replaceAll(" ", "_");
  cleansedName = cleansedName.replaceAll("'", "").replaceAll("!", "");

  if (nameTranslate[cleansedName] != undefined) {
    cleansedName = nameTranslate[cleansedName];
  }
  return cleansedName;
}

export { cleanseName }