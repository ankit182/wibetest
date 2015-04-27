/*
Tipue drop 4.0
Copyright (c) 2014 Tipue
Tipue drop is released under the MIT License
http://www.tipue.com/drop

Input Box JS

*/


(function($) {

    $.fn.tipuedrop = function(options) {

        var set = $.extend({

            'show': 3,
            'speed': 300,
            'newWindow': false,
            'mode': 'static',
            'contentLocation': 'tipuedrop/tipuedrop_content.json',
            'sgst': ''

        }, options);

        return this.each(function() {

            // var tipuedrop_in = {
            //     pages: []
            // };
            // $.ajaxSetup({
            //     async: false
            // });

            // if (set.mode == 'json') {
            //     $.getJSON(set.contentLocation,
            //         function(json) {
            //             tipuedrop_in = $.extend({}, json);
            //         }
            //     );
            // }
            // if (set.mode == 'static') {
            // tipuedrop_in = $.extend({}, tipuedrop);
            tipuedrop_in = set.sgst;
            // }

            // $(this).keyup(function(event) {
            getTipuedrop($(this));
            getTipuedrop($(this));
            getTipuedrop($(this));
            // });

            function getTipuedrop($obj) {
                if ($obj.val()) {
                    var c = 0;
                    for (var i = 0; i < 5; i++) {
                        if (c == 0) {
                            var out = '<div id="tipue_drop_wrapper">';
                        }
                        out += '<div class="suggestion"><a href="/wibe/' + tipuedrop_in[i].replace(/ /g, "-") + '"';
                        if (set.newWindow) {
                            out += ' target="_blank"';
                        }
                        out += '><div class="tipue_drop_item"><div class="tipue_drop_right_title">' + tipuedrop_in[i] + '</div></div></a></div>';
                        c++;
                    }
                    if (c != 0) {
                        out += '</div>';
                        $('#tipue_drop_content').html(out);
                        $('#tipue_drop_content').fadeIn(set.speed);
                    }
                } else {
                    $('#tipue_drop_content').fadeOut(set.speed);
                }
            }

            $('html').click(function() {
                $('#tipue_drop_content').fadeOut(set.speed);
            });

        });
    };

})(jQuery);


/* Main Page JS */

// document.addEventListener('polymer-ready', function() {
//     // Taking elements of right trending menu bar
//     var trending = document.getElementById('trending-but');
//     var trending_panel = document.getElementById('trending-panel');

//     // Closing trending bar on clicking outside bar
//     trending_panel.addEventListener('core-select', function() {
//         /*console.log(tabs.selected);*/
//         var focus = trending_panel.selected;
//         if (trending_panel.style.zIndex == '' && focus == 'drawer') {
//             console.log('her')
//             trending_panel.style.zIndex = '100';
//         } else if (focus == 'main') {
//             /*console.log('sdf')*/
//             trending_panel.closeDrawer();
//             setTimeout(function() {
//                 trending_panel.style.zIndex = '';
//             }, 500)
//         }
//     });

//     // Opening trending bar on click of button
//     trending.addEventListener('click', function() {
//         /*console.log(summary_panel.style.zIndex)*/
//         trending_panel.style.zIndex = '100';
//         trending_panel.togglePanel();
//     });

// });

function installExtension() {
    if (chrome.app.isInstalled) {
        alert('Extension Already Installed, Start Wibing !');
    } else {
        chrome.webstore.install();
    }
};

function validate_input(query) {
    // Converting user input query into proper format
    query = query.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    query = query.replace(/ /g, '-');
    // console.log(query)
    return query;
}

function srchBox() {
    if ($('#tipue_drop_input').val() != undefined) {

        mixpanel.track(
            "Search Query", {
                "Query": $('#tipue_drop_input').val()
            }
        );
        document.location.href = '/wibe/' + validate_input($('#tipue_drop_input').val()) + '/';
    }
}

function saveMail() {
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };
    email = $("#inp-email-id").val();
    if (isValidEmailAddress(email)) {
        $.get("http://www.corsproxy.com/wibeinvite.appspot.com/signup/" + email, function(data) {

        });
        document.querySelector('#subscribed-msg').show();
        $("#inp-email-id").val("");
    } else {
        document.querySelector('#failed-msg').show();
    }
}

$(document).keyup(function(e) {
    if ($("#tipue_drop_input:focus") && (e.keyCode === 13) && $('#tipue_drop_input').val() != '') {
        mixpanel.track(
            "Search Query", {
                "Query": $('#tipue_drop_input').val()
            }
        );
        document.location.href = '/wibe/' + validate_input($('#tipue_drop_input').val()) + '/';

    } else if ($("#tipue_drop_input:focus") && $('#tipue_drop_input').val() != '') {
        // console.log($('#tipue_drop_input').val());
        URL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + $('#tipue_drop_input').val() + '&callback=?';
        $.getJSON(URL, function(data) {
            var obj = data;
            $('#tipue_drop_input').tipuedrop({
                'speed': 5,
                'show': 1,
                'sgst': obj[1]
            });
        });
    }
});
