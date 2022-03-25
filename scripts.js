
let intro, message, textIndex, lettersToShow, logsElement, logs, roverData

const setup = () => {
  intro = document.getElementById('loading')
  logs = document.getElementById('logs')
  getRoverData()
  messages = [
    "Connecting to Curiosity...",
    "Connection successful...",
    "Recieveing latest location data...",
    "Connecting to webcam...",
    "Connection successful...",
    "Recieveing latest photographic data...",
    "Boot load complete...",
    "Loading dashboard..."
  ]
  textIndex = 0;
  lettersToShow = 0;
}

const getRoverData = () => {
  fetch("data/roverData.json")
  .then(response => response.json())
  .then(data => {
    roverData = data
    console.log(roverData)
  });
}

const initialise  = () => {
  //show loadeding sequence

  // setInterval(() => {
  //   var text = messages[textIndex]
  //   if(lettersToShow <= text.length){
  //     lettersToShow++
  //     displayText(text.substring(0, lettersToShow))
  //   }
  //   else{
  //     textIndex++;
  //     lettersToShow = 0;
  //   }
  // }, 20)


  loaded()
}

// displayText(text);

// function displayText(text){
//   var typewriterContainer = document.querySelector("#loading #text");
//   typewriterContainer.innerHTML = text + ".";
// }

const loaded = () => {
  gsap.to("#probe-planet", {duration: 0.5, scale: 0.1, ease: 'power3.out'});
}


const incomingLogs = () => {
  logs = [
    "",
  ]

  setInterval(() => {
    const rand = Math.random();
    if(rand > 0.7){
      //add log

    }
  }, 1000)
}






window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  setup()
  initialise()  
});