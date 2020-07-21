import {
    assertEquals,
    assertIsNotUndefined
  } from '../tests'
  
  const palindrome = {
    id: 'palindrome',
    name: 'Palindrome',
    path: '/palindrome',
    reqFuncName: 'check_palindrome',
    description: 'An easy challenge to get your feet wet with strings.',
    prompt: 'Write a "check_palindrome" function that takes in a string and returns true/false if that string is a palindrome (including multi-word strings!).  Do not use the built-in reversed() function.',
    tags: ['easy', 'strings'],
    forbiddenSubstring: ['reversed'],
    tests: (userFunc) => {
      return {
        returnsValue: {
          name: "Function returns a value? ",
          result: () => assertIsNotUndefined(userFunc('test'))
        },
        assertEqualsTrueOneWord: {
          name: "Returns true for single-word palindrome? ",
          result: () => assertEquals(userFunc('racecar'), true)
        },
        assertEqualsFalseOneWord: {
          name: "Returns false for single-word non-palindrome? ",
          result: () => assertEquals(userFunc('test'), false)
        },
        assertEqualsTrueMultipleWords: {
          name: "Returns true for multiple-word palindrome? ",
          result: () => assertEquals(userFunc('do geese see god'), true)
        },
        assertEqualsFalseMultipleWords: {
          name: "Returns false for multiple-word non-palindrome? ",
          result: () => assertEquals(userFunc('this is not a palindrome'), false)
        },
        assertEqualsTrueCapitalLetters: {
          name: "Returns true for palindrome with capital letters? ",
          result: () => assertEquals(userFunc('racecAr'), true)
        },
      }
    },
    startingCode: `def check_palindrome(s):\n\t# your code here`,
    pySolution:`def check_palindrome(s):\n\t# remove capital letters\n\ts = s.lower()\n\t# remove whitespace\n\ts = s.replace(' ', '')\n\treturn s == s[::-1]`,
  }
  
  export default palindrome