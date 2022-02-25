$(document).ready(function () {
    $.ajax({
        url: "https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST",
        dataType: "json",
        type: "GET",
    }).done(function (response) {
        $("#vn_songs").empty();
        $("#ca_songs").empty();
        for (let i = 0; i < Object.keys(response['songs']['top100_VN']).length; i++) {
            $("#vn_songs").append(
                `
                <div class="flex flex-col w-full my-3">
                    <div class="font-bold my-2 py-1 px-2 text-lg border-l-4 border-yellow-500 uppercase">` + response['songs']['top100_VN'][i]['name'] + `</div>
                    <div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2" id="vn` + i + `">
                        
                    </div>
                </div>
                `
            );

            for (let j = 0; j < Object.keys(response['songs']['top100_VN'][i]["songs"]).length; j++) {
                $(`#vn` + i).append(
                    `
                        <a class="aspect-w-3 aspect-h-4 rounded-xl shadow-lg overflow-hidden cursor-pointer" onclick="play('`+ response['songs']['top100_VN'][i]["songs"][j]["music"] + `')">
                            <img class="object-cover" src="` + response['songs']['top100_VN'][i]["songs"][j]["avatar"] + `" alt="` + response['songs']['top100_VN'][i]["songs"][j]["title"] + `">
                            <div class="absolute bg-white inset-x-0 top-3/4 flex justify-center h-1/4">
                                <div class="flex flex-col justify-center py-3 md:px-4 p-1 flex-grow w-full">
                                    <div class="font-bold text-gray-900 text-xs md:text-base lg:text-lg line-clamp-1">` + response['songs']['top100_VN'][i]["songs"][j]["title"] + `</div>
                                    <div class="flex italic drop-shadow filter text-gray-900 text-xs md:text-base line-clamp-1">` + response['songs']['top100_VN'][i]["songs"][j]["creator"] + `</div>
                                </div>
                            </div>
                        </a>
                    `
                );
            }
        }

        for (let i = 0; i < Object.keys(response['songs']['top100_CA']).length; i++) {
            $("#ca_songs").append(
                `
                <div class="flex flex-col w-full my-3">
                    <div class="font-bold my-2 py-1 px-2 text-lg border-l-4 border-yellow-500 uppercase">` + response['songs']['top100_CA'][i]['name'] + `</div>
                    <div class="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2" id="ca` + i + `">
                        
                    </div>
                </div>
                `
            );

            for (let j = 0; j < Object.keys(response['songs']['top100_CA'][i]["songs"]).length; j++) {
                $(`#ca` + i).append(
                    `
                        <a class="aspect-w-3 aspect-h-4 rounded-xl shadow-lg overflow-hidden cursor-pointer" onclick="play('`+ response['songs']['top100_CA'][i]["songs"][j]["music"] + `')">
                            <img class="object-cover" src="` + response['songs']['top100_CA'][i]["songs"][j]["avatar"] + `" alt="` + response['songs']['top100_CA'][i]["songs"][j]["title"] + `">
                            <div class="absolute bg-white inset-x-0 top-3/4 flex justify-center h-1/4">
                                <div class="flex flex-col justify-center py-3 md:px-4p-1 flex-grow w-full">
                                    <div class="font-bold text-gray-900 text-xs md:text-base lg:text-lg line-clamp-1">` + response['songs']['top100_CA'][i]["songs"][j]["title"] + `</div>
                                    <div class="flex italic drop-shadow filter text-gray-900 text-xs md:text-base line-clamp-1">` + response['songs']['top100_CA'][i]["songs"][j]["creator"] + `</div>
                                </div>
                            </div>
                        </a>
                    `
                );
            }
        }
    })
});


$(function () {
    const wait = (delay = 0) =>
        new Promise((resolve) => setTimeout(resolve, delay));
    const setVisible = (elementOrSelector, visible) =>
    ((typeof elementOrSelector === "string"
        ? document.querySelector(elementOrSelector)
        : elementOrSelector
    ).style.visibility = visible ? "visible" : "hidden");
    setVisible(".grid", false);
    setVisible("#loading", true);
    document.addEventListener("DOMContentLoaded", () =>
        wait(1000).then(() => {
            setVisible(".grid", true);
            setVisible("#loading", false);
        })
    );
})
function play(link) {
    $("#mp3-audio").prop("src", link);
    console.log(link)
}