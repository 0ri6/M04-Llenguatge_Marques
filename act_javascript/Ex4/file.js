const button = document.querySelector("button");
const p = document.querySelector("p");
button.addEventListener("click", colorear);

function colorear() {
    p.classList.toggle("colorear")
}


