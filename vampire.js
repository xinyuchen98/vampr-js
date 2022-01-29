class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampire = this;
    let number = 0;
    while (vampire.creator) {
      vampire = vampire.creator;
      number++;
    }
    return number;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const numberThis = this.numberOfVampiresFromOriginal;
    const numberThat = vampire.numberOfVampiresFromOriginal;
    if (numberThis < numberThat) {
      return true;
    }
    return false;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    } else if (this.offspring.length === 0) {
      return null;
    }
    for (const child of this.offspring) {
      const foundVampire = child.vampireWithName(name);
      if (foundVampire) {
        return foundVampire;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    if (this.offspring.length === 0) {
      return 0;
    }
    let count = 0;
    for (const child of this.offspring) {
      count += (child.totalDescendents + 1);
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let outputArray = [];
    if (this.yearConverted > 1980) {
      outputArray.push(this);
    }
    for (const child of this.offspring) {
      const millennialChildren = child.allMillennialVampires;
      outputArray = outputArray.concat(millennialChildren);
    }
    return outputArray;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;
