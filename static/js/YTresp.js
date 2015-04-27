function searchYT(query, idx, vid_cnt) {

    // If vid_cnt is not send then by default its set to 3
    vid_cnt = typeof vid_cnt !== 'undefined' ? vid_cnt : 4;

    // URL to hit for getting videos using Youtube Data API with 3 results in return
    lang = "en";
    var URL = "https://gdata.youtube.com/feeds/api/videos?q=" + query + "&alt=json&v=2&max-results=" + vid_cnt + "&orderby=relevance&lr=" + lang;
    // Ajax request to the URL & Parsing content
    $.getJSON(URL, function(data) {
        var obj = data.feed.entry;
        var vids = new Array();
        // Extracting video urls and titles
        var first_flag = 0
        for (var it in obj) {
            if (first_flag != 0){
                var vidID = obj[it].media$group.yt$videoid.$t;
                var vidTitle = obj[it].title.$t;
                var vidDesc = obj[it].media$group.media$description.$t;
                var vidImg = 'http://i.ytimg.com/vi/' + vidID + '/hqdefault.jpg'
                vids.push([vidID, vidTitle, vidImg, vidDesc]);
            }
            else {
                first_flag = 1
            }
        }
        cnt += 1;
        results.push([idx, vids]);
        if (cnt == $('.heading-title').length + 1) {
            results.sort(function(a, b) {
                return a[0] - b[0]
            });
            showVids();
        }
    })
}

function showVids() {
    num = 0;
    $('.sum-play-but')[0].style.visibility = 'visible';
    $('#top-loader')[0].style.visibility = 'hidden';
    $('.sum-video-img').each(function() {
        try {
            $(this).attr('src', results[0][1][num][2]);
            // console.log(results[0][1][num][1])
            $(this).parent().attr('title', results[0][1][num][1]);
        } catch (err) {
            $(this).attr('src', "http://portal.aolcdn.com/p5/forms/4344/2af553bd-0f81-41d1-a061-8858924b83ca.jpg");
            $(this).children('.video-title').text("No Video Found");
        }
        num += 1
    });
    $('.sum-play-but').each(function() {
        $(this).click(function() {
            prnt_id = $(this).parent().attr('id');
            res = prnt_id.split("-");
            v_num = res[2];
            pg_title = $("#page-head").text();

            // Adding analtics for top main video
            mixpanel.track(
                "Top Video", {
                    "title": pg_title,
                    "Vid num": v_num
                }
            );

            // Calling addVid from wibe.js to insert YT player iframe
            addVid(results[0][1][v_num][0], prnt_id);
        });
    });
    $('.TOP')


    head_no = 1;
    $('.head-vid-box').each(function() {
        // console.log(results[head_no][1][0][2]);
        rnk = 0;
        $(this).find('.head-video-img').each(function() {
            try {
                var json_ld = '<script type="application/ld+json"> { \
                    "@context": "http://schema.org/",\
                    "@type": "VideoObject",\
                    "name": ' + results[head_no][1][rnk][1] + ',\
                    "description": ' + results[head_no][1][rnk][3] + ',\
                    "url": ' + results[head_no][1][rnk][2] + '\
                } < /script>'
                $(this).after(json_ld);
                $(this).attr('src', results[head_no][1][rnk][2]);
                var child = $(this).find('.video-title');
                var desc_icon = $(this).find('.vid-desc')
                var desc_icon_val = desc_icon.attr('onclick');
                child.attr('title', results[head_no][1][rnk][1]);
                child.text(results[head_no][1][rnk][1].substring(0, 50) + "...");
                var desc_box_id = desc_icon_val.split(';');
                var desc_icon_func_val = desc_box_id[0] + ';get_desc("' + results[head_no][1][rnk][0] + '", "' + desc_box_id[1] + '");';
                desc_icon.attr('onclick', desc_icon_func_val);
            } catch (err) {
                $(this).attr('src', "http://portal.aolcdn.com/p5/forms/4344/2af553bd-0f81-41d1-a061-8858924b83ca.jpg");
                var child = $(this).children('.video-title');
                child.attr('title', "No Vid");
                child.text("Sorry No Vid Present");
            }
            rnk += 1;
        });
        head_no += 1;
    });
    head_no = 1;
    $('.play-but').each(function() {
        // console.log($(this), $(this).next());
        $(this).next()[0].style.visibility = 'hidden';
        $(this)[0].style.visibility = 'visible';
        $(this).click(function() {
            prnt_id = $(this).parent().attr('id');
            res = prnt_id.split("-");
            v_id = res[1];
            v_num = res[3];
            head_id = $(this).parent().parent().parent().parent().attr('id');
            // Adding analtics for top main video
            mixpanel.track(
                "Heading Video", {
                    "title": $("#page-head").text(),
                    "Heading": head_id,
                    "head num": v_id,
                    "Vid num": v_num
                }
            );

            // Calling addVid from wibe.js to insert YT player iframe
            addVid(results[v_id][1][v_num][0], prnt_id);
        });
        head_no += 1;
    });
}

var results = new Array();
var cnt = 0;

$("#ready").ready(function() {
    // Getting just title of page and not "From Wikipedia..." line
    title = $('#page-head').clone().children().remove().end().text();
    // Removing white spaces from starting and ending of title
    title = $.trim(title);
    // console.log(title)
    searchYT(title, 0);
    head_no = 1
    $('.heading-title').each(function() {
        // Removing white spaces from starting and ending of head_title
        var head_title = $.trim($(this).text());
        searchYT(head_title + " " + title, head_no);
        head_no += 1
    });
});
