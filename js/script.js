// $(function() { 

  console.log("I'm running");


  // =====================
  // PLAYER DEFAULT VALUES
  // ---------------------

  var player = {

    hand: [],
    balance: 500,
    currentBet: null,
    handSum: null, // lol handsome
    hasBlackjack: false,
    hasBust: false,

  };



  // ======================
  // GENERATE DECK OF CARDS
  // ----------------------

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
  $playerBalance.text(player.balance); // START AMOUNT IS HARDCODED INTO HTML
  var $messageDiv = $("#message-center"); // grabs div with id "message-center"
  var $newMessage = $("<p>"); // creates new p tag
  $newMessage.text("You have placed your bet of " + player.currentBet); // sets innertext for p tags
  $messageDiv.append($newMessage); // appends new paragraph to message div

  }) // <-- closes placeBetButton click function


  // ==================
  // DEAL INITIAL HAND
  // ------------------

  var $playButton = $("#play"); // grabs element with id "play"

  $playButton.click(function(){

    console.log("ready to play?"); // confirms button responds on click

    

  }) // <-- closes playButton click function



// }); // <-- closes onload function

