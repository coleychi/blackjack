// $(function() { 

  // console.log("I'm running"); // confirms that 
  // ==========
  // MISC STUFF
  // ----------
  // Might be able to move this doen when window onload goes on?

  var addNewMessage = function(message) {

      var $messageDiv = $("#message-center"); // grabs div with id "message-center"
      var $newMessage = $("<p>"); // creates new p tag
      $newMessage.text(message); // sets innertext for p tags
      $newMessage.appendTo($messageDiv);

  }

  // =====================
  // PLAYER DEFAULT VALUES
  // ---------------------

  var player = {

    hand: [],
    balance: 500,
    currentBet: null,
    handSum: null, // lol handsome
    hasBlackjack: false, // might be able to take this out?
    hasBust: false, // might be able to take this out?

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

  var usedCardsCount = 0; // stores the number of used cards in cards array

  // Uses Card constructor to create a deck of cards
  var buildDeck = function() {

    var face = ["A", "J", "Q", "K"];
    var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    var suits = ["&clubs;", "&spades;", "&diams;", "&hearts;"]
    // var suits = ["Club", "Spade", "Diamond", "Heart"];

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

    if (usedCardsCount > 35) {

      for (var i = 0; i < cards.length; i++) {

        cards[i].used = false;

      } // resets all the cards used values to false 

      usedCardsCount = 0; // resets counter to 0

    } // <-- closes if statement    

    var arrayLength = cards.length; // stores length of array

    var randomIndex = Math.floor(Math.random() * arrayLength); // generates random index position

    pickedCard = cards[randomIndex]; // pulls card using randomly generated index position

    // console.log(cards[randomIndex]);

    console.log(pickedCard); // confirming that pickedCard is the same as cards[randomIndex]

    while (pickedCard.used === true) {

      newRandomIndex = Math.floor(Math.random() * arrayLength);

      pickedCard = cards[newRandomIndex];

      console.log(pickedCard);

    } // <-- closes while loop

    // console.log(pickedCard); // checks if value of used has been toggled to true

    pickedCard.used = true; // is there a way to do toggle card using "this"?

    usedCardsCount += 1; // adds 1 to usedCardsCount value

    // usedCardsCount += 1; // adds 1 to the counter

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

    $createCard.append($cardNumber); // appends span to card div

    $cardSuit = $("<span class='card-suit'>");

    $cardSuit.html(pickedCard.suit);

    $createCard.append($cardSuit);

  }


  // play button generates user hand (draw two cards)
  var $playButton = $("#play"); // grabs element with id "play"

  addNewMessage("Place a bet and then press play.");

  // $(".now-what").hide(); // hides now what buttons

  // var $newMessage = $("<p>");
  // $newMessage.text("Place a bet and then press play.");
  // $("#message-center").append($newMessage);

  $playButton.click(function(){

    // console.log("this is this " + this); // checks correct item is selected

    if (!$(this).hasClass("disable-click") && !$(this).hasClass("bet-first")) {

      $(".place-bet").addClass("disable-click");

      // iteration runs twice
      for (i = 0; i < 2; i++) {

        // drawRandomCard(); // draws random card from cards array

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

      // $(this).hide(); // hides play button

      generateDealerHand(); // generates dealer hand

    } else if ($(this).hasClass("bet-first")) {

        addNewMessage("Place a bet first.");

    } else {

        addNewMessage("You were already dealt a hand! Press HIT or STAY to continue.");

      } // <-- closes if/else statement

    // generates dealer hand

  }); // <-- closes playButton click function

  // hit button generates one card

  var $hitButton = $("#hit");

  $hitButton.click(function() {

    if (!$hitButton.hasClass("disable-click")) {

      // drawRandomCard(); // draws random card from cards array

      dealCard(); // displays card in div with id "player"

      player.hand.push(pickedCard); // pushes the dealt card to player's hand

      addCardValues(); // function adds the value of all cards in player's hand array

      checkForBlackjack(); // checks player's hand sum for blackjack

      checkForBust(); // checks player's hand sum for bust

    } else {

        addNewMessage("You can't have another card, silly!");

    } // <-- closes if statement

    checkWinner();

  }); // <-- closes hitButton click function

  // stay button generates dealer's hand

  var $stayButton = $("#stay");

  $stayButton.click(function() {

    if (!$(this).hasClass("disable-click") && !$hitButton.hasClass("disable-click")) { // might be able to take this out

      // generateDealerHand(); // generates the dealer's hand

      while (dealer.handSum <= 17) { // generates new cards for dealer if hand is less than 17

      drawRandomCard(); // draws random card from cards array

      dealer.hand.push(pickedCard); // pushes the dealt card to dealer's hand

      dealer.handSum += pickedCard.cardValue; // adds value of picked card to dealer's hand sum

      console.log(dealer.handSum);

      $createCard = $("<div class='card'>");

      $createCard.appendTo($("#dealer"));

      $cardNumber = $("<span class='card-name'>");

      if(pickedCard.numberCard == false) {

        $cardNumber.text(pickedCard.faceCard); // if the card is not a number, display face value in span

        } else {

        $cardNumber.text(pickedCard.numberCard); // if the card is a number, display number value in span

      } // <-- closes if loop 

    $createCard.append($cardNumber);

    $cardSuit = $("<span class='card-suit'>");

    $cardSuit.html(pickedCard.suit);

    $createCard.append($cardSuit);

    } // <-- closes while loop

      $(this).addClass("disable-click");

    }

    checkWinner();

  }) // <-- closes stayButton function



  // =====================
  // BETTING FUNCTIONALITY
  // ---------------------

  var $placeBetButton = $(".place-bet");

  var $betInputBar = $("#bet-input");

  $placeBetButton.click(function(){ 
  // console.log(this); // confirms that this recognizes unique buttons

    if (!$(this).hasClass("disable-click")) {


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

    addNewMessage("You have placed your bet of " + player.currentBet);

    $("#play").removeClass("bet-first"); // removes class "bet-first" so player can play

    };

  }); // <-- closes placeBetButton click function

  // =========================
  // DEALER FUNCTION AND LOGIC
  // -------------------------

  var dealer = {

    hand: [],
    handSum: null, // lol handsome
    hasBlackjack: false, // might be able to take this out?
    hasBust: false, // might be able to take this out?

  };

  var generateDealerHand = function() {

    var $dealerSection = $("#dealer");

    drawRandomCard(); // draws random card from cards array

    dealer.hand.push(pickedCard); // pushes the dealt card to dealer's hand

    $createSecretCard = $("<div class='card hidden-card'>"); // gives first card a hidden class

    $createSecretCard.appendTo($dealerSection); // appends first card to dealer's section

    dealer.handSum += pickedCard.cardValue;

    drawRandomCard(); // draws random card from cards array

    dealer.hand.push(pickedCard);

    $createCard = $("<div class='card'>");

    $createCard.appendTo($dealerSection);

    dealer.handSum += pickedCard.cardValue;

      $cardNumber = $("<span class='card-name'>");

      if(pickedCard.numberCard == false) {

        $cardNumber.text(pickedCard.faceCard); // if the card is not a number, display face value in span

        } else {

        $cardNumber.text(pickedCard.numberCard); // if the card is a number, display number value in span

      } // <-- closes if loop 

    $createCard.append($cardNumber);

    $cardSuit = $("<span class='card-suit'>");

    $cardSuit.html(pickedCard.suit);

    $createCard.append($cardSuit);

  } // <-- closes generateDealerHand function


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

      player.hasBlackjack = true; // sets hasBlackjack key to true in player object

      alert("BLACKJACK!"); // comment this out

      // console.log(this)

      $("#hit").addClass("disable-click");

    };

  }; // <-- closes checkForBlackjack function

  var checkForBust = function() {

    if (player.handSum > 21) {

      player.hasBust = true; // sets hasBust key to true in player object

      alert("BUST!"); // comment this out

      // addNewMessage("You've busted.");

      $("#hit").addClass("disable-click");

    };

    // console.log(player)

  }; // <-- closes checkForBust function

  var checkWinner = function() {

    showHiddenCard(); 

    // checks winning conditions
    if ((player.hasBlackjack === true && dealer.hasBlackjack === true) || (player.handSum === dealer.handSum)) {
      
      player.balance += player.currentBet;

      addNewMessage("It's a tie! Here's your money back.");

    } else if ((player.hasBlackjack === true) || (player.handSum > dealer.handSum)) {

      player.balance += (2 * player.currentBet);

      addNewMessage("You won! $" + (2 * player.currentBet) + " has been added to your bank");

    } else if (player.hasBust === true || player.cardValue > 21) {

      addNewMessage("You busted.")

    } else {

      addNewMessage("Dealer wins!")

    }

    player.currentBet = 0; // resets current bet amount to 0

    var $playerBalance = $(".money"); // grabs span with class money
    $playerBalance.text(player.balance); // START AMOUNT IS HARDCODED INTO HTML

    nowWhat(); // runs nowWhat function

    // $(".move-button").hide(); // hides move-button options
    // $(".now-what").show(); // reveals now-what options

  }

  // reveals the dealer's hidden card
  var showHiddenCard = function() {

    var dealerHiddenCard = dealer.hand[0];

    // console.log(dealerHiddenCard); 

    var $hiddenCard = $(".hidden-card");

    $cardNumber = $("<span class='card-name'>");

      if(dealerHiddenCard.numberCard == false) {

        $cardNumber.text(dealerHiddenCard.faceCard); // if the card is not a number, display face value in span

        } else {

        $cardNumber.text(dealerHiddenCard.numberCard); // if the card is a number, display number value in span

      } // <-- closes if loop 

    $hiddenCard.append($cardNumber);

    $cardSuit = $("<span class='card-suit'>");

    $cardSuit.html(dealerHiddenCard.suit);

    $hiddenCard.append($cardSuit);

    $hiddenCard.removeClass("hidden-card")

  }

  var nowWhat = function() {

    $(".move-button").hide(); // hides move-button options

    var $playAgainButton = $("<button class='now-what'>"); // creates new button with class now what

    $playAgainButton.text("Play Again");

    $playAgainButton.appendTo("#player-move")


    $playAgainButton.click(function(){

        newRound();

        $(".move-button").show();

        $(".now-what").hide();

    }); // <-- closes playAgainButton click function

    var $leaveButton = $("<button class='now-what'>"); 

    $leaveButton.text("Leave Now");

    $leaveButton.appendTo("#player-move");

    $leaveButton.click(function(){

      $("#container").empty(); // empties the entire container div

      var $newDiv = $("<div id='leaving'>");
      $newDiv.text("Well. Bye then.");
      $newDiv.appendTo($("#container"));

    }) // <-- closes leaveButton click function


  }

  var newRound = function() {

    player.hand = [];
    player.handSum = null;
    player.currentBet = null;
    player.hasBlackjack = false; // might be able to take this out?
    player.hasBust = false; // might be able to take this out?

    dealer.hand = [];
    dealer.handSum = null; 
    dealer.hasBlackjack = false; // might be able to take this out?
    dealer.hasBust = false; // might be able to take this out?

    addNewMessage("Place a bet to play again!"); // prompts user to place a bet to play again

    $("#player").empty();

    $("#dealer").empty();

    $(".place-bet").removeClass("disable-click"); // allows user to press bet buttons

  }

// // ==========
// // MISC STUFF
// // ----------

// var addNewMessage = function(message) {

//     var $messageDiv = $("#message-center"); // grabs div with id "message-center"
//     var $newMessage = $("<p>"); // creates new p tag
//     $newMessage.text(message); // sets innertext for p tags
//     $newMessage.appendTo($messageDiv);

// }

// }); // <-- closes onload function