
const productsContainer = document.querySelector( '#products-container' );
const productsContainerSale = document.querySelector( '#products-container-sale' );
// Получаем текущий URL страницы
let currentUrl = window.location.href;
let idValue = (currentUrl.split('?')[1] || '')
    .split('&')
    .map(param => param.split('='))
    .find(([key, value]) => key === 'id')?.[1];


// Сохраняем значение id в локальное хранилище
if (idValue) {
	localStorage.setItem('idBuyProduct', idValue);
}
// Получаем значение id из локального хранилища
let storedIdBuyProduct= localStorage.getItem('idBuyProduct');

// Функція додає товари в каталог
if ( productsContainer ) {
	const renderProducts =(productsArray) => {
    // Проходимось по всім продуктам та виводимо їх на екран
		if (storedIdBuyProduct && !isNaN(storedIdBuyProduct)) {
			storedIdBuyProduct = parseFloat(storedIdBuyProduct)
			// якщо купував
			productsArray.forEach(function (item) {
				if (item.id != storedIdBuyProduct) {
					const cardLinkAttributes = item.stock
					? `class="card card-product" href="${item.link}.html?${item.id}"`
					: 'class="card card-product" disabled';
					const classBnt = item.miniTitle.length > 1
							? `<button  class="buy flash btn card__btn">Купить</button>`
							
							: `<button class="buy buy-now flash btn card__btn">Купить</button>`;
							
					const buttonHTML = item.stock
							? `<button class="find-out-more card__btn">Подробнее</button> ${classBnt}`
							: `<button class="btn card__btn" disabled>Нет в наличии</button>`;

					const saleHTML = item.stock
							? `<span class="card__sale">-${item.sale}%</span>`
							: ``;

					const productHTML = `<a  ${cardLinkAttributes} data-name="${item.miniTitle}" data-id="${item.id}">
							<div class="card__imgBx">
									<img loading="lazy" src="${item.imgProduct}" alt="${item.title}">
									${saleHTML}
							</div>
							<div class="card__content">
									<h2 class="card__content-title">${item.title}</h2>
									<div class="card__content-price card-price">
										<span class="card-price__old">${item.oldPrice}<span>MDL</span></span>
										<span class="card-price__new">${item.price} <span>MDL</span></span>
									</div>
									
									${buttonHTML}
							</div>
					</a>`;

					productsContainer.insertAdjacentHTML('beforeend', productHTML);
					if(document.querySelector( '.card__sale' ).textContent == '' ) {
						document.querySelector( '.card__sale' ).remove();
					}
					if(document.querySelector( '.card-price__old' ).textContent.length < 2 ) {
						document.querySelector( '.card-price__old' ).remove();
					}
					}
				})
			} else {
			// якщо не купував
				productsArray.forEach(function (item) {
					const cardLinkAttributes = item.stock
							? `class="card card-product" href="${item.link}.html?${item.id}"`
							: 'class="card card-product" disabled';
							
							const classBnt = item.miniTitle.length > 1
							? `<button  class="buy flash btn card__btn">Купить</button>`
							: `<button class="buy buy-now flash btn card__btn">Купить</button>`;
							
					const buttonHTML = item.stock
							? `<button class="find-out-more card__btn">Подробнее</button> ${classBnt}`
							: `<button class="btn card__btn" disabled>Нет в наличии</button>`;

					const saleHTML = item.stock
							? `<span class="card__sale">-${item.sale}%</span>`
							: ``;

					const productHTML = `<a  ${cardLinkAttributes} data-name="${item.title}"  data-id="${item.id}">
							<div class="card__imgBx">
									<img loading="lazy" src="${item.imgProduct}" alt="${item.title}">
									${saleHTML}
							</div>
							<div class="card__content">
									<h2 class="card__content-title">${item.title}</h2>
									<div class="card__content-price card-price">
										<span class="card-price__old">${item.oldPrice}<span>MDL</span></span>
										<span class="card-price__new">${item.price} <span>MDL</span></span>
									</div>
									
									${buttonHTML}
							</div>
					</a>`;

					productsContainer.insertAdjacentHTML('beforeend', productHTML);
					if(document.querySelector( '.card__sale' ).textContent == '' ) {
						document.querySelector( '.card__sale' ).remove();
					}
					if(document.querySelector( '.card-price__old' ).textContent.length < 2 ) {
						document.querySelector( '.card-price__old' ).remove();
					}
					
				})
	}
		let cardsProduct = document.querySelectorAll( '.card-product' );
		if(cardsProduct.length > 0) {
			cardsProduct.forEach(el => {
				el.addEventListener('click', (e)=> {
					let idProductCheck = el.dataset.id;
					localStorage.setItem('idCheckProduct', idProductCheck);
				})
			})
		}
	}
	const getProducts = async () => {
		//Отримуємо дані з файлу з продуктами в форматі json
		const response = await fetch( '../files/js/products.json' );

		//Переробляємо їх у файли JS
		const productsArray = await response.json();
		renderProducts( productsArray );
	}
	getProducts();
}
// Функція додає товари в Акції
if ( productsContainerSale ) {
	const renderProducts =(productsArray) => {
    // Проходимось по всім продуктам та виводимо їх на екран
		if (storedIdBuyProduct && !isNaN(storedIdBuyProduct)) {
			storedIdBuyProduct = parseFloat(storedIdBuyProduct)
			productsArray.forEach(function (item) {
				if (item.id != storedIdBuyProduct && item.sale != '') {
					const cardLinkAttributes = item.stock
					? `class="card card-product" href="${item.link}"`
					: 'class="card card-product" disabled';

					const classBnt = item.miniTitle.length > 1
							? `<button  class="buy flash btn card__btn">Купить</button>`
							: `<button class="buy buy-now flash btn card__btn">Купить</button>`;
							
					const buttonHTML = item.stock
							? `<button class="find-out-more card__btn">Подробнее</button> ${classBnt}`
							: `<button class="btn card__btn" disabled>Нет в наличии</button>`;

					const saleHTML = item.stock
							? `<span class="card__sale">-${item.sale}%</span>`
							: ``;

					const productHTML = `<a  ${cardLinkAttributes} data-name="${item.miniTitle}" data-id="${item.id}">
							<div class="card__imgBx">
									<img loading="lazy" src="${item.imgProduct}" alt="${item.title}">
									${saleHTML}
							</div>
							<div class="card__content">
									<h2 class="card__content-title">${item.title}</h2>
									<div class="card__content-price card-price">
										<span class="card-price__old">${item.oldPrice}<span>MDL</span></span>
										<span class="card-price__new">${item.price} <span>MDL</span></span>
									</div>
									
									${buttonHTML}
							</div>
					</a>`;

					productsContainerSale.insertAdjacentHTML('beforeend', productHTML);
					}
				})
			} else {
			// якщо не купував
				productsArray.forEach(function (item) {
					if(item.sale != '') {
						const cardLinkAttributes = item.stock
						? `class="card card-product" href="${item.link}"`
						: 'class="card card-product" disabled';

						const classBnt = item.miniTitle.length > 1
							? `<button  class="buy flash btn card__btn">Купить</button>`
							: `<button class="buy buy-now flash btn card__btn">Купить</button>`;
							
					const buttonHTML = item.stock
							? `<button class="find-out-more card__btn">Подробнее</button> ${classBnt}`
							: `<button class="btn card__btn" disabled>Нет в наличии</button>`;

						const saleHTML = item.stock
								? `<span class="card__sale">-${item.sale}%</span>`
								: ``;

						const productHTML = `<a  ${cardLinkAttributes} data-name="${item.miniTitle}" data-id="${item.id}">
								<div class="card__imgBx">
										<img loading="lazy" src="${item.imgProduct}" alt="${item.title}">
										${saleHTML}
								</div>
								<div class="card__content">
										<h2 class="card__content-title">${item.title}</h2>
										<div class="card__content-price card-price">
											<span class="card-price__old">${item.oldPrice}<span>MDL</span></span>
											<span class="card-price__new">${item.price} <span>MDL</span></span>
										</div>
										
										${buttonHTML}
								</div>
						</a>`;

						productsContainerSale.insertAdjacentHTML('beforeend', productHTML);
					}
				})
	}
		let cardsProduct = document.querySelectorAll( '.card-product' );
		if(cardsProduct.length > 0) {
			cardsProduct.forEach(el => {
				el.addEventListener('click', (e)=> {
					let idProductCheck = el.dataset.id;
					localStorage.setItem('idCheckProduct', idProductCheck);
				})
			})
		}
	
	}
	const getProducts = async () => {
		//Отримуємо дані з файлу з продуктами в форматі json
		const response = await fetch( '../files/js/products.json' );

		//Переробляємо їх у файли JS
		const productsArray = await response.json();
		renderProducts( productsArray );
	}
	getProducts();
}


// ЗАПОВНЯЄМО СТОРІНКУ ПРОДУКТУ ІНФОРМАЦІЄЮ
if (document.querySelector('.main__slider')) {
  // Получаем значение id из локального хранилища
	// Отримуємо всі товари
  const getProducts = async () => {
    try {
      //Отримуємо дані з файлу з продуктами в форматі json
		const response = await fetch( '../files/js/products.json' );
		//Переробляємо їх у файли JS
		const productsArray = await response.json();
		// Отримуємо посилання на продукт з URL
		// let fileNameWithoutExtension = window.location.pathname.split('/').pop().replace(/\.[^/.]+$/, '');
		let arrProductCheck = [];
		
		// Отримати URL-адрес отримуємо id товару на який натиснули
		let url = new URL(window.location.href);
		// Отримати значення для конкретного ключа 
		var valueWithoutKey = url.search.slice(1);
		productsArray.forEach(el => {
			if (el.id == valueWithoutKey) {
				// Додаємо значення el.miniTitle та el.images до масиву arrProductCheck
				arrProductCheck.push({
					title: el.title,
					images: el.images
				});
			}
		});
		initializeSwiper(arrProductCheck)
		
		productsArray.forEach(el => {
			if(el.id == valueWithoutKey ) {
				let title = document.querySelector( '.discription__title' );
				let priceOld = document.querySelector( '.price__old' );
				let priceNew = document.querySelector( '.price__new' );
				let priceSale = document.querySelector( '.price__sale' );
				let productSelectCurrent = document.querySelector( '.select__current' );
				let productSelect = document.querySelector( '.select__item' );
				// Встановлюємо  title
				document.title= el.title;
				title.innerHTML = el.title;
				// Встановлюємо вибір моделей
				if(el.miniTitle.length === 1) {
					var specificObject = el.miniTitle[0]; // 100x300 - 1190 MDL: '1190'
						// Отримуємо ключ і значення
						var key = Object.keys(specificObject)[0];
					productSelectCurrent.innerHTML = key;
				productSelect.innerHTML = key;
				var value = specificObject[key]; 
				productSelect.setAttribute('data-price', value)
				}else {
					// productSelectCurrent.innerHTML = el.miniTitle[0];
					document.querySelector( '.select__item' ).remove();
					let bodyCheckModel = document.querySelector( '.select__body' );
					for (let i = 0; i < el.miniTitle.length; i++) {
						var specificObject = el.miniTitle[i]; // 100x300 - 1190 MDL: '1190'
						// Отримуємо ключ і значення
						var key = Object.keys(specificObject)[0]; // "100x300 - 1190 MDL"
						var value = specificObject[key]; 
						let innerHTML = `
						<div data-price="${value}" class="select__item">${key}</div>`
							bodyCheckModel.insertAdjacentHTML('beforeend', innerHTML);
					}
				}
				// Встановлюємо id товару на сторінці
				title.dataset.id = el.id;
				// Встановлюємо ціни та знижки
				priceOld.innerHTML = `${el.oldPrice}<span>MDL</span>`
				priceNew.innerHTML = `${el.price}<span>MDL</span>`
				priceSale.innerHTML = `sale ${el.sale}%`
				
				
				//Встановлюємо опис товару
				document.querySelector( '.discription__subtitle' ).innerHTML = `${el.description} <div class="bottom-more"></div>`;
				//Встановлюємо кількість відгуків
				document.querySelector( '#reviews__discription-total' ).textContent = `(${el.countReviews})`;

				//Встановлюємо файли в ленту
				let contentLenta = document.querySelector( '.tabs__content-images ');
				for (let i = 0; i < el.imagesLenta.length; i++) {
					let itemHtml = `
					<img loading="lazy" src="${el.imagesLenta[i]}" alt="${el.title}" class="content-images-item" />`;
					contentLenta.insertAdjacentHTML('beforeend', itemHtml);
				}
				//Встановлюємо характкристику товару
				let contentCharacteristic = document.querySelector( '.content-text__body ');
				for (let i = 0; i < el.characteristic.length; i++) {
					let itemHtml = `
					<li class="content-text__item">- ${el.characteristic[i]}</li>`;
					contentCharacteristic.insertAdjacentHTML('beforeend', itemHtml);
				}
				//Встановлюємо відгуки на сайт
				let contentReviews = document.querySelector( '.reviews__list');
				if(el.reviews != undefined) {
					for (let i = 0; i < el.reviews.length; i++) {
						let itemHtml = `<div class="reviews__list-item reviews-item">
						<div class="reviews-item__top">
							<div class="reviews-item__right">
								<h3 class="reviews-item__name">${el.reviews[i].name}</h3>
								<div class="reviews-item__rating rating">
									<div class="rating__star"></div>
									<span class="rating__total rating__value rating__value-mark">${el.reviews[i].rating}</span>
								</div>
							</div>
						</div>
						<div class="reviews-item__text">${el.reviews[i].text}</div>
					</div>`;
					contentReviews.insertAdjacentHTML('beforeend', itemHtml);
					}
				}else {
					let itemHtml = `<p class="message">На этом товаре пока нет отзывов, будьте первыми кто оставит!</p>`;
					contentReviews.insertAdjacentHTML('beforeend', itemHtml);
				}
				
			}
			// <img loading="lazy" src="${el.reviews[i].imgPeople}" alt="" class="reviews-item__img" />
		})
		// Функція вираховує оцінки у відгуках та додає зірки
		const titleProductPage = document.querySelector( '.discription__title' );
		if ( titleProductPage ) {
			const ratingMain = document.querySelector( '.reviews__discription' );
			const ratingMainTotal = ratingMain.querySelector( '.rating-main__value' );
			const reviewsList = document.querySelector( '.reviews__list' );
			const reviewsMarks = reviewsList.querySelectorAll( '.rating__value-mark' );
			// Знаходимо середнє значення оцінок продукту
			let sumMarkReviews = 0;
			reviewsMarks.forEach( reviewsMark => {
				sumMarkReviews += Number( reviewsMark.textContent );
			} )
			sumMarkReviews = sumMarkReviews / reviewsMarks.length;
			ratingMainTotal.innerHTML = sumMarkReviews.toFixed( 1 );;


			// Отримуємо елемент блоку rating та rating__total з DOM
			const ratingItems = document.querySelectorAll( '.rating' );
			ratingItems.forEach( ratingItem => {
				const ratingStar = ratingItem.querySelector( '.rating__star' );
				const ratingTotal = ratingItem.querySelector( '.rating__total' );
				// Отримуємо значення рейтингу
				const ratingValue = parseFloat( ratingTotal.textContent );
				// Задаємо максимальне значення рейтингу
				const maxRating = 5;
				// Обчислюємо кількість повних зірок
				const fullStars = Math.floor( ratingValue );
				// Обчислюємо наявність зірки з половинкою
				const hasHalfStar = ratingValue % 1 !== 0;
				// Створюємо теги img з класом star
				for ( let i = 0; i < fullStars; i++ ) {
					const star = document.createElement( 'i' );
					star.classList.add( 'fa', 'fa-star' );
					ratingStar.appendChild( star );
				}
				// Якщо є зірка з половинкою, то створюємо тег img з класом star-half
				if ( hasHalfStar ) {
					const halfStar = document.createElement( 'i' );
					halfStar.classList.add( 'fa', 'fa-star-half-o' );
					ratingStar.appendChild( halfStar );
				}
				// Заповнюємо решту рейтингу пустими зірками
				const remainingStars = Math.floor( maxRating - ratingValue );
				for ( let i = 0; i < remainingStars; i++ ) {
					const emptyStar = document.createElement( 'i' );
					emptyStar.classList.add( 'fa', 'fa-star-o', );
					ratingStar.appendChild( emptyStar );
				}
			} )
			
			// select
			let select = function () {
				let selectHeader = document.querySelectorAll( '.select__header' );
				let selectItem = document.querySelectorAll( '.select__item' );
				let buttonAddToCart = document.querySelector( '.add-cart' );
				if ( selectItem.length == 1 ) {
					let selectCurrent = document.querySelector( '.select__current' );
					selectCurrent.innerHTML = selectItem[ 0 ].innerHTML;
					buttonAddToCart.disabled = false;
					buttonAddToCart.classList.add( 'flash' )
					buttonAddToCart.textContent = 'Добавить в корзину';
				}


				selectHeader.forEach( item => {
					item.addEventListener( 'click', selectToggle )
				} );

				selectItem.forEach( item => {
					item.addEventListener( 'click', selectChoose )
				} );

				function selectToggle() {
					this.parentElement.classList.toggle( 'is-active' );
				}

				function selectChoose() {
					let text = this.innerText,
						select = this.closest( '.select' ),
						currentText = select.querySelector( '.select__current' );
					currentText.innerText = text;
					document.querySelector( '.price__new' ).innerHTML = `${this.dataset.price}<span>MDL</span>`;
					if(document.querySelector( '.price__old' )) {
						document.querySelector( '.price__old' ).remove();
					}
					select.classList.remove( 'is-active' );
					buttonAddToCart.disabled = false;
					buttonAddToCart.classList.add( 'flash' )
					buttonAddToCart.textContent = '+Добавить в корзину';
				}
			};
			select();
		}
		//Слайдер
		function initializeSwiper(data) {
			const mainSlider = new Swiper( '.slider-block', {
				slidesPerView: 1,
			} );
			// Додайте ваші слайди на основі отриманих даних
			data[0].images.forEach(item => {
				mainSlider.appendSlide('<div class="swiper-slide"> <img loading="lazy" src='+ item +' alt=' + data[0].title +' /></div>');
			
			
			});
//Встановлюємо фото для фото під слайдером
let previewSlider = document.querySelector( '.cards-slider__nav ');
for (let i = 0; i < data[0].images.length; i++) {
	let slideForPreviewSlider = `
		<div class="slider-nav__item" tabindex="0">
			<img loading="lazy" src="${data[0].images[i]}" alt="${data[0].title}" />
		</div>`;
	previewSlider.insertAdjacentHTML('beforeend', slideForPreviewSlider);
}
			const sliderNavItems = document.querySelectorAll( '.slider-nav__item' );
			sliderNavItems.forEach( ( el, index ) => {
				el.setAttribute( 'data-index', index )
				el.addEventListener( 'click', ( e ) => {
					const index = parseInt( e.currentTarget.dataset.index );
					mainSlider.slideTo( index )
				} )
			} )
		}
		} catch (error) {
			console.error('Произошла ошибка при получении или обработке данных:', error);

		}
	};

  getProducts();
}



// //Встановлюємо фото для великого слайдера
// let bigSlider = document.querySelector( '.swiper-wrapper' );
// for (let i = 0; i < el.images.length; i++) {
// 	let slideForBigSlider = `
// 		<div class="swiper-slide">
// 			<img loading="lazy" src="${el.images[i]}" alt="${el.title}" />
// 		</div>`
// 	bigSlider.insertAdjacentHTML('beforeend', slideForBigSlider);
// }
