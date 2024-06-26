window.addEventListener("load", function(event){
    let addMillisec = document.getElementById("milliseconds");
    let addSec = document.getElementById("seconds");
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const resetButton = document.getElementById("reset");
    let seconds = 00;
    let milliseconds = 00;
    let Interval;
//при полной загрузки получаем эл-ы



    startButton.onclick = () => {
        clearInterval(Interval)
        Interval = setInterval(startTimer, 10)
    };//иницилиазируем метод onclick

    stopButton.onclick = () => {
        clearInterval(Interval)
        
    };

    resetButton.onclick = () => {
        clearInterval(Interval)
        milliseconds = "00";
        seconds = "00";
        addMillisec.innerHTML = milliseconds;
        addSec.innerHTML = seconds;
        
    };


    const startTimer = () => {
        milliseconds++
        if(milliseconds < 9){
            addMillisec.innerHTML = "0" + milliseconds
        }//прибавляем эл-ент для класса единиц
        if(milliseconds > 9){
            addMillisec.innerHTML = milliseconds
        }//если миллисек больше 9, то добавл. элем. для класса десятков

        if (milliseconds > 99){
            console.log("seconds");
            seconds++
            addSec.innerHTML = "0" + seconds;
            milliseconds = 0;
            addMillisec.innerHTML = "0" + 0;
        }//если миллисекунда больше 99, то добавл. секунду для класса единиц 
        if(seconds > 9){
            addSec.innerHTML = seconds;
        }//больше 9, то добавл. элемент для классов десятков 

         
    }
})