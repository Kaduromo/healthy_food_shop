const cartBody = document.querySelector(".cart__body")
const cartEmpty = cartBody.querySelector(".product__empty")

document.addEventListener("click", (e) => {
  const target = e.target

  if (cartBody.children.length || cartBody.children.length === 0) {
    document.querySelector(".header__counter").textContent =
      cartBody.children.length - 1
  }

  if (target === document.querySelector(".header__cart")) {
    const body = document.body
    const paddingRight = window.innerWidth - body.clientWidth
    body.style.paddingRight = paddingRight + "px"
    body.style.overflow = "hidden"
    document.querySelector(".cart").classList.add("cart__open")
  }

  target === document.querySelector(".header__cart")
    ? document.querySelector(".cart").classList.add("cart__open")
    : null

  if (
    target === document.querySelector(".cart") ||
    target === document.querySelector(".cart__close")
  ) {
    const body = document.body
    body.style.paddingRight = ""
    body.style.overflow = ""
    document.querySelector(".cart").classList.remove("cart__open")
  }

  if (
    target ===
    cartBody.parentElement.querySelector(".cart__btn.cart__btn_clear")
  ) {
    Array.from(cartBody.querySelectorAll(".product")).map((i) => i.remove())
    cartEmpty.style.display = "block"
    cartEmpty.textContent = "Пусто"
    setTimeout(() => {
      const body = document.body
      body.style.paddingRight = ""
      body.style.overflow = ""
      document.querySelector(".cart").classList.remove("cart__open")
    }, 2000)
  }

  if (
    target ===
    cartBody.parentElement.querySelector(".cart__btn.cart__btn_primary")
  ) {
    Array.from(cartBody.querySelectorAll(".product")).map((i) => i.remove())
    cartEmpty.style.display = "block"
    cartEmpty.textContent = "Ваша заявка принята"
    setTimeout(() => {
      const body = document.body
      body.style.paddingRight = ""
      body.style.overflow = ""
      document.querySelector(".cart").classList.remove("cart__open")
    }, 2000)
  }

  Array.from(document.querySelectorAll(".product")).map((item) => {
    if (
      target === item.querySelector(".counter__plus") &&
      target.dataset.cartId === item.dataset.id
    ) {
      counterPrice(item, target)
    }

    if (
      target === item.querySelector(".counter__minus") &&
      target.dataset.cartId === item.dataset.id
    ) {
      counterPrice(item, target)
    }

    if (target === item.querySelector(".product__close")) {
      target.parentElement.remove()
      if (cartBody.children.length - 1 === 0) {
        cartEmpty.style.display = "block"
        cartEmpty.textContent = "Пусто"
      }
    }
  })

  document.querySelectorAll("[data-cart]").forEach((card, index) => {
    const title = card.querySelector("h3").textContent
    const image = card.querySelector("img").src
    const price = card.querySelector("[data-price]").textContent
    const count = card.querySelector(".counter__input").value
    const totalPrice = price.trim().match(/^\d*/g)
    const btn = card.querySelector(".link")
    btn.dataset.btnId = index
    const id = btn.dataset.btnId

    if (target === btn) {
      if (cartBody.children.length > 0) {
        cartEmpty.style.display = "none"
      }

      const cartAllProduct = cartBody.querySelectorAll(".cart__product")

      const cartProduct = Array.from(cartAllProduct).find(
        (item) => item.dataset.id === id
      )

      if (!cartProduct) {
        cartBody.insertAdjacentHTML(
          "afterbegin",
          `
                <div data-id="${index}" class="cart__product product">
                <button class="product__close">x</button>
                    <div class="product__payload">
                    <img
                        src="${image}"
                        alt="${title}"
                        class="product__image"
                    />
                    <div class="product__title">
                        <div class="product__name">${title}</div>
                        <strong class="product__price">${price}</strong>
                    </div>
                    </div>
                    <div class="product__info">
                        <div class="product__final-price">${
                          totalPrice * count
                        }pуб</div>
                        <div class="product__counter counter">
                            <button
                            data-cart-id="${index}"
                            class="counter__btn counter__btn_min counter__minus"
                            ></button>
                            <input
                            data-max-value="99"
                            min="1"
                            class="counter__input counter__input_min"
                            type="text"
                            value="${count}"
                            />
                            <button
                            data-cart-id="${index}"
                            class="counter__btn counter__btn_min counter__plus"
                            ></button>
                        </div>
                    </div>
                </div>
            `
        )
      } else {
        cartProduct.querySelector(".counter__input").value++
      }
    }
  })

  const cartAllPrice = cartBody.querySelectorAll(".product__final-price")
  const allPrice = Array.from(cartAllPrice).reduce(
    (acc, current) => acc + +current.textContent.match(/^\d*/g),
    0
  )

  document.querySelector(".cart__total span").textContent = allPrice + " руб"
})

function counterPrice(block, targ) {
  const price = block
    .querySelector(".product__price")
    .textContent.trim()
    .match(/^\d*/g)

  const value = block.querySelector(".counter__input").value.trim()

  if (+value === 0) {
    targ.parentElement.parentElement.parentElement.remove()
  } else {
    block.querySelector(".product__final-price").textContent = `${
      +price * +value
    } руб`
  }
  if (cartBody.children.length - 1 === 0) {
    cartEmpty.style.display = "block"
    cartEmpty.textContent = "Пусто"
  }
}
