const textField = document.getElementById("textInput");
const button = document.getElementById("add");
const list = document.getElementById("list");

button.addEventListener("click", function (){
    const text = textField.value.trim();

    if (text === '') {
        alert("No has posat text!!");
    }

    else {
        const listItem = document.createElement("li");
        listItem.textContent = text;

        const borrar = document.createElement("button");
        borrar.textContent = "Delete";
        borrar.style.marginLeft = "10px";

        borrar.addEventListener("click", function (){
            list.removeChild(listItem)
        })

        listItem.appendChild(borrar);

        list.appendChild(listItem);

        textField.value = "";
    }
});
