/*
Tipue drop 4.0
Copyright (c) 2014 Tipue
Tipue drop is released under the MIT License
http://www.tipue.com/drop
*/


(function($) {

    $.fn.tipuedrop = function(options) {

        var set = $.extend({

            'show': 3,
            'speed': 300,
            'newWindow': false,
            'mode': 'static',
            'contentLocation': 'tipuedrop/tipuedrop_content.json',
            'sgst':''

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
                        out += '<div class="suggestion"><a href="/wibe/' + tipuedrop_in[i].replace(/ /g,"-") + '"';
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
