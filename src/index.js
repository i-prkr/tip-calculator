import Form from './form.js';

async function TipsCalculator() {

  const finalTipAmount = document.getElementById("final-tip");
  const finalTotalAmount = document.getElementById("final-total");
  const billInputError = document.querySelector(".form__error-bill");
  const peopleInputError = document.querySelector(".form__error-people");
  const buttons = document.querySelectorAll("button");
  const personInput = document.querySelector("#people");
  const billInput = document.querySelector("#bill");
  const resetButton = document.getElementById("reset");
  const customInput = document.getElementById("custom");

  const validation1 = {
    greaterThanZero: (value) => value > 0
  }
  const validation2 = {
    zeroOrMore: (value) => value >= 0
  }

  const p = document.createElement("p");
  p.textContent = "hi there";

  const p2 = document.createElement("p");
  p.textContent = "error el";

  const field1 = {
    type: "inputText",
    key: "bill",
    value: "320",
    element: p,
    errors: [
      { 
        element: p2,
        validation: "greaterThanZero",  
      }
    ],
    valid: true
  }

  const newForm = new Form();
  newForm.addField(field1);
  newForm.addValidation(validation1);
  newForm.addValidation(validation2);
  newForm.printForm();

  const billDetails = {
    bill: 0,
    tip: 15,
    people: 0
  };

  const errors = {
    bill: {
      element: billInputError,
      errorText: "Must be greater than zero" 
    },
    people: {
      element: peopleInputError,
      errorText: "Can't be zero" 
    }
  }

  const validations = {
    bill: (value) => value >= 0,
    people: (value) => value >= 1,
    tip: (value) => value >= 0 
  }

  const validateData = (key, value) => {
    return validations[key](value);
  }

  // -------- Update bill details then call to calculate and display

  const updateBillDetails = (key, value) => {
    billDetails[key] = value;
    let valid = true;

    for (const [key, value] of Object.entries(billDetails)){

      if(errors[key]){
        if(!validateData(key, value)){
          console.log(key, value)
          // set error condition
          errors[key].element.innerText = errors[key].errorText;
          errors[key].element.parentElement.classList.add("form__input_error");
          valid = false;
        } else {
          // clear error status
          errors[key].element.textContent = "";
          errors[key].element.parentElement.classList.remove("form__input_error");
        }
      }
    }
    valid ? calculateAmounts(billDetails.bill, billDetails.tip / 100, billDetails.people, updateDisplay) : '';
  }

  const resetHandler = () => {
    console.log("resetting form...")
    finalTipAmount.textContent = "00.00";
    finalTotalAmount.textContent = "00.00";
    billInput.value = "0";
    personInput.value = "0";
  }

  // ---------- Event handlers 

  const handleBillUpdate = (e) => {
    e.preventDefault();
    e.data ? updateBillDetails(e.target.id, e.target.value) : "";
  }
  
  const handleTipButtons = (e) => {
    e.preventDefault();
    updateBillDetails("tip", e.target.value);

    const previousChoice = document.querySelector(".button_selected");
    previousChoice.classList.replace("button_selected", "button_dark");
    e.target.classList.add("button_selected");
  }

  // -------  update display after calculations -------

  const updateDisplay = (tipPerPerson, totalPerPerson) => {
    finalTipAmount.textContent = `$${tipPerPerson}`;
    finalTotalAmount.textContent = `$${totalPerPerson}`;
  }

  init(handleTipButtons, handleBillUpdate, resetHandler, buttons, personInput, billInput, resetButton, customInput);
}


// --------- Add event listeners

const init = (handleTipButtons, handleBillUpdate, resetHandler, buttons, personInput, billInput, resetButton, customInput) => {

  buttons.forEach((btn) => {
    btn.addEventListener("click",  handleTipButtons.bind());
  });
  personInput.addEventListener("input", handleBillUpdate);
  billInput.addEventListener("input", handleBillUpdate);
  resetButton.addEventListener("click", resetHandler);
  customInput.addEventListener("input", handleTipButtons);
}

// Calculate amounts

const calculateTip = (bill, tip) => {
  return bill * tip;
}

const calculateAmounts = (bill, tip, people, updateDisplay) => {
  console.log("calculating...")
  const totalTip = calculateTip(bill, tip);
  const tipPerPerson = Math.round((totalTip / people) * 100) / 100;
  const totalPerPerson = Math.round(((Number(bill) + totalTip) / people) * 100) / 100;

  updateDisplay(tipPerPerson, totalPerPerson);
}

TipsCalculator();