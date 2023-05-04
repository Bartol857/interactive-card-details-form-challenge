const cardholder = document.querySelector('#cardholder');
const cardNumber = document.querySelector('#card-number');
const expiryMonth = document.querySelector('#expiry-month');
const expiryYear = document.querySelector('#expiry-year');
const cvcNumber = document.querySelector('#cvc-number');
const formSection = document.querySelector('.form');
const completedSection = document.querySelector('.completed');
const sendBtn = document.querySelector('.form__send');
const completeBtn = document.querySelector('.completed__btn');

const cardNumbers = () => {
	const displayCvc = document.querySelector('.card__cvc');
	const displayNumber = document.querySelector('.card__number');
	const displayOwner = document.querySelector('.card__owner');
	const displayMonth = document.querySelector('.card__expiry-month');
	const displayYear = document.querySelector('.card__expiry-year');

	displayCvc.textContent = cvcNumber.value;
	displayNumber.textContent = cardNumber.value.replace(/([0-9]{4})/g, '$1 ').trim();
	displayOwner.textContent = cardholder.value;
	displayMonth.textContent = expiryMonth.value;
	displayYear.textContent = expiryYear.value;
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkName = (input) => {
	const letters = /^[A-Za-z\s]*$/;

	input.forEach((el) => {
		if (el.value === '') {
			showError(el, 'Can’t be blank');
		} else if (el.value.length >= 1 && !el.value.match(letters)){
			showError(el, 'Wrong format, letters only');
		} else {
			clearError(el);
		}
	});
};

const checkForm = (input) => {
	const numbers = /^[0-9]*$/;

	input.forEach((el) => {
		if (el.value === '') {
			showError(el, 'Can’t be blank');
		} else if (el.value.length >= 1 && !el.value.match(numbers)){
			showError(el, 'Wrong format, numbers only');
		} else {
			clearError(el);
		}
	});
};

const checkMonth = (input) => {
	input.forEach((el) => {
		if (el.value > 12) {
			showError(el, 'Invalid month');
		}
	});
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form__box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		formSection.classList.add('hidden');
		completedSection.classList.remove('hidden');
	}
};

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	cardNumbers();
	checkName([cardholder])
	checkForm([cardNumber, expiryMonth, expiryYear, cvcNumber]);
	checkMonth([expiryMonth]);
	checkErrors();
});

completeBtn.addEventListener('click', () => {
	formSection.classList.remove('hidden');
	completedSection.classList.add('hidden');

	cvcNumber.value = '';
	cardNumber.value = '';
	cardholder.value = '';
	expiryMonth.value = '';
	expiryYear.value = '';
});
