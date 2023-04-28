function homework() {
	// slider
	// 1. setTimeout ან setInterval - ის გამოყენებით გააკეთეთ საათი რომელიც იმუშავებს როგორც ნამდვილი სააათი. გამოიყენეთ ატვირთული სურათი (საათი.png).
	const clock = document.querySelector(".clock");

	function createClock() {
		const day = new Date();

		const hour = day.getHours();
		const min = day.getMinutes();
		const sec = day.getSeconds();

		// console.log(`${sec}`.padStart(2, "0"));

		clock.innerHTML = `${hour} : ${min} : ${sec}`;
	}

	createClock();
	setInterval(createClock, 1000);

	// 2. ლექციაზე შექმნილ სლაიდერს დავამატოთ:
	//    2.1. დავამატოთ სლაიდების ავტომატური ცვლილება 5 წამიანი ინტერვალით.
	//    2.2. როდესაც ავტომატურად ხდება სლაიდების შეცვლა თუ მაუსს მივიტან სურათთან, ავტომატური სლაიდი გაჩერდეს.
	//    2.3. თუ მაუსი მიტანილი მაქვს სურათზე და შემდეგ გამოვწევ სურათიდან, ავტომატური სლაიდი გაგრძელდეს. მოუსმინეთ  mouseenter, mouseleave  ივენთებს
	//    დამხმარე მასალა: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
	//    2.4. დავამატოთ (ღილაკები.png) ღილაკები , იმდენი რამდენი სლაიდიც გვაქვს , ღილაკზე დაკლიების შემდეგ სლაიდერი უნდა გადავიდეს შესაბამის სლაიდზე (პირველ ღილაკზე თუ დავკლიკე უნდა გადავიდეს პირველ სლაიზე და ასე შემდეგ).

	function mainSlider() {
		const slides = document.querySelectorAll(".slide");
		const next = document.querySelector(".next");
		const prev = document.querySelector(".prev");
		let slideIntervalId = null;
		const sliderWrapper = document.querySelector(".slider");
		const sliderBtns = document.querySelectorAll(".btn");

		let activeIndex = 0;

		function renderSlides() {
			slides.forEach((el, i) => {
				if (i === activeIndex) {
					el.classList.add("active");
				} else {
					el.classList.remove("active");
				}
			});
			sliderBtns.forEach((el, i) => {
				if (i === activeIndex) {
					el.classList.add("active");
				} else {
					el.classList.remove("active");
				}
			});
		}

		function renderBullets() {
			sliderBtns.forEach((btn, index) => {
				btn.addEventListener("click", () => {
					// console.log(index);
					activeIndex = index;
					renderSlides();
				});
			});
		}

		function nextFn() {
			if (activeIndex === slides.length - 1) {
				activeIndex = 0;
			} else {
				activeIndex++;
			}

			renderSlides();
		}

		function prevFn() {
			if (activeIndex === 0) {
				activeIndex = slides.length - 1;
			} else {
				activeIndex--;
			}

			renderSlides();
		}

		renderSlides();
		renderBullets();

		// slideIntervalId = setInterval(nextFn, 3000);

		// sliderWrapper.addEventListener("mouseenter", () => {
		// 	if (slideIntervalId) {
		// 		clearInterval(slideIntervalId);
		// 		slideIntervalId = null;
		// 	}
		// });

		// sliderWrapper.addEventListener("mouseleave", () => {
		// 	slideIntervalId = setInterval(nextFn, 3000);
		// });
	}

	mainSlider();

	//  3*(optional) დავამატოთ მარტივი countdown რომელიც გვიჩვენებს მომდევნო ლექციამდე (28 აპრილი, 20:00) დარჩენილ დროს (დღე, საათი, წუთი)
	const countdown = document.querySelector(".countdown");

	function countdownFn() {
		const deadline = new Date("Apr 29, 2023 22:00:00").getTime();
		const now = new Date().getTime();
		const gap = deadline - now;

		// console.log(now, deadline, gap);

		const second = 1000;
		const minute = second * 60; // 1000 * 60
		const hour = minute * 60; // 1000 * 60 * 60
		const day = hour * 24; // 1000 * 60 * 60 *24

		const daysLeft = Math.floor(gap / day);
		const hoursLeft = Math.floor((gap % day) / hour);
		const minutesLeft = Math.floor((gap % hour) / minute);
		// const secondsLeft = Math.floor((gap % minute) / second);

		countdown.innerHTML = `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes left until next lecture`;
	}

	countdownFn();
	setInterval(countdownFn, 60000);
}

homework();

const form = document.querySelector("form"),
	nameInput = document.querySelector("#name"),
	emailInput = document.querySelector("#email"),
	passwordInput = document.querySelector("#password");

const modal = document.querySelector("#success-modal");
const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-btn");

function checkEmail() {
	// console.log(emailInput.validity);
	// if (emailInput.validity.valueMissing) {
	// 	emailInput.parentElement.querySelector(".message").innerText =
	// 		"email is required";
	// } else if (emailInput.validity.typeMismatch) {
	// 	emailInput.parentElement.querySelector(".message").innerText =
	// 		"not correct format";
	// } else {
	// 	emailInput.parentElement.querySelector(".message").innerText = "";
	// }

	if (emailInput.validity.valueMissing) {
		emailInput.parentElement.querySelector(".message").innerText =
			"email is required";
		return false;
	} else if (!/@gmail.com$/.test(emailInput.value)) {
		emailInput.parentElement.querySelector(".message").innerText =
			"email must be gmail";
		return false;
	} else {
		emailInput.parentElement.querySelector(".message").innerText = "";
		return true;
	}
}

function checkPassword() {
	const passValue = passwordInput.value;
	if (passValue.length < 5) {
		passwordInput.parentElement.querySelector(".message").innerText =
			"weak password";
		passwordInput.classList.remove("normal");
		passwordInput.classList.remove("strong");
		passwordInput.classList.add("weak");
		return false;
	} else if (passValue.length >= 5 && passValue.length < 8) {
		passwordInput.parentElement.querySelector(".message").innerText =
			"normal password";
		passwordInput.classList.remove("weak");
		passwordInput.classList.remove("strong");
		passwordInput.classList.add("normal");
		return false;
	} else {
		passwordInput.parentElement.querySelector(".message").innerText = "";
		passwordInput.classList.remove("weak");
		passwordInput.classList.remove("normal");
		passwordInput.classList.add("strong");
		return true;
	}
}

emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	// validations

	const isEmailValid = checkEmail();
	const isPasswordValid = checkPassword();
	console.log(isEmailValid, isPasswordValid);
	if (isEmailValid && isPasswordValid) {
		console.log("submit form");
		// form.submit()
		showModal("#success-modal");
		form.reset();
	}
});

// openModal.addEventListener("click", (e) => {
// 	modal.classList.add("active");
// });

// closeModal.addEventListener("click", (e) => {
// 	modal.classList.remove("active");
// });

function showModal(selector) {
	const modal = document.querySelector(selector);
	if (modal) {
		const closeBtn = modal.querySelector(".close-btn");

		modal.classList.add("active");
		closeBtn.addEventListener("click", (e) => {
			modal.classList.remove("active");
		});
		modal.addEventListener("click", (e) => {
			// console.log(e.target);
			if (e.target.classList.contains("modal")) {
				modal.classList.remove("active");
			}
		});
	}
}

openModal.addEventListener("click", (e) => {
	showModal("#error-modal");
	// console.log("open modal");
});
