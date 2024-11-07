const form = document.querySelector("form")
const list = document.querySelector("ul")

const HandleSubmit = (e) => {
  e.preventDefault()
  const inputElement = document.getElementById("todo-input")

  const listItem = document.createElement("li")
  listItem.textContent = inputElement.value

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  listItem.append(checkbox)

  list.append(listItem);
  inputElement.value = ""
}

form.addEventListener("submit", HandleSubmit)