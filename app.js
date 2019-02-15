class Clock {
  constructor({ template}) {
    this._template = template;
    this._flag =true;
  }

   
  _render() {
    let datet = new Date();

    let hours = ((datet.getHours()-this._date.getHours())+60)%60;
    if (hours < 10) hours = '0' + hours;

    let mins = ((datet.getMinutes()-this._date.getMinutes())+60)%60;
    if (mins < 10) mins = '0' + mins;

    let secs = ((datet.getSeconds()-this._date.getSeconds())+60)%60;
    if (secs < 10) secs = '0' + secs;

    let output = this._template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);
   
    timer.innerHTML=output;
  };

   
  stop() {
    if(!this._flag)
      clearInterval(this._timer);
    this._flag=true;
  }

  start() {
    
    if(this._flag){
        this._date = new Date();
     // this._date.setHours(0,0,0,0);

        this._render();
        this._timer = setInterval(() => this._render(), 1000);
    }
    this._flag = false;
  }

  isStarted(){
    return !this._flag;
  }

  getDate(){
    return this._date;
  }
}

const addName = document.querySelector("#addName");
const startRace = document.querySelector("#startRace");
const endRace = document.querySelector("#endRace");
const inputName = document.querySelector("#inputName");
const timer = document.querySelector("#timer");
const table = document.querySelector("#table");

let clock = new Clock({ template: 'h:m:s' });
let mapRunners = new Map();


const createRow = (table) => {

    if(!inputName.value)
      return;

    if(mapRunners.get(inputName.value))
      return;

    let newRow = document.createElement("tr");
    newRow.setAttribute('id',inputName.value);

    let tdName = document.createElement("td");
    let tdLap = document.createElement("td");
    let tdTotal = document.createElement("td");
    let tdAverage = document.createElement("td");
    let tdLast = document.createElement("td");

    let button = document.createElement("button");
    button.innerHTML= inputName.value;

    tdName.appendChild(button);
    tdLap.innerHTML= 0;
    tdTotal.innerHTML= 0;
    tdAverage.innerHTML= 0;
    tdLast.innerHTML= 0;
       
    let runner = {count:0,total:0,avg:0,current:0,last:0,fast:0};
    mapRunners.set(inputName.value,runner);

    newRow.appendChild(tdName);
    newRow.appendChild(tdLap);
    newRow.appendChild(tdTotal);
    newRow.appendChild(tdAverage);
    newRow.appendChild(tdLast);


    button.addEventListener("click", () => {

         clickName(newRow);

    });


    table.appendChild(newRow);

};

const clickName = (row) => {

    if(clock.isStarted()){
    
    let newDate = new Date();

    let tdName = row.querySelectorAll('td')[0];
    let b = row.querySelector('button');
    let name = b.textContent;

    let runner = mapRunners.get(name);

    let lapCount =row.querySelectorAll('td')[1];
    let laps= Number(lapCount.textContent) +1;
    lapCount.innerHTML= laps;
    runner.count=laps;

    let tdTotal =row.querySelectorAll('td')[2];
    let total = totalTime(clock.getDate(),newDate);
    tdTotal.innerHTML=total;
    runner.total=total;

    let tdAvg =row.querySelectorAll('td')[3];
    let avg = average(clock.getDate(),newDate,laps);
    tdAvg.innerHTML=avg;
    runner.avg=avg;

    //REVISION
    let tdLast =row.querySelectorAll('td')[4];
    let last = calcLastLap(newDate-runner.current);
    tdLast.innerHTML=last;
    runner.last=last;

    runner.current = newDate;

    calcFastestLap(mapRunners,name,last);

    console.log(mapRunners);
  }
};

function calcLastLap(last_lap){

 
    let hours = (Math.floor(last_lap/(3600*1000)))%60;
    let mins = (Math.floor(last_lap/(60*1000)))%60;
    let secs = (Math.floor(last_lap/1000))%60;

    if(hours<10)
      hours= '0'+hours;
    if(mins<10)
      mins='0'+mins;
    if(secs<10)
      secs='0'+secs;

    return hours+":"+mins+":"+secs;

}

function average(start,end,lap_count){

    let diff= (end-start)/lap_count;
    console.log(diff);
    let hours = (Math.floor(diff/(3600*1000)))%60;
    let mins = (Math.floor(diff/(60*1000)))%60;
    let secs = (Math.floor(diff/1000))%60;

    if(hours<10)
      hours= '0'+hours;
    if(mins<10)
      mins='0'+mins;
    if(secs<10)
      secs='0'+secs;

    return hours+":"+mins+":"+secs;
   
}

function totalTime(start,end){

    let diff= (end-start)
    console.log(diff);
    let hours = (Math.floor(diff/(3600*1000)))%60;
    let mins = (Math.floor(diff/(60*1000)))%60;
    let secs = (Math.floor(diff/1000))%60;

    if(hours<10)
      hours= '0'+hours;
    if(mins<10)
      mins='0'+mins;
    if(secs<10)
      secs='0'+secs;

    return hours+":"+mins+":"+secs;
   
}

function cleanTable(table){

  let rows = table.querySelectorAll('tr');

  for(let i = 1; i < rows.length; i++){
    
    rows[i].remove();
  
  }

}

//REVISION
function calcFastestLap(map,name,last){

  let runner = map.get(name);
  let c_fast = runner.fast;

  if(c_fast==0)
    runner.fast=last;
  else if(last<c_fast){
    runner.fast=last;
  }

}

function initializeCurrents(map){

  let values = map.values();

  for (let v of values) {
    // statement
      v.current=clock.getDate();
  }

}

//REVISION
function calcFinalStats(map){

    let maxCount=0;
    let minTime =0;
    let fastest =0;

    let name_fast_lap='';
    let name_runner='';

    let keys = map.keys();

    for (k of keys) {

      let c_count= map.get(k).count;
      let c_total= map.get(k).total;
      let c_fast = map.get(k).fast;

      if(maxCount==0 && minTime==0){
        maxCount=c_count;
        minTime = c_total;
        name_runner=k;
      }
      else if(c_count>maxCount && c_total<minTime){
        maxCount=c_count;
        minTime = c_total;
        name_runner=k;
      }
      
      if(fastest==0){
        name_fast_lap=k;
        fastest=c_fast;
      }
      else if(c_fast<fastest){

          fastest=c_fast;
          name_fast_lap=k;

      }
    }

    let span1 = document.createElement("span");
    span1.innerHTML="The max count is: "+maxCount+" and time: "+minTime+" "+name_runner;
    let span2 = document.createElement("span");
    span2.innerHTML="The fastest lap is: "+fastest+" and runner is : "+name_fast_lap;

    span1.setAttribute("id",1);
    span2.setAttribute("id",2);
    document.body.appendChild(span1);
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(span2);

}


addName.addEventListener("click", () => {

 if(!clock.isStarted()){
    createRow(table);
  }
});


startRace.addEventListener("click", () => {

    let node1 = document.getElementById("1");
    let node2 = document.getElementById("2");

    if(node1)
      node1.remove();
    if(node2)
      node2.remove();
  
    clock.start();
    initializeCurrents(mapRunners);
});


endRace.addEventListener("click", () => {

    clock.stop();
    calcFinalStats(mapRunners);
    cleanTable(table);
    mapRunners.clear();
});
