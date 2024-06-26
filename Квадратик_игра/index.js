var $start = document.querySelector('#start')//$ - node element(querySelector) 
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')
var colors = ['green','red','yellow','orange','blue','black']
var score = 0;
var isGameStarted = true;

function show($el){
$el.classList.remove('hide')
}

function hide($el){
$el.classList.add('hide')
}

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)//на необходимый ли эл-ент кликнул пользователь
$gameTime.addEventListener('input', setGameTime )//получение input


function startGame(){
score = 0
setGameTime()//при повторном клике "Начать" Запускаем заново игру
$gameTime.setAttribute('disabled','true')//чтобы пользователь не мог менять время в инпуте при запуске игры



// $timeHeader.classList.remove('hide')//скрываем законченное время
// $resultHeader.classList.add('hide')//показываем результат

isGameStarted = true;
hide($start)
// $start.classList.add('hide')//добавляем класс и скрываем кнопку
$game.style.backgroundColor = 'white'

var interval = setInterval(()=>{
let time = parseFloat($time.textContent)
 if(time<=0){
   clearInterval(interval)//останавливаем интервал
   gameEnd()//останавливаем игру
 }
 else{
   $time.textContent = (time - 0.1).toFixed(1) //кладем время уменьшенное на 10 мс
 }
},100)//запускаем счетчик, для ограничения времени игры

renderBox()//При старте игры запускам функцию рандомов квадратиков
}

function gameEnd(){
  gameScore()//cчитаем кол-во кликов
  isGameStarted = false //останавливаем игру
  $game.innerHTML = ''
  show($start)
  // $start.classList.remove('hide')//показываем копочку начать
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  show($resultHeader)
  // $timeHeader.classList.add('hide')//скрываем законченное время
  // $resultHeader.classList.remove('hide')//показываем результат
  $gameTime.removeAttribute('disabled')
}


function gameScore(){
  $result.textContent = score.toString()//считаем кол-во кликов
}

function setGameTime(){  //при повторном клике "Начать" Запускаем заново игру
  var time = +$gameTime.value//получаем время игры
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}



function handleBoxClick(event){
 if(!isGameStarted){
    return//для того чтобы при окончании времени функция ничего не возращала, т.е. игра останавливалась
 }

 if(event.target.dataset.box){//проверяем что лежит в данном объекте, т.е. при клике на пустое пространство js не нашло никакого data атрибута, а при клике на квадрат нашла
     score++//считаем кол-во кликов 
    renderBox()// заново генерируем квадрат
 }
}



function renderBox() {
  
  $game.innerHTML = ''//удаляет все содержимое в контейнере game при клике на квадрат
  var box = document.createElement('div')
  var boxSize = getRandom(30,100)//добавляем диапозон размеров квадрата
  var gameSize = $game.getBoundingClientRect()//вычисляем величину поля game
  var maxTop = gameSize.height - boxSize //максимальное отклонение от верхней части игры
  var maxLeft = gameSize.width - boxSize 
  // var boxColorSize = boxColorRandom(255,255,255)

  box.style.height = box.style.width = boxSize +'px'//рандомно генерируем размер
  box.style.position = 'absolute'//для того чтобы квадрат абсолютно позиционировался в <div class'game'>
  box.style.backgroundColor = randomColor(colors) 
  box.style.top = getRandom(0, maxTop)+'px'
  box.style.left = getRandom(0, maxLeft)+ 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')//добавили атрибут со значением true, для проверки 
  $game.insertAdjacentElement('afterbegin', box)//доб-ем в html
  
}

function getRandom(min, max) {
return Math.round(Math.random()*(max-min)+min)
}

function randomColor(colors){

  let arrNumber = Math.round(Math.random()*5)
  return colors[arrNumber]
}