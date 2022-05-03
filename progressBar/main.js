const container = document.querySelector('.progressbar-full')
container.style.background = "#aaa";

class Progression {
  constructor(element,initValue = 0)
  {
    this.valEle = element.querySelector('.progressbar-value')
    this.fullEle = element.querySelector('.progressbar-full')
    this.setValue(initValue)
  }
  setValue(v)
  {
    if(v < 0)
      return 0;
    if(v >100)
      return 100;
    this.value = v;
    this.update();
  }
  update()
  {
    this.valEle.textContent = this.value+ "%";
    this.fullEle.style.width = this.value + "%";
  }
}
const input = document.querySelector('input')
input.addEventListener("change",(e) => {
const pg = new Progression(document.querySelector('.progressbar'), e.target.value);  
})