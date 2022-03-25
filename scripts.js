
let intro, messages, textIndex, lettersToShow, logsElement, logs, roverData

const setup = () => {
  intro = document.getElementById('loading-text')
  logs = document.getElementById('logs')
  currentPositionElement = document.getElementById('current-position')
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
    getCurrentPosition(data)
    recieveLogs(data)
  });
}

const initialise  = () => {
  // show loadeding sequence

  // setInterval(() => {
  //   var text = messages[textIndex]
  //   const rand = Math.random();
  //   if (rand > 0.3){
  //     if (lettersToShow <= text.length){
  //       displayText(text.charAt(lettersToShow))
  //       lettersToShow++
  //     }
  //     else {
  //       textIndex++;
  //       displayText('</br>')
  //       lettersToShow = 0;
  //     }
  //   }
  // }, 20)

  setTimeout(loaded, 2000);

}


const getCurrentPosition = (data) => {
  console.log(roverData)
  const latitude = roverData[0].latitude
  const longitude = roverData[0].longitude
  const altitude = roverData[0].altitude
  currentPositionElement.innerHTML = `<p>Latitude:${latitude}</p><p>Longitude:${Longitude}:</p><p>Altitude:${altitude}</p>`
}

const recieveLogs = (data) => {
  const logDataIndex = 0
  const rand = Math.random()
  setInterval(() => {
    if (rand = 0.1){
      //log new oxygen
      const newData = data[logDataIndex].oxygen
      logs.innerHTML = `<p>New oxygen content data recieved: ${newData}</p>`
    } else if (rand = 0.2){
      //log new albedo
      const newData = data[logDataIndex].aldedo
      logs.innerHTML = `<p>New albedo content data recieved: ${newData}</p>`
    } else if (rand = 0.3){
      //log new hydrogen
      const newData = data[logDataIndex].hydrogen
      logs.innerHTML = `<p>New hydrogen ontent data recieved: ${newData}</p>`
    } else if (rand = 0.4){
      //log new nitrogen
      const newData = data[logDataIndex].nitrogen
      logs.innerHTML = `<p>New nitrogen content data recieved: ${newData}</p>`
    } else if (rand = 0.51){
      //its down!
      logs.innerHTML = `<p>Signal to curiosity lost</p>`
      logs.innerHTML = `<p>Retrying connection...</p>`
      logs.innerHTML = `<p>Connection successful</p>`
    }
    logDataIndex ++
  }, 1000)
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