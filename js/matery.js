let _material = {
  loading: function() {
    var w = window.innerWidth;
    var css =
      '<style class="loaderstyle" id="loaderstyle' +
      w +
      '">' +
      "@-moz-keyframes loader" +
      w +
      "{100%{background-position:" +
      w +
      "px 0}}" +
      "@-webkit-keyframes loader" +
      w +
      "{100%{background-position:" +
      w +
      "px 0}}" +
      ".loader" +
      w +
      "{-webkit-animation:loader" +
      w +
      " 3s linear infinite;-moz-animation:loader" +
      w +
      " 3s linear infinite;}" +
      "</style>";
    $(".loaderstyle").remove();
    $("head").append(css);
    $("#loader")
      .removeClass()
      .addClass("loader" + w)
      .show();
  },
  loadingOut: function() {
    setTimeout(function() {
      $("html, body").removeClass("loading");
      setTimeout(function() {
        $(".loader").css("z-index", "-1");
      }, 600);
    }, 500);
  }
};

$(function() {
  /**
   * 添加文章卡片hover效果.
   */
  _material.loading();
  let articleCardHover = function() {
    let animateClass = "animated pulse";
    $("article .article").hover(
      function() {
        $(this).addClass(animateClass);
      },
      function() {
        $(this).removeClass(animateClass);
      }
    );
  };
  articleCardHover();

  /*菜单切换*/
  $(".sidenav").sidenav();

  /* 修复文章卡片 div 的宽度. */
  let fixPostCardWidth = function(srcId, targetId) {
    let srcDiv = $("#" + srcId);
    if (srcDiv.length === 0) {
      return;
    }

    let w = srcDiv.width();
    if (w >= 450) {
      w = w + 21;
    } else if (w >= 350 && w < 450) {
      w = w + 18;
    } else if (w >= 300 && w < 350) {
      w = w + 16;
    } else {
      w = w + 14;
    }
    $("#" + targetId).width(w);
  };

  /**
   * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
   */
  let fixFooterPosition = function() {
    $(".content").css("min-height", window.innerHeight - 165);
  };

  /**
   * 修复样式.
   */
  let fixStyles = function() {
    fixPostCardWidth("navContainer");
    fixPostCardWidth("artDetail", "prenext-posts");
    fixFooterPosition();
  };
  fixStyles();

  /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
  $(window).resize(function() {
    fixStyles();
  });

  /*初始化瀑布流布局*/
  $("#articles").masonry({
    itemSelector: ".article"
  });

  AOS.init({
    easing: "ease-in-out-sine",
    duration: 700,
    delay: 100
  });

  let articleInit = function() {
    $("#articleContent a").attr("target", "_blank");

    $("#articleContent img").each(function() {
      let imgPath = $(this).attr("src");
      $(this).wrap(
        '<div class="img-item" data-src="' +
          imgPath +
          '" data-sub-html=".caption"></div>'
      );
      $(this).addClass("img-shadow img-margin");
      let alt = $(this).attr("alt");
      let title = $(this).attr("title");
      let captionText = "";
      if (alt === undefined || alt === "") {
        if (title !== undefined && title !== "") {
          captionText = title;
        }
      } else {
        captionText = alt;
      }
      if (captionText !== "") {
        let captionDiv = document.createElement("div");
        captionDiv.className = "caption";
        let captionEle = document.createElement("b");
        captionEle.className = "center-caption";
        captionEle.innerText = captionText;
        captionDiv.appendChild(captionEle);
        this.insertAdjacentElement("afterend", captionDiv);
      }
    });
    $("#articleContent, #myGallery").lightGallery({
      selector: ".img-item",
      subHtmlSelectorRelative: true
    });

    // progress bar init
    const progressElement = window.document.querySelector(".progress-bar");
    if (progressElement) {
      new ScrollProgress((x, y) => {
        progressElement.style.width = y * 100 + "%";
      });
    }
  };
  articleInit();

  $(".modal").modal();

  $("#backTop").click(function() {
    $("body,html").animate({ scrollTop: 0 }, 400);
    return false;
  });

  let $nav = $("#headNav");
  let $backTop = $(".top-scroll");
  showOrHideNavBg($(window).scrollTop());
  $(window).scroll(function() {
    let scroll = $(window).scrollTop();
    showOrHideNavBg(scroll);
  });

  function showOrHideNavBg(position) {
    let showPosition = 100;
    if (position < showPosition) {
      $nav.addClass("nav-transparent");
      $backTop.slideUp(300);
    } else {
      $nav.removeClass("nav-transparent");
      $backTop.slideDown(300);
    }
  }

  $(".nav-menu>li").hover(
    function() {
      $(this)
        .children("ul")
        .stop(true, true)
        .show();
      $(this)
        .addClass("nav-show")
        .siblings("li")
        .removeClass("nav-show");
    },
    function() {
      $(this)
        .children("ul")
        .stop(true, true)
        .hide();
      $(".nav-item.nav-show").removeClass("nav-show");
    }
  );

  $(".m-nav-item>a").on("click", function() {
    if (
      $(this)
        .next("ul")
        .css("display") == "none"
    ) {
      $(".m-nav-item")
        .children("ul")
        .slideUp(300);
      $(this)
        .next("ul")
        .slideDown(100);
      $(this)
        .parent("li")
        .addClass("m-nav-show")
        .siblings("li")
        .removeClass("m-nav-show");
    } else {
      $(this)
        .next("ul")
        .slideUp(100);
      $(".m-nav-item.m-nav-show").removeClass("m-nav-show");
    }
  });

  if ($("#preview").length) {
    _material.loadingOut();
  }
});
