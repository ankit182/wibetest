function addVid(vid_id, p_id) {
    // console.log("trip");
    // if (top_played_ids[id] != 1) {

    // var vid = document.createElement("div");
    // vid.id = "wibe-head-" + id + "-vid-" + num;
    // vid.className = "wibe-top-video";
    // $("#"+p_id).html(vid);

    // top_played_ids[id] = 1;
    $("#" + p_id).html('<iframe class="' + p_id + '-vid" width="92%" height="300px" src="https://www.youtube.com/embed/' + vid_id + '?autoplay=1" frameborder="0" allowfullscreen></iframe>');

    // function onYouTubeIframeAPIReady() {
    //     // // console.log('wibe-top-vid' + arg.data.id);
    //     top_player = new YT.Player('wibe-top-vid', {
    //         height: '100%',
    //         width: '100%',
    //         videoId: arg,
    //         events: {
    //             'onReady': onPlayerReady
    //         }
    //     });
    // }
    // while ($("#YT-API-load").text() == "1") {}
    // onYouTubeIframeAPIReady();

    // function onPlayerReady(event) {
    //     event.target.playVideo();
    // }
    // }
}
