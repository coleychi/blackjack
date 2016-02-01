// $(function() { 

  // ==========
  // MISC STUFF
  // ----------

  var addNewMessage = function(message) {
      var $messageDiv = $("#message-center");
      var $newMessage = $("<p>"); 
      $newMessage.text(message); 
      $newMessage.appendTo($messageDiv);
  } 

  var newCard; 

  var createNewCard = function() {
    $createCard = $("<div class='card'>"); 
    $cardName = $("<span class='card-name'>"); 
    if(pickedCard.numberCard == false) {
      $cardName.text(pickedCard.faceCard);
    } else {
      $cardName.text(pickedCard.numberCard); 
    }
    $createCard.append($cardName); 
    $cardSuit = $("<span class='card-suit'>").html(pickedCard.suit).appendTo($createCard); 
    newCard = $createCard; 
  } 

  // =====================
  // PLAYER DEFAULT VALUES
  // ---------------------
  var player = {
    hand: [],
    balance: 500,
    currentBet: null,
    handSum: null, 
    hasBlackjack: false, 
    hasBust: false, 
    hasAce: false
  };


  // ======================
  // GENERATE DECK OF CARDS
  // ----------------------
  function Card (usedValue, suitName, faceName, number, cardValue) {
    this.used = usedValue; 
    this.suit = suitName; 
    this.faceCard = faceName; 
    this.numberCard = number;
    this.cardValue = cardValue; 
  } 

  var cards = [];
  var usedCardsCount = 0; 
  var buildDeck = function() {
    var face = ["A", "J", "Q", "K"];
    var numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    var suits = ["&clubs;", "&spades;", "&diams;", "&hearts;"];
    for (var i = 0; i < suits.length; i++) {
      for (var j = 0; j < numbers.length; j++) {
        cards.push(new Card(false, suits[i], false, numbers[j], numbers[j])); 
      }
      for (var j = 0; j < face.length; j++) {
        cards.push(new Card(false, suits[i], face[j], false, 10)); 
      } 
    } 
    return cards;
  } 

  // ============== 
  // DEAL THE CARDS
  // --------------

  buildDeck(); 
  var $playerBalance = $(".money"); 
  $playerBalance.text("$" + player.balance); 

  var pickedCard; 

  var drawRandomCard = function() {
    if (usedCardsCount > 35) {
      for (var i = 0; i < cards.length; i++) {
        cards[i].used = false;
      } 
      usedCardsCount = 0; 
    } 
    var arrayLength = cards.length; 
    var randomIndex = Math.floor(Math.random() * arrayLength); 
    pickedCard = cards[randomIndex]; 
    while (pickedCard.used === true) {
      newRandomIndex = Math.floor(Math.random() * arrayLength);
      pickedCard = cards[newRandomIndex];
    } 
    pickedCard.used = true; 
    usedCardsCount += 1; 
  } 

  var dealCard = function() {
    drawRandomCard(); 
    createNewCard();
    $("#player").append(newCard); 
  } 


  // =======
  // BUTTONS
  // -------

  // PLAY BUTTON---------------
  var $playButton = $("#play"); 
  addNewMessage("Place a bet and then press play.");
  $playButton.click(function(){
    if (!$(this).hasClass("disable-click") && !$(this).hasClass("bet-first")) {
      $(".place-bet").addClass("disable-click"); 
      for (i = 0; i < 2; i++) {
        dealCard(); 
        player.hand.push(pickedCard); 
      } 
      addCardValues();
      $("#hit").removeClass("disable-click"); 
      checkForBlackjack();
      checkForBust(); 
      $(this).addClass("disable-click"); 
      generateDealerHand(); 
    } else if ($(this).hasClass("bet-first")) {
        addNewMessage("Place a bet first."); 
    } else {
        addNewMessage("You were already dealt a hand! Press HIT or STAY to continue."); 
      }
  }); 
  
  // HIT BUTTON--------------
  var $hitButton = $("#hit"); 
  $hitButton.click(function() {
    if (!$hitButton.hasClass("disable-click")) {
      dealCard(); 
      player.hand.push(pickedCard); 
      addCardValues(); 
      checkForBlackjack(); 
      checkForBust(); 
    } else {
        addNewMessage("You can't have another card, silly!");
    } 
  }); 


  // STAY BUTTON-------------
  var $stayButton = $("#stay");
  $stayButton.click(function() {
    if (!$(this).hasClass("disable-click") && !$hitButton.hasClass("disable-click")) { 
      $(this).addClass("disable-click");
    } 
    dealerDrawCards();
    checkWinner(); 
  }) 

  // =====================
  // BETTING FUNCTIONALITY
  // ---------------------

  var $placeBetButton = $(".place-bet");
  var $betInputBar = $("#bet-input");
  $placeBetButton.click(function(){ 
    if (!$(this).hasClass("disable-click")) {
      var $betAmount = $(this).text().replace(/\$/g, ''); 
      var integerBetAmount = parseInt($betAmount); 
      player.balance -= integerBetAmount; 
      player.currentBet += integerBetAmount; 
      $betInputBar.attr("placeholder", player.currentBet);
      if (player.balance <= 0) {
        $placeBetButton.prop("disabled", true); 
        alert("YOU DON'T HAVE ENOUGH MONEY TO DO THAT!!!!"); 
      }; 
    var $playerBalance = $(".money"); 
    $playerBalance.text("$" + player.balance); 
    addNewMessage("You have placed your bet of $" + player.currentBet);
    $("#play").removeClass("bet-first");
    };
  }); 

  // =========================
  // DEALER FUNCTION AND LOGIC
  // -------------------------

  var dealer = {
    hand: [],
    handSum: null, 
    hasBlackjack: false, 
    hasBust: false, 
    hasAce: false
  };

  var generateDealerHand = function() {
    var $dealerSection = $("#dealer");
    drawRandomCard(); 
    dealer.hand.push(pickedCard); 
    $createSecretCard = $("<div class='card hidden-card'>"); 
    $createSecretCard.appendTo($dealerSection); 
    drawRandomCard(); 
    dealer.hand.push(pickedCard); 
    checkDealerSum();
    createNewCard();
    $("#dealer").append(newCard);
  } 

  var dealerDrawCards = function() {
    while (dealer.handSum <= 17) { 
      drawRandomCard(); 
      dealer.hand.push(pickedCard); 
      dealer.handSum += pickedCard.cardValue; 
      createNewCard(); 
      $("#dealer").append(newCard); 
    }; 
  }; 

  var checkDealerSum = function() {
    dealer.handSum = 0; 
    for (var i = 0; i < dealer.hand.length; i++) {
      dealer.handSum += dealer.hand[i].cardValue;
    } 
    for (var i = 0; i < dealer.hand.length; i++) {
      if (dealer.hand[i].faceCard === "A") {
        dealer.hasAce = true; 
        dealer.handSum += 1; 
      } 
      if (dealer.handSum === 21) {
        dealer.hasBlackjack = true; 
      }; 
    }; 
    if (dealer.hasAce === true && dealer.handSum > 21) {
      dealer.handSum -= 10; 
      if (dealer.handSum < 21) {
        dealer.hasBust = false
      } 
    } 
    if (dealer.handSum > 21) {
      dealer.hasBust = true;
    }; 
  }; 



  // ====================
  // BLACKJACK GAME LOGIC
  // --------------------

  var addCardValues = function () {
    player.handSum = 0; 
    for (i = 0; i < player.hand.length; i++) {
      player.handSum += player.hand[i].cardValue; 
    }
    checkForAce();
  } 

  var checkForBlackjack = function() {
    if (player.handSum === 21) {
      player.hasBlackjack = true; 
      checkWinner();
      $("#hit").addClass("disable-click");
    };
  }; 

  var checkForBust = function() {
    if (player.handSum > 21) {
      player.hasBust = true; 
      checkWinner();
      $("#hit").addClass("disable-click");
    };
  }; 

  var checkForAce = function() {
    for (var i = 0; i < player.hand.length; i++) {
      if (player.hand[i].faceCard === "A") {
        player.hasAce = true; 
        player.handSum += 1; 
      } 
      if (player.handSum === 21) {
        player.hasBlackjack = true;
      } 
    } 
    if (player.hasAce === true && player.handSum > 21) {
      player.handSum -= 10; 
      if (player.handSum < 21) {
        player.hasBust = false;
      } 
    } 
} 

  var checkWinner = function() {
    showHiddenCard(); 
    checkDealerSum(); 
    if ((player.hasBlackjack === true && dealer.hasBlackjack === true) || (player.handSum === dealer.handSum)) {
      player.balance += player.currentBet;
      addNewMessage("It's a tie! Here's your money back.");
    } else if ((player.hasBlackjack === true) || ((player.handSum > dealer.handSum) && (player.hasBust == false))) {
      player.balance += (2 * player.currentBet);
      addNewMessage("You won! $" + (2 * player.currentBet) + " has been added to your bank");
    } else if (player.hasBust === true || player.cardValue > 21) {
      addNewMessage("You busted.")
    } else if (dealer.hasBust === true) {
      addNewMessage("Dealer busted. You win!");
      player.balance += (2 * player.currentBet);
    } else {
      addNewMessage("Dealer wins!");
    }
    player.currentBet = 0; 
    var $playerBalance = $(".money"); 
    $playerBalance.text(player.balance); 
    nowWhat(); 
  }

  var showHiddenCard = function() {
    var dealerHiddenCard = dealer.hand[0];
    var $hiddenCard = $(".hidden-card");
    $cardNumber = $("<span class='card-name'>");

      if(dealerHiddenCard.numberCard == false) {
        $cardNumber.text(dealerHiddenCard.faceCard); 
        } else {
        $cardNumber.text(dealerHiddenCard.numberCard); 
      }; 

    $hiddenCard.append($cardNumber);
    $cardSuit = $("<span class='card-suit'>").html(dealerHiddenCard.suit).appendTo($hiddenCard);
    $hiddenCard.removeClass("hidden-card")

  };

  var nowWhat = function() {
    $(".move-button").hide(); 
    var $playAgainButton = $("<button class='now-what'>"); 
    $playAgainButton.text("Play Again").appendTo("#player-move");
    $playAgainButton.click(function(){
        newRound(); 
        $(".move-button").show(); 
        $(".now-what").hide();
    });
    var $leaveButton = $("<button class='now-what'>"); 
    $leaveButton.text("Leave Now").appendTo("#player-move");
    $leaveButton.click(function(){
    $("#container").empty(); 
    var $newDiv = $("<div id='leaving'>").text("Well. Bye then.").appendTo($("#container"));
    })
  };

  var newRound = function() {

    player.hand = [];
    player.handSum = null;
    player.currentBet = null;
    player.hasBlackjack = false; 
    player.hasBust = false; 
    player.hasAce = false;

    dealer.hand = [];
    dealer.handSum = null; 
    dealer.hasBlackjack = false;
    dealer.hasBust = false; 
    dealer.hasAce = false;

    addNewMessage("Place a bet to play again!");
    $("#player").empty();
    $("#dealer").empty();
    $(".place-bet").removeClass("disable-click"); 
    $("#play").removeClass("disable-click"); 
    $("#play").addClass("bet-first"); 
  }
  
// }); // <-- closes onload function