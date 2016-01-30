// Testing logic that prevents card from being redrawn

var usedCardsCount = 0;

cards = [
  {num: 1, used: false},
  {num: 2, used: false},
  {num: 3, used: false},
  {num: 4, used: false},
  {num: 5, used: false},
  {num: 6, used: false},
  {num: 7, used: false},
  {num: 8, used: false},
  {num: 9, used: false},
]

var pickedCard;

var drawRandomCard = function() {

    if (usedCardsCount > 3) {

      for (var i = 0; i < cards.length; i++) {

        cards[i].used = false;

      } // resets all the cards used values to false 

      usedCardsCount = 0; // resets counter to 0

    } // <-- closes if statement    

    var arrayLength = cards.length; // stores length of array

    var randomIndex = Math.floor(Math.random() * arrayLength); // generates random index position

    pickedCard = cards[randomIndex]; // pulls card using randomly generated index position

    console.log(pickedCard)

    while (pickedCard.used === true) {

      newRandomIndex = Math.floor(Math.random() * arrayLength);

      pickedCard = cards[newRandomIndex];

      console.log(pickedCard); // presumably won't run again if next value is also used.

    }

    // console.log(cards[randomIndex]);

    console.log(pickedCard); // confirming that pickedCard is the same as cards[randomIndex]

    pickedCard.used = true; // is there a way to do toggle card using "this"?

    usedCardsCount += 1;

  } // <-- closes drawRandomCard function