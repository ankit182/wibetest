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

function get_trending_topics() {
    var URL = '/trending/'
    $.getJSON(URL, function(data) {
        for (i=0; i<10; i++) {
            var box = $("#tr-box-schema-" + i);
            var link_url = data[i][0].split(' ').join('-');
            box.find('.tr-box').attr('href', '/wibe/'+link_url);
            box.find('.tr-img').attr('style', 'background-image: url("/static/images/' + data[i][1] + '")');
            box.find('.tr-title').attr('title', data[i][0]);
            box.find('.tr-title').text(data[i][0].split(" ").splice(0,3).join(" "));
        }
    });
}

function get_desc(vid_id, box_id) {
    var URL = "https://gdata.youtube.com/feeds/api/videos/" + vid_id + "?v=2&alt=json";
    // Ajax request to the URL & Parsing content
    var desc_box = $('#' + box_id).children('p');
    $.getJSON(URL, function(data) {
        var desc = data.entry.media$group.media$description.$t;
        desc_box.text(desc);
    });
}

function showButtons(flag) {
    var fb = document.getElementById('share-fb');
    var twitter = document.getElementById('share-twitter');
    var gplus = document.getElementById('share-gplus');
    var rot_share = document.getElementById('rotate-share');
    var share_fb = document.getElementById('share-fb-fadein');
    var share_twitter = document.getElementById('share-twitter-fadein');
    var share_gplus = document.getElementById('share-gplus-fadein');
    var share = document.getElementById('share');

    flag = typeof flag !== 'undefined' ? flag : 'show';

    if (flag == 'hide') {
        rot_share.direction = 'reverse';
        share_fb.direction = 'reverse';
        share_twitter.direction = 'reverse';
        share_gplus.direction = 'reverse';
        // share_fb.fill = 'backwards';
        // share_twitter.fill = 'backwards';
        // share_gplus.fill = 'backwards';
        share_gplus.duration = 500;
        if (share_flag == 0)
            return;
    } else if (share_flag == 1)
        return;
    else {
        rot_share.direction = 'normal';
        share_fb.direction = 'normal';
        share_twitter.direction = 'normal';
        share_gplus.direction = 'normal';
    }

    fb.style.visibility = 'visible';
    twitter.style.visibility = 'visible';
    gplus.style.visibility = 'visible';

    rot_share.target = share;
    rot_share.play();

    share_fb.target = fb;
    share_fb.play();

    share_twitter.target = twitter;
    share_twitter.play();

    share_gplus.target = gplus;
    share_gplus.play();
}

function showRecPanel() {
    var content_box = document.getElementById('content-box');
    var panel_anim = document.getElementById('content-box-expand');
    var rec_panel = document.getElementById('rec-panel')

    if (rec_flag == 0) {
        panel_anim.direction = 'normal';
        rec_panel.drawerWidth = '0%';
        rec_flag = 1;
    } else {
        panel_anim.direction = 'reverse';
        rec_panel.drawerWidth = '100%';
        rec_flag = 0;
    }

    panel_anim.target = content_box;
    panel_anim.play();
}

function openBox() {
    $("#more-box").show();
}

function sharePage(site) {
    var pg_url = window.location;
    var url_words = pg_url.pathname.split('/');
    var pg_title = url_words[url_words.length - 2];
    if (site == 'fb') {
        share_url = "https://www.facebook.com/dialog/feed?app_id=537578026331001&display=popup&redirect_uri=" + pg_url + "&link=" + pg_url;
    } else if (site == 'twitter') {
        share_url = "http://twitter.com/home?status=Explore Wibe, Get Information Deeply" + pg_url
    } else {
        share_url = "https://plus.google.com/share?url=" + pg_url
    }
    window.open(share_url);
}

function slider(but_id) {
    if (but_id.split("-")[0] == '#summary') {
        if (but_id.split("-")[1] == 'left') {
            slider_pos = $(but_id).siblings("#slider-pos").text();
            new_pos = (parseInt(slider_pos) - 1);
            // console.log(new_pos)
            $(but_id).siblings("#sum-video-" + slider_pos).hide();
            $(but_id).siblings("#sum-video-" + new_pos).show();
            $(but_id).siblings("#slider-pos").text(new_pos);
            but_right = but_id.split("-")[0] + "-right";
            $(but_right).show();
            if (new_pos == 0) {
                $(but_id).hide();
            }
        } else if (but_id.split("-")[1] == 'right') {
            slider_pos = $(but_id).siblings("#slider-pos").text();
            new_pos = (parseInt(slider_pos) + 1);
            $(but_id).siblings("#sum-video-" + slider_pos).hide();
            $(but_id).siblings("#sum-video-" + new_pos).show();
            $(but_id).siblings("#slider-pos").text(new_pos);
            but_left = but_id.split("-")[0] + "-left";
            $(but_left).show();
            if (new_pos == 2) {
                $(but_id).hide();
            }
        }
    } else {
        but_id_arr = but_id.split("-");
        if (but_id_arr[2] == 'left') {
            slider_pos = $(but_id).siblings("#slider-pos").text();
            new_pos = (parseInt(slider_pos) - 1);
            $(but_id).siblings(but_id_arr[0] + '-' + but_id_arr[1] + '-video-' + slider_pos).hide();
            $(but_id).siblings(but_id_arr[0] + '-' + but_id_arr[1] + '-video-' + new_pos).show();
            $(but_id).siblings("#slider-pos").text(new_pos);
            but_right = but_id_arr[0] + '-' + but_id_arr[1] + "-right";
            $(but_right).show();
            if (new_pos == 0) {
                $(but_id).hide();
            }
        } else if (but_id.split("-")[2] == 'right') {
            slider_pos = $(but_id).siblings("#slider-pos").text();
            new_pos = (parseInt(slider_pos) + 1);
            $(but_id).siblings(but_id_arr[0] + '-' + but_id_arr[1] + '-video-' + slider_pos).hide();
            $(but_id).siblings(but_id_arr[0] + '-' + but_id_arr[1] + '-video-' + new_pos).show();
            $(but_id).siblings("#slider-pos").text(new_pos);
            but_left = but_id_arr[0] + '-' + but_id_arr[1] + "-left";
            $(but_left).show();
            if (new_pos == 2) {
                $(but_id).hide();
            }
        }
    }
}


document.addEventListener('polymer-ready', function() {
    // Taking elements of left menu bar
    var menu = document.getElementById('menu');
    var panel = document.getElementById('panel');
    var nav_heads = document.getElementsByClassName('nav-head');
    var content_box = document.getElementById('main-content-box');

    // Taking elements of right summary menu bar
    var summary = document.getElementById('summary-but');
    var summary_panel = document.getElementById('summary-panel');

    // Taking elements of right trending menu bar
    var trending = document.getElementById('trending-but');
    var trending_panel = document.getElementById('trending-panel');

    // Taking elements of right trending menu bar
    var related = document.getElementById('related-but');
    var related_panel = document.getElementById('rec-panel');

    // Closing right bar on clicking outside bar
    // summary_panel.addEventListener('core-select', function() {
    //     /*console.log(tabs.selected);*/
    //     var focus = summary_panel.selected;
    //     if (summary_panel.style.zIndex == '' && focus == 'drawer') {
    //         /*console.log('her')*/
    //         summary_panel.style.zIndex = '10';
    //     } else if (focus == 'main') {
    //         /*console.log('sdf')*/
    //         summary_panel.closeDrawer();
    //         setTimeout(function() {
    //             summary_panel.style.zIndex = '';
    //         }, 500)
    //     }
    // });

    // Closing right bar on clicking outside bar
    // Shows that content_box zindex is 0
    var panel_flag = 0;
    panel.addEventListener('core-select', function() {
        /*console.log(tabs.selected);*/
        var focus = panel.selected;
        console.log(content_box.style)
        if (focus == 'drawer') {
            content_box.style.zIndex = '-1';
            // Shows that zindex was 9
            panel_flag = 1;
        } else if (focus == 'main' && panel_flag == 1) {
            content_box.style.zIndex = '9';
        }
    });

    // Closing trending bar on clicking outside bar
    trending_panel.addEventListener('core-select', function() {
        /*console.log(tabs.selected);*/
        var focus = trending_panel.selected;
        if (trending_panel.style.zIndex == '' && focus == 'drawer') {
            /*console.log('her')*/
            trending_panel.style.zIndex = '100';
        } else if (focus == 'main') {
            /*console.log('sdf')*/
            trending_panel.closeDrawer();
            setTimeout(function() {
                trending_panel.style.zIndex = '';
            }, 500)
        }
    });

    // Closing right bar on clicking outside bar
    // function toggle_rec_panel() {
    //     var content_box = document.getElementById('content-box');
    //     if (related_panel.drawerWidth == '100%') {
    //         related_panel.drawerWidth = '0%';
    //         // related_panel.style.zIndex = '';
    //         content_box.style.width = '100%';
    //     } else {
    //         related_panel.drawerWidth = '100%';
    //         // related_panel.style.zIndex = '';
    //         content_box.style.width = '82%';
    //     }
    // };

    // Opening summary bar on click of button
    // summary.addEventListener('click', function() {
    //     console.log(summary_panel.style.zIndex)
    //     summary_panel.style.zIndex = '10';
    //     summary_panel.togglePanel();
    // });

    // Opening trending bar on click of button
    trending.addEventListener('click', function() {
        /*console.log(summary_panel.style.zIndex)*/
        mixpanel.track("Trending button click");
        trending_panel.style.zIndex = '100';
        trending_panel.togglePanel();
    });

    // // Opening related bar on click of button
    // related.addEventListener('click', function() {
    //     // toggle_rec_panel();
    //     showRecPanel();
    // });

    // Toggling left menu bar
    menu.addEventListener('click', function() {
        panel.togglePanel();
    });

    var win_width = $(window).width();
    // Closing left bar on clicking of any heading
    Array.prototype.filter.call(nav_heads, function(nh) {
        var temp = document.getElementById(nh.id);
        temp.addEventListener('click', function() {
            panel.closeDrawer();
            if (win_width <= "400") {
                location.reload();
            }
        });
    });

});

document.addEventListener('core-animation-finish', function(e) {
    var share = document.getElementById('share');
    var content_box = document.getElementById('content-box');
    var rec_panel = document.getElementById('rec-panel')

    if (share_flag == 1)
        share.icon = 'social:public';
    else {
        var fb = document.getElementById('share-fb');
        var twitter = document.getElementById('share-twitter');
        var gplus = document.getElementById('share-gplus');

        fb.style.visibility = 'hidden';
        twitter.style.visibility = 'hidden';
        gplus.style.visibility = 'hidden';

        share.icon = 'social:share';
    }

    if (rec_flag == 1) {
        content_box.style.width = '100%';
        content_box.style.zIndex = '9';
    } else {
        // content_box.style.width = '82%';
        // rec_panel.drawerWidth = '100%';
        content_box.style.zIndex = '';
    }
});

// Focus is outside share box
var share_flag = 0;
// Recommended Panel is open
var rec_flag = 0;

$(document).ready(function() {

    var head_width = 100 * ($("#page-head").width() / $("#page-head-box").width())
    var win_width = $(window).width();

    if (head_width >= "60" && win_width <= "360") {
        $("#mob-share-box").css("display", "none")
        $("#exp-mob-share-box").css("display", "")
        $("#top-box").css("margin-top", "1vh")
    } else {
        $("#mob-share-box").css("display", "")
        $("#exp-mob-share-box").css("display", "none")
        $("#top-box").css("margin-top", "-1vh")
    }

    $(".close-but").click(function() {
        $(this).parent()[0].toggle()
    })

    $("#share").mouseenter(function() {
        showButtons();
        // Focus is inside box
        share_flag = 1;
    });
    $("#share-box").mouseleave(function() {
        showButtons('hide');
        // Focus gets outside box
        // var animation = new CoreAnimation();
        // animation.duration = 500;
        // animation.keyframes = [{
        //     opacity: 1
        // }, {
        //     opacity: 0
        // }];
        // animation.target = document.getElementById('el');
        // animation.play();
        share_flag = 0;
    });

    $("#related-but").on('click', function() {
        showRecPanel();
    });

    $('#sum-more-but').on('click', function() {
        $('#ol').toggle();
    });

    $('#tipue_drop_input').tipuedrop({
        'speed': 5,
        'show': 5
    });

    var head_height = $('#page-head').height() + 40;
    if (head_height > 70) {
        $('#page-head-box').height(head_height);
    }

    mixpanel.track(
        "Page opened", {
            "Title": $("#page-head").text()
        }
    );

    referrer = $("#page-head").text();
    mixpanel.track_links(".inter-links", "Page Interlink", {
        "referrer": referrer
    });

    mixpanel.track_links(".tr-box", "Trending articles", {
        "referrer": referrer
    });
});
