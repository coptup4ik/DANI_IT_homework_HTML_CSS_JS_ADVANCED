let amountOfTableCells = 30;
let table = document.createElement('table');

function generateTable() {

  for (let i = 0; i < amountOfTableCells; i++) {
    let trElem = document.createElement('tr');
    for (let j = 0; j < 30; j++) {
      trElem.appendChild(document.createElement('td'))
    }
    table.appendChild(trElem)
  }

  document.body.appendChild(table);
}
table.addEventListener('click',(e)=>{
  e.stopPropagation()
  if (e.target.nodeName === 'TD' ){
    if (e.target.classList.contains('invert')){
      e.target.classList.remove('invert')
    }else {
      e.target.classList.add('invert')
    }
  }

});

document.body.addEventListener('click',(e)=>{
  if (e.target.nodeName !== 'TABLE'){
    if (table.classList.contains('invert')){
      table.classList.remove('invert')
    }else {
      table.classList.add('invert')
    }
  }
});

generateTable();

