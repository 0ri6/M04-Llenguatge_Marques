const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const resultParagraphs = document.querySelectorAll(".result");

        resultParagraphs.forEach(paragraph => {
            paragraph.innerText = "One button clicked 🫡🫡";
        });
    });
})