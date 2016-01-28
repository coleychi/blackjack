console.log("I'm alive!");


// CONSUTRCTOR
var card = function (cardValue, cardName, suit) {

  this.cardValue = cardValue;

  this.cardName = cardName;

  this.suit = suit;

}


// BUILDS A DECK OF CARDS
var cards = [];

var buildDeck = function() {
  this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  this.suits = ['Hearts','Diamonds','Spades','Clubs'];
    
    for( var i = 0; i < this.suits.length; i++ ) {

        for( var j = 0; j < this.names.length; j++ ) {

            cards.push( new card( j + 1, this.names[j], this.suits[i] ) );
        }
    }

    return cards; 
}

buildDeck();
console.log(cards)
console.log(typeof(cards))



// function card(cardValue, cardName, suit) {
//   this.cardValue = cardValue;

//   this.cardName = cardName;

//   this.suit = suit;

// }

// function deck(){
//   this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

//   this.suits = ['Hearts','Diamonds','Spades','Clubs'];

//   var cards = [];
    
//     for( var i = 0; i < this.suits.length; i++ ) {

//         for( var j = 0; j < this.names.length; j++ ) {

//             cards.push( new card( j + 1, this.names[j], this.suits[i] ) );
//         }
//     }

//     return cards;
// }

