import {
  assertArrayEquals,
  assertIsNotUndefined
} from '../tests'

const fizzbuzz = {
  id: 'fizzbuzz',
  name: 'Fizz buzz',
  path: '/fizzbuzz',
  reqFuncName: 'fizz_buzz',
  description: 'A classic programming challenge designed to test basic programming abilities.',
  prompt: 'Write a function that returns an array containing 100 elements.  These elements will be the numbers from 1 to 100, with the following exceptions: 1) for multiples of three, add “Fizz” instead of the number 2) for the multiples of five, add “Buzz” instead of the number and 3) for numbers that are multiples of both three and five add “FizzBuzz”.',
  tags: ['easy'],
  forbiddenSubstring: [],
  tests: (userFunc) => {
    return {
      returnsValue: {
        name: "Function returns a value? ",
        result: () => assertIsNotUndefined(userFunc())
      },
      assertArrayEquals: {
        name: "Returned value is correct? ",
        result: () => assertArrayEquals(userFunc(), fizzbuzz.jsSolution())
      }
    }
  },
  jsSolution: () => {
    let retArr = []
    for (let i = 1; i <= 100; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        retArr.push('FizzBuzz')
      } else if (i % 3 !== 0 && i % 5 === 0) {
        retArr.push('Buzz')
      } else if (i % 3 === 0 && i % 5 !== 0) {
        retArr.push('Fizz')
      }
      else {
        retArr.push(i)
      }
    }
    return retArr
  },
  startingCode: `def fizz_buzz():\n\t# your code here`,
  pySolution: ``,
}

export default fizzbuzz