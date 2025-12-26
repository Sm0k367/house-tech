const playPauseBtn = document.getElementById('play-pause-btn');
const audio = document.getElementById('audio');
const progress = document.querySelector('.progress');
const timeline = document.querySelector('.timeline');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const lyricsText = document.getElementById('lyrics-text');

const lyrics = [
    { time: 0, text: "The track begins with a filtered, atmospheric pad, creating a sense of anticipation." },
    { time: 16, text: "The four-on-the-floor kick drum enters, but it's heavily low-pass filtered." },
    { time: 32, text: "The filter on the kick drum gradually opens up, revealing its punchy transient and warm low-end." },
    { time: 48, text: "A massive tension-building riser begins, featuring a white-noise sweep." },
    { time: 63, text: "The riser reaches its peak. The snare roll becomes a rapid-fire burst of energy." },
    { time: 78, text: "The drop hits with full force. The kick drum is now at full power." },
    { time: 108, text: "The euphoric, wide stereo lead hook enters, with its portamento slides." },
    { time: 138, text: "The kick drum and bassline drop out, leaving the atmospheric pads." },
    { time: 168, text: "A new riser begins, this time more subtle and melodic." },
    { time: 184, text: "The kick drum re-enters, again with a low-pass filter." },
    { time: 199, text: "The riser intensifies, with a faster snare roll and a more aggressive white-noise sweep." },
    { time: 214, text: "The second drop is even more explosive than the first." },
    { time: 244, text: "The track reaches its peak. The festival crowd ad-libs are at their most intense." },
    { time: 274, text: "The track begins to deconstruct. The lead hook and synth stabs fade out." },
    { time: 288, text: "The kick drum and bassline drop out, leaving only the tribal percussion loop and the atmospheric pad." }
];

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
});

audio.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const currentLyric = lyrics.find((lyric, index) => {
        const nextLyric = lyrics[index + 1];
        return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
    });

    if (currentLyric) {
        lyricsText.textContent = currentLyric.text;
    }
});

audio.addEventListener('loadedmetadata', () => {
    const { duration } = audio;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    totalTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

timeline.addEventListener('click', (e) => {
    const { duration } = audio;
    const clickX = e.offsetX;
    const width = timeline.clientWidth;
    audio.currentTime = (clickX / width) * duration;
});
