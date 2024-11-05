    const button = document.querySelector("button");
    const p = document.querySelector("p");
    button.addEventListener("click", colorear);

    function colorear() {
        p.style.backgroundColor = "#90EE90";
        p.style.padding = "10px";
        p.style.fontWeight = "bold";
        p.style.border = "2px solid Black"
    }
