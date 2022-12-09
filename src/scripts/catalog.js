import catalog, { news } from "../api/fake_api"

const catalogBlock = document.querySelector(".catalog-grid")
const newsBlock = document.querySelector(".trendsSwiper .swiper-wrapper")

if (catalog.length > 0) {
  catalogBlock.insertAdjacentHTML(
    "afterbegin",
    catalog
      .map((item) => {
        const { type, img, title, description, price, count } = item
        return `
          <div data-cart="cart" class="catalog-grid__item">
            <div class="catalog-grid__cover">
              <img
                src="${img}"
                alt="${title}"
                class="catalog-grid__image"
              />
            </div>
            <h3 class="catalog-grid__title">${title}</h3>
            <p class="catalog-grid__description">${description}</p>
            <p data-price="price" class="catalog-grid__price">${price} руб/${type}</p>
            <div class="catalog-grid__footer">
              <div class="counter">
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
              <button class="link link_min">В корзину</button>
            </div>
          </div>
		`
      })
      .join("\n")
  )

  const catalogLength = catalogBlock.children.length

  if (catalogLength > 8) {
    catalogBlock.insertAdjacentHTML(
      "afterend",
      `
    <button 
        class="catalog__btn" >
        Загрузить ещё
    </button>
    `
    )

    for (let i = 8; i < catalogLength; i++) {
      catalogBlock.children[i].style.display = "none"
    }
  }
  const catalogBtn = document.querySelector(".catalog__btn")

  catalogBtn.addEventListener("click", (e) => {
    if (e.target === catalogBtn) {
      for (let i = 8; i < catalogLength; i++) {
        catalogBlock.children[i].style.display = "flex"
      }
      catalogBtn.style.display = "none"
    }
  })
}

if (news.length > 0) {
  newsBlock.insertAdjacentHTML(
    "afterbegin",
    news
      .map((item) => {
        const { type, img, title, description, price, count } = item
        return `
              <div data-cart="cart" class="swiper-slide">
                <div class="swiper-slide__cover">
                  <img
                    src="${img}"
                    alt="${title}"
                    class="swiper-slide__image"
                  />
                </div>
                <h3 class="swiper-slide__title">${title}</h3>
                <p class="swiper-slide__description">${description}</p>
                <p data-price="price" class="swiper-slide__price">${price} руб/${type}</p>
                <div class="swiper-slide__footer">
                  <div class="counter">
                    <button class="counter__btn counter__minus"></button>
                    <input
                      data-max-value="99"
                      min="1"
                      class="counter__input"
                      type="text"
                      value="${count}"
                    />
                    <button class="counter__btn counter__plus"></button>
                  </div>
                  <button class="link">В корзину</button>
                </div>
              </div>
		`
      })
      .join("\n")
  )
}
