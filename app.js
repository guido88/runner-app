class Clock {
  constructor({ template}) {
    this._template = template;
    this._flag =true;
  }

   
  _render() {
    let datet = new Date();

    let hours = datet.getHours()-this._date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = datet.getMinutes()-this._date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = datet.getSeconds()-this._date.getSeconds();
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

let st1= new Date(0);
console.log(st1.getHours()+":"+st1.getMinutes()+":"+st1.getSeconds())

let st3= new Date(3600*1000);
console.log(st3.getHours()+":"+st3.getMinutes()+":"+st3.getSeconds())

//console.log(st3.getHours()-st1.getHours());
//average(st3-st1,3);

let av_date = new Date(3600*1000);
   
alert(av_date.getHours());  
console.log(av_date.getHours()+":"+av_date.getMinutes()+":"+av_date.getSeconds())
   
function average(ov_time,lap_count){

    
    let av_date = new Date(3600*1000);
   
    
    console.log(av_date.getHours()+":"+av_date.getMinutes()+":"+av_date.getSeconds())
   
   }



addName.addEventListener("click", () => {

		createRow(table);

});



startRace.addEventListener("click", () => {

	

    clock.start();

});


endRace.addEventListener("click", () => {

		clock.stop();

});



const createRow = (table) => {

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

    let lapCount =row.querySelectorAll('td')[1];
	  lapCount.innerHTML= Number(lapCount.textContent) +1;

    ////....
};

/*  ONCE clicked START RACE

   -each time click NAME runner
   - store the last lap (time-on-LAST-CLICK - prevOveralTime)
   - Overal time (time passed from START until LAST CLICK)
   - Average (Overall time/ num laps)
   - 

  ONCE clicked END RACE
    - Runner with HIGHEST LAP Count and LOWEST OVERALL TIME
    - FASTEST LAP and TIME taken for it


 A Map should store for each runner currentOverallTime and fastest lap

*/






function calcFastestLap(f_laps){


}


function calcLastLap(now,prev_ov_time){

 //updateFastLap,if

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later');
}
