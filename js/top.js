jQuery(document).ready(function () {
    AOS.init({
		startEvent: 'DOMContentLoaded',
		offset: 0,
		duration: 600,
		delay: '200',
		easing: 'ease-in-sine',
		once: true,
		mirror: true,
		disable: function(){
            return jQuery(window).width() <= 750;
        },
	});
});

jQuery(window).bind('load', function () {
    "use strict";
    // SLIDER
    // if( jQuery('#visual').length > 0 ) {
    //     jQuery('#visual').slick({
    //         dots: false,
    //         infinite: true,
    //         speed: 1000,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         autoplay: true,
    //         autoplaySpeed: 5000,
    //         arrows: false,
    //         centerMode: false,
    //         centerPadding: 0,
    //         pauseOnHover: false,
    //         fade: false,
    //         variableWidth: false,
    //     });
    // }
    /*============== END - SLIDER ================*/


    /*============== END - CONTENT LOAD ANIMATION ================*/

    if (jQuery('.asd').length) {
        jQuery.ajax({
            url: 'blog/_custom/?limit=3&cat=2',
            dataType: 'jsonp',
            success: function (json) {
                jQuery.each(json.data, function (i, val) {
                    // get Date
                    var dateFormatted = val.date.replace('/', '.').replace('/', '.');
                    // get IMG
                    var arrImg = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10"];
                    var loading = "";
                    for (let i = 0; i < arrImg.length; i++) {
                        var getImg = val[arrImg[i]];
                        if (getImg) {
                            loading = jQuery(getImg).attr("src");
                            break;
                        }
                    }
                    if (loading == "") {
                        loading = "./images/under-img03.jpg";
                    }
                    // get Desc
                    var getText = jQuery(val.text1).text();
                    // check Desc
                    var checkDesc = getText ? '<p class="desc-slide">' + getText + '</p>' : '';

                    var items =
                        `<li>
                            <div class="blogs-item">
                                <p class="blogs-img">
                                    <img src="${loading}" alt="${val.title}" width="380" height="276" loading="lazy">
                                </p>
                                <p class="blogs-date">${dateFormatted}</p>
                                <p class="blogs-tt">${val.title}</p>
                                <p class="blogs-desc">${checkDesc}</p>
                                <a href="./blog/${val.url}" class="blogs-link"></a>
                            </div>
                        </li>`
                        
                        // '<li>' +
                        //     '<div class="blogs-item">' +
                        //         '<p class="blogs-img">' + 
                        //             '<img src="'+ loading +'" alt="' + val.title + '" width="380" height="276" loading="lazy">' +
                        //         '</p>' +
                        //         '<p class="blogs-date">' + dateFormatted + '</p>' +
                        //         '<p class="blogs-tt">' + val.title + '</p>' +
                        //         '<p class="blogs-desc">' + checkDesc + '</p>' +
                        //         '<a href="./blog/' + val.url + '" class="blogs-link"></a>' +
                        //     '</div>' +
                        // '</li>'
                    jQuery('#blog-list').append(items);
                });
            }
        });
    }
});