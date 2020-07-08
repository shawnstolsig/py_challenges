import {
    assertArrayEquals,
    assertIsNotUndefined
  } from '../tests'
  
  const missingnumbers = {
    id: 'missingnumbers',
    name: 'Missing Numbers',
    path: '/missingnumbers',
    reqFuncName: 'find_numbers',
    description: 'In this challenge, you are missing one or more numbers in an ordered list. How do you find the number(s)?',
    prompt: 'Write a "find_numbers" function that returns an array containing the number(s) missing from the input array.',
    tags: ['easy', 'arrays'],
    forbiddenSubstring: [],
    tests: (userFunc) => {
      return {
        returnsValue: {
          name: "Function returns a value? ",
          result: () => assertIsNotUndefined(userFunc([1,2,3,5]))
        },
        assertEqualsTrueOneMissing: {
          name: "Returns correct value with a single missing value? ",
          result: () => assertArrayEquals(userFunc([1,2,3,5]), [4])
        },
        assertEqualsTrueMultipleMissing: {
          name: "Returns correct value with multiple missing values? ",
          result: () => assertArrayEquals(userFunc([1,3,5,6,7,8,9,10]), [2,4])
        },
        assertEqualsTrueNegativeNumbers: {
          name: "Returns correct value when array contains negative numbers? ",
          result: () => assertArrayEquals(userFunc([-3,0,1,2,3,5]), [-2,-1,4])
        },
      }
    },
    startingCode: `def find_numbers(arr):\n\t# your code here`,
    pySolution:`
def find_numbers(arr):\n\t# create a list that will hold return values\n\tretArr = []\n\t# create an array containing range of numbers that you expect to see\n\texpectedArr = list(range(arr[0], arr[len(arr)-1]))\n\t# iterate through expected arrays\n\tfor i in range(0,len(expectedArr)):\n\t\t# if the expected element does not exist in input list\n\t\tif expectedArr[i] not in arr:\n\t\t\t# append missing element to return list\n\t\t\tretArr.append(expectedArr[i])\n\treturn retArr`,
  }
  
  export default missingnumbers