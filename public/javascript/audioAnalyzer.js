var context;
var source;
var gainNode;
var analyser;
var spectrum;
var urlParams

function init(){
  urlParams = new URLSearchParams(window.location.search);
  try{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

  }catch(e){
    alert("Web Audio API in not supported in this broswer");

  }
}
function loadSound(url){
  axios({
    method:'get',
    url:url,
    responseType:'arraybuffer'
  }).then(function(res){
    context.decodeAudioData(res.data,
      function(buffer){
        playSource(buffer);


    },
    function(e){
      console.log(e);
    }
  );
  });

}
// context.decodeAudioData(req.response,function(buffer){
//   cb(buffer);
// });

function playSource(buffer) {

  source = context.createBufferSource();
  source.buffer = buffer;
  gainNode = context.createGain();
  masterGainNode = gainNode
  source.connect(gainNode);
  if(urlParams.has("isMaster")){
  gainNode.gain.value = 1;
}else{
  gainNode.gain.value=0;
}

  gainNode.connect(context.destination);
  analyser = context.createAnalyser();
  gainNode.connect(analyser);
  spectrum = new Uint8Array(analyser.frequencyBinCount);
  source.loop=true;
  source.start(0);


}
function mainSoundControl(){
  init();
  loadSound("Turn_You_Bad.mp3");

}
window.addEventListener('load',mainSoundControl,false);
