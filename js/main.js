var listSong = [];
$(document).ready(function () {
    var songCode = 0;
    $.ajax({
        url: "https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        $("#vn_songs").empty();
        $("#ca_songs").empty();
        for (let i = 0; i < Object.keys(response.songs.top100_VN).length; i++) {
            $("#vn_songs").append(
                `
                <div class="flex flex-col w-full my-3">
                    <div class="font-bold my-2 py-1 px-2 text-lg border-l-4 border-yellow-500 uppercase">` + response.songs.top100_VN[i].name + `</div>
                    <div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2" id="vn` + i + `">
                        
                    </div>
                </div>
                `
            );

            for (let j = 0; j < Object.keys(response.songs.top100_VN[i].songs).length; j++) {
                listSong.push(response.songs.top100_VN[i].songs[j])
                listSong[listSong.length-1].code = songCode;
                // listSong[listSong.length-1].code = songCode.toString().padStart(6, '0');
                $(`#vn` + i).append(
                    `
                        <a class="aspect-w-3 aspect-h-4 rounded-xl shadow-lg overflow-hidden cursor-pointer" onclick="play('`+ response.songs.top100_VN[i].songs[j].code + `')">
                            <img class="object-cover music-card" src="` + response.songs.top100_VN[i].songs[j].avatar + `" alt="` + response.songs.top100_VN[i].songs[j].title + `">
                            <div class="absolute bg-white inset-x-0 top-3/4 flex justify-center h-1/4">
                                <div class="flex flex-col justify-center py-2 xl:px-4 px-2 flex-grow w-full">
                                    <div class="font-bold text-gray-900 text-xs md:text-base line-clamp-1">` + response.songs.top100_VN[i].songs[j].title + `</div>
                                    <div class="flex italic drop-shadow filter text-gray-900 text-xs md:text-base line-clamp-1">` + response.songs.top100_VN[i].songs[j].creator + `</div>
                                </div>
                            </div>
                        </a>
                    `
                );
                songCode++;
            }
        }

        for (let i = 0; i < Object.keys(response.songs.top100_CA).length; i++) {
            $("#ca_songs").append(
                `
                <div class="flex flex-col w-full my-3">
                    <div class="font-bold my-2 py-1 px-2 text-lg border-l-4 border-yellow-500 uppercase">` + response.songs.top100_CA[i].name + `</div>
                    <div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2" id="ca` + i + `">
                        
                    </div>
                </div>
                `
            );

            for (let j = 0; j < Object.keys(response.songs.top100_CA[i].songs).length; j++) {
                listSong.push(response.songs.top100_CA[i].songs[j])
                listSong[listSong.length-1].code = songCode;
                // listSong[listSong.length-1].code = songCode.toString().padStart(6, '0');
                $(`#ca` + i).append(
                    `
                        <a class="aspect-w-3 aspect-h-4 rounded-xl shadow-lg overflow-hidden cursor-pointer" onclick="play('`+ response.songs.top100_CA[i].songs[j].code + `')">
                            <img class="object-cover" src="` + response.songs.top100_CA[i].songs[j].avatar + `" alt="` + response.songs.top100_CA[i].songs[j].title + `">
                            <div class="absolute bg-white inset-x-0 top-3/4 flex justify-center h-1/4">
                                <div class="flex flex-col justify-center py-2 xl:px-4 px-2 flex-grow w-full">
                                    <div class="font-bold text-gray-900 text-xs md:text-base line-clamp-1">` + response.songs.top100_CA[i].songs[j].title + `</div>
                                    <div class="flex italic drop-shadow filter text-gray-900 text-xs md:text-base line-clamp-1">` + response.songs.top100_CA[i].songs[j].creator + `</div>
                                </div>
                            </div>
                        </a>
                    `
                );
                songCode++;
            }
        }
    })
});

function play(code) {
    $("#mp3-audio").prop("src", listSong[code].music);
    $(".song-thumb-playing").prop('src', listSong[code].avatar).addClass('animate-spin');
    $(".song-name-current").text(listSong[code].title)
    $(".creator-current").text(listSong[code].creator)
    $("#backdrop").css('background-image', 'url('+listSong[code].avatar+')');
}

$(function () {
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

    $("#music-card").click(function () {
        console.log(this)
    })
})
