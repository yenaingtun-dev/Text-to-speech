let textArea = document.getElementById("text");
let speakButton = document.getElementById("play-button");
let pauseButton = document.getElementById("pause-button");
let resumeButton = document.getElementById("resume-button");
let stopButton = document.getElementById("stop-button");
let speedButton = document.getElementById("speed-button");
let clearText = document.getElementById("clear-text");
let arr = window.speechSynthesis.getVoices();
let options = "";
let selected = "";

arr.map((op, i) => {
    options += `<option value="${op}" id="${i}"">${op.name}</option>`;
})
document.getElementById("voices").innerHTML = options;
const selectOption = document.querySelector("#voices");
let currentChar = '';
let text = textArea.value;
let utterance = new SpeechSynthesisUtterance();
utterance.text = text;
utterance.voice = window.speechSynthesis.getVoices()[selectOption.selectedIndex] || window.speechSynthesis.getVoices()[1];
utterance.rate = speedButton.value || 1;
utterance.volume = 2;
utterance.lang = "en-US";
utterance.addEventListener('boundary', e => {
    currentChar = e.charIndex;
})
utterance.addEventListener('end', () => {
    textArea.disabled = false;
    document.getElementById('stop-button').style.display = 'none';
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('play-button').style.display = 'block';
})
speakButton.addEventListener("click",  () =>  {
    speak(textArea.value)
});
speedButton.addEventListener('input', () => {
    window.speechSynthesis.cancel();
    document.getElementById('speed-button').style.display = 'block';
    document.getElementById('stop-button').style.display = 'block';
    speak(utterance.text.substring(currentChar));
});
pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stop);
resumeButton.addEventListener("click", resume);
clearText.addEventListener("click", clear);

function speak(text) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }
    utterance.text = text
    utterance.rate = speedButton.value || 1
    // if (speechSynthesis.speaking) return
    textArea.disabled = true
    speechSynthesis.speak(utterance)
    document.getElementById('play-button').style.display = 'none';
    document.getElementById('pause-button').style.display = 'block';
    document.getElementById('speed-button').style.display = 'block';
    document.getElementById('stop-button').style.display = 'block';
}

function stopText() {
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
}

function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause()
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('resume-button').style.display = 'block';
    document.getElementById('speed-button').style.display = 'block';
    document.getElementById('stop-button').style.display = 'block';
}

function clear() {
    textArea.value = '';
    document.getElementById('speed-button').style.display = 'none';
}

function resume() {
    if (window.speechSynthesis.pause && window.speechSynthesis.speaking){
        window.speechSynthesis.resume();
        document.getElementById('pause-button').style.display = 'block';
        document.getElementById('resume-button').style.display = 'none';
    }
    window.speechSynthesis.resume();
}

function stop() {
    window.speechSynthesis.cancel();
    document.getElementById('play-button').style.display = 'block';
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('resume-button').style.display = 'none';
    document.getElementById('speed-button').style.display = 'none';
    document.getElementById('stop-button').style.display = 'none';
}
