  document.addEventListener("click", (e) => {
    let targetElement = e.target
    if (targetElement.closest(".counter__btn")) {
      const input = targetElement.closest(".counter").querySelector("input")
      const maxValue = input.hasAttribute("data-max-value")
        ? Number(input.dataset.maxValue.replace(/[^\d]/g, ""))
        : 100
      let value = checkMaxValue(maxValue, getNumber(input))

      if (targetElement.classList.contains("counter__plus"))
        value = checkMaxValue(maxValue, ++value)
      else value = checkMaxValue(maxValue, --value)

      targetElement.closest(".counter").querySelector("input").value = value
    }
  })

  const inputs = document.querySelectorAll(".counter input")
  if (inputs.length) {
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const maxValue = input.dataset.maxValue
          ? Number(input.dataset.maxValue.replace(/[^\d]/g, ""))
          : 100
        let value = checkMaxValue(maxValue, getNumber(input))
        input.value = value
      })
    })
  }

  function getNumber(input) {
    return Number(input.value.replace(/[^\d]/g, ""))
  }

  function checkMaxValue(maxValue, newValue) {
    let value
    if (newValue >= maxValue) value = maxValue
    else if (newValue < 0) value = 0
    else value = newValue
    return value
  }

  // let values = parseInt(targetElement.closest('.counter').querySelector('input').value);

  // if (values <= 0) {
  //     value = 0;
  //     targetElement.closest('.counter').querySelector('.counter__btn_minus').classList.remove('unlock');
  // } else {
  //     targetElement.closest('.counter').querySelector('.counter__btn_minus').classList.add('unlock');
  // }
