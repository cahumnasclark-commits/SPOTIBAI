/* =========================================
   SPOTIBAI MUSIC DATA
========================================= */

const songs = [

    {
        title: "BILAT",
        artist: "Tagalog vs Bisaya",
        file: "bisaya-final-boss.mp3",

        cover: "BILAT",
        coverImage: "bisaya-meme.jpg?v=2",

        color: "linear-gradient(135deg, #ff0055, #5c001f)",

        verseDurations: [12, 12, 5, 6],
        remainingVerseDuration: 4,

        /*
         * Put your lyrics here.
         * Each line should be separated with \n
         */
        lyrics: `
Stop, wait, na minute,
The way you move, the girl, then ga the heart, oh, la la it.
And I just wanna be to you tonight.

Girl, please, I play to run, I'd true,
But the games, the changes to you.
I wanna say what to do,
Gonna sweep for real.

This we Nana Free,
Amimi na for long,
So the Deadpool, the peel.

Oooh, your smile, my type,
Everything so right,
And I just wanna chill.

And a Deadpool wanna hear,
And a Deadpool na hee.

HAH HUH HUH HUUUHHHHH AHHHH!

She's right too,
But I want you.

HAA HUH HUH HUHHH AHH!

Cheese wine too,
But I you, ohhh.

        `
    },

    {
        title: "Sinaunang Busseng",
        artist: "Tagalog vs Bisaya",
        file: "sinaunang-busseng.mp3",

        cover: "BI",

        color: "linear-gradient(135deg, #7c4dff, #21005e)",

        lyrics: `
Add your Sinaunang Busseng lyrics here.

Line 1
Line 2
Line 3
Line 4
        `
    },

    {
        title: "Owshie Tangalog",
        artist: "Tagalog vs Bisaya",
        file: "owshie-tangalog.mp3",

        cover: "BI",

        color: "linear-gradient(135deg, #00bcd4, #003c45)",

        lyrics: `
Add your Owshie Tangalog lyrics here.

Line 1
Line 2
Line 3
Line 4
        `
    }

];


/* =========================================
   ELEMENTS
========================================= */

const audio = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");

const previousButton =
    document.getElementById("previousButton") ||
    document.getElementById("previousBtn");

const nextButton =
    document.getElementById("nextButton") ||
    document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const volumeBar =
    document.getElementById("volumeBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration") ||
    document.getElementById("totalTime");

const playerSongTitle =
    document.getElementById("playerSongTitle") ||
    document.getElementById("playerTitle");

const playerArtist =
    document.getElementById("playerArtist");

const playerCover =
    document.getElementById("playerCover") ||
    document.getElementById("playerArt");

const likeButton =
    document.getElementById("likeButton");

const shuffleButton =
    document.getElementById("shuffleButton");

const repeatButton =
    document.getElementById("repeatButton");

const volumeControl =
    document.getElementById("volumeBar") ||
    document.getElementById("volume");


let currentSongIndex = 0;
let isPlaying = false;
let likedSongs = JSON.parse(
    localStorage.getItem("spotibai-liked-songs") || "[]"
);
let shuffleEnabled = false;
let repeatEnabled = false;
let lyricPhrases = [];


/* =========================================
   PAGE NAVIGATION
========================================= */

const navButtons =
    document.querySelectorAll(".nav-btn, .nav-item");

const pages = {
    home: document.getElementById("homePage"),
    search: document.getElementById("searchPage"),
    library: document.getElementById("libraryPage"),
    likedSongs: document.getElementById("likedSongsPage"),
    lyrics: document.getElementById("lyricsPage"),
    premium: document.getElementById("premiumPage")
};


navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pageName =
            button.dataset.page;

        showPage(pageName);

        if (pageName === "library") {
            renderLikedSongs();
        }

        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});


document
    .getElementById("premiumButton")
    .addEventListener("click", () => {
        showPage("premium");
    });


document
    .getElementById("backFromPremium")
    .addEventListener("click", () => {
        showPage("home");
    });


document
    .getElementById("likedSongsCard")
    .addEventListener("click", () => {
        renderLikedSongs();
        showPage("likedSongs");
    });


document
    .getElementById("backFromLikedSongs")
    .addEventListener("click", () => {
        showPage("library");
    });


function showPage(pageName) {

    Object.values(pages).forEach(page => {
        if (!page) return;
        page.classList.remove("active", "active-page");
    });

    if (!pages[pageName]) return;

    pages[pageName].classList.add("active", "active-page");

}


/* =========================================
   CREATE SONG CARDS
========================================= */

function renderSongs() {

    const container =
        document.getElementById("memeSongs");

    container.innerHTML = "";

    songs.forEach((song, index) => {

        const card =
            document.createElement("div");

        card.className = "meme-song";

        card.innerHTML = `

            <div
                class="meme-cover"
                style="background:${song.color}"
            >
                ${song.coverImage
                    ? `<img class="cover-image" src="${song.coverImage}" alt="${song.title} cover">`
                    : song.cover}
            </div>

            <div class="meme-info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>

            <button class="meme-play">
                ▶
            </button>

        `;


        /*
         * Clicking anywhere on the song
         * opens the lyrics page.
         */
        card.addEventListener("click", () => {

            playSong(index);

            openLyrics(index);

        });


        container.appendChild(card);

    });

}


function renderLikedSongs() {

    const container =
        document.getElementById("likedSongsGrid");

    if (!container) return;

    container.innerHTML = "";

    document
        .getElementById("emptyLikedSongs")
        .classList.toggle("hidden", likedSongs.length > 0);

    likedSongs.forEach(index => {

        const song = songs[index];

        if (!song) return;

        const card = document.createElement("article");
        card.className = "music-card liked-song-card";
        card.innerHTML = `
            <div class="album-art" style="background:${song.color}">
                ${song.coverImage
                    ? `<img class="cover-image" src="${song.coverImage}" alt="${song.title} cover">`
                    : song.cover}
            </div>
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;

        card.addEventListener("click", () => {
            playSong(index);
            openLyrics(index);
        });

        container.appendChild(card);

    });

}


/* =========================================
   POPULAR SONG TABLE
========================================= */

function renderSongTable() {

    const table =
        document.getElementById("songTable");

    if (!table) return;

    table.innerHTML = "";

    songs.forEach((song, index) => {

        const row =
            document.createElement("div");

        row.className = "song-row";

        row.innerHTML = `

            <div class="song-number">
                ${index + 1}
            </div>

            <div class="song-details">

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

            </div>

            <div class="song-duration">
                •••
            </div>

        `;


        row.addEventListener("click", () => {

            playSong(index);

            openLyrics(index);

        });


        table.appendChild(row);

    });

}


/* =========================================
   PLAY SONG
========================================= */

function playSong(index) {

    currentSongIndex = index;

    const song = songs[index];

    audio.src = song.file;

    audio.load();

    audio.play()
        .then(() => {

            isPlaying = true;

            updatePlayer();

        })
        .catch(error => {

            console.log("Audio error:", error);

            /*
             * Browser may block playback if
             * the file doesn't exist.
             */
            alert(
                "Music file could not be played. Check your music folder and filename."
            );

        });


    updatePlayer();

}


/* =========================================
   UPDATE PLAYER
========================================= */

function updatePlayer() {

    const song =
        songs[currentSongIndex];

    playerSongTitle.textContent =
        song.title;

    playerArtist.textContent =
        song.artist;

    playerCover.style.background =
        song.color;
    playerCover.style.backgroundImage = song.coverImage
        ? `none`
        : "none";
    playerCover.innerHTML = song.coverImage
        ? `<img src="${song.coverImage}" alt="${song.title} cover">`
        : song.cover;

    const liked = likedSongs.includes(currentSongIndex);
    likeButton.textContent = liked ? "♥" : "♡";
    likeButton.classList.toggle("liked", liked);

    if (isPlaying) {

        playButton.textContent = "❚❚";

    } else {

        playButton.textContent = "▶";

    }

}


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener("click", () => {

    if (!audio.src) {

        playSong(0);

        return;

    }


    if (audio.paused) {

        audio.play();

        isPlaying = true;

    } else {

        audio.pause();

        isPlaying = false;

    }

    updatePlayer();

});


/* =========================================
   NEXT SONG
========================================= */

nextButton.addEventListener("click", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    playSong(currentSongIndex);

});


/* =========================================
   PREVIOUS SONG
========================================= */

previousButton.addEventListener("click", () => {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    playSong(currentSongIndex);

});


shuffleButton.addEventListener("click", () => {

    shuffleEnabled = !shuffleEnabled;
    shuffleButton.classList.toggle("active-control", shuffleEnabled);

});


repeatButton.addEventListener("click", () => {

    repeatEnabled = !repeatEnabled;
    repeatButton.classList.toggle("active-control", repeatEnabled);

});


/* =========================================
   AUTO NEXT
========================================= */

audio.addEventListener("ended", () => {

    if (repeatEnabled) {
        audio.currentTime = 0;
        audio.play();
        return;
    }

    if (shuffleEnabled) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
    }

    playSong(currentSongIndex);

});


/* =========================================
   AUDIO TIME
========================================= */

audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progress =
        (audio.currentTime / audio.duration) * 100;

    const progressFill =
        document.getElementById("progressFill");

    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }

    currentTime.textContent =
        formatTime(audio.currentTime);

    updateLyricsHighlight();

});


/* =========================================
   SEEK
========================================= */

progressBar.addEventListener("click", event => {

    if (!audio.duration) return;

    const bounds = progressBar.getBoundingClientRect();
    const progress = Math.max(
        0,
        Math.min(1, (event.clientX - bounds.left) / bounds.width)
    );

    audio.currentTime = progress * audio.duration;

});


/* =========================================
   VOLUME
========================================= */

volumeControl.addEventListener("input", () => {

    audio.volume =
        Number(volumeControl.value) > 1
            ? Number(volumeControl.value) / 100
            : volumeControl.value;

});


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${secs
        .toString()
        .padStart(2, "0")}`;

}


/* =========================================
   OPEN LYRICS
========================================= */

function openLyrics(index) {

    const song = songs[index];

    document.getElementById("lyricsTitle")
        .textContent = song.title;

    document.getElementById("lyricsArtist")
        .textContent = song.artist;

    const cover =
        document.getElementById("lyricsCover");

    cover.style.background = song.color;
    cover.style.backgroundImage = "none";
    cover.innerHTML = song.coverImage
        ? `<img src="${song.coverImage}" alt="${song.title} cover">`
        : song.cover;


    /*
     * Display lyrics
     */
    const lyricsText =
        document.getElementById("lyricsText");

    lyricsText.innerHTML = "";
    lyricPhrases = [];

    let currentPhrase = [];

    song.lyrics.trim().split("\n").forEach(line => {

        const lyricLine = line.trim();

        if (!lyricLine) {
            if (currentPhrase.length) {
                lyricPhrases.push(currentPhrase);
                currentPhrase = [];
            }

            const spacer = document.createElement("span");
            spacer.className = "lyrics-spacer";
            spacer.setAttribute("aria-hidden", "true");
            lyricsText.appendChild(spacer);
            return;
        }

        const lineElement = document.createElement("span");
        lineElement.className = "lyrics-line";
        lineElement.textContent = lyricLine;
        lyricsText.appendChild(lineElement);
        currentPhrase.push(lineElement);

    });

    if (currentPhrase.length) {
        lyricPhrases.push(currentPhrase);
    }

    updateLyricsHighlight();


    /*
     * Switch to lyrics page
     */
    showPage("lyrics");


    /*
     * Remove active state from sidebar
     */
    navButtons.forEach(button => {
        button.classList.remove("active");
    });

}


function updateLyricsHighlight() {

    if (!lyricPhrases.length) return;

    const song = songs[currentSongIndex];
    const verseDurations = song.verseDurations || [];
    const remainingVerseDuration = song.remainingVerseDuration || 12;
    let elapsedTime = 0;
    let activePhraseIndex = lyricPhrases.length - 1;

    for (let index = 0; index < lyricPhrases.length; index++) {
        const verseDuration =
            verseDurations[index] || remainingVerseDuration;

        if (audio.currentTime < elapsedTime + verseDuration) {
            activePhraseIndex = index;
            break;
        }

        elapsedTime += verseDuration;
    }

    activePhraseIndex = Math.min(
        lyricPhrases.length - 1,
        activePhraseIndex
    );

    lyricPhrases.forEach((phrase, phraseIndex) => {
        phrase.forEach(line => {
            line.classList.toggle(
                "active-line",
                phraseIndex === activePhraseIndex
            );
            line.classList.toggle(
                "previous-line",
                phraseIndex < activePhraseIndex
            );
        });
    });

}


/* =========================================
   BACK FROM LYRICS
========================================= */

document
    .getElementById("backFromLyrics")
    .addEventListener("click", () => {

        showPage("home");

        document
            .querySelector('[data-page="home"]')
            .classList.add("active");

    });


/* =========================================
   PLAYER SONG TITLE → LYRICS
========================================= */

playerSongTitle.addEventListener("click", () => {

    if (!audio.src) return;

    openLyrics(currentSongIndex);

});


/* =========================================
   LIKE BUTTON
========================================= */

likeButton.addEventListener("click", () => {

    const songIndex = currentSongIndex;
    const likedIndex = likedSongs.indexOf(songIndex);

    if (likedIndex === -1) {

        likedSongs.push(songIndex);

    } else {

        likedSongs.splice(likedIndex, 1);

    }

    localStorage.setItem(
        "spotibai-liked-songs",
        JSON.stringify(likedSongs)
    );

    updatePlayer();
    renderLikedSongs();

});


/* =========================================
   HERO PLAY
========================================= */

document
    .getElementById("heroPlay")
    .addEventListener("click", () => {

        playSong(0);

    });


/* =========================================
   SEARCH
========================================= */

const searchInput =
    document.getElementById("searchInput") ||
    document.getElementById("bigSearchInput");

const searchResults =
    document.getElementById("searchResults");


searchInput.addEventListener("input", () => {

    const query =
        searchInput.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (!query) return;


    songs.forEach((song, index) => {

        if (
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        ) {

            const result =
                document.createElement("div");

            result.className = "meme-song";

            result.innerHTML = `

                <div
                    class="meme-cover"
                    style="background:${song.color}"
                >
                    ${song.cover}
                </div>

                <div class="meme-info">

                    <h3>${song.title}</h3>

                    <p>${song.artist}</p>

                </div>

            `;


            result.addEventListener("click", () => {

                playSong(index);

                openLyrics(index);

            });


            searchResults.appendChild(result);

        }

    });

});


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", event => {

    /*
     * Space = play/pause
     */
    if (
        event.code === "Space" &&
        event.target.tagName !== "INPUT"
    ) {

        event.preventDefault();

        playButton.click();

    }


    /*
     * Arrow right = next
     */
    if (event.code === "ArrowRight") {

        nextButton.click();

    }


    /*
     * Arrow left = previous
     */
    if (event.code === "ArrowLeft") {

        previousButton.click();

    }

});


/* =========================================
   INITIALIZE
========================================= */

renderSongs();

renderSongTable();

renderLikedSongs();

updatePlayer();
