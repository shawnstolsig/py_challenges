import {
    assertEquals,
    assertIsNotUndefined
  } from '../tests'
  
  const binarysearch = {
    id: 'binarysearch',
    name: 'Binary Search',
    path: '/binarysearch',
    reqFuncName: 'binary_search',
    description: 'Binary search is a basic yet efficient algorithm for finding the position of a specific element in a sorted list of items. To conduct a binary search, compare the item you are searching for to the middle item of the sorted list. If the middle item is lower, then you know the item you seek is in the upper half...this is where you will repeat your search. Continue dividing and comparing until you find the location of your item!',
    prompt: 'Given an input integer "n" and sorted list, implement a binary search algorithm to find the index of the input integer. Return the index.  Do not use Python\'s built-in index() function.',
    tags: ['intermediate'],
    forbiddenSubstring: ['index'],
    tests: (userFunc) => {
      return {
        returnsValue: {
          name: "Function returns a value? ",
          result: () => assertIsNotUndefined(userFunc(1, [0,1,2]))
        },
        assertEqualsLengthOne: {
        name: "Returned index is correct when list contains only one item? ",
        result: () => assertEquals(userFunc(1, [1]), 0)
        },
        assertEqualsPostiveNumbers: {
          name: "Returned index is correct for a list of only positive numbers? ",
          result: () => assertEquals(userFunc(1, [0,1,2]), 1)
        },
        assertEqualsNegativeNumbers: {
          name: "Returned index is correct when list contains only negative numbers? ",
          result: () => assertEquals(userFunc(-3, [-5,-3,-1]), 1)
        },
        assertEqualsMixedNumbers: {
          name: "Returned index is correct when list contains both positive and negative numbers? ",
          result: () => assertEquals(userFunc(1, [-10,-5,0,1,11]), 3)
        },
      }
    },
    startingCode: `def binary_search(n, sorted_list):\n\t#your code here`,
    pySolution:``,
  }
  
  export default binarysearch