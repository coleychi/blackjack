console.log("I'm running");

// Creates player object with default key values

var player = {

  hand: [],
  balance: 500,
  currentBet: null,
  handSum: null, // lol handsome
  hasBlackjack: false,
  hasBust: false,

};

// =====================
// BETTING FUNCTIONALITY
// ---------------------

var $placeBetButton = $(".place-bet");

var $betInputBar = $("#bet-input");

$placeBetButton.click(function(){ 
// console.log(this); // confirms that this recognizes unique buttons

var $betAmount = $(this).text().replace(/\$/g, ''); // removes dollar sign
var integerBetAmount = parseInt($betAmount); // turns string into an integer that can be added/subtracted
  // console.log(typeof($betAmount)); // this returns a string
  // console.log(typeof(integerBetAmount)); // this returns an integer
// console.log($betAmount); // confirms that correct amount has been selected

player.balance -= integerBetAmount; // adjusts the player's balance 
player.currentBet += integerBetAmount; // adjusts the player's bet amount

// Checks that the math happened properly
// console.log(player.balance);
// console.log(player.currentBet);

// sets the player's bet amount as the placeholder text in input bar
$betInputBar.attr("placeholder", player.currentBet);

// player cannot bet money that he does not have
if (player.balance <= 0) {

  // console.log("NOPE"); // checks that if statement works

  $placeBetButton.prop("disabled", true); // disables button functionality
  alert("YOU DON'T HAVE ENOUGH MONEY TO DO THAT!!!!"); // alerts player that there is no more money

}

// Updates message center with bet information
var $playerBalance = $(".money"); // grabs span with class money
$playerBalance.text(player.balance); // START AMOUNT IS HARDCODED INTO HTMLs
var $messageDiv = $("#message-center"); // grabs div with id "message-center"
var $newMessage = $("<p>"); // creates new p tag
$newMessage.text("You have placed your bet of " + player.currentBet); // sets innertext for p tags
$messageDiv.append($newMessage); // appends new paragraph to message div

}) // <-- closes placeBetButton click function



// 1-- MAKE LOGIC WORK --> SHUFFLE, DRAW, RECOGNIZE BUST, MAKE ACE WORK

    // -- SHUFFLE / DRAW (PULL RANDOM NUMBER FROM ARRAY)

    // -- RECOGNIZE BUST

    // -- RECOGNIZE BLACKJACK

    // -- FUNCTIONAL ACE

// 2-- DO DEALER (look up rules-- when to continue drawing) 

// 3-- BETTING (can't bet negative, can't bet more than you have)

// 4-- BUTTON FUNCTIONALITY

// 5-- HIDE ONE DEALER CARD

    // -- ADD A CSS CLASS TO FIRST DEALER'S CARD?

// 6-- WINS AND LOSSES COUNTER