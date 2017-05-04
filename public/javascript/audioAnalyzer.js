var context;

function init(){
  try{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  }catch(e){
    alert("Web Audio API in not supported in this broswer");

  }
}
function loadSound(url,cb){
  axios({
    method:'get',
    url:url,
    responseType:'arraybuffer'
  }).then(function(res){
    context.decodeAudioData(res.data,
      function(buffer){
      cb(buffer);
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

function playSound(time,buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.loop=true;
  source.start(time);
}
function main(){
  init();
  loadSound('tapesnare.wav',playSound.bind(null,0));
}
window.addEventListener('load',main,false);
