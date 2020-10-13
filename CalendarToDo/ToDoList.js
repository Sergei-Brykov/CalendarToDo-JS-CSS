let c = console.log

let year = new Date().getFullYear();
let month = new Date().getMonth();
let day = getNowDay(month, year);

let select = {
  month: month,
  year: year,
  day: day,
  itemHTML: ''
}

let store = [];

// Переменные календаря
let calendar = document.querySelector('.calendar');
let dates = calendar.querySelector('.dates');
let prev = calendar.querySelector('#prev');
let next = calendar.querySelector('#next');

let display = calendar.querySelector('.data');
let displayMonth = display.querySelector('.month');
let displayYear = display.querySelector('.year');

let displayToDo = document.querySelector('.to-do');

let toDoDay = displayToDo.querySelector('.day');
let toDoMonth = displayToDo.querySelector('.month');
let toDoYear = displayToDo.querySelector('.year');
// Переменные Тудушки
let toDo = document.querySelector('.to-do');
let addItemEl = toDo.querySelector('input');
let itemParentEl = document.querySelector('#item-parent');
// Листенеры календаря
prev.addEventListener('click', saveInArrayOfToDo);
prev.addEventListener('click', changeDisplayToDo);
prev.addEventListener('click', prevMonth);
next.addEventListener('click', saveInArrayOfToDo);
next.addEventListener('click', changeDisplayToDo);
next.addEventListener('click', nextMonth);
draw(year, month, dates);
// Листенеры Тудушки
addItemEl.addEventListener('keyup', addItem);
toDo.addEventListener('click', removeItems);
toDo.addEventListener('dblclick', editItems);
toDo.addEventListener('keyup', saveEditItems);
toDo.addEventListener('change', addAtributChecked);
// прорисовка всей таблицф
function draw(year, month, dates) {
  let arr = [];
  let fistDate = 1;
  let lastDate = getLastDayOfMonth(month, year);

  let unshiftElemsCount = getUnshiftElemsNum(month, year, fistDate);
  let pushElemsCount = getPushElemsNum(month, year, lastDate);
  arr = createArr(fistDate, lastDate);
  arr = unshiftElems(unshiftElemsCount, arr);
  arr = pushElems(pushElemsCount, arr);
  arr = chuncArr(arr);
  createTable(arr, dates, month, year)
  printMonthAndYear(month, displayMonth, year, displayYear);
}
function createTable(arr, parent, month, year) {
  arrToDo = getArrayToDoDay()
  for (i = 0; i < arr.length; i++) {
    let divLine = document.createElement('div')
    divLine.classList.add('line', 'flex')

    for (j = 0; j < arr[i].length; j++) {
      let div = document.createElement('div')
      div.innerHTML = arr[i][j]
      divLine.appendChild(div)
      addSelectEvent(div);
      if (arr[i][j] == getNowDay(month, year)) {
        div.classList.add('now')
        if (arr[i][j] == day) {
          addSelectClass(div, month, year);

        }
      }
      else if (arr[i][j] == day) {
        addSelectClass(div, month, year);
      }
      for (let n = 0; n < arrToDo.length; n++) {
        if (arr[i][j] == arrToDo[n]) {
          div.classList.add('selected')
        }
      }
    }
    parent.appendChild(divLine)
  }
}
// создание массива с числами
function createArr(from, to) {
  let result = []
  for (let i = from; i <= to; i++) {
    result.push(i)
  }
  return result
}
function unshiftElems(num, arr) {
  for (i = 1; i <= num; i++) {
    arr.unshift('');
  }
  return arr
}
function pushElems(num, arr) {
  for (i = 1; i <= num; i++) {
    arr.push('');
  }
  return arr
}
function getLastDayOfMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
function getUnshiftElemsNum(month, year, day) {

  let result = new Date(year, month, day).getDay() - 1
  if (result == -1) return 6
  return result
}
function getPushElemsNum(month, year, day) {
  let result = 7 - new Date(year, month, day).getDay()
  if (result == 7) return 0
  return result
}
function chuncArr(arr) {
  let index = arr.length / 7;

  let result = [];
  for (i = 1; i <= index; i++) {
    result[i - 1] = [];
    for (j = 1; j <= 7; j++) {
      result[i - 1][j - 1] = arr[7 * i - 8 + j]
    }

  }
  return result
}
// рендер 
function render() {
  dates.remove();
  dates = document.createElement('div');
  dates.classList.add('dates');
  calendar.appendChild(dates)
  draw(year, month, dates);
}
// получение реальной даты
function getNowDay(month, year) {
  let nowYear = new Date().getFullYear();
  let nowMonth = new Date().getMonth();
  let nowDay = new Date().getDate();

  if ((nowYear == year) && (month == nowMonth)) {
    return nowDay
  } else return null
}
function getSelectDay(month, year) {
  if ((nowYear == year) && (month == nowMonth)) {
    return nowDay
  } else return null
}
function changeMonthOrYear() {
  if (month == -1) {
    year -= 1;
    month = 11;
  }
  else if (month == 12) {
    year += 1;
    month = 0
  }
}
function printMonthAndYear(month, spanMonth, year, spanYear) {
  spanMonth.innerHTML = (month == 0) ? "Январь" :
    (month == 1) ? "Февраль" :
      (month == 2) ? "Март" :
        (month == 3) ? "Апрель" :
          (month == 4) ? "Май" :
            (month == 5) ? "Июнь" :
              (month == 6) ? "Июль" :
                (month == 7) ? "Август" :
                  (month == 8) ? "Сентябрь" :
                    (month == 9) ? "Октябрь" :
                      (month == 10) ? "Ноябрь" : "Декабрь"
  spanYear.innerHTML = year;

}
function addSelectEvent(elem) {
  if (!elem.innerHTML) { }
  else {
    elem.addEventListener('click', saveInArrayOfToDo);
    elem.addEventListener('click', selectDay);
  }
}
function selectDay(event) {
  undisabledInput()
  day = +this.innerHTML

  render();
  printSelectDay();
  itemParentEl.innerHTML = printSelectToDoList()
}
function printSelectDay() {
  toDoDay.innerHTML = day
  printMonthAndYear(select.month, toDoMonth, select.year, toDoYear)

  // toDoMonth.innerHTML = +select.month + 1
  // toDoYear.innerHTML = select.year
}
function addSelectClass(elem, month, year) {
  condition = select;

  // addSelectItem(month, year)
  if ((condition.month == month) && (condition.year == year)) {
    elem.classList.add('select')
  }
}
// листенеры кнопок переключения
function prevMonth() {
  month -= 1;
  changeMonthOrYear();
  render(month, year);
}
function nextMonth() {
  month += 1;
  changeMonthOrYear();
  render(month, year);
}
function setSelectDate() {
  select.day = day;
  select.month = month;
  select.year = year;
  select.itemHTML = itemParentEl.innerHTML
  clearParentItem()
}
function clearParentItem() {
  itemParentEl.innerHTML = ''
}
function printSelectToDoList() {
  for (i = 0; i < store.length; i++) {
    if ((store[i].day == day) && (store[i].month == select.month)
      && (store[i].year == select.year) && store[i].itemHTML) {
      return store[i].itemHTML
    }
  }
  return ''
}
function isLeaps(year) {
  return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)
}
// Функции ТУДУШКИ
function addItem(event) {
  let value = this.value.trim()

  if (value && event.keyCode === 13) {
    addItemEl.value = '';
    addItemHTML(value)
  }

  function addItemHTML(val) {
    itemParentEl.innerHTML = getItemHtml(val) + itemParentEl.innerHTML
    function getItemHtml(val) {
      return '<div class="item flex">'
        + '<input type="checkbox" class="checkbox">'
        + '<div class="text">' + val + '</div>'
        + '<input type="text" class="edit blur">'
        + '<button class="remove">x</button>'
        + '</div>'
    }
  }
}
function removeItems(event) {

  if (event.target.classList == 'remove') {
    let item = event.target.closest('.item')
    item.remove()
  }
}
function editItems(event) {
  if (event.target.classList == 'text') {
    elem = event.target
    elem.classList.add('blur');
    let input = event.target.closest('.item').querySelector('.edit');
    input.value = elem.innerHTML
    input.classList.remove('blur');
    input.focus()
    input.addEventListener('blur', saveAndExitItem)
  }

}
function saveEditItems(event) {

  if (event.target.classList == 'edit' && event.keyCode === 13) {
    let input = event.target;
    let div = event.target.closest('.item').querySelector('div')
    changeItem(input, div)
  }
}
function saveAndExitItem(event) {
  let input = event.target
  let div = input.closest('.item').querySelector('div')
  changeItem(input, div)
}
function changeItem(input, div) {
  input.classList.add('blur');
  div.classList.remove('blur');
  div.innerHTML = input.value;
}
function saveInArrayOfToDo(event) {
  setSelectDate()
  let obj = {
    day: select.day,
    month: select.month,
    year: select.year,
    itemHTML: select.itemHTML
  }
  let isDouble = false
  if (!store[0]) {

    store.push(obj);
  } else {
    for (let i = 0; i < store.length; i++) {
      if (store[i] &&
        store[i].day == obj.day &&
        store[i].month == obj.month &&
        store[i].year == obj.year) {
        store[i].itemHTML = obj.itemHTML
        isDouble = true
      }
    }
    if (isDouble) { }
    else store.push(obj);

  }

}
function getArrayToDoDay() {
  let aray = []
  if (!store[0]) return store
  c(store[0].year, year)
  for (let i = 0; i < store.length; i++) {
    if (store[i].year == year &&
      store[i].month == month &&
      store[i].itemHTML) {
      aray.push(store[i].day)
    }

  }

  return aray
}
function addAtributChecked() {
  if (event.target.classList == 'checkbox') {
    event.target.setAttribute('checked', true)
  }
}
function changeDisplayToDo() {
  toDoDay.innerHTML = 'День не выбран';
  toDoMonth.innerHTML = '';
  toDoYear.innerHTML = '';
  disabledInput()
}
function disabledInput() {
  addItemEl.setAttribute('disabled', 'disabled')
}
function undisabledInput() {
  addItemEl.removeAttribute('disabled')
}
