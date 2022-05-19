const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {
    panel.addEventListener('click',() => {
        removeActive();
        panel.classList.add('active');
        console.log("hello");
    })
});

function removeActive(){
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}
