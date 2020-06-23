const challenges = {
    fizzbuzz: {
        id: 0,
        name: 'Fizz buzz',
        path: '/fizzbuzz',
        description: 'A classic programming challenge designed to test basic programming abilities.',
        prompt: 'Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.',
        solution: `
        for n in range(1,100):
          if n % 3 == 0 and n % 5 != 0:
            print("fizz")
          elif n % 5 == 0 and n % 3 != 0:
            print("buzz")
          elif n % 3 == n % 5 == 0:
            print('Fizzbuzz')
          else:
            print(n)
        `,
        
    }
}

export default challenges