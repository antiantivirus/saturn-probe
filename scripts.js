
let intro, messages, textIndex, lettersToShow, logsElement, logs, newLogs, roverData, dateElement

const setup = () => {
  intro = document.getElementById('loading-text')
  logs = document.getElementById('logs')
  newLogs = document.getElementById('new-logs')
  currentPositionElement = document.getElementById('current-position')
  dateElement = document.getElementById('date')
  getRoverData()
  getDate()
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

const getDate = () => {
  setInterval(() => {
    let date = Date.now()

    var today  = new Date();

    dateElement.innerHTML = today.toLocaleString("en-US"); // Saturday, September 17, 2016

  }, 1000)
}

const initialise  = () => {
  // show loadeding sequence
  var messagesProcessed = 0;

  messages.forEach((item, index, array) => {
    setInterval(() => {
      var text = messages[textIndex]
      if (lettersToShow <= text.length){
        displayText(text.charAt(lettersToShow))
        lettersToShow++
      }
      else {
        textIndex++;
        displayText('</br>')
        lettersToShow = 0;
        messagesProcessed++;
        if(messagesProcessed === array.length) {
          loaded()
        }
      }
    }, 250)
  });

  // setTimeout(loaded, 2000);

}


const getCurrentPosition = (data) => {
  console.log(roverData)
  const latitude = roverData[0].latitude
  const longitude = roverData[0].longitude
  const altitude = roverData[0]['altitude (m)']
  console.log(altitude)
  currentPositionElement.innerHTML = `<p>Latitude: ${latitude}</p><p>Longitude: ${longitude}</p><p>Altitude: ${altitude}m</p>`
}

const recieveLogs = (data) => {
  let logDataIndex = 0
  setInterval(() => {
    const contents = newLogs.innerHTML
    const rand = Math.random()
    if (rand > 0.9){
      //log new oxygen
      const newData = data[logDataIndex]['oxygen content']
      newLogs.innerHTML = `<p>New oxygen content data recieved: ${newData}</p>` + contents
    } else if (rand > 0.8){
      //log new albedo
      const newData = data[logDataIndex].albedo
      newLogs.innerHTML = `<p>New albedo content data recieved: ${newData}</p>` + contents
    } else if (rand > 0.7){
      //log new hydrogen
      const newData = data[logDataIndex]['hydrogen content']
      newLogs.innerHTML = `<p>New hydrogen ontent data recieved: ${newData}</p>` + contents
    } else if (rand > 0.6){
      //log new nitrogen
      const newData = data[logDataIndex]['nitrogen content']
      newLogs.innerHTML = `<p>New nitrogen content data recieved: ${newData}</p>` + contents
    } else if (rand < 0.05){
      //its down!
      newLogs.innerHTML = `<p>Connection successful</p>` + `<p>Retrying connection...</p>` + `<p>Signal to curiosity lost</p>` + contents
    }
    logDataIndex ++
  }, 1000)
}

const displayText = (text) => {
  intro.innerHTML += text;
}

const loaded = () => {
  gsap.to("#probe-planet", {duration: 1, scale: 0.1, xPercent: -75, ease: 'power3.out'});
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