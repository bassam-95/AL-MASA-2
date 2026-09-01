var DEOTHEMES = DEOTHEMES || {}

;(function ($) {
  DEOTHEMES.initialize = {
    init: function () {
      DEOTHEMES.initialize.scrollToTop()
      DEOTHEMES.initialize.menuAccessibility()
      DEOTHEMES.initialize.mobileNavigation()
      DEOTHEMES.initialize.socialShare()
      DEOTHEMES.initialize.responsiveTables()
      DEOTHEMES.initialize.skipLinkFocus()
      DEOTHEMES.initialize.detectMobile()
      DEOTHEMES.initialize.detectIE()
    },

    preloader: function () {
      $(".loader").fadeOut()
      $(".loader-mask")
        .delay(350)
        .animate({
          height: 0
        })
        .fadeOut("slow")
        .addClass("preloader--loaded")
    },

    triggerResize: function () {
      $window.trigger("resize")
    },

    scrollToTopScroll: function () {
      var scroll = $window.scrollTop()
      if (scroll >= 50) {
        $backToTop.addClass("show")
      } else {
        $backToTop.removeClass("show")
      }
    },

    scrollToTop: function () {
      $backToTop.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 750)
        return false
      })
    },

    menuAccessibility: function () {
      // Get all the link elements within the primary menu.
      var i,
        menuList,
        links = document.querySelectorAll(".deo-elementor-nav-menu__item, .nav__menu a")

      if (!links) {
        return false
      }

      // Each time a menu link is focused or blurred, toggle focus.
      for (i = 0; i < links.length; i++) {
        links[i].addEventListener("focus", toggleFocus, true)
        links[i].addEventListener("blur", toggleFocus, true)
      }

      function hasClass(element, className) {
        return (" " + element.className + " ").indexOf(" " + className + " ") > -1
      }

      // Sets or removes the .focus class on an element.
      function toggleFocus() {
        var self = this
        menuList = hasClass(self, "deo-elementor-nav-menu__item") ? "deo-elementor-nav-menu__list" : "nav__menu"

        // Move up through the ancestors of the current link until we hit menu list class.
        while (-1 === self.className.indexOf(menuList)) {
          // On li elements toggle the class .focus.
          if ("li" === self.tagName.toLowerCase()) {
            if (-1 !== self.className.indexOf("focus")) {
              self.className = self.className.replace(" focus", "")
            } else {
              self.className += " focus"
            }
          }
          self = self.parentElement
        }
      }
    },

    stickyNavbar: function () {
      var $navSticky = $(".nav--sticky")

      if ($window.scrollTop() > 190 && aboveMobile.matches) {
        $navSticky.addClass("sticky")
      } else {
        $navSticky.removeClass("sticky")
      }

      if ($window.scrollTop() > 200 && aboveMobile.matches) {
        $navSticky.addClass("offset")
      } else {
        $navSticky.removeClass("offset")
      }

      if ($window.scrollTop() > 500 && aboveMobile.matches) {
        $navSticky.addClass("scrolling")
      } else {
        $navSticky.removeClass("scrolling")
      }
    },

    stickyNavbarRemove: function () {
      if (!aboveMobile.matches) {
        $(".nav--sticky").removeClass("sticky offset scrolling")
      }

      if (aboveMobile.matches) {
        $(".nav__dropdown-menu").css("display", "")
      }
    },

    mobileNavigation: function () {
      var $navDropdown = $(".nav__dropdown")
      var $navDropdownMenu = $(".nav__dropdown-menu")

      $(".nav__dropdown-trigger").on("click", function () {
        var $this = $(this)
        $this.toggleClass("nav__dropdown-trigger--is-open")
        $this.next($navDropdownMenu).slideToggle()
        $this.attr("aria-expanded", function (index, attr) {
          return attr == "true" ? "false" : "true"
        })
      })

      if ($html.hasClass("mobile")) {
        $body.on("click", function () {
          $navDropdownMenu.addClass("hide-dropdown")
        })

        $navDropdown.on("click", "> a", function (e) {
          e.preventDefault()
        })

        $navDropdown.on("click", function (e) {
          e.stopPropagation()
          $navDropdownMenu.removeClass("hide-dropdown")
        })
      }
    },

    socialShare: function () {
      let $social = $(".entry__share-social"),
        $width = $(window).width(),
        $height = $(window).height()

      $social.on("click", function (e) {
        if (700 < $width && 500 < $height) {
          let $url = $(this).attr("href")
          window.open(
            $url,
            "",
            "width=700, height=500,left=" + ($width / 2 - 350) + ",top=" + ($height / 2 - 250) + ",scrollbars=yes"
          )
          e.preventDefault()
        }
      })
    },

    responsiveTables: function () {
      var $table = $(".wp-block-table")
      if ($table.length > 0) {
        $table.wrap('<div class="table-responsive"></div>')
      }
    },

    skipLinkFocus: function () {
      var isIe = /(trident|msie)/i.test(navigator.userAgent)

      if (isIe && document.getElementById && window.addEventListener) {
        window.addEventListener(
          "hashchange",
          function () {
            var id = location.hash.substring(1),
              element

            if (!/^[A-z0-9_-]+$/.test(id)) {
              return
            }

            element = document.getElementById(id)

            if (element) {
              if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
                element.tabIndex = -1
              }

              element.focus()
            }
          },
          false
        )
      }
    },

    detectMobile: function () {
      if (
        /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
          navigator.userAgent || navigator.vendor || window.opera
        )
      ) {
        $html.addClass("mobile")
      } else {
        $html.removeClass("mobile")
      }
    },

    detectIE: function () {
      if (Function("/*@cc_on return document.documentMode===10@*/")()) {
        $html.addClass("ie")
      }
    }
  }

  DEOTHEMES.documentOnReady = {
    init: function () {
      DEOTHEMES.initialize.init()
    }
  }

  DEOTHEMES.windowOnLoad = {
    init: function () {
      DEOTHEMES.initialize.preloader()
      DEOTHEMES.initialize.triggerResize()
    }
  }

  DEOTHEMES.windowOnResize = {
    init: function () {
      DEOTHEMES.initialize.stickyNavbarRemove()
    }
  }

  DEOTHEMES.windowOnScroll = {
    init: function () {
      DEOTHEMES.initialize.scrollToTopScroll()
      DEOTHEMES.initialize.stickyNavbar()
    }
  }

  var $window = $(window),
    $html = $("html"),
    $body = $("body"),
    $backToTop = $("#back-to-top"),
    aboveMobile = window.matchMedia("(min-width: 1025px)")

  $(document).ready(DEOTHEMES.documentOnReady.init)
  $window.on("load", DEOTHEMES.windowOnLoad.init)
  $window.on("resize", DEOTHEMES.windowOnResize.init)
  $window.on("scroll", DEOTHEMES.windowOnScroll.init)
})(jQuery)
