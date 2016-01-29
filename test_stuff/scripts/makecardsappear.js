// THIS CODE WILL MAKE TWO RANDOM CARDS APPEAR WHEN THE PLAYER PRESSES PLAY
// created this file to test ways to make cards appear dynamically 

var player = {

  hand: [],
  handSum: null, // lol handsome
  hasBlackjack: false,
  hasBust: false

};

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



buildDeck();

var pickedCard; // store outside of random card function so I can access it later

// selects card object from random index of cards array
var drawRandomCard = function() {

  var arrayLength = cards.length; // stores length of array

  var randomIndex = Math.floor(Math.random() * arrayLength); // generates random index position

  pickedCard = cards[randomIndex]; // pulls card using randomly generated index position

  // console.log(cards[randomIndex]);

  console.log(pickedCard); // confirming that pickedCard is the same as cards[randomIndex]

  pickedCard.used = true; // is there a way to do toggle card using "this"?

  // console.log(pickedCard); // checks if value of used has been toggled to true

  // while (pickedCard.used === true) {

  // }


  // NEED TO REMOVE THE DRAWN CARD FROM THE DECK

} // <-- closes drawRandomCard function


// function creates a card div with the number or face inside
var dealCard = function() {
  
  drawRandomCard()

  var $playerSection = $("#player"); // grabs player section

  $createCard = $("<div class='card'>");

  $createCard.appendTo($playerSection);

  $cardNumber = $("<span class='card-name'>");

  if(pickedCard.numberCard == false) {

    $cardNumber.text(pickedCard.faceCard);

  } else {

    $cardNumber.text(pickedCard.numberCard); 

  }

  // $cardNumber.text(pickedCard.numberCard); // what to do here if it's not a number
      // if statement?

  $createCard.append($cardNumber)

}



// var dealHand = function() {

//   for (i = 0; i < 2; i++){

//     drawRandomCard();

//     dealCard();

//     player.hand.push(pickedCard);

//    } // closes for loop 

// }

// runs dealCard function on click
var $playButton = $("#play"); // grabs element with id "play"

$playButton.click(function(){

  for (i=0; i < 2; i++) {

    drawRandomCard();

    dealCard();

    player.hand.push(pickedCard)

  }

}) // <-- closes playButton click function




// -------------------
// // THIS CODE BELOW WILL MAKE A RANDOM CARD APPEAR ONE AT A TIME

// // CREATE A DECK OF CARDS ---------

// // Constructor function to create a deck of cards
// function Card (usedValue, suitName, faceName, number, cardValue) {

//   this.used = usedValue; // boolean for if the card has been used or not
//   this.suit = suitName; // string value for the suit of the card
//   this.faceCard = faceName; // A, J, Q, K
//   this.numberCard = number; // 2, 3, 4, 5, 6, 7, 8, 9, 10
//   this.cardValue = cardValue; // sets numeric card value on card

// } // closes constructor function

// var cards = []; // empty array for new cards to be pushed into

// // Uses Card constructor to create a deck of cards
// var buildDeck = function() {

//   var face = ["A", "J", "Q", "K"];
//   var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
//   var suits = ["Club", "Spade", "Diamond", "Heart"];

//       // // tests that a new card can be created
//       // cards.push(new Card(false, suits[0], false, numbers[0]))
  
//       // // cards.push(testCard)
//       // console.log(cards);

//   // for loop creates a card for each number and face within a suit
//   for (var i = 0; i < suits.length; i++) {

//     // creating number cards for selected suit and pushing into cards array
//     for (var j = 0; j < numbers.length; j++) {

//       cards.push(new Card(false, suits[i], false, numbers[j], numbers[j]));

//     } // <-- closes numbers.length for loop

//     // creating face cards for selected suit and pushing into cards array
//     for (var j = 0; j < face.length; j++) {

//       cards.push(new Card(false, suits[i], face[j], false, 10));

//     } // <-- closes numbers.length for loop 

//   } // <-- closes suits for loop

//   // sets value of Ace
//   if (Card.faceCard === "A") {

//       Card.cardValue = "Hello"

//   } // this does not work

//   return cards;

// } // <-- closes buildDeck function



// buildDeck();

// var pickedCard; // store outside of random card function so I can access it later

// var drawRandomCard = function() {

//   var arrayLength = cards.length; // stores length of array

//   var randomIndex = Math.floor(Math.random() * arrayLength); // generates random index position

//   pickedCard = cards[randomIndex]; // pulls card using randomly generated index position

//   // console.log(cards[randomIndex]);

//   console.log(pickedCard); // confirming that pickedCard is the same as cards[randomIndex]

//   pickedCard.used = true; // is there a way to do toggle card using "this"?

//   // console.log(pickedCard); // checks if value of used has been toggled to true

//   // while (pickedCard.used === true) {

//   // }


//   // NEED TO REMOVE THE DRAWN CARD FROM THE DECK

// } // <-- closes drawRandomCard function

// drawRandomCard()


// // runs dealCard function on click
// var $playButton = $("#play"); // grabs element with id "play"

// $playButton.click(function(){

//   dealCard()

//   console.log("ready to play?"); // confirms button responds on click

// }) // <-- closes playButton click function


// // function creates a card div with the number or face inside
// var dealCard = function() {
  
//   drawRandomCard()

//   var $playerSection = $("#player"); // grabs player section

//   $createCard = $("<div class='card'>");

//   $createCard.appendTo($playerSection);

//   $cardNumber = $("<span class='card-name'>");

//   if(pickedCard.numberCard == false) {

//     $cardNumber.text(pickedCard.faceCard);

//   } else {

//     $cardNumber.text(pickedCard.numberCard); 

//   }

//   // $cardNumber.text(pickedCard.numberCard); // what to do here if it's not a number
//       // if statement?

//   $createCard.append($cardNumber)

// }



// var dealHand = function() {

//   for (i = 0; i < 2; i++){

//     drawRandomCard();

//     player.hand.push(pickedCard);

//    } // closes for loop 

// }


