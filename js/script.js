// $(function() { 

  // console.log("I'm running"); // confirms that 


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


  // ============== 
  // DEAL THE CARDS
  // --------------

  buildDeck(); // is this is the best place to put this?

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
  
    drawRandomCard(); // select random object (card) from cards array

    var $playerSection = $("#player"); // grabs player section

    $createCard = $("<div class='card'>"); // creates div with class "card"

    $createCard.appendTo($playerSection); // appends new card to the player section

    $cardNumber = $("<span class='card-name'>"); // creates span with class "card-name" where the card name will display

    if(pickedCard.numberCard == false) {

      $cardNumber.text(pickedCard.faceCard); // if the card is not a number, display face value in span

    } else {

      $cardNumber.text(pickedCard.numberCard); // if the card is a number, display number value in span

    }

    // $cardNumber.text(pickedCard.numberCard); // what to do here if it's not a number
        // if statement?

    $createCard.append($cardNumber); // appends span to card div

  }


  // play button generates user hand (draw two cards)
  var $playButton = $("#play"); // grabs element with id "play"

  $playButton.click(function(){

    // console.log("this is this " + this); // checks correct item is selected

    if (!$(this).hasClass("disable-click")) {
      // iteration runs twice
      for (i = 0; i < 2; i++) {

        drawRandomCard(); // draws random card from cards array

        dealCard(); // displays card in div with id "player"

        player.hand.push(pickedCard); // pushes the dealt card to player's hand

      } 

      addCardValues(); // function adds the value of all cards in player's hand array

      checkForBlackjack(); // checks player's hand sum for blackjack

      checkForBust(); // checks player's hand sum for bust

      // console.log(this);
      // console.log($(this));

      $(this).addClass("disable-click"); // disables onclick function from firing
      // this.addClass.("clicked");

    } else {

        var $newMessage = $("<p>");
        $newMessage.text("You were already dealt a hand!");
        $("#message-center").append($newMessage);

      } // <-- closes if/else statement

  }); // <-- closes playButton click function


        // BELOW CAN BE DELETED PROBABLY
        // // play button generates user hand (draw two cards)
        // var $playButton = $("#play"); // grabs element with id "play"

        // $playButton.click(function(){

        //   // iteration runs twice
        //   for (i = 0; i < 2; i++) {

        //     drawRandomCard(); // draws random card from cards array

        //     dealCard(); // displays card in div with id "player"

        //     player.hand.push(pickedCard); // pushes the dealt card to player's hand

        //   };

        //   addCardValues(); // function adds the value of all cards in player's hand array

        //   checkForBlackjack(); // checks player's hand sum for blackjack

        //   checkForBust(); // checks player's hand sum for bust

        // }); // <-- closes playButton click function


        // hit button generates one card

  var $hitButton = $("#hit");

  $hitButton.click(function() {

    if (!$hitButton.hasClass("disable-click")) {

      drawRandomCard(); // draws random card from cards array

      dealCard(); // displays card in div with id "player"

      player.hand.push(pickedCard); // pushes the dealt card to player's hand

      addCardValues(); // function adds the value of all cards in player's hand array

      checkForBlackjack(); // checks player's hand sum for blackjack

      checkForBust(); // checks player's hand sum for bust

    } else {

        var $newMessage = $("<p>");
        $newMessage.text("You can't have another card, silly!");
        $("#message-center").append($newMessage);

    } // <-- closes if statement

  }); // <-- closes hitButton click function



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

    }; // <-- closes if statement

    // Updates message center with bet information
    var $playerBalance = $(".money"); // grabs span with class money
    $playerBalance.text(player.balance); // START AMOUNT IS HARDCODED INTO HTML
    var $messageDiv = $("#message-center"); // grabs div with id "message-center"
    var $newMessage = $("<p>"); // creates new p tag
    $newMessage.text("You have placed your bet of " + player.currentBet); // sets innertext for p tags
    $messageDiv.append($newMessage); // appends new paragraph to message div

  }); // <-- closes placeBetButton click function

  // ====================
  // BLACKJACK GAME LOGIC
  // --------------------

  // adds card values // CHANGE PLAYER TO THIS TO REUSE THIS FUNCTION FOR THE DEALER
  var addCardValues = function () {

    console.log(player.hand);

    player.handSum = 0; // resets player.handSum to zero (otherwise numbers add weirdly)

    for (i = 0; i < player.hand.length; i++) {

      // console.log(player.hand[i].cardValue);

      player.handSum += player.hand[i].cardValue;

    }

      console.log(player.handSum);

  } // <-- closes addCardValues function

  var checkForBlackjack = function() {

    if (player.handSum === 21) {

      alert("BLACKJACK!");

      $("#hit").addClass("disable-click");

    };

  }; // <-- closes checkForBlackjack function

  var checkForBust = function() {

    if (player.handSum > 21) {

      alert("BUST!");

      $("#hit").addClass("disable-click");

    };

  }; // <-- closes checkForBust function


// }); // <-- closes onload function


