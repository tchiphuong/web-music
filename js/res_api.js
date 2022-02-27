var listSong = [];
$(document).ready(function () {
    var songCode = 0;
    $.ajax({
        url: "https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        $("#vn_songs").empty();
        $("#m_category").empty();
        $("#category").empty();
        $("#ca_songs").empty();
        for (let i = 0; i < Object.keys(response.songs.top100_VN).length; i++) {
            $("#vn_songs").append(
                `
                <div class="flex flex-col w-full my-3 pt-16" id="` + response.songs.top100_VN[i].name + `">
                    <div class="font-bold my-2 py-1 px-2 text-lg border-l-4 border-yellow-500 uppercase">` + response.songs.top100_VN[i].name + `</div>
                    <div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2" id="vn` + i + `">
                        
                    </div>
                </div>
                `
            );
            $("#m_category").append(`<li class="my-1 overflow-hidden rounded-md"><a class="block p-3 bg-gray-200" href="#` + response.songs.top100_VN[i].name + `">` + response.songs.top100_VN[i].name + `</a></li>`);
            $("#category").append(`<li><a class="block px-6 py-3 text-white hover:bg-yellow-400 hover:opacity-80" href="#` + response.songs.top100_VN[i].name + `">` + response.songs.top100_VN[i].name + `</a></li>`)
            for (let j = 0; j < Object.keys(response.songs.top100_VN[i].songs).length; j++) {
                listSong.push(response.songs.top100_VN[i].songs[j])
                listSong[listSong.length-1].code = songCode;
                // listSong[listSong.length-1].code = songCode.toString().padStart(6, '0');
                $(`#vn` + i).append(
                    `
                    <a class="flex items-center h-16 overflow-hidden bg-white shadow-lg cursor-pointer sm:block rounded-xl sm:h-auto" onclick="play('`+ response.songs.top100_VN[i].songs[j].code + `')">
                        <div class="w-16 sm:w-auto sm:aspect-w-1 sm:aspect-h-1">
                            <img class="object-cover music-card" src="` + response.songs.top100_VN[i].songs[j].avatar + `" alt="` + response.songs.top100_VN[i].songs[j].title + `">
                        </div>
                        <div class="flex flex-col justify-center flex-grow px-3 py-1">
                            <div class="text-sm font-bold text-gray-900 line-clamp-1">` + response.songs.top100_VN[i].songs[j].title + `</div>
                            <div class="flex text-sm italic text-gray-900 drop-shadow filter md:text-sm line-clamp-1">` + response.songs.top100_VN[i].songs[j].creator + `</div>
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
                <div class="flex flex-col w-full my-3 pt-16" id="` + response.songs.top100_CA[i].name + `">
                    <div class="font-bold my-2 py-1 px-2 text-lg border-l-4 border-yellow-500 uppercase">` + response.songs.top100_CA[i].name + `</div>
                    <div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2" id="ca` + i + `">
                        
                    </div>
                </div>
                `
            );
            $("#m_category").append(`<li class="my-1 overflow-hidden rounded-md"><a class="block p-3 bg-gray-200" href="#` + response.songs.top100_CA[i].name + `">` + response.songs.top100_CA[i].name + `</a></li>`);
            $("#category").append(`<li><a class="block px-6 py-3 text-white hover:bg-yellow-400 hover:opacity-80" href="#` + response.songs.top100_CA[i].name + `">` + response.songs.top100_CA[i].name + `</a></li>`)
            for (let j = 0; j < Object.keys(response.songs.top100_CA[i].songs).length; j++) {
                listSong.push(response.songs.top100_CA[i].songs[j])
                listSong[listSong.length-1].code = songCode;
                // listSong[listSong.length-1].code = songCode.toString().padStart(6, '0');
                $(`#ca` + i).append(
                    `
                    <a class="flex items-center h-16 overflow-hidden bg-white shadow-lg cursor-pointer sm:block rounded-xl sm:h-auto" onclick="play('`+ response.songs.top100_CA[i].songs[j].code + `')">
                        <div class="w-16 sm:w-auto sm:aspect-w-1 sm:aspect-h-1">
                            <img class="object-cover music-card" src="` + response.songs.top100_CA[i].songs[j].avatar + `" alt="` + response.songs.top100_CA[i].songs[j].title + `">
                        </div>
                        <div class="flex flex-col justify-center flex-grow px-3 py-1">
                            <div class="text-sm font-bold text-gray-900 line-clamp-1">` + response.songs.top100_CA[i].songs[j].title + `</div>
                            <div class="flex text-sm italic text-gray-900 drop-shadow filter md:text-sm line-clamp-1">` + response.songs.top100_CA[i].songs[j].creator + `</div>
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
    $("#audio").prop("src", listSong[code].music);
    $(".song-thumb-playing").prop('src', listSong[code].avatar).addClass('animate-spin');
    $(".song-name-current").text(listSong[code].title)
    $(".creator-current").text(listSong[code].creator)
    $("#backdrop").css('background-image', 'url(' + listSong[code].avatar + ')');
    $("title").text(listSong[code].title + " - " + listSong[code].creator);
    console.log($("#audio").ontimeupdate)
}