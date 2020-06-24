// shape:
// path: {
//   id:
//   name:
//   path:
//   description:
//   prompt:
//   startingCode:
//   solution:
//   tests: [
//        {
//          title: '',
//          input: ,
//          output: ,
//        }
//      ]
//   }
// }

const challenges = {
	fizzbuzz: {
		id: 0,
		name: 'Fizz buzz',
		path: '/fizzbuzz',
		description: 'A classic programming challenge designed to test basic programming abilities.',
		prompt: 'Write a program that prints the numbers from 1 to 100, with the following exceptions: 1) for multiples of three, print “Fizz” instead of the number 2) for the multiples of five, print “Buzz” instead of the number and 3) for numbers that are multiples of both three and five print “FizzBuzz”.',
		startingCode: ``,
		solution:
`for n in range(1,100):
  	if n % 3 == 0 and n % 5 != 0:
    	print("fizz")
  	elif n % 5 == 0 and n % 3 != 0:
    	print("buzz")
  	elif n % 3 == n % 5 == 0:
    	print('Fizzbuzz')
  	else:
    	print(n)`
		,
		tests: [
			{
				title: "Put a test title here",
				input: null,
				output: 2
			}
		]
	},
	trial: {
		id: 1,
		name: 'Test Trials',
		path: '/trial',
		description: 'Working on implementing tests for the script',
		prompt: 'Write a function that returns the number 2.',
		startingCode:
`def returnTwo():
    # your code here
    
returnTwo()`,
		solution:
`def returnTwo():
    return 2`,
		tests: [
			{
				title: "Returns 2 with no input?",
				input: null,
				output: 2
			}
		]
	}
}

export default challenges