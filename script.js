const priceInput = document.querySelector('input[name="price"]');
const tipButtons = document.querySelectorAll(
  ".buttons button:not(:last-child)"
);
const customTipInput = document.getElementById("custom");
const numberInput = document.querySelector('input[name="number"]');
const tipAmountOutput = document.querySelector("#tipAmount");
const totalOutput = document.querySelector("#total");
const resetButton = document.querySelector(".reset button");
const billInput = document.getElementById("billInput");
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const peopleInput = document.getElementById("peopleInput");

let price = 0;
let tip = 0;
let numberOfPeople = 1;

// écouter les événements input sur le champ de saisie de prix
priceInput.addEventListener("input", () => {
  price = parseFloat(priceInput.value) || 0;
  calculate();
});

// Listening keypress events on input field
priceInput.addEventListener("input", (event) => {
  let input = event.target.value;

  // Vérification 1: limiter la longueur totale à 8 caractères
  if (input.length > 8) {
    input = input.slice(0, 7);
  }

  // Vérification 2: n'autoriser que les chiffres et un seul point décimal
  const regex = /^\d{0,4}(?:\.\d{0,2})?$/;
  if (!regex.test(input)) {
    input = input.slice(0, -1);
  }

  // Vérification 3: s'assurer que la valeur est entre 0 et 9999.99
  const value = parseFloat(input);
  if (isNaN(value) || value < 0 || value > 9999.99) {
    input = "";
  }

  // Mettre à jour la valeur affichée dans le champ
  event.target.value = input;
});

// écouter les événements click sur les boutons de pourboire
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    if (button.textContent >= 1 && button.textContent <= 100) {
      customTipInput.classList.add("active");
      customTipInput.focus();
    } else {
      customTipInput.classList.remove("active");
      tip = parseFloat(button.textContent) / 100 || 0;
      calculate();
    }
  });
});

// écouter les événements input sur le champ de saisie de pourboire personnalisé
customTipInput.addEventListener("input", () => {
  tip = parseFloat(customTipInput.value) / 100 || 0;
  calculate();
});

// écouter les événements input sur le champ de saisie de nombre de personnes
numberInput.addEventListener("input", () => {
  numberOfPeople = parseInt(numberInput.value) || 1;
  calculate();
});

// écouter les événements click sur le bouton de réinitialisation
resetButton.addEventListener("click", () => {
  priceInput.value = "0";
  customTipInput.value = "0";
  numberInput.value = "1";
  price = 0;
  numberOfPeople = 1;
  calculate();
});

// fonction de calcul des résultats
function calculate() {
  const tipAmount = (price * tip) / numberOfPeople;
  const total = price + tipAmount;

  tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
  totalOutput.textContent = `$${total.toFixed(2)}`;

  billInput.style.width = (billInput.value.length + 1) * 15 + "px";
  peopleInput.style.width = (peopleInput.value.length + 1) * 15 + "px";
}

// Bill and numberofpeople focus and style
bill.addEventListener("click", () => {
  billInput.focus();
});
people.addEventListener("click", () => {
  peopleInput.focus();
});

resizeBillInput = () => {
  billInput.style.width = (billInput.value.length + 1) * 15 + "px";
};
resizePeopleInput = () => {
  peopleInput.style.width = (peopleInput.value.length + 1) * 15 + "px";
};

calculate();
