
let intro, messages, textIndex, lettersToShow, logsElement, logs, roverData

const setup = () => {
  intro = document.getElementById('loading-text')

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
  // show loadeding sequence

  setInterval(() => {
    var text = messages[textIndex]
    const rand = Math.random();
    if (rand > 0.3){
      if (lettersToShow <= text.length){
        displayText(text.charAt(lettersToShow))
        lettersToShow++
      }
      else {
        textIndex++;
        displayText('</br>')
        lettersToShow = 0;
      }
    }
  }, 20)

  getCurrentPosition(roverData)
  setTimeout(loaded, 8000);

}


const getCurrentPosition = (data) => {

}

const displayText = (text) => {
  intro.innerHTML += text;
}

const loaded = () => {
  gsap.to("#probe-planet", {duration: 1, scale: 0.1, ease: 'power3.out'});
  gsap.to("#loading", {duration: 0.5, autoAlpha: 0})
  gsap.to("#dashboard", {duration: 0.5, autoAlpha: 1, delay: 0.2})
  var showDashboard = gsap.timeline();
  showDashboard.to('.dashboard-element', {
    autoAlpha: 1,
    duration: 1,
    ease: "power4.in",
    stagger: {
      each: 0.2,
    }
  }) 
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