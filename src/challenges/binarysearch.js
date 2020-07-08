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
    prompt: 'Given a sorted list ("arr"), starting indices ("low" and "high"), and an input integer ("x"), implement a binary search algorithm to find the index of the input integer. Return the index or -1 if x does not appear in the list. Do not use Python\'s built-in index() function. Hint: the prompt, starting code, and tests are designed for a recursive solution.',
    tags: ['intermediate'],
    forbiddenSubstring: ['index', 'recursion'],
    tests: (userFunc) => {
      return {
        returnsValue: {
          name: "Function returns a value? ",
          result: () => assertIsNotUndefined(userFunc([0,1,2], 0, 2, 1))
        },
        assertEqualsLengthOne: {
          name: "Returned index is correct when list contains only one item? ",
          result: () => assertEquals(userFunc([1], 0, 0, 1), 0)
        },
        assertEqualsPostiveNumbers: {
          name: "Returned index is correct for a list of only positive numbers? ",
          result: () => assertEquals(userFunc([0,1,2], 0, 2, 1), 1)
        },
        assertEqualsNegativeNumbers: {
          name: "Returned index is correct when list contains only negative numbers? ",
          result: () => assertEquals(userFunc([-5,-3,-1], 0, 2, -3), 1)
        },
        assertEqualsMixedNumbers: {
          name: "Returned index is correct when list contains both positive and negative numbers? ",
          result: () => assertEquals(userFunc([-10,-5,0,1,11], 0, 4, 1), 3)
        },
      }
    },
    startingCode: `def binary_search(arr, low, high, x):\n\t#your code here`,
    pySolution:`# Returns Index of x in arr if present, else -1\ndef binary_search(arr, low, high, x):\n\n\t# Check base case\n\tif high >= low:\n\n\t\tmid = (high + low) // 2\n\n\t\t# If element is present at the middle itself\n\t\tif arr[mid] == x:\n\t\treturn mid\n\n\t# If element is smaller than mid, then it can only\n\t# be present in left subarray\n\telif arr[mid] > x:\n\t\treturn binary_search(arr, low, mid - 1, x)\n\n\t# Else the element can only be present in right subarray\n\telse:\n\t\treturn binary_search(arr, mid + 1, high, x)\n \n\telse:\n\t\t# Element is not present in the array\n\t\treturn -1`,
  }
  
  export default binarysearch