// // THIS GOES WITH "CARDS.HTML"
// console.log("I'm alive!");

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







