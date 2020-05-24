const playBtn = document.getElementById("play-btn")
const pauseBtn = document.getElementById("pause-btn")
const spotBtn = document.getElementById("stop-btn")
const textInput = document.getElementById("text")
const speedInput = document.getElementById("speed")
let currentChar;

const utterance = new SpeechSynthesisUtterance(text);
utterance.addEventListener("end", () => {
  textInput.disabled = false
})
utterance.addEventListener("boundary", e => {
  currentChar = e.charIndex
})



spotBtn.addEventListener("click", stopText)
pauseBtn.addEventListener("click", pauseText)
speedInput.addEventListener("change", () => {
  stopText()
  playText(utterance.text.substring(currentChar))
})

playBtn.addEventListener("click", () => {
  playText(textInput.value)
})

function playText(text) {
  if(speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if(speechSynthesis.speaking) return
  utterance.text = text
  utterance.rate = speedInput.value || 1

  textInput.disabled = true
  speechSynthesis.speak(utterance)
}

function pauseText() {
  if(speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
}