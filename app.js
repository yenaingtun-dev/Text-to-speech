let textArea = document.getElementById("text");
let speakButton = document.getElementById("play-button");
let pauseButton = document.getElementById("pause-button");
let resumeButton = document.getElementById("resume-button");
let stopButton = document.getElementById("stop-button");
let speedButton = document.getElementById("speed-button");
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
    textArea.disabled = false
})

speakButton.addEventListener("click", function () {
    speak(textArea.value)
});
pauseButton.addEventListener("click", pauseText);
speedButton.addEventListener('input', () => {
    window.speechSynthesis.cancel();
    speak(utterance.text.substring(currentChar));
});

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
}

function stopText() {
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
}

function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause()
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('resume-button').style.display = 'block';
}


resumeButton.addEventListener("click", function () {
    if (window.speechSynthesis.pause && window.speechSynthesis.speaking){
        window.speechSynthesis.resume();
        document.getElementById('pause-button').style.display = 'block';
        document.getElementById('resume-button').style.display = 'none';
    }
    window.speechSynthesis.resume();
});

stopButton.addEventListener("click", function () {
    window.speechSynthesis.cancel();
    document.getElementById('play-button').style.display = 'block';
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('resume-button').style.display = 'none';
});
