//Mostri 👏 per cada click

document.addEventListener('DOMContentLoaded', function (){
    document.querySelector('.text').addEventListener('click', function (){
        this.innerHTML += '👏';
    });
});

//
document.addEventListener('DOMContentLoaded', function() {
    const zoom = document.querySelector('.grid');
    const paragraph = document.getElementById('.papallona');

    zoom.addEventListener('mouseenter', function() {
        paragraph.style.fontSize = '24px';


    });

    zoom.addEventListener('mouseleave', function() {
        paragraph.style.fontSize = '16px';
    });
});
