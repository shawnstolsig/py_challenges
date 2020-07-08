import {
  assertEquals,
  assertIsNotUndefined
} from '../tests'

const addition = {
  id: 'addition',
  name: 'Addition',
  path: '/addition',
  reqFuncName: 'addition',
  description: 'A very simple coding challenge to get you started!',
  prompt: 'Write an "addition" function that returns the sum of two numbers.',
  tags: ['easy'],
  forbiddenSubstring: [],
  tests: (userFunc) => {
    return {
      returnsValue: {
        name: "Function returns a value? ",
        result: () => assertIsNotUndefined(userFunc(1, 1))
      },
      assertEqualsTwoPostive: {
        name: "Returned value is correct for two positive numbers? ",
        result: () => assertEquals(userFunc(10, 5), 15)
      },
      assertEqualsOneZero: {
        name: "Returned value is correct when one number is zero? ",
        result: () => assertEquals(userFunc(99, 0), 99)
      },
      assertEqualsOneNegative: {
        name: "Returned value is correct when one number is negative? ",
        result: () => assertEquals(userFunc(-8, 5), -3)
      },
      assertEqualsTwoNegative: {
        name: "Returned value is correct when both negative numbers? ",
        result: () => assertEquals(userFunc(-8, -4), -12)
      },
    }
  },
  startingCode: `def addition(a,b):\n\t# your code here`,
  pySolution:`def addition(a,b):\n\treturn a + b`,
}

export default addition