require('./app/index')

console.log('Hello from Node.js')

// Asynchronous in Node.js
const fs = require('fs')

// let content

// try {
//  content = fs.readFileSync('../README.md', 'utf-8')
// } catch (e) {
//  console.log(e)
// }

// console.log(content)

console.log('Start reading a file')

fs.readFile('../README.md', 'utf-8', function (err, content) {
  if (err) {
    console.log('Error happened during reading the file')
    return console.log(err)
  }

  console.log(content)
})

console.log('End of the file')

// Higher-order functions
const numbers = [2, 4, 1, 5, 4]

function isBiggerThanTwo (number) {
  return number > 2
}

const numberFilter = numbers.filter(isBiggerThanTwo)

console.log(numberFilter)
