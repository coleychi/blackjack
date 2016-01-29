// // THIS GOES WITH "CARDS.HTML"
// console.log("I'm alive!");

// CREATE A DECK OF CARDS ---------

// Constructor function to create a deck of cards
function Card (usedValue, suitName, faceName, number, cardValue) {

  this.used = usedValue; // boolean for if the card has been used or not
  this.suit = suitName; // string value for the suit of the card
  this.faceCard = faceName; // A, J, Q, K
  this.numberCard = number; // 2, 3, 4, 5, 6, 7, 8, 9, 10
  this.cardValue = cardValue; // sets numeric card value on card

} // closes constructor function

var cards = []; // empty array for new cards to be pushed into

// Uses Card constructor to create a deck of cards
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

      cards.push(new Card(false, suits[i], false, numbers[j], numbers[j]));

    } // <-- closes numbers.length for loop

    // creating face cards for selected suit and pushing into cards array
    for (var j = 0; j < face.length; j++) {

      cards.push(new Card(false, suits[i], face[j], false, 10));

    } // <-- closes numbers.length for loop 

  } // <-- closes suits for loop

  // sets value of Ace
  if (Card.faceCard === "A") {

      Card.cardValue = "Hello"

  } // this does not work

  return cards;

} // <-- closes buildDeck function


buildDeck(); // calling function
console.log(cards); // confirming each card has been stored in cards variable
console.log(typeof(cards)); // confirming cards is an object

// ------- END CREATE A DECK OF CARDS



// DRAW A RANDOM CARD FROM THE DECK------

    // STRATEGY: GENERATE RANDOM NUMBER BETWEEN 0 AND 51 AND PULL THAT ITEM FROM CARDS ARRAY

// console.log(Math.floor(Math.random() * 52)); // checking that random numbers are being generated
// (confirming logic)

      // THIS LOGIC WORKS --- 
      //     var arrayLength = cards.length; // stores integer value of the amount of items in cards array
      //     console.log(arrayLength); // confirms arrayLength is 52

      //     var randomIndex = Math.floor(Math.random() * arrayLength); // IS THERE A WAY TO MAKE THIS MORE RANDOM?
      //     // (also do I need to add + 1)
      //     console.log(randomIndex); // confirms random number is being generated

      //     cards[randomIndex]; // selects card from cards array basedon the randomly generated index value
      // // --- END WORKING LOGIC

var drawRandomCard = function() {

  var arrayLength = cards.length; // stores length of array

  var randomIndex = Math.floor(Math.random() * arrayLength); // generates random index position

  var pickedCard = cards[randomIndex]; // pulls card using randomly generated index position

  // console.log(cards[randomIndex]);

  // console.log(pickedCard); // confirming that pickedCard is the same as cards[randomIndex]

  pickedCard.used = true; // is there a way to do toggle card using "this"?

  // console.log(pickedCard); // checks if value of used has been toggled to true

  // while (pickedCard.used === true) {

  // }


  // NEED TO REMOVE THE DRAWN CARD FROM THE DECK

} // <-- closes drawRandomCard function


drawRandomCard(); // testing drawRandomCard function

console.log(cards);


// --- END DRAW A RANDOM CARD FROM THE DECK



