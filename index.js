<script>
/* ════════════════════════════════
   PLAYLIST — remplace src/cover
   par tes propres fichiers locaux
════════════════════════════════ */
const PLAYLIST = [
    {
        title:  "Show Yourself",
        artist: "Mastodon - Emperor of Sand",
        src:    "./img/Show Yourself.mp3",
        cover:  "./img/Emperor_of_sand_cover.jpg"
    },
    {
        title:  "Titre 2",
        artist: "Artiste - Album",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover:  "https://picsum.photos/seed/track2/120/120"
    },
    {
        title:  "Titre 3",
        artist: "Artiste - Album",
        src:    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover:  "https://picsum.photos/seed/track3/120/120"
    }
];

/* ── DOM ── */
const audio         = document.getElementById("audio");
const playBtn       = document.getElementById("play-btn");
const prevBtn       = document.getElementById("prev-btn");
const nextBtn       = document.getElementById("next-btn");
const likeBtn       = document.getElementById("like-btn");
const progress      = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl    = document.getElementById("duration");
const titleEl       = document.getElementById("track-title");
const artistEl      = document.getElementById("track-artist");
const coverImg      = document.getElementById("cover-img");

/* ── État ── */
let trackIndex = 0;
let liked      = false;
let isSeeking  = false;

/* ── Helpers ── */
function fmt(t) {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
}

/* ── Charger un titre ── */
function loadTrack(index, autoplay = false) {
    const t = PLAYLIST[index];
    titleEl.textContent       = t.title;
    artistEl.textContent      = t.artist;
    coverImg.src              = t.cover;
    coverImg.alt              = t.title;
    audio.src                 = t.src;
    progress.value            = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent    = "0:00";
    audio.load();
    if (autoplay) audio.play().catch(() => {});
}

/* Charge le 1er titre au démarrage */
loadTrack(trackIndex);

/* ── Play / Pause ── */
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play().catch(err => console.warn("Lecture impossible :", err));
    } else {
        audio.pause();
    }
});

audio.addEventListener("play",  () => { playBtn.textContent = "⏸"; });
audio.addEventListener("pause", () => { playBtn.textContent = "▶"; });

/* ── Fin de piste → suivant auto ── */
audio.addEventListener("ended", () => {
    trackIndex = (trackIndex + 1) % PLAYLIST.length;
    loadTrack(trackIndex, true);
});

/* ── Barre de progression ── */
audio.addEventListener("timeupdate", () => {
    if (!isSeeking && audio.duration) {
        progress.value            = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = fmt(audio.currentTime);
    }
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = fmt(audio.duration);
});

progress.addEventListener("mousedown",  () => { isSeeking = true; });
progress.addEventListener("touchstart", () => { isSeeking = true; });
progress.addEventListener("input", () => {
    if (audio.duration)
        currentTimeEl.textContent = fmt((progress.value / 100) * audio.duration);
});
progress.addEventListener("change", () => {
    if (audio.duration)
        audio.currentTime = (progress.value / 100) * audio.duration;
    isSeeking = false;
});

/* ── Précédent ── */
prevBtn.addEventListener("click", () => {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        trackIndex = (trackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
        loadTrack(trackIndex, !audio.paused);
    }
});

/* ── Suivant ── */
nextBtn.addEventListener("click", () => {
    trackIndex = (trackIndex + 1) % PLAYLIST.length;
    loadTrack(trackIndex, !audio.paused);
});

/* ── Like ── */
likeBtn.addEventListener("click", () => {
    liked = !liked;
    likeBtn.textContent = liked ? "♥" : "♡";
    likeBtn.style.color = liked ? "#e74c3c" : "";
});

/* ── Raccourcis clavier ── */
document.addEventListener("keydown", e => {
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    if (e.code === "Space")      { e.preventDefault(); playBtn.click(); }
    if (e.code === "ArrowRight") { audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); }
    if (e.code === "ArrowLeft")  { audio.currentTime = Math.max(0, audio.currentTime - 5); }
    if (e.code === "ArrowUp")    { e.preventDefault(); nextBtn.click(); }
    if (e.code === "ArrowDown")  { e.preventDefault(); prevBtn.click(); }
});
</script>