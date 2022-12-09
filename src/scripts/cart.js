import catalog from "../api/fake_api"

const cartBody = document.querySelector(".cart__body")

document.addEventListener("click", (e) => {
  const target = e.target

  const cartCounters = cartBody.querySelectorAll(".counter__input")
  const numbers = Array.from(cartCounters).reduce(
    (acc, current) => acc + +current.value,
    0
  )

  if (cartBody.children.length || cartBody.children.length === 0) {
    document.querySelector(".header__counter").textContent = numbers
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

  if (target === document.querySelector(".cart__product .counter__plus")) {
    const price = cartBody
      .querySelector(".product__price")
      .textContent.trim()
      .match(/^\d*/g)

    const value = cartBody.querySelector(".counter__input").value.trim()

    document.querySelector(".product__final-price").textContent = `${
      +price * +value
    } руб`
  }

  if (target === document.querySelector(".cart__product .counter__minus")) {
    const price = cartBody
      .querySelector(".product__price")
      .textContent.trim()
      .match(/^\d*/g)

    const value = cartBody.querySelector(".counter__input").value.trim()

    if (+value === 0) {
      target.parentElement.parentElement.parentElement.remove()
      cartBody.querySelector(".product__empty").style.display = "block"
    } else {
      document.querySelector(".product__final-price").textContent = `${
        +price * +value
      } руб`
    }
  }

  document.querySelectorAll("[data-cart]").forEach((card, index) => {
    const title = card.querySelector("h3").textContent
    const image = card.querySelector("img").src
    const price = card.querySelector("[data-price]").textContent
    const count = card.querySelector(".counter__input").value
    const btn = card.querySelector(".link")
    btn.dataset.btnId = index
    const id = btn.dataset.btnId

    if (target === btn) {
      if (cartBody.children.length > 0) {
        cartBody.querySelector(".product__empty").style.display = "none"
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
                        <div class="product__final-price">1000p</div>
                        <div class="product__counter counter">
                            <button
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
})
