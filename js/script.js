// $(function() { 

  // console.log("I'm running"); // confirms that file is linked properly

  // =================
  // DISPLAY FUNCTIONS
  // -----------------

  // creates a new message to be added to the message-center div
  var addNewMessage = function(message) {

      var $newMessage = $("<p>").text(message).appendTo($("#message-center")); // creates new p tags for the message and appends it to the div
       // $("#message-center").animate({scrollTop: $("#message-center")[0].scrollHeight}, 1000); // scrolls div to the bottom
  
  } // <-- closes addNewMessage function

  var newCard; // storing the whole div element of the new card in global scope to access later

  // creates a card div with number and suit and stores it in newCard to be placed on screen
  var createNewCard = function() {

    $createCard = $("<div class='card'>"); // creates div with class "card"

    $cardName = $("<span class='card-name'>"); // creates span with class "card-name" where name will display

    if(pickedCard.numberCard == false) {

      $cardName.text(pickedCard.faceCard); // if the card is not a number, display face value in span

    } else {

      $cardName.text(pickedCard.numberCard); // if the card is a number, display number value in span

    };

    $createCard.append($cardName); // appends span with name to card div

    $cardSuit = $("<span class='card-suit'>").html(pickedCard.suit).appendTo($createCard); // creates span with class "card-suit" where suit will display

    newCard = $createCard; // stores the entire div (with name and suit) in newCard variable to be accessed and placeed later

  }; // <-- closes createNewCard function



  // =====================
  // PLAYER DEFAULT VALUES
  // ---------------------

  // player object stores information
  var player = {

    hand: [],
    balance: 500,
    currentBet: null,
    handSum: null, 
    hasBlackjack: false, 
    hasBust: false, 
    hasAce: false,
    wins: 0,
    losses: 0,
    totalGames: 0

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

  }; // closes constructor function

  var cards = []; // empty array for new cards to be pushed into

  var usedCardsCount = 0; // stores the number of used cards in cards array

  // Uses Card constructor to create a deck of cards
  var buildDeck = function() {

    var face = ["A", "J", "Q", "K"];
    var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    var suits = ["&clubs;", "&spades;", "&diams;", "&hearts;"];

    // for loop creates a card for each number and face within a suit
    for (var i = 0; i < suits.length; i++) {

      // creating number cards for selected suit and pushing into cards array
      for (var j = 0; j < numbers.length; j++) {

        cards.push(new Card(false, suits[i], false, numbers[j], numbers[j])); // pushes card to cards array

      }; // <-- closes numbers.length for loop

      // creating face cards for selected suit and pushing into cards array
      for (var j = 0; j < face.length; j++) {

        cards.push(new Card(false, suits[i], face[j], false, 10)); // pushes card to cards array

      }; // <-- closes numbers.length for loop 

    }; // <-- closes suits for loop

    return cards;

  } // <-- closes buildDeck function



  // ============== 
  // DEAL THE CARDS
  // --------------

  buildDeck(); // is this is the best place to put this?

  // puts starting balance in player bank box on screen
  var $playerBalance = $(".money"); // grabs span with class money
  $playerBalance.text("$" + player.balance); // prints player's balance in span

  var pickedCard; // store outside of random card function so I can access it later

  // selects card object from random index of cards array
  var drawRandomCard = function() {

    // if there are more than 35 used cards, rebuild the deck
    if (usedCardsCount > 35) {

      for (var i = 0; i < cards.length; i++) {

        cards[i].used = false; // resets all the cards used values to false 

      } // <-- closes for loop

      usedCardsCount = 0; // resets counter to 0

    } // <-- closes if statement    

    var arrayLength = cards.length; // stores length of array

    var randomIndex = Math.floor(Math.random() * arrayLength); // generates random index position

    pickedCard = cards[randomIndex]; // pulls card using randomly generated index position

    while (pickedCard.used === true) {

      newRandomIndex = Math.floor(Math.random() * arrayLength);

      pickedCard = cards[newRandomIndex];

    } // <-- closes while loop

    pickedCard.used = true; // is there a way to do toggle card using "this"?

    usedCardsCount += 1; // adds 1 to usedCardsCount value

  } // <-- closes drawRandomCard function


  // dealCard draws a random card and displays it on the screen
  var dealCard = function() {
  
    drawRandomCard(); // select random object (card) from cards array

    createNewCard(); // create card div with name and suit info

    $("#player").append(newCard); // places newCard in #player section

  } // <-- closes dealCard function


  // ====================
  // BUTTON FUNCTIONALITY
  // --------------------


  // PLAY BUTTON---------------
  var $playButton = $("#play"); // grabs element with id "play"

  addNewMessage("Place a bet and then press play.");

  // play button generates user hand on click
  $playButton.click(function(){

    if (!$(this).hasClass("disable-click") && !$(this).hasClass("bet-first")) {

      $(".place-bet").addClass("disable-click"); // player cannot change bet once he presses play

      // iteration runs twice (player should get two cards)
      for (i = 0; i < 2; i++) {

        // drawRandomCard(); // draws random card from cards array

        dealCard(); // displays card in div with id "player"

        player.hand.push(pickedCard); // pushes the dealt card to player's hand

      } // <-- closes for loop

      addCardValues(); // function adds the value of all cards in player's hand array

      $("#hit").removeClass("disable-click"); // allows the player to use the hit button

      // needs to be first or dealer hand wont generate if player gets instant blackjack
      generateDealerHand(); // generates dealer hand

      checkForBlackjack(); // checks player's hand sum for blackjack

      checkForBust(); // checks player's hand sum for bust

      $(this).addClass("disable-click"); // disables onclick function from firing

    } else if ($(this).hasClass("bet-first")) {

        addNewMessage("Place a bet first."); // prompts user to place a bet

    } else {

        addNewMessage("You were already dealt a hand! Press HIT or STAY to continue."); // player cannot get a new hand until round ends

      } // <-- closes if/else statement

  }); // <-- closes playButton click function

  
  
  // HIT BUTTON--------------
  var $hitButton = $("#hit"); // grabs element with the id "hit"

  // hit button generates one card on click
  $hitButton.click(function() {

    if (!$hitButton.hasClass("disable-click")) {

      dealCard(); // displays card in div with id "player"

      player.hand.push(pickedCard); // pushes the dealt card to player's hand

      addCardValues(); // function adds the value of all cards in player's hand array

      checkForBlackjack(); // checks player's hand sum for blackjack

      checkForBust(); // checks player's hand sum for bust

    } else {

        addNewMessage("You can't have another card, silly!");

    } // <-- closes if statement

  }); // <-- closes hitButton click function



  // STAY BUTTON-------------
  var $stayButton = $("#stay"); // grabs element with the id "stay"

  // stay button generates dealer's hand on click
  $stayButton.click(function() {

    if (!$(this).hasClass("disable-click") && !$hitButton.hasClass("disable-click")) { // might be able to take this out

      $(this).addClass("disable-click");

    } // <-- closes if statement

    dealerDrawCards(); // dealer draws if dealer's hand's sum is less than 17

    checkWinner(); // checks win conditions to declare a winner

  }) // <-- closes stayButton function



  // =====================
  // BETTING FUNCTIONALITY
  // ---------------------

  var $placeBetButton = $(".place-bet");

  var $betInputBar = $("#bet-input");

  $placeBetButton.click(function(){ 

    if (!$(this).hasClass("disable-click")) {

      var $betAmount = $(this).text().replace(/\$/g, ''); // removes dollar sign
      var integerBetAmount = parseInt($betAmount); // turns string into an integer that can be added/subtracted

      player.balance -= integerBetAmount; // adjusts the player's balance 
      player.currentBet += integerBetAmount; // adjusts the player's bet amount

      // sets the player's bet amount as the placeholder text in input bar
      $betInputBar.attr("placeholder", player.currentBet);

      // player cannot bet money that he does not have
      if (player.balance <= 0) {

        $placeBetButton.prop("disabled", true); // disables button functionality
        alert("YOU DON'T HAVE ENOUGH MONEY TO DO THAT!!!!"); // alerts player that there is no more money

      }; // <-- closes if statement

    // Updates message center with bet information
    var $playerBalance = $(".money"); // grabs span with class money
    $playerBalance.text("$" + player.balance); // places player's balance inside the span

    addNewMessage("You have placed your bet of $" + player.currentBet);

    $("#play").removeClass("bet-first"); // removes class "bet-first" so player can play

    };

  }); // <-- closes placeBetButton click function



  // ==========================
  // DEALER FUNCTIONS AND LOGIC
  // -------------------------=

  var dealer = {

    hand: [],
    handSum: null, // lol handsome
    hasBlackjack: false, // might be able to take this out?
    hasBust: false, // might be able to take this out?
    hasAce: false

  };

  // generateDealerHand creates dealer's two starting cards and hides the first one
  var generateDealerHand = function() {

    var $dealerSection = $("#dealer");

    drawRandomCard(); // draws random card from cards array

    dealer.hand.push(pickedCard); // pushes the dealt card to dealer's hand

    $createSecretCard = $("<div class='card hidden-card'>"); // gives first card a hidden class

    $createSecretCard.appendTo($dealerSection); // appends first card to dealer's section

    drawRandomCard(); // draws random card from cards array

    dealer.hand.push(pickedCard); // pushes the deal card to dealer's hand

    checkDealerSum();

    createNewCard();

    $("#dealer").append(newCard);

  } // <-- closes generateDealerHand function

  // dealerDrawCards makes the dealer draw if hand total is less than or equal to 17
  var dealerDrawCards = function() {

      while (dealer.handSum <= 17 && dealer.handSum <= player.handSum) { // generates new cards for dealer if hand is less than 17

        drawRandomCard(); // draws random card from cards array

        dealer.hand.push(pickedCard); // pushes the dealt card to dealer's hand

        dealer.handSum += pickedCard.cardValue; // adds value of picked card to dealer's hand sum

        createNewCard(); // creates a card div with the name and suit of the picked card

        $("#dealer").append(newCard); // adds the new card to the display

      } // <-- closes while loop

  } // <-- closes dealerDrawCards function

  // checkDealerSum calculates the dealer's sum
  var checkDealerSum = function() {

    dealer.handSum = 0; // empties dealer's hand

    for (var i = 0; i < dealer.hand.length; i++) {

      dealer.handSum += dealer.hand[i].cardValue;

    } // <-- closes for loop

    // check if dealer has an ace
    for (var i = 0; i < dealer.hand.length; i++) {

      if (dealer.hand[i].faceCard === "A") {

        dealer.hasAce = true; // toggles has ace to true

        dealer.handSum += 1; // recalculates card value (ace = 11)

      } // <-- closes if statement

    // check if dealer has blackjack
      if (dealer.handSum === 21) {

        dealer.hasBlackjack = true; // toggles key to true

      }; // <-- closes if statement

    }; // <-- closes for loop

    if (dealer.hasAce === true && dealer.handSum > 21) {

      dealer.handSum -= 10; // subtract 10 from total value (so Ace is being played as 1);

      if (dealer.handSum < 21) {

        dealer.hasBust = false

      } // closes dealer.handSum < 21 if statement

    } // <-- closes if statement

    if (dealer.handSum > 21) {

      dealer.hasBust = true;

    }; // <-- closes if statement

  }; // <-- closes dealerCheckSum

  var showHiddenCard = function() {

    var dealerHiddenCard = dealer.hand[0];

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



  // ====================
  // BLACKJACK GAME LOGIC
  // --------------------

  // adds card values
  var addCardValues = function () {


    player.handSum = 0; // resets player.handSum to zero (otherwise numbers add weirdly)

    for (i = 0; i < player.hand.length; i++) {

      player.handSum += player.hand[i].cardValue; // add card value to player's hand sum

    }

    checkForAce();

  } // <-- closes addCardValues function

  // checks if player has a blackjack
  var checkForBlackjack = function() {

    if (player.handSum === 21) {

      player.hasBlackjack = true; // sets hasBlackjack key to true in player object

      dealerDrawCards(); // forces dealer to draw cards if player gets blackjack w/o pressing stay

      checkWinner();

      $("#hit").addClass("disable-click");

    };

  }; // <-- closes checkForBlackjack function

  // checks if player has a bust
  var checkForBust = function() {

    if (player.handSum > 21) {

      player.hasBust = true; // sets hasBust key to true in player object

      checkWinner();

      $("#hit").addClass("disable-click");

    };

  }; // <-- closes checkForBust function

  var checkForAce = function() {

    for (var i = 0; i < player.hand.length; i++) {

      if (player.hand[i].faceCard === "A") {

        player.hasAce = true; // toggles has ace to true

        player.handSum += 1; // recalculates card value (ace = 11)

      } // <-- closes if statement

      if (player.handSum === 21) {

        player.hasBlackjack = true;

      } // <-- closes if statement

    } // <-- closes for loop

  if (player.hasAce === true && player.handSum > 21) {

    player.handSum -= 10; // subtract 10 from total value (so Ace is being played as 1)

    if (player.handSum < 21) {

      player.hasBust = false;

    } // <-- closes if statement

  } // <-- closes if statement

  } // <-- closes checkForAce function


  // checks both hands and declares a winner
  var checkWinner = function() {

    showHiddenCard(); // possibly put into a set timeout function to delay reveal?

    checkDealerSum(); // checks dealer's sum 

    // checks winning conditions
    if ((player.hasBlackjack === true && dealer.hasBlackjack === true) || (player.handSum === dealer.handSum)) {
      
      player.balance += player.currentBet;

      addNewMessage("It's a tie! Here's your money back.");

      player.totalGames += 1; // adds one to player's total games tally

    } else if ((player.hasBlackjack === true) || ((player.handSum > dealer.handSum) && (player.hasBust == false))) {

      player.balance += (2 * player.currentBet);

      addNewMessage("You won! $" + (2 * player.currentBet) + " has been added to your bank");

      player.wins += 1; // adds one to player's win tally

      player.totalGames += 1; // adds one to player's total games tally

    } else if (player.hasBust === true || player.cardValue > 21) {

      addNewMessage("You busted.");

      player.losses += 1; // adds one to player's losses tally

      player.totalGames += 1; // adds one to player's total games tally

    } else if (dealer.hasBust === true) {

      addNewMessage("Dealer busted. You win!");

      player.balance += (2 * player.currentBet);

      player.wins += 1; // adds one to player's win tally

      player.totalGames += 1; // adds one to player's total games tally

    } else {

      addNewMessage("Dealer wins!");

      player.losses += 1; // adds one to player's losses tally

      player.totalGames += 1; // adds one to player's total games tally

    }

    player.currentBet = 0; // resets current bet amount to 0

    var $playerBalance = $(".money"); // grabs span with class money
    $playerBalance.text("$" + player.balance); // START AMOUNT IS HARDCODED INTO HTML

    nowWhat(); // runs nowWhat function

  }


  // =====================
  // END OF GAME FUNCTIONS
  // ---------------------

  var nowWhat = function() {

    promptNewGame();

    $(".move-button").hide(); // hides move-button options

    var $playAgainButton = $("<button class='now-what'>"); // creates new button with class now what

    $playAgainButton.text("Next Round");

    $playAgainButton.appendTo("#player-move")

    $playAgainButton.click(function(){

        newRound(); // resets the game

        $(".move-button").show(); // shows original three buttons

        $(".now-what").hide(); // hides now-what buttons

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

    var $resetGame = $("<button class='now-what'>"); 

    $resetGame.text("Reset Game");

    $resetGame.appendTo("#player-move");

    $resetGame.click(function(){

      resetAll();

      $(".move-button").show(); // shows original three buttons

      $(".now-what").hide(); // hides now-what buttons

    }) // <-- closes resetGame click function

  } // <-- closes nowWhat function

  var newRound = function() {

    player.hand = [];
    player.handSum = null;
    player.currentBet = null;
    player.hasBlackjack = false; // might be able to take this out?
    player.hasBust = false; // might be able to take this out?
    player.hasAce = false;

    dealer.hand = [];
    dealer.handSum = null; 
    dealer.hasBlackjack = false; // might be able to take this out?
    dealer.hasBust = false; // might be able to take this out?
    dealer.hasAce = false;

    addNewMessage("Place a bet to play again!"); // prompts user to place a bet to play again

    $("#player").empty();
    $("#dealer").empty();

    $(".place-bet").removeClass("disable-click"); // allows user to press bet buttons

    $("#play").removeClass("disable-click"); // allows user to press play

    $("#play").addClass("bet-first"); // forces user to place bet before pressing play

  } // <-- closes newRound function

  var resetAll = function() {

    newRound(); 

    player.balance = 500;

    var $playerBalance = $(".money").text("$" + player.balance); // grabs span with class money

    // resets all the cards in the deck to unused
    for (var i = 0; i < cards.length; i++) {

      cards[i].used = false; // resets all the cards used values to false 

    } // <-- closes for loop

    usedCardsCount = 0; // resets counter to 0

    player.wins = 0;
    player.losses = 0;
    player.totalGames = 0;

  } // <-- closes resetAll function

  var promptNewGame = function() {

    if(player.balance <= 0) {

      $("#dealer").empty();
      $("#player").empty();

      $newDiv = $("<div id='new-game'>").appendTo("#dealer");
      $newParagraph = $("<p>").html("You're out of money... <br> Do you want to start over?").appendTo($newDiv);
      $resetGameButton = $("<button class='now-what'>").text("Start over").appendTo($newDiv);
      
      $resetGameButton.click(function(){

          alert("You probably have a gambling problem.")

          resetAll();

          $placeBetButton.prop("disabled", false); // unlocks bet buttons

        $(".move-button").show(); // shows original three buttons
        $(".now-what").hide(); // hides now-what buttons

      }) // <-- closes resetGame click function

      $leaveGameButton = $("<button class='now-what'>").text("Leave game").appendTo($newDiv);

      $leaveGameButton.click(function(){

        $("#container").empty(); // empties the entire container div

        var $newDiv = $("<div id='leaving'>");
        $newDiv.text("Well. Bye then.");
        $newDiv.appendTo($("#container"));

      }) // <-- closes leaveButton click function

    }

  }


// }); // <-- closes onload function