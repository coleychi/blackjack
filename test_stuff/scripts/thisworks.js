

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