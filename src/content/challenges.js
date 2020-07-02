// This file currently holds basic challenges for development purposes.

import { 
  assertArrayEquals, 
  assertEquals,
  assertIsNotUndefined 
} from '../tests'

const challenges = {

	fizzbuzz: {
		id: 'fizzbuzz',
		name: 'Fizz buzz',
		path: '/fizzbuzz',
		description: 'A classic programming challenge designed to test basic programming abilities.',
		prompt: 'Write a program that prints the numbers from 1 to 100, with the following exceptions: 1) for multiples of three, print “Fizz” instead of the number 2) for the multiples of five, print “Buzz” instead of the number and 3) for numbers that are multiples of both three and five print “FizzBuzz”.',
		startingCode: ``,
		jsSolution: () => {
        let retArr = []
        for(let i = 1; i <= 100; i++){
          if (i % 3 === 0 && i % 5 === 0){
            retArr.push('FizzBuzz')
          } else if (i % 3 !== 0 && i % 5 === 0){
            retArr.push('Buzz')
          } else if (i % 3 === 0 && i % 5 !== 0){
            retArr.push('Fizz')
          }
          else {
            retArr.push(i)
          }
        }
        return retArr
    },
    pySolution: `
for n in range(1,100):
  if n % 3 == 0 and n % 5 != 0:
    print("fizz")
  elif n % 5 == 0 and n % 3 != 0:
    print("buzz")
  elif n % 3 == n % 5 == 0:
    print('Fizzbuzz')
  else:
		print(n)`
		,
    tests: (userFunc) => {
      return {
        returnsValue: {
          name: "Function returns a value? ",
          result: () => assertIsNotUndefined(userFunc())
        },
        assertArrayEquals: {
          name: "Returned value is correct? ",
          result: () => assertArrayEquals(userFunc(), challenges.fizzbuzz.jsSolution())
        }
      }
    }
  },
  
	returnTwo: {
		id: 'returnTwo',
		name: 'Return Two',
		path: '/returnTwo',
		description: 'A very basic function for website testing.',
		prompt: 'Write a function that returns the number 2.',
		startingCode:
`def returnTwo():
  return 2  
`,
    jsSolution: () => { return 2 },
		pySolution:
`def returnTwo():
  return 2`,
    tests: (userFunc) => {
      return {
        returnsValue: {
          name: "Function returns a value? ",
          result: () => assertIsNotUndefined(userFunc())
        },
        assertEquals: {
          name: "Returned value is correct? ",
          result: () => assertEquals(userFunc(), 2)
        },
      }
    },
		oldtests:
`
def test():
  passed_flag = True
  response_message = ''

  try: 
    returnTwo()

    if returnTwo() is None:
      passed_flag = False
      response_message += "returnTwo() does not return a value." + "\\n"     

    if returnTwo() != 2:
      passed_flag = False
      response_message += "returnTwo() does not return number 2." + "\\n"

  except NameError: 
    passed_flag = False
    response_message += "Missing 'returnTwo' function." + "\\n"

  if passed_flag: 
    print("All tests passed.")
    return True
  else:
    print("Tests did not pass:")
    print(response_message)
    return False
test()
`
  },
  addition: {
		id: 'addition',
		name: 'Addition',
		path: '/addition',
		description: 'A simple algorithm that uses inputs.',
		prompt: 'Write an "addition" function that sums two numbers.',
		startingCode:
`def addition(a,b):
  # your code here
`,
		pySolution:
`def addition(a,b):
  return a + b`,
    tests: (userFunc) => {
      return {
        returnsValue: {
          name: "Function returns a value? ",
          result: () => assertIsNotUndefined(userFunc(1,1))
        },
        assertEqualsTwoPostive: {
          name: "Returned value is correct for two positive numbers? ",
          result: () => assertEquals(userFunc(10,5), 15)
        },
        assertEqualsOneZero: {
          name: "Returned value is correct when one number is zero? ",
          result: () => assertEquals(userFunc(99,0), 99)
        },
        assertEqualsOneNegative: {
          name: "Returned value is correct when one number is negative? ",
          result: () => assertEquals(userFunc(-8,5), -3)
        },
        assertEqualsTwoNegative: {
          name: "Returned value is correct when both negative numbers? ",
          result: () => assertEquals(userFunc(-8,-4), -12)
        },
      }
    },
		oldtests:
`
def test():
  passed_flag = True
  response_message = ''

  try: 
    addition(1,1)

    if addition(1,1) is None:
      passed_flag = False
      response_message += "addition(1,1) does not return a value." + "\\n"     

    if addition(1,1) != 2:
      passed_flag = False
      response_message += "addition() does not return correct number." + "\\n"

  except NameError: 
    passed_flag = False
    response_message += "Missing 'addition' function." + "\\n"

  if passed_flag: 
    print("All tests passed.")
    return True
  else:
    print("Tests did not pass:")
    print(response_message)
    return False
test()
`,
	}

}

export default challenges
