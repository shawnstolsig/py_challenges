// All challenges are in their individual files.  This file serves to combine
// each individual challenge into a single object to import into the project.

import addition from './addition'
import fizzbuzz from './fizzbuzz'
import palindrome from './palindrome'
import missingnumbers from './missingnumbers'
import binarysearch from './binarysearch'

const challenges = {
  addition,
  fizzbuzz,
  palindrome,
  missingnumbers,
  binarysearch,
}

export default challenges
