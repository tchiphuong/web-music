var listSong = [];
$(document).ready(function () {
    var songCode = 0;
    $.ajax({
        url: "https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        response.songs.top100_VN.forEach(element => {
            element.songs.forEach(sub_element => {
                listSong.push(sub_element)
                listSong[listSong.length - 1].code = songCode;
                listSong[listSong.length - 1].category = element.name;
                songCode++;
            })
        });
        response.songs.top100_CA.forEach(element => {
            element.songs.forEach(sub_element => {
                listSong.push(sub_element)
                listSong[listSong.length - 1].code = songCode;
                listSong[listSong.length - 1].category = element.name;
                songCode++;
            })
        });
        response.songs.top100_AM.forEach(element => {
            element.songs.forEach(sub_element => {
                listSong.push(sub_element)
                listSong[listSong.length - 1].code = songCode;
                listSong[listSong.length - 1].category = element.name;
                songCode++;
            })
        });
        response.songs.top100_KL.forEach(element => {
            element.songs.forEach(sub_element => {
                listSong.push(sub_element)
                listSong[listSong.length - 1].code = songCode;
                listSong[listSong.length - 1].category = element.name;
                songCode++;
            })
        });
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const PlAYER_STORAGE_KEY = "F8_PLAYER";

        const player = $(".player");
        const cd = $(".cd");
        const heading = $("header h2");
        const cdThumb = $(".song-thumb-playing");
        const audio = $("#audio");
        const playBtn = $(".btn-toggle-play");
        const progress = $("#progress");
        const prevBtn = $(".btn-prev");
        const nextBtn = $(".btn-next");
        const randomBtn = $(".btn-random");
        const repeatBtn = $(".btn-repeat");
        const playlist = $("#vn");

        const app = {
            currentIndex: 0,
            isPlaying: false,
            isRandom: false,
            isRepeat: false,
            config: {},
            // (1/2) Uncomment the line below to use localStorage
            // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
            songs: listSong,
            setConfig: function (key, value) {
                this.config[key] = value;
                // (2/2) Uncomment the line below to use localStorage
                // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
            },
            render: function () {
                const htmls = this.songs.map((song, index) => {
                    return `
                        <a class="flex items-center h-16 overflow-hidden bg-white shadow-lg cursor-pointer sm:block rounded-xl sm:h-auto" onclick="play('${song.code}')">
                            <div class="w-16 sm:w-auto sm:aspect-w-1 sm:aspect-h-1">
                                <img class="object-cover music-card" src="${song.avatar}" alt="${song.title}">
                            </div>
                            <div class="flex flex-col justify-center flex-grow px-3 py-1">
                                <div class="text-sm font-bold text-gray-900 line-clamp-1">${song.title}</div>
                                <div class="flex text-sm italic text-gray-900 drop-shadow filter md:text-sm line-clamp-1">${song.creator}</div>
                            </div>
                        </a>
                    `;
                });
                playlist.innerHTML = htmls.join("");
            },
            defineProperties: function () {
                Object.defineProperty(this, "currentSong", {
                    get: function () {
                        return this.songs[this.currentIndex];
                    }
                });
            },
            handleEvents: function () {
                const _this = this;

                // Xử lý CD quay / dừng
                // Handle CD spins / stops
                const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
                    duration: 10000, // 10 seconds
                    iterations: Infinity
                });
                cdThumbAnimate.pause();

                // Xử lý phóng to / thu nhỏ CD
                // Handles CD enlargement / reduction
                document.onscroll = function () {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const newCdWidth = cdWidth - scrollTop;

                    cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
                    cd.style.opacity = newCdWidth / cdWidth;
                };

                // Xử lý khi click play
                // Handle when click play
                playBtn.onclick = function () {
                    if (_this.isPlaying) {
                        audio.pause();
                    } else {
                        audio.play();
                    }
                };

                // Khi song được play
                // When the song is played
                audio.onplay = function () {
                    _this.isPlaying = true;
                    player.classList.add("playing");
                    cdThumbAnimate.play();
                };

                // Khi song bị pause
                // When the song is pause
                audio.onpause = function () {
                    _this.isPlaying = false;
                    player.classList.remove("playing");
                    cdThumbAnimate.pause();
                };

                // Khi tiến độ bài hát thay đổi
                // When the song progress changes
                audio.ontimeupdate = function () {
                    if (audio.duration) {
                        const progressPercent = Math.floor(
                            (audio.currentTime / audio.duration) * 100
                        );
                        progress.value = progressPercent;
                    }
                };

                // Xử lý khi tua song
                // Handling when seek
                progress.onchange = function (e) {
                    const seekTime = (audio.duration / 100) * e.target.value;
                    audio.currentTime = seekTime;
                };

                // Khi next song
                // When next song
                nextBtn.onclick = function () {
                    if (_this.isRandom) {
                        _this.playRandomSong();
                    } else {
                        _this.nextSong();
                    }
                    audio.play();
                    _this.render();
                    _this.scrollToActiveSong();
                };

                // Khi prev song
                // When prev song
                prevBtn.onclick = function () {
                    if (_this.isRandom) {
                        _this.playRandomSong();
                    } else {
                        _this.prevSong();
                    }
                    audio.play();
                    _this.render();
                    _this.scrollToActiveSong();
                };

                // Xử lý bật / tắt random song
                // Handling on / off random song
                randomBtn.onclick = function (e) {
                    _this.isRandom = !_this.isRandom;
                    _this.setConfig("isRandom", _this.isRandom);
                    randomBtn.classList.toggle("bg-blue-400", _this.isRandom);
                };

                // Xử lý lặp lại một song
                // Single-parallel repeat processing
                repeatBtn.onclick = function (e) {
                    _this.isRepeat = !_this.isRepeat;
                    _this.setConfig("isRepeat", _this.isRepeat);
                    repeatBtn.classList.toggle("bg-blue-400", _this.isRepeat);
                };

                // Xử lý next song khi audio ended
                // Handle next song when audio ended
                audio.onended = function () {
                    if (_this.isRepeat) {
                        audio.play();
                    } else {
                        nextBtn.click();
                    }
                };

                // Lắng nghe hành vi click vào playlist
                // Listen to playlist clicks
                // playlist.onclick = function (e) {
                //     const songNode = e.target.closest(".song:not(.active)");

                //     if (songNode || e.target.closest(".option")) {
                //         // Xử lý khi click vào song
                //         // Handle when clicking on the song
                //         if (songNode) {
                //             _this.currentIndex = Number(songNode.dataset.index);
                //             _this.loadCurrentSong();
                //             _this.render();
                //             audio.play();
                //         }

                //         // Xử lý khi click vào song option
                //         // Handle when clicking on the song option
                //         if (e.target.closest(".option")) {
                //         }
                //     }
                // };
            },
            scrollToActiveSong: function () {
                setTimeout(() => {
                    $(".song.active").scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }, 300);
            },
            loadCurrentSong: function () {
                // heading.textContent = this.currentSong.title;
                // cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
                // audio.src = this.currentSong.path;
            },
            loadConfig: function () {
                this.isRandom = this.config.isRandom;
                this.isRepeat = this.config.isRepeat;
            },
            nextSong: function () {
                this.currentIndex++;
                if (this.currentIndex >= this.songs.length) {
                    this.currentIndex = 0;
                }
                this.loadCurrentSong();
            },
            prevSong: function () {
                this.currentIndex--;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.songs.length - 1;
                }
                this.loadCurrentSong();
            },
            playRandomSong: function () {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * this.songs.length);
                } while (newIndex === this.currentIndex);

                this.currentIndex = newIndex;
                this.loadCurrentSong();
            },
            start: function () {
                // Gán cấu hình từ config vào ứng dụng
                // Assign configuration from config to application
                this.loadConfig();

                // Định nghĩa các thuộc tính cho object
                // Defines properties for the object
                this.defineProperties();

                // Lắng nghe / xử lý các sự kiện (DOM events)
                // Listening / handling events (DOM events)
                this.handleEvents();

                // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
                // Load the first song information into the UI when running the app
                this.loadCurrentSong();

                // Render playlist
                this.render();

                // Hiển thị trạng thái ban đầu của button repeat & random
                // Display the initial state of the repeat & random button
                // randomBtn.classList.toggle("bg-gray-400", this.isRandom);
                // repeatBtn.classList.toggle("bg-gray-400", this.isRepeat);
            }
        };
        app.start();
    })
});
function play(code) {
    $("#audio").prop("src", listSong[code].music);
    $(".song-thumb-playing").prop('src', listSong[code].avatar).addClass('animate-spin');
    $(".song-name-current").text(listSong[code].title)
    $(".creator-current").text(listSong[code].creator)
    $("#backdrop").css('background-image', 'url(' + listSong[code].avatar + ')');
    $("title").text(listSong[code].title + " - " + listSong[code].creator);
    console.log($("#audio").ontimeupdate)
}



// $(function () {
// const wait = (delay = 0) =>
//     new Promise((resolve) => setTimeout(resolve, delay));
// const setVisible = (elementOrSelector, visible) =>
// ((typeof elementOrSelector === "string"
//     ? document.querySelector(elementOrSelector)
//     : elementOrSelector
// ).style.visibility = visible ? "visible" : "hidden");
// setVisible(".grid", false);
// setVisible("#loading", true);
// document.addEventListener("DOMContentLoaded", () =>
//     wait(1000).then(() => {
//         setVisible(".grid", true);
//         setVisible("#loading", false);
//     })
// );

//     $("#music-card").click(function () {
//         console.log(this)
//     })
// })
