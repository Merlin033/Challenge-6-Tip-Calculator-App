const priceInput = document.querySelector('input[name="price"]');
const tipButtons = document.querySelectorAll(
  ".buttons button:not(:last-child)"
);
const customTipInput = document.getElementById("custom");
const numberInput = document.querySelector('input[name="number"]');
const tipAmountOutput = document.querySelector("#tipAmount");
const totalOutput = document.querySelector("#total");
const resetButton = document.querySelector(".reset button");

let price = 0;
let tip = 0;
let numberOfPeople = 1;

// écouter les événements input sur le champ de saisie de prix
priceInput.addEventListener("input", () => {
  price = parseFloat(priceInput.value) || 0;
  calculate();
});

// écouter les événements click sur les boutons de pourboire
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    if (button.textContent === "Custom") {
      customTipInput.classList.add("active");
      customTipInput.focus();
    } else {
      customTipInput.classList.remove("active");
      tip = parseFloat(button.textContent) / 100;
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
  priceInput.value = "";
  tipButtons[2].click();
  numberInput.value = "";
});

// fonction de calcul des résultats
function calculate() {
  const tipAmount = (price * tip) / numberOfPeople;
  const total = (price * (1 + tip)) / numberOfPeople;
  tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
  totalOutput.textContent = `$${total.toFixed(2)}`;
}
