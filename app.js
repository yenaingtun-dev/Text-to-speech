let textArea = document.getElementById("text");
let speakButton = document.getElementById("play-button");
let pauseButton = document.getElementById("pause-button");
let resumeButton = document.getElementById("resume-button");
let stopButton = document.getElementById("stop-button");
let arr = window.speechSynthesis.getVoices();
let options = "";
let selected = "";

arr.map((op, i) => {
    options += `<option value="${op}" id="${i}"">${op.name}</option>`;
})
console.log(arr);
document.getElementById("voices").innerHTML = options;
const selectOption = document.querySelector("#voices");

let text = textArea.value;
let utterance = new SpeechSynthesisUtterance();
utterance.text = text;
utterance.voice = window.speechSynthesis.getVoices()[selectOption.selectedIndex];
// utterance.lang = "fr-FR";

speakButton.addEventListener("click", function () {
    if ( 'speechSynthesis' in window ) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        document.getElementById('play-button').style.display = 'none';
        document.getElementById('pause-button').style.display = 'block';
    } else {
        alert('not working on ur browser!');
    }
});

pauseButton.addEventListener("click", function () {
    if ( 'speechSynthesis' in window ) {
        window.speechSynthesis.pause();
        document.getElementById('pause-button').style.display = 'none';
        document.getElementById('resume-button').style.display = 'block';
    } else {
        alert('not working..');
    }
});

resumeButton.addEventListener("click", function () {
    if ( 'speechSynthesis' in window ) {
        window.speechSynthesis.resume();
        document.getElementById('pause-button').style.display = 'block';
        document.getElementById('resume-button').style.display = 'none';
    } else {
        alert('not working...');
    }
});

stopButton.addEventListener("click", function () {
    window.speechSynthesis.cancel();
    document.getElementById('play-button').style.display = 'block';
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('resume-button').style.display = 'none';
});
