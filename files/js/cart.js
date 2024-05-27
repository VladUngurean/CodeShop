const cartList = document.querySelector( '.cart-content__list' );
const cart = document.querySelector( '.cart' );
const cartIcon = document.querySelector( '.cart-icon' );
const cartClose = document.querySelector( '.cart-close' );
const cartQuantity = document.querySelector( '.cart-quantity' );
const buttonAddToCart = document.querySelector( '.add-cart' );
const cartProductsList = document.querySelector( '.cart-content__list' );
const body = document.querySelector( 'body' );


// Функція яка виводить суму всього в корзині
const printPrice = () => {
	let sumPriceCart = 0;
	let fullPriceCart = cart.querySelector( '.fullprice' );
	let priceItemsAll = cart.querySelectorAll( '.cart-product__price' );
	priceItemsAll.forEach( el => {
		let priceItem = parseInt( priceWithoutSpaces( el.textContent ) );
		sumPriceCart = sumPriceCart + priceItem;
	} )
	fullPriceCart.textContent = `${sumPriceCart} MDL`;
};

// Перетворює строку в число
const priceWithoutSpaces = ( str ) => {
	return str.replace( /\s/g, '' );
};

//Функція яка виводить кількість товарів 
const printQuantity = () => {
	let cartItems = cartList.querySelectorAll( '.cart-content__item' );
	lockPaddingValue = window.innerWidth - document.querySelector( '.wrapper' ).offsetWidth + 'px';
	if ( cartItems.length >= 1 ) {
		cartIcon.classList.add( 'active' );
		let cartItemsLength = document.querySelector( '.cart-content__list' ).children.length;
		cartQuantity.textContent = cartItemsLength;
		document.addEventListener( 'click', function ( e ) {
			if ( cartIcon.classList.contains( 'active' ) ) {
				printPrice();
				let target = e.target;
				if ( target == cartIcon ) {
					cart.classList.add( 'active' );
					body.style.paddingRight = lockPaddingValue;
					body.classList.add( '_lock' );
				}
				if ( target == cartClose ) {
					cart.classList.remove( 'active' );
					body.style.paddingRight = '0px';
					body.classList.remove( '_lock' );
				}
				if ( target == cart ) {
					cart.classList.remove( 'active' );
					body.style.paddingRight = '0px';
					body.classList.remove( '_lock' );
				}
			}
		} )
	} else {
		let cartItemsLength = document.querySelector( '.cart-content__list' ).children.length;
		cartQuantity.textContent = cartItemsLength;
		cartIcon.classList.remove( 'active' );
		cart.classList.remove( 'active' );
		body.style.paddingRight = '0px';
		body.classList.remove( '_lock' );

	}
};

// функція яка вираховує вартість одного добавленго в корзину товару товару
window.addEventListener( 'click', function ( e ) {
	let target = e.target;
	if ( target.dataset.action == "plus" ) {
		let parent = target.closest( '.cart-content__item' );

		let counterNumber = parent.querySelector( '.counter__number' );
		counterNumber.innerHTML = ++counterNumber.innerText;
		let hidePrice = parseInt( priceWithoutSpaces( parent.querySelector( '.cart-product__hide' ).textContent ) );
		let productPrice = parent.querySelector( '.cart-product__price' );
		productPrice.textContent = `${hidePrice * +counterNumber.innerText} MDL`;
		printPrice();updateStorege();
	}
	if ( target.dataset.action == "minus" ) {
		let parent = target.closest( '.cart-content__item' );
		let counterNumber = parent.querySelector( '.counter__number' );
		counterNumber.innerHTML = --counterNumber.innerText;
		let hidePrice = parseInt( priceWithoutSpaces( parent.querySelector( '.cart-product__hide' ).textContent ) );
		let productPrice = parent.querySelector( '.cart-product__price' );
		productPrice.textContent = `${hidePrice * +counterNumber.innerText} MDL`;

		let minus = parent.querySelector( '.counter__button-minus' )
		if ( counterNumber.textContent <= 0 ) {
			counterNumber.textContent = 1;
			let closeContentBlock = parent.querySelector( '.close__content' );
			closeContentBlock.classList.add( 'active' );
			minus.classList.add( 'disabled' );
		} else {
			minus.classList.remove( 'disabled' );
		}
		printPrice();updateStorege();
	}
} )

// Створює карточку товару
const generateCartProduct = ( id,img, price, model, count ) => {
	return `
	<li data-id="${id}" class="cart-content__item">
	<article class="cart-content__product cart-product">
		<img src="${img}" alt="${model}" class="cart-product__img">
		<div class="cart-product__text">
			<p class="cart-product__model">${model}</p>
			<div class="cart-product__bottom">
				<div class="counter" data-counter>
					<div data-action="minus" class="counter__button counter__button-minus disabled">-</div>
					<div class="counter__number">${count}</div>
					<div data-action="plus" class="counter__button counter__button-plus">+</div>
				</div>
				<div class="cart-product__hide">${price} MDL</div>
				<div class="cart-product__price">${price} MDL</div>
			</div>
		</div>
		<button class="cart-product__delete"></button>
	</article>
	<div class="cart-content__close close__content">
		<h3 class="close__content-title">Удалить товар полностью?</h3>
		<button class="close__content-delete close__content-btn">Удалить</button>
		<button class="close__content-continue close__content-btn">Продолжить</button>
	</div>
</li>
	`;
};
// Функція видаляє продукти з корзини
const deleteProducts = () => {
	let itemProducts = cartList.querySelectorAll( '.cart-content__item' );
	itemProducts.forEach( itemProduct => {
		itemProduct.addEventListener( 'click', e => {
			let target = e.target;
			if ( target == itemProduct.querySelector( '.close__content-continue' ) ) {
				let parentCartBlock = target.closest( '.cart-content__item' );
				let parentCloseBlock = parentCartBlock.querySelector( '.close__content' );
				parentCloseBlock.classList.remove( 'active' );
				let price = itemProduct.querySelector( '.cart-product__price' );
				let priceHide = parseInt( priceWithoutSpaces( itemProduct.querySelector( '.cart-product__hide' ).textContent ) );
				price.textContent = `${priceHide} MDL`;
			}
			if ( target == itemProduct.querySelector( '.cart-product__delete' ) || target == itemProduct.querySelector( '.close__content-delete' ) ) {
				let parentCartBlock = target.closest( '.cart-content__item' );
				parentCartBlock.remove();
				printQuantity();
				updateStorege();
				if ( buttonAddToCart ) {

					buttonAddToCart.textContent = 'Выберите модель';
				}
			}
		} )
	} );
};
//Функція виводить товари якщо вони є в localStorage
const ihitialState = () => {
	if ( localStorage.getItem( 'products' ) !== null ) {
		cartProductsList.innerHTML = localStorage.getItem( 'products' );
		printQuantity();
		// calcSum();
		deleteProducts();
	}
};
ihitialState();
//Записує інформація в localStorage
const updateStorege = () => {
	let parent = cartProductsList;
	let html = parent.innerHTML;
	html = html.trim();
	if ( html.length ) {
		localStorage.setItem( 'products', html );
	} else {
		localStorage.removeItem( 'products' );
	}
};
// При натисканні на кнопку додається товар
if ( buttonAddToCart ) {
	let cart = document.querySelector( '.cart ' );
	buttonAddToCart.addEventListener( 'click', ( e ) => {
		let parent = document.querySelector( '.cards' );
		let img = parent.querySelector( '.swiper-slide-active img' ).getAttribute( 'src' );
		let model = parent.querySelector( '.select__current' ).textContent;
		let id = parent.querySelector( '.discription__title' ).dataset.id;
		let count = parent.querySelector( '#count-value' );
		let countNumber = parent.querySelector( '#count-value' ).value;
		let priceNumber = parseInt( priceWithoutSpaces( parent.querySelector( '.price__new' ).textContent ) );
		if(cartProductsList.children.length > 0) {
			let isProductFound = false;
			Array.from(cartProductsList.children).forEach(item => {
				let itemProduct = item;
				let idItem = item.dataset.id
				let modelProduct = itemProduct.querySelector( '.cart-product__model' ).textContent;
				if(idItem == id && modelProduct == model) {
					let countItem = itemProduct.querySelector('.counter__number');
					countItem.innerHTML = +countItem.textContent + 1;
					let priceHide = itemProduct.querySelector('.cart-product__hide').textContent
					
					let updatePrice = parseInt(priceHide.replace(/\D/g, '')) * +countItem.textContent
					let price = itemProduct.querySelector('.cart-product__price')
					price.innerHTML = `${updatePrice} MDL`;
					getFulpriceProduct();
					updateStorege();
					printQuantity();
					isProductFound = true;
				}
			})
			if (!isProductFound) {
				cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(id, img, priceNumber, model, countNumber));
			}
		}else {
			cartProductsList.insertAdjacentHTML( 'afterbegin', generateCartProduct(id, img, priceNumber, model, countNumber ) );
		}
		updateStorege();
		printQuantity();
		// calcSum();
		getFulpriceProduct();
		deleteProducts();
		buttonAddToCart.disabled = true;
		buttonAddToCart.textContent = 'Товар добавлен';
		count.value = 1;
		cart.classList.add('active')
	} );
};
window.addEventListener('load', function() {
		let cart = document.querySelector( '.cart ' );
		
		const intervalId = setInterval(() => {
			
			let buttonsBuyNow = document.querySelectorAll( '.buy-now' );
			if (buttonsBuyNow.length > 0) {
					clearInterval(intervalId);  
					if ( buttonsBuyNow.length > 0 ) {
			buttonsBuyNow.forEach(buttonBuyNow => {
				buttonBuyNow.addEventListener( 'click', ( e ) => {
					if(e.target == buttonBuyNow) {
						e.preventDefault();
					
					let parent = e.target.closest( '.card-product' );
					let img = parent.querySelector( '.card__imgBx img' ).getAttribute( 'src' );
					let id = parent.dataset.id;
					let model = parent.dataset.name;
					let count = 1;
					let price = parseInt( priceWithoutSpaces( parent.querySelector( '.card-price__new' ).textContent ) );
			
					cartProductsList.insertAdjacentHTML( 'afterbegin', generateCartProduct( id,img, price, model, count) );
					updateStorege();
					printQuantity();
					// calcSum();
					getFulpriceProduct();
					deleteProducts();
					buttonBuyNow.textContent = 'Товар добавлен';
					buttonBuyNow.disabled= true;
					count.value = 1;
					
					cart.classList.add('active')
				}
				} );
			})
			
		};
			}
	}, 100);



		
})






// Функція вираховує суму кожконого добавленго продукту при додаванні в корзину
const getFulpriceProduct = () => {
	let itemProducts = cartList.querySelectorAll( '.cart-content__item' );
	itemProducts.forEach( itemProduct => {
		if ( !itemProduct.classList.contains( 'calc' ) ) {
			let countProduct = itemProduct.querySelector( '.counter__number' ).textContent;
			let priceProduct = itemProduct.querySelector( '.cart-product__price' );
			let priceProductNumber = parseInt( priceWithoutSpaces( itemProduct.querySelector( '.cart-product__price' ).textContent ) );
			let sumPrice = +countProduct * priceProductNumber;
			priceProduct.textContent = `${sumPrice} MDL`;
			itemProduct.classList.add( 'calc' );
		}
	} )
};
getFulpriceProduct();

// При натисканні на кнопку оновлюється LocalStorage
let buttonToOrder = document.querySelector( '.go-to-order' );
if ( buttonToOrder ) {
	buttonToOrder.addEventListener( 'click', function ( e ) {
		updateStorege();
	} );
}
// Створює елемент для товару на сторінці Order
const generateItemOrder = (id, model, count, price ) => {
	return `
	<li data-id="${id}" class="product-order__item order__item">
		<h3 class="order__item-text">
		<span class="order__item-model">${model}</span> x 
		<span class="order__item-count">${count}</span></h3>
		<p class="order__item-price">${price} MDL</p>
	</li>
	`
}

// Функція виводить всі товари на сторінку оформлення
const funcOrder = () => {
	let itemsOrderCart = cartList.querySelectorAll( '.cart-content__item' );
	cartIcon.style = 'display: none;'
	let fullPriceOrder = document.querySelector( '.order__topay-price' );
	let sum = 0;
	itemsOrderCart.forEach( itemOrderCart => {
		let model = itemOrderCart.querySelector( '.cart-product__model' ).textContent;
		let count = itemOrderCart.querySelector( '.counter__number' ).textContent;
		let priceHide = itemOrderCart.querySelector( '.cart-product__hide' ).textContent;
		let id = itemOrderCart.dataset.id;
		let price = parseInt( priceWithoutSpaces( priceHide ) ) * count;
		orderList.insertAdjacentHTML( 'afterbegin', generateItemOrder(id, model, count, price ) );
		sum += price;
	} )
	fullPriceOrder.textContent = `${sum} MDL`;
}

// Додає елементи в блок з замовленням
let orderList = document.querySelector( '.product-order__list' );
if ( orderList ) {
	funcOrder();
}