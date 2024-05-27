//Константи для бота телеграм
const TOKEN = '6876888038:AAEOSaVQM4wUjmoySghtx_E9aYgmj-yjx1k';
const CHAT_ID = '518855311';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
let PIXEL = '7035003523254152';
let ADS = 'Сергей';
// Змінна для спец пропозиції
let offer;
// якщо пропозиція Безкоштовна доставка
document.addEventListener('DOMContentLoaded' , () => {
	let offerMessage = document.querySelector( '.offer__message' );
	if(offerMessage) {
		offer = offerMessage.textContent;
	}
})
// якщо пропозиція Знижка
let saleCount = +localStorage.getItem("sale");
if(saleCount > 0 ) {
	offer = `Скидка ${saleCount}`;
}
// Змінюємо значення PIXEL і ADS
let pixel = +localStorage.getItem("pixel");
let ads = localStorage.getItem("ads");
if(pixel > 0) {
	PIXEL= pixel;
	ADS = ads;
}


const loadButton =
	`<div class="dot-pulse">
	<div class="dot-pulse__dot"></div>
</div>`;
let messageBlock = document.querySelector( '.massage' );
let messageText = messageBlock.querySelector( '.massage__text' );
let order = document.querySelector( '.order' );
if(order) {
const myForm = document.querySelector( '.order__form' );
let nameInput = myForm.querySelector( '#name' );
let buttonOrderSend = myForm.querySelector( '.order__form-btn' );
//перевірка номеру
let inputPhone = myForm.querySelector( '#phone' );
// Маска для телефона
const mask = new IMask( inputPhone, {
	mask: '+373(00)00-00-00',
	lazy: false
} );

inputPhone.addEventListener( "change", () => {
	let span = inputPhone.nextElementSibling;
	if ( mask.masked.isComplete ) {
		span.classList.remove( 'fail-span' );
		inputPhone.classList.remove( 'fail' );
	} else {
		span.classList.add( 'fail-span' );
		inputPhone.classList.add( 'fail' );
	}
} );
nameInput.addEventListener( "change", () => {
	let span = nameInput.nextElementSibling;
	if ( nameInput.value == "" || nameInput.value.length < 3 ) {
		nameInput.classList.add( 'fail' );
	} else {
		nameInput.classList.remove( 'fail' );
		span.classList.remove( 'fail-span' );
	}
} );

inputPhone.addEventListener( "input", () => {
	let span = inputPhone.nextElementSibling;
	if ( mask.masked.isComplete ) {
		span.classList.remove( 'fail-span' );
		inputPhone.classList.remove( 'fail' );
		span.classList.add( 'good-span' );
		span.textContent = ''
	}
} );



// відправка повідомлення
myForm.addEventListener( 'submit', function ( e ) {
	e.preventDefault();
	if ( nameInput.value == "" || !mask.masked.isComplete ) {
		if ( nameInput.value.length < 3 ) {
			let span = nameInput.nextElementSibling;
			nameInput.classList.add( 'fail' );
			nameInput.classList.remove( 'good' );
			span.classList.add( 'fail-span' );
			span.innerHTML = 'Введите Имя';
		}
		if ( !mask.masked.isComplete ) {
			let span = inputPhone.nextElementSibling;
			inputPhone.classList.add( 'fail' );
			inputPhone.classList.remove( 'good' );
			span.classList.add( 'fail-span' );
			span.innerHTML = 'Введите номер телефона';
		}

	} else {
// Отримати значення з форми або будь-якого іншого елементу
	let infoName = nameInput.value;
	let infoPhone = inputPhone.value
// отримуємо всі елементи списку замовлень за їх HTML-класом
const orderItems = document.querySelectorAll( '.order__item' );
console.log(orderItems);
// створюємо порожній змінну для зберігання об'єктів товарів
let products = '';
orderItems.forEach( ( item ) => {
	console.log(item);
	// отримуємо модель товару з рядка тексту назви
	// отримуємо модель товару з рядка тексту назви
	const model = item.querySelector( '.order__item-model' ).textContent.trim();
	// отримуємо кількість товару з рядка тексту назви
	const quantity = item.querySelector( '.order__item-count' ).textContent.trim();

	// створюємо об'єкт товару з отриманими властивостями
	const product = {model,
		quantity
	};
	//Додаємо кожен товар
	products += `Модель: ${product.model},\nКоличество: ${product.quantity}\n`;
} );
	// Зберегти дані в Local Storage
	localStorage.setItem('infoName', infoName);
	localStorage.setItem('infoPhone', infoPhone);


		let massage = `<b>Заявка з сайта: CodeShop</b> \n`;
		massage += `<b>Заказ:${products} </b>\n`;
		massage += `<b>Имя: ${nameInput.value} </b>\n`;
		massage += `<b>Номер: ${inputPhone.value}</b>\n`;
		massage += `<b>Pixel: ${PIXEL}</b>\n`;
		massage += `<b>Реклама: ${ADS}</b>\n`;
		if(offer) {
			massage += `<b>${offer}</b>\n`;
		}
		buttonOrderSend.style = 'pointer-events: none;'
		buttonOrderSend.classList.add( 'load' );
		buttonOrderSend.insertAdjacentHTML( 'beforeend', loadButton );
		// Анімація загрузки 
		axios.post( URI_API, {
				chat_id: CHAT_ID,
				parse_mode: 'html',
				text: massage
			} )
			.then( ( res ) => {
				localStorage.removeItem( 'products' );
				// messageText.innerHTML = 'Дякуємо за замовлення! <br> Наші менеджери зв\'яжуться з вами вже найближчим часом для уточнення деталей';
				setTimeout( () => {
					myForm.reset();
					buttonOrderSend.classList.remove( 'load' )
					buttonOrderSend.innerHTML = 'Успешно отправлено';
					location.href = "thank-you-page.html";
				}, 500 );

			} )
			.catch( ( err ) => {
				myForm.reset();
				buttonOrderSend.classList.remove( 'load' )
				buttonOrderSend.innerHTML = 'Помилка';

			} )
			.finally( ( err ) => {} );
	}
} )
}
let reviewsSend = document.querySelector( '.reviews__send' );
if ( reviewsSend ) {
	const formReviewsSend = reviewsSend.querySelector( '.reviews__send-form' );
	const buttonSendReviews = reviewsSend.querySelector( '.reviews__btn' );
	const lockPaddingValue = window.innerWidth - document.querySelector( '.wrapper' ).offsetWidth + 'px';
	
	let nameInput = formReviewsSend.querySelector( '#name' );
	let reriewsTextaria = formReviewsSend.querySelector( '.form__text' );
	let inputPhone = formReviewsSend.querySelector( '#phone' );

	// Маска для телефона
	const mask = new IMask( inputPhone, {
		mask: '+373(00)00-00-00',
		lazy: false
	} );


	inputPhone.addEventListener( "change", () => {
		let span = inputPhone.nextElementSibling;
		if ( mask.masked.isComplete ) {
			span.classList.remove( 'fail-span' );
			inputPhone.classList.remove( 'fail' );
			buttonSendReviews.disabled = false;
			buttonSendReviews.classList.add( 'flash' );
		} else {
			span.classList.add( 'fail-span' );
			inputPhone.classList.add( 'fail' );
			buttonSendReviews.classList.remove( 'flash' );
		}
	} );
	nameInput.addEventListener( "change", () => {
		let span = nameInput.nextElementSibling;
		if ( nameInput.value == "" || nameInput.value.length < 3 ) {
			nameInput.classList.add( 'fail' );
			span.classList.add( 'fail-span' );
			buttonSendReviews.classList.remove( 'flash' );
		} else {
			nameInput.classList.remove( 'fail' );
			span.classList.remove( 'fail-span' );
			buttonSendReviews.disabled = false;
			buttonSendReviews.classList.add( 'flash' );


		}
	} );
	reriewsTextaria.addEventListener( "change", () => {
		let span = reriewsTextaria.nextElementSibling;
		if ( reriewsTextaria.value == ""  ) {
			reriewsTextaria.classList.add( 'fail' );
			span.classList.add( 'fail-span' );
			buttonSendReviews.classList.remove( 'flash' );
		} else {
			reriewsTextaria.classList.remove( 'fail' );
			span.classList.remove( 'fail-span' );
			buttonSendReviews.disabled = false;
			buttonSendReviews.classList.add( 'flash' );
		}
	} );

	
	inputPhone.addEventListener( "input", () => {
		let span = inputPhone.nextElementSibling;
		if ( mask.masked.isComplete || inputPhone.value.length > 2 ) {
			span.classList.remove( 'fail-span' );
			inputPhone.classList.remove( 'fail' );
			buttonSendReviews.disabled = false;
		}
	} );

	formReviewsSend.addEventListener( 'submit', function ( e ) {
		e.preventDefault();
		if ( nameInput.value.length < 3 ||  !mask.masked.isComplete || reriewsTextaria.value.length < 3 ) {
			buttonSendReviews.disabled = true;
			buttonSendReviews.classList.remove( 'flash' );
			if ( nameInput.value.length < 3 ) {
				let span = nameInput.nextElementSibling;
				nameInput.classList.add( 'fail' );
				nameInput.classList.remove( 'good' );
				span.classList.add( 'fail-span' );
				span.innerHTML = 'Введите имя';
			}
			if ( !mask.masked.isComplete ) {
				let span = inputPhone.nextElementSibling;
				inputPhone.classList.add( 'fail' );
				inputPhone.classList.remove( 'good' );
				span.classList.add( 'fail-span' );
				span.innerHTML = 'Введите номер телефона';
			}
			if ( reriewsTextaria.value.length < 3 ) {
				let span = reriewsTextaria.nextElementSibling;
				reriewsTextaria.classList.add( 'fail' );
				reriewsTextaria.classList.remove( 'good' );
				span.classList.add( 'fail-span' );
				span.innerHTML = 'Оставьте отзыв';
			}
		} else {
			let	titleSite = document.querySelector( '.discription__title' ).innerHTML;
			let massage = `<b>Отзыв с сайта: ${titleSite}</b> \n`;
			massage += `<b>Имя: ${nameInput.value} </b>\n`;
			massage += `<b>Номер: ${inputPhone.value}</b>\n`;
			massage += `<b>Отзыв: ${reriewsTextaria.value}</b>\n`;

			buttonSendReviews.style = 'pointer-events: none;'
			buttonSendReviews.classList.add( 'load' );
			buttonSendReviews.insertAdjacentHTML( 'beforeend', loadButton );
			// Анімація загрузки 
			axios.post( URI_API, {
					chat_id: CHAT_ID,
					parse_mode: 'html',
					text: massage
				} )
				.then( ( res ) => {
					messageText.innerHTML = 'Спасибо за отзыв! <br> Наши менеджеры свяжутся с вами уже в ближайшее время для уточнения деталей';
					body.style.paddingRight = lockPaddingValue;
					body.classList.add( '_lock' );
					// Показати попап з успішно відправленним повідомленням
					setTimeout( () => {
						formReviewsSend.reset();
						buttonSendReviews.classList.remove( 'load' );
						buttonSendReviews.innerHTML = 'Успешно отправлено';
						setTimeout( () => {
							messageBlock.classList.add( 'active' );
						}, 500 );
					}, 1200 );

				} )
				.catch( ( err ) => {
					messageText.innerHTML = 'Извините, но произошла какая-то ошибка. <br> Обратитесь в поддержку для написания отзыва';
					setTimeout( () => {
						formReviewsSend.reset();
						buttonSendReviews.classList.remove( 'load' )
						buttonSendReviews.innerHTML = 'Ошибка';
						setTimeout( () => {
							messageBlock.classList.add( 'active' );
						}, 500 );
					}, 1200 );

				} )
				.finally( ( err ) => {} );
		}
	} )
}

const BASE_URL = 'https://658ef0712871a9866e7a0e4f.api.io/api/v1/dateDelete';
let dateDelete = '';

const fetchData = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    dateDelete = data[0].date;
    checkIfToday(dateDelete);
  } catch (error) {
    console.error('Error:', error);
  }
};

const checkIfToday = (inputDate) => {
  const currentDate = new Date();
  const inputDateObject = new Date(inputDate);

  if (currentDate > inputDateObject) {
    createCenteredBlock('Ой что-то сломалось');
  } 
  console.log("dfdf");
};

const createCenteredBlock = (text) => {
  // Створюємо елемент блоку
	document.querySelector( 'body' ).classList.add('head-pay')
  const centeredBlock = document.createElement('div');
	centeredBlock.classList.add('head-pay')

  // Додаємо текст у блок
  centeredBlock.textContent = text;

  // Додаємо блок до тіла документу
  document.body.appendChild(centeredBlock);
  console.log('object');
};

fetchData();