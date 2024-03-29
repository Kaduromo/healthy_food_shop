import "./dynamicAdapt"
import "./catalog"
import "./swiper"
import "./counter"
import "./cart"

import "../styles/main.scss"

document.addEventListener("click", (e) => {
  if (e.target === document.querySelector("button.header__link")) {
    location.hash = "#admin"
    document.querySelector(".added").style.display = "flex"
  }
  if (e.target === document.querySelector(".added__close")) {
    location.hash = ""
    document.querySelector(".added").style.display = "none"
    location.reload(true)
  }
})

if (location.hash === "#admin") {
  document.querySelector(".added").style.display = "flex"
}
//========================================================================================================================================================
//	Определяем OS

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  },
}

if (isMobile.any()) {
  document.body.classList.add("_touch")

  let menuArrows = document.querySelectorAll(".menu__arrow")

  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index]
      menuArrow.addEventListener("click", () => {
        menuArrow.parentElement.classList.toggle("_active")
      })
    }
  }
} else {
  document.body.classList.add("_pc")
}
/*=================================================================================================================*/
//  hamburger

const iconMenu = document.querySelector(".header_menu")
const menuBody = document.querySelector(".header_navigation")

if (iconMenu) {
  iconMenu.addEventListener("click", () => {
    document.body.classList.toggle("_lock")
    iconMenu.classList.toggle("_active")
    menuBody.classList.toggle("_active")
  })
}
/*=================================================================================================================*/
//  scroll

const menuLinks = document.querySelectorAll(".header__link[data-goto]")

menuLinks.length > 0
  ? menuLinks.forEach((menuLink) => {
      menuLink.addEventListener("click", onMenuLinkClick)
    })
  : null

document
  .querySelector("a.link[data-goto]")
  .addEventListener("click", onMenuLinkClick)

function onMenuLinkClick(e) {
  const menuLink = e.target
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto)
    const gotoBlockValue =
      gotoBlock.getBoundingClientRect().top +
      pageYOffset -
      document.querySelector("header").offsetHeight

    if (iconMenu.classList.contains("_active")) {
      document.body.classList.remove("_lock")
      iconMenu.classList.remove("_active")
      menuBody.classList.remove("_active")
    }

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    })
    e.preventDefault()
  }
}
//========================================================================================================================================================

const url = "https://fakestoreapi.com/products/"

// const response = fetch("https://fakestoreapi.com/products")
//   .then((res) => res.json())
//   .then((json) => json)

// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = await response.json();
// } else {
//   alert("Ошибка HTTP: " + response.status);
// }

// console.log(response)

// let response = fetch(url)

// if (response.ok) {
//   // если HTTP-статус в диапазоне 200-299
//   // получаем тело ответа (см. про этот метод ниже)
//   let json = response.json()
//   console.log(json)
// } else {
//   console.log("Ошибка HTTP: " + response.status)
// }
