const title = document.getElementById("title");
const titleText = title.innerHTML;
const splitIndex = Math.ceil(titleText.length / 2);
const firstHalf = titleText.slice(0, splitIndex);
const secondHalf = titleText.slice(splitIndex);

title.innerHTML = `${firstHalf}<br>${secondHalf}`;

const priceInput = document.querySelector('input[name="price"]');
const tipButtons = document.querySelectorAll(".buttons button");
const customTipButton = document.getElementById("custom");
const customTipInput = document.querySelector('input[name="custom"]');
const numberInput = document.querySelector('input[name="number"]');
const tipAmountOutput = document.querySelector("#tipAmount");
const totalOutput = document.querySelector("#total");
const resetButton = document.querySelector(".reset button");
const billInput = document.getElementById("billInput");
const bill = document.getElementById("bill");
const people = document.getElementById("people");
const peopleInput = document.getElementById("peopleInput");
const cantBeZero = document.querySelector(".zero");

let price = 0;
let tip = 0;
let numberOfPeople = 1;
let isZero = false;

// Listening keypress events on input field
priceInput.addEventListener("input", () => {
  let tempPrice = priceInput.value;

  // Vérification 1: limiter la longueur totale à 8 caractères
  if (tempPrice.length > 8) {
    tempPrice = tempPrice.slice(0, 7);
  }

  // Vérification 2: n'autoriser que les chiffres et un seul point décimal
  const regex = /^\d{0,4}(?:\.\d{0,2})?$/;
  if (!regex.test(tempPrice)) {
    tempPrice = tempPrice.slice(0, -1);
  }

  // Vérification 3: s'assurer que la valeur est entre 0 et 9999.99
  const value = parseFloat(tempPrice);
  if (isNaN(value) || value < 0 || value > 9999.99) {
    tempPrice = "";
  }

  // Mettre à jour la valeur affichée dans le champ

  priceInput.value = tempPrice;
  price = parseFloat(tempPrice) || 0;
  calculate();
});

// écouter les événements input sur le champ de saisie de nombre de personnes
numberInput.addEventListener("input", () => {
  let tempNumber = numberInput.value;

  const regex = /^\d{0,6}$/;
  if (!regex.test(tempNumber)) {
    tempNumber = tempNumber.slice(0, -1);
  }
  numberInput.value = tempNumber;
  if (tempNumber === "0") {
    people.classList.add("cantbezero");
    people.classList.add("cantbezero:hover");
    cantBeZero.style.visibility = "visible";
    isZero = true;
  } else {
    people.classList.remove("cantbezero");
    cantBeZero.style.visibility = "hidden";
    isZero = false;
  }
  numberOfPeople = parseInt(tempNumber) || 1;
  calculate();
});

// écouter les événements click sur les boutons de pourboire
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    if (customTipButton.classList.contains("active")) {
      customTipInput.value = "";
      customTipInput.addEventListener("input", () => {
        console.log(customTipInput.value);
        const regex = /^\d{0,2}$/;
        let tempCustom = customTipInput.value;

        if (!regex.test(tempCustom)) {
          tempCustom = tempCustom.slice(0, -1);
        }
        customTipInput.value = tempCustom;
        tip = parseFloat(tempCustom) / 100 || 0;
        calculate();
      });
    } else {
      tip = parseFloat(button.textContent) / 100 || 0;
      calculate();
    }
  });
});
customTipInput.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    event.stopPropagation();
  }
});
// écouter les événements input sur le champ de saisie de pourboire personnalisé

// écouter les événements click sur le bouton de réinitialisation
resetButton.addEventListener("click", () => {
  priceInput.value = "0";
  customTipInput.value = "Custom";
  numberInput.value = "1";

  people.classList.remove("cantbezero");
  cantBeZero.style.visibility = "hidden";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  price = 0;
  numberOfPeople = 1;
  calculate();
});

// fonction de calcul des résultats
calculate = () => {
  const tipAmount = (price * tip) / numberOfPeople;
  const total = price / numberOfPeople + tipAmount;
  if (isZero === false) {
    tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
    totalOutput.textContent = `$${total.toFixed(2)}`;
  } else {
    tipAmountOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
  }

  billInput.style.width = (billInput.value.length + 1) * 15 + "px";
  peopleInput.style.width = (peopleInput.value.length + 1) * 15 + "px";
  customTipInput.style.width = (customTipInput.value.length + 1) * 12.5 + "px";
};

// Bill and numberofpeople focus and style
bill.addEventListener("click", () => {
  billInput.focus();
  billInput.setSelectionRange(0, billInput.value.length);
});
billInput.addEventListener("focus", (event) => {
  if (event.relatedTarget !== bill) {
    const len = billInput.value.length;
    billInput.setSelectionRange(len, len);
  }
});

people.addEventListener("click", () => {
  peopleInput.focus();
  peopleInput.setSelectionRange(0, peopleInput.value.length);
});
peopleInput.addEventListener("focus", (event) => {
  if (event.relatedTarget !== people) {
    const len = peopleInput.value.length;
    peopleInput.setSelectionRange(len, len);
  }
});
customTipButton.addEventListener("click", () => {
  customTipInput.focus();
  customTipInput.setSelectionRange(0, customTipInput.value.length);
});

resizeBillInput = () => {
  billInput.style.width = (billInput.value.length + 1) * 15 + "px";
};
resizePeopleInput = () => {
  peopleInput.style.width = (peopleInput.value.length + 1) * 15 + "px";
};
resizeCustomInput = () => {
  customTipInput.style.width = (customTipInput.value.length + 1) * 15 + "px";
};

calculate();
