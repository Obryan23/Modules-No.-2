const paymentForm = document.getElementById('paymentForm');
const paymentMethods = document.getElementsByName('paymentMethod');

const cardFields = document.getElementById('cardFields');
const cardNumber = document.getElementById('cardNumber');
const expiry = document.getElementById('expiry');
const cvv = document.getElementById('cvv');

const sameAsBilling = document.getElementById('sameAsBilling');
const shippingFields = document.getElementById('shippingFields');

// ---------------------------
// (a) Dynamic UI States
// ---------------------------

// Disable card fields when PayPal is selected
paymentMethods.forEach(method => {
  method.addEventListener('change', () => {
    if (method.value === "paypal" && method.checked) {
      disableCardFields(true);
    } else {
      disableCardFields(false);
    }
  });
});

function disableCardFields(disable) {
  const fields = [cardNumber, expiry, cvv];

  fields.forEach(field => {
    field.disabled = disable;

    if (disable) {
      field.classList.add('disabled');
    } else {
      field.classList.remove('disabled');
    }
  });
}

// Shipping toggle
sameAsBilling.addEventListener('change', () => {
  if (sameAsBilling.checked) {
    shippingFields.classList.remove('show');
    shippingFields.classList.add('hidden');
  } else {
    shippingFields.classList.remove('hidden');
    shippingFields.classList.add('show');
  }
});

// ---------------------------
// (b) Modern Validation
// ---------------------------

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  // Email Regex
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value)) {
    email.setCustomValidity("Please enter a valid email address.");
    valid = false;
  } else {
    email.setCustomValidity("");
  }

  // Required fields (card fields only if card is selected)
  if (document.querySelector('input[name="paymentMethod"]:checked').value === "card") {
    if (!cardNumber.value.trim()) {
      cardNumber.setCustomValidity("Card number is required.");
      valid = false;
    } else {
      cardNumber.setCustomValidity("");
    }

    if (!expiry.value.trim()) {
      expiry.setCustomValidity("Expiry date is required.");
      valid = false;
    } else {
      expiry.setCustomValidity("");
    }

    if (!cvv.value.trim()) {
      cvv.setCustomValidity("CVV is required.");
      valid = false;
    } else {
      cvv.setCustomValidity("");
    }
  }

  // If form is valid, submit
  if (valid) {
    alert("Payment submitted successfully!");
    paymentForm.reset();
  } else {
    paymentForm.reportValidity();
  }
});