document.addEventListener('DOMContentLoaded', () => {
    
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const muteBtn = document.getElementById('muteBtn');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');

    let previousVolume = 0.7;
    let isMuted = false;

    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    playBtn.addEventListener('click', () => {
        audio.play();
    });

    pauseBtn.addEventListener('click', () => {
        audio.pause();
    });

    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
    });

    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        audio.volume = volume;
        volumeValue.textContent = Math.round(volume * 100) + '%';

        if (volume > 0) {
            isMuted = false;
            muteBtn.textContent = '🔊 Mute';
        }
    });

    muteBtn.addEventListener('click', () => {
        if (!isMuted) {

            previousVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
            volumeValue.textContent = '0%';
            muteBtn.textContent = '🔇 Unmute';
            isMuted = true;
        } 
        
        else {
            audio.volume = previousVolume;
            volumeSlider.value = previousVolume;
            volumeValue.textContent = Math.round(previousVolume * 100) + '%';
            muteBtn.textContent = '🔊 Mute';
            isMuted = false;
        }
    });

    audio.addEventListener('timeupdate', () => {
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
    });

    audio.volume = 0.7;

});