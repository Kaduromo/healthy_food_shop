import httpService from "./http.servece"

const catalog = {
  get: async () => {
    const { data } = await httpService.get("catalog.json")

    const dataToArr = (obj) => {
      const result = []
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          result.push(obj[key])
        }
      }
      return result
    }

    const arr = Array.isArray(data) ? data : dataToArr(data)

    if (arr.length > 0) {
      const catalogBlock = document.querySelector(".catalog-grid")
      catalogBlock.insertAdjacentHTML(
        "afterbegin",
        arr
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
    }
  },
}

const news = {
  get: async () => {
    const { data } = await httpService.get("news.json")

    const dataToArr = (obj) => {
      const result = []
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          result.push(obj[key])
        }
      }
      return result
    }

    const arr = Array.isArray(data) ? data : dataToArr(data)

    if (arr.length > 0) {
      const newsBlock = document.querySelector(".trendsSwiper .swiper-wrapper")
      newsBlock.insertAdjacentHTML(
        "afterbegin",
        arr
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
  },
}

catalog.get()
news.get()

const cat = {
  get: async () => {
    const { data } = await httpService.get("catalog.json")
    return data
  },
  put: async (arr, path) => {
    const { data } = await httpService.get("news.json")
    data.push(...arr)
    for (const item of arr) {
      await httpService.put(`${path}` + item._id + ".json", item)
    }
  },
}

const test = [
  { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
  { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
  { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
  { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
  { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
  { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" },
  { _id: "154515", name: "asdasd" },
  { _id: "58461651", name: "asdasdasdsa" },
]

// async function rendaringData(arr, path) {
//   const { data } = await httpService.get("news.json")
//   data.push(...arr)
//   console.log(data)
//   for (const item of data) {
//     await httpService.put(`${path}` + item._id + ".json", item)
//   }
// }

// const d = async () => await cat.put(test, "test/")
// d()

const addBlock = document.querySelector(".added")
const addCategory = addBlock.querySelector(".added__category")
let addType = addBlock.querySelector(".added__type")
let addLink = addBlock.querySelector(".added__link")
let addTitle = addBlock.querySelector(".added__title")
let addDesc = addBlock.querySelector(".added__desc")
let addPrice = addBlock.querySelector(".added__price")
const addBtn = addBlock.querySelector(".added__btn")

addBtn.addEventListener("click", (e) => {
  // e.preventDefault()

  const arr = [
    {
      _id: Math.floor(
        Math.random() * (99999999999 - 10000000000 + 1) - 10000000000
      ),
      type: addType.value,
      img: addLink.value.includes("http")
        ? addLink.value
        : (addLink.value = `data:image/jpeg;base64,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`),
      title: addTitle.value,
      description: addDesc.value,
      price: addPrice.value,
      count: 1,
    },
  ]
  console.log(arr)

  const d = async () =>
    await cat.put(
      arr,
      // "test/"
      addCategory.value.toLowerCase() === "новинки"
        ? "news/"
        : addCategory.value.toLowerCase() === "каталог"
        ? "catalog/"
        : "test/"
    )
  d()

  addType.value = ""
  addLink.value = ""
  addTitle.value = ""
  addDesc.value = ""
  addPrice.value = ""
})
