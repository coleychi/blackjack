// Constructor function to create a deck of cards

function Card (usedValue, suitName, faceName, number) {

  this.used = usedValue; // boolean for if the card has been used or not
  this.suit = suitName; // string value for the suit of the card
  this.faceCard = faceName; // A, J, Q, K
  this.numberCard = number; // 2, 3, 4, 5, 6, 7, 8, 9, 10

} // closes constructor function

var cards = []; // empty array for new cards to be pushed into

var buildDeck = function() {

  var face = ["A", "J", "Q", "K"];
  var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  var suits = ["Club", "Spade", "Diamond", "Heart"];

      // // tests that a new card can be created
      // cards.push(new Card(false, suits[0], false, numbers[0]))
  
      // // cards.push(testCard)
      // console.log(cards);

  // for loop creates a card for each number and face within a suit
  for (var i = 0; i < suits.length; i++) {

    // creating number cards for selected suit and pushing into cards array
    for (var j = 0; j < numbers.length; j++) {

      cards.push(new Card(false, suits[i], false, numbers[j]));

    } // <-- closes numbers.length for loop

    // creating face cards for selected suit and pushing into cards array
    for (var j = 0; j < face.length; j++) {

      cards.push(new Card(false, suits[i], face[j], false));

    } // <-- closes numbers.length for loop 

  } // <-- closes suits for loop

  return cards;

} // <-- closes buildDeck function


buildDeck();
console.log(cards);
console.log(typeof(cards));




// THIS CONSTRUCTOR WORKS DO NOT TOUCH IT --------------
// CONSUTRCTOR FUNCTION FOR CARDS
var card = function (cardValue, cardName, suit) {

  this.cardValue = cardValue;

  this.cardName = cardName;

  this.suit = suit;

}

// BUILDS A DECK OF CARDS
var cards = []; // empty array to store the cards 

var buildDeck = function() {
  this.names = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  this.suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
    
    for(var i = 0; i < this.suits.length; i++) {

        for(var j = 0; j < this.names.length; j++) {

            cards.push(new card(j + 1, this.names[j], this.suits[i])); // pushes new cards to empty array
        }
    }

    return cards; 
}

buildDeck(); 
console.log(cards)
console.log(typeof(cards));

/// ---------------- END WORKING CONSTRUCTOR




// TESTING SHUFFLE FUNCTION HERE
    // USING FISHER-YATES METHOD: http://www.kirupa.com/html5/shuffling_array_js.htm

// var shuffleArray = function(array) {

//   var inputArray = array;

//   // console.log(inputArray.length - 1);

//   for (var i = inputArray.length - 1; i >= 0; i--) {

//     var randomIndex = Math.floor(Math.random() * (i + 1));

//     var itemAtIndex = inputArray[randomIndex];

//     inputArray[randomIndex] = inputArray[i];

//     inputArray[i] = itemAtIndex;

//   }

//   return inputArray

// }

// var testArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// var shuffle = function(array) {

//   var currentIndex = array.length; // start at the end
//   var tempValue = null;
//   var randomIndex = null;

//   while (0 != currentIndex) {

//     randomIndex = Math.floor(Math.random() * currentIndex);

//     currentIndex -= 1;

//     tempValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = tempValue;

//   }

//   return array

// };


// DONT NEED TO SHUFFLE --> FIND A RANDOM INDEX


// console.log(shuffle(shuffle(shuffle(cards))))

// console.log(shuffle(shuffle(testArray))); // double shuffle



// http://www.itsmycodeblog.com/shuffling-a-javascript-array/
// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex ;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }
