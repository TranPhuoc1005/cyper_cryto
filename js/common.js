// ANCHOR LINK
var offset_PC = 0; /* offset header in PC (px) */
var offset_SP = 0; /* offset header in SP (px) */
function anchorLink(el) {
  /* trigger to open tab contain the Anchor, related to the function CHANGE TAB below. */
  var _parent = jQuery(el).parents("[data-tab-content]");
  if (_parent) {
    var _tab_ID = _parent.data("tab-content");
    var _group = _parent.data("tab-group");
    jQuery('[data-tab="' + _tab_ID + '"').each(function () {
      if (jQuery(el).data("tab-group") === _group) {
        jQuery(el).trigger("click");
      }
    });
  }

  /* position of element */
  var offset = jQuery(el).offset();
  if (jQuery(window).width() > 750) {
    jQuery("html,body").animate({ scrollTop: offset.top - offset_PC }, 400);
  } else {
    jQuery("html,body").animate({ scrollTop: offset.top - offset_SP }, 400);
  }
}
// WINDOW LOAD
jQuery(window).bind("load", function () {
  "use strict";

  // ANCHOR FROM OTHER PAGE
  var hash = location.hash;
  if (hash && jQuery(hash).length > 0) {
    anchorLink(hash);
  }

  // ANCHOR IN PAGE
  jQuery('a[href^="#"]').click(function () {
    var get_ID = jQuery(this).attr("href");
    if (get_ID != "#" && jQuery(get_ID).length) {
      anchorLink(get_ID);
      // close Menu (is opening) in SP
      if (jQuery("body").hasClass("open-nav")) {
        jQuery("#menu-toggle").trigger("click");
      }
      return false;
    }
  });
  // =========== END - ANCHOR LINK ============

  // // SCROLL TO MAIL FORM (old)
  // if (jQuery("#fmail-section").length) {
  //   var params = location.search;
  //   if (params.search("mode") >= 0) {
  //     anchorLink("#fmail-section");
  //   }
  // }
  // =========== END - SCROLL TO MAIL FORM ============

  // LAZY LOAD RESOURCE
  jQuery("[data-href]").each(function () {
    var _this = jQuery(this);
    var href = jQuery(this).data("href");
    setTimeout(function () {
      _this.attr("href", href);
    }, 3000);
  });
  jQuery("[data-src]").each(function () {
    var _this = jQuery(this);
    var src = jQuery(this).data("src");
    setTimeout(function () {
      _this.attr("src", src);
    }, 3000);
  });
  // =========== END - LAZY LOAD RESOURCE ============
  $(window).on("load scroll", function () {
    // To-Top && Btnfix
    var st = jQuery("html,body").scrollTop();
    var getHeightMnv = jQuery("#mainvisual").innerHeight();
    if (st >= getHeightMnv) {
      jQuery(".to-top").addClass("show");
      jQuery(".btns-fix").addClass("show");
    } else {
      jQuery(".to-top").removeClass("show");
      jQuery(".btns-fix").removeClass("show");
    }
    if (st >= 10) {
        jQuery("header").addClass("fix");
      } else {
        jQuery("header").removeClass("fix");
      }
  });

  // =========== END - TO-TOP && Btnfix ============
});

// SCROLL TO MAIL FORM (FMAIL)
var formID = "#fmail-section";
if (jQuery(formID).length) {
  var mode = new URLSearchParams(window.location.search).get("mode");

  if (["confirm", "thanks", "error"].includes(mode)) {
    performance.navigation.type = 1;
    anchorLink(formID);
  }
  window.onpageshow = function () {
    jQuery("html,body").stop();
    if (
      performance.navigation.type != 2 &&
      !["confirm", "thanks", "error"].includes(mode)
    ) {
      window.onunload = function () {
        scrollTo(0, 0);
      };
    } else {
      anchorLink(formID);
    }
  };
}
// =========== END - SCROLL TO MAIL FORM (FMAIL) ============

// DOCUMENT READY
jQuery(document).ready(function () {
  "use strict";

  // MENU TOGGLE SP
  jQuery(".hamburger-btn").click(function () {
    jQuery(this).toggleClass("--active");
    jQuery("body").toggleClass("open-nav no-scroll");
  });

  // jQuery('.overplay').click(function () {
  //     jQuery('.hamburger-btn').trigger('click');
  // });

  if (jQuery(".header-menu").length) {
    jQuery(".dropdown > p").click(function () {
      var screenWidth = jQuery(window).width();
      if (screenWidth <= 750) {
        jQuery(this).toggleClass("open");
        jQuery(this).next(".sub-menu").stop().slideToggle();
        // jQuery(this).closest('.dropdown').siblings().find('.sub-menu').stop().slideUp();
        // jQuery(this).closest('.dropdown').siblings().find('p').removeClass('open');
      }
    });

    jQuery(window).on("resize load", function () {
      var _w = jQuery(window).width();
      if (_w >= 751) {
        jQuery(".dropdown > p").removeClass("open");
        jQuery(".sub-menu").removeAttr("style");
      } else {
        jQuery(".menu-list a").on("click", function () {
          jQuery(".hamburger-btn").trigger("click");
        });
      }
    });
  }
  // =========== END - SUB NAV SP SLIDE TOGGLE ============

  // CHANGE TAB
  jQuery("[data-tab]").click(function () {
    var group = jQuery(this).data("tab-group");
    var index = jQuery(this).data("tab");
    jQuery('[data-tab][data-tab-group="' + group + '"].active').removeClass(
      "active"
    );
    jQuery(this).addClass("active");

    jQuery(
      '[data-tab-content][data-tab-group="' + group + '"].active'
    ).removeClass("active");
    jQuery(
      '[data-tab-content="' + index + '"][data-tab-group="' + group + '"]'
    ).addClass("active");
  });
  // =========== END - CHANGE TAB ============

  // ACCORDION
  jQuery(".accordion-button").click(function (e) {
    e.preventDefault();
    jQuery(this).toggleClass("open");
    var accordion_ID = jQuery(this).attr("id");
    var accordion_content = jQuery(
      '[data-accordion-for="' + accordion_ID + '"]'
    );
    accordion_content.stop().slideToggle(200);
  });
  // =========== END - ACCORDION ============

  // matchHeight
  if (jQuery(".asddd").length > 0) {
    jQuery(".asddd").matchHeight();
  }

  // // under
  // if (jQuery(".works-slider").length > 0) {
  //   jQuery(".works-bg ul").slick({
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     arrows: false,
  //     asNavFor: ".works-sm ul",
  //   });
  //   jQuery(".works-sm ul").slick({
  //     slidesToShow: 10,
  //     slidesToScroll: 1,
  //     asNavFor: ".works-bg ul",
  //     focusOnSelect: true,
  //     arrows: false,
  //   });
  // }

  // wp
  jQuery(".upost-desc ul").addClass("ulist");
});
