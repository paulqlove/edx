var interval;
var started = false;
var milliseconds = 00;
let seconds = 00;
var minutes = 00;
var i = 0;
var appendMili = document.getElementById("milliseconds");
var appendSec = document.getElementById("seconds");
var appendMin = document.getElementById("minutes");
var btnStart = document.getElementById("start");
    btnStart.onclick = ((seconds) => started ? stop() : startTimer(seconds));
var btnReset = document.getElementById("reset").onclick = (() => reset());
var btnRecord = document.getElementById("record").onclick = (() => recordTime());
var record = document.getElementById('records');
var ul = document.getElementById("records");
var timeArray = ["seconds","milliseconds", "minutes"];
var timeColors = [
'#e6194b',
'#3cb44b',
'#ffe119',
'#0082c8',
'#f58231',
'#911eb4',
'#46f0f0',
'#f032e6',
'#d2f53c',
'#fabebe',
'#008080',
'#e6beff',
'#aa6e28',
'#fffac8',
'#800000',
'#aaffc3',
'#808000',
'#ffd8b1'
]
actions();
//ACTIONS

function reset() {
    clearInterval(interval);
    started = false;
    btnStart.innerHTML = "Start";
    ul.innerHTML = '';
    if(started){
      reset();
    }
    timeArray.map((time, i) => {
      document.getElementById(time).innerHTML = "0" + 0;
    })
}
function startTimer(){
    if (started == false){
      btnStart.innerHTML = "Pause";
        interval = setInterval(function(){
            ++milliseconds < 10 ? appendMili.innerHTML = "0" + milliseconds : appendMili.innerHTML = milliseconds;
            if(milliseconds > 99){
              milliseconds = 0;
              ++seconds < 10 ? appendSec.innerHTML = "0" + seconds : appendSec.innerHTML = seconds;
            }
            if(seconds > 59){
              seconds = 0;
              seconds < 10 ? appendSec.innerHTML = "0" + seconds : appendSec.innerHTML = seconds;
              appendMin.innerHTML = ++minutes;
            }
        },10)
        started = true;
    }
}

function stop() {
  clearInterval(interval);
  started = false;
  btnStart.innerHTML = "Start"
  seconds < 10 ? appendSec.innerHTML = "0" + seconds : appendSec.innerHTML = seconds;
}

function recordTime(recordTime) {
  var li = document.createElement("li");
  var textnode;
  i > timeColors.length ? i = 0 : li.style.backgroundColor = timeColors[i++]

  minutes === 0 ? recordTime = seconds + ':' + milliseconds : recordTime = minutes + ':' + seconds + ':' + milliseconds;
  textnode = document.createTextNode(recordTime);
  li.appendChild(textnode);
  record.appendChild(li);
}
//END OF ACTIONS

//EVENT LISTENERS
function actions(seconds) {
  document.addEventListener('keydown', (key) => {
    let nKey = key.keyCode;
    if (nKey == 83 && started == false) {
        startTimer();
        return;
    }
    if(nKey == 83 && started == true) {
      reset();
    }
    if(nKey == 80 && started == true) {
      stop();
    }
    if(nKey == 84){
      recordTime();
    }
    if(nKey == 82){
      resetRecords();
    }
  })
}
