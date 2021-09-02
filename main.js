// скрытие формы
var form = document.getElementById("myForm");
form.style.visibility='hidden';

//получаем данные
var mydata = JSON.parse(data);

var table = document.getElementById("myTable");
var tBody = document.createElement("tbody");
// заполняем таблицу
//создаю строки таблицы заполняя полученными данными
for(let i in mydata){
    var row = document.createElement("tr");
    row.id = mydata[i].id;
    for(let j = 0; j < 4; j++){
        var col = document.createElement("td");
        if(j == 0){
            var text = document.createTextNode(mydata[i].name.firstName);
            col.appendChild(text);
        }else if(j == 1){
            var text = document.createTextNode(mydata[i].name.lastName);
            col.appendChild(text);
        }else if(j == 2){
            var text = document.createTextNode(mydata[i].about);
            col.appendChild(text);
        }else if(j == 3){
            var text = document.createTextNode(mydata[i].eyeColor);
            col.appendChild(text);
        }
        row.appendChild(col);
    }
    tBody.appendChild(row);
    table.appendChild(tBody);
}

table.setAttribute("border", "1");

//форма редактирования
// по клику на строку показываем форму заполняя ее данными
var tds = document.getElementsByTagName('tr');
for (var i = 0; i < tds.length; i++)
tds[i].onclick = function() {
  id = this.id;
  console.log(id);
  form.style.visibility='visible';

  var inputName = document.getElementById("firstName");
  var inputlastName = document.getElementById("lastName");
  var inputAbout = document.getElementById("about");
  var inputeyeColor = document.getElementById("eyeColor");

  for(let i in mydata){
      if(mydata[i].id == id){
        inputName.value = mydata[i].name.firstName;
        inputlastName.value = mydata[i].name.lastName;
        inputAbout.value = mydata[i].about;
        inputeyeColor.value = mydata[i].eyeColor;
      }
  }
}



// сортировка

document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
    
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
    
});
