gamelength=30;
timerID=null
var playing=false;
var numholes=6*10;
var currentpos=-1;

function clrholes() {
  for(var k=0;k<document.Holes.elements.length;k++){
      document.Holes.elements[k].checked=false;
  }
}

function stoptimer() {
  if(playing)
    clearTimeout(timerID);
}

function showtime(remtime) {
  document.panel.timeleft.value=remtime;
  if(playing) {
    if(remtime==0) {
      stopgame();
      return;
    }
    else {
      temp=remtime-1;
      timerID=setTimeout("showtime(temp)",1000);
    }
  }
}

function stopgame() {
  stoptimer();
  playing=false;
  document.panel.timeleft.value=0;
  clrholes();
  display("Game Over");
  alert('Game Over.\nYour score is:  '+totalhits);
}

function play() {
  stoptimer();
  if(playing) {
    stopgame();
    return;
  }
  playing=true;
  clrholes();
  totalhits=0;
  document.panel.score.value=totalhits;
  display("Playing");
  launch();
  showtime(gamelength);
}

function display(msg) {
  document.panel.state.value=msg;
}

function launch() {
  var launched=false;
  while(!launched) {
    mynum=random();
    if(mynum!=currentpos) {
      document.Holes.elements[mynum].checked=true;
      currentpos=mynum;
      launched=true;
    }
  }
}

function hithead(id) {
  if(playing==false) {
    clrholes();
    display("Push Start to Play");
    return;
  }
  if(currentpos!=id) {
    totalhits+=-1;
    document.panel.score.value=totalhits;
    document.Holes.elements[id].checked=false;
  }
  else {
    totalhits+=1;
    document.panel.score.value=totalhits;
    launch();
    document.Holes.elements[id].checked=false;
   }
}

function random() {
  return(Math.floor(Math.random()*100%numholes));
}
