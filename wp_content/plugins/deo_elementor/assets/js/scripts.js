;(function ($) {
  "use strict"

  var $window = $(window)
  var $document = $(document)

  /* Load More
	-------------------------------------------------------*/
  function initLoadMore() {
    $(".deo-load-more__button").on("click", function (e) {
      var button = $(this)

      if (!button.is(".clicked")) {
        button.addClass("clicked")

        e.preventDefault()
        e.stopPropagation()

        var widget = button.parent(".deo-load-more").siblings(".deo-load-more-container")
        var widgetRow = widget.find(".row")
        var page = widget.data("page")
        var newPage = page + 1
        var settings = widget.data("settings")

        var data = {
          action: "deo_widget_load_more",
          security: deo_elementor_data.ajax_nonce,
          data: {
            page: page,
            settings: settings
          }
        }

        $.ajax({
          type: "POST",
          url: deo_elementor_data.ajax_url,
          data: data,
          beforeSend: function (xhr) {
            button.addClass("deo-loading")
            button.append('<div class="loader"><div></div></div>')
          },
          success: function (response) {
            if (response) {
              button.removeClass("deo-loading clicked")
              button.find(".loader").remove()

              widget.data("page", newPage)

              var $items = $(response).hide()
              widgetRow.append($items)

              // recalc masonry items
              widgetRow.imagesLoaded(function () {
                $items.show()
                widgetRow.isotope("appended", $items)
              })

              if (widget.data("page_max") == widget.data("page")) {
                button.parent(".deo-load-more").remove()
              }
            } else {
              button.parent(".deo-load-more").remove()
            }
          }
        })
      }

      return false
    })
  }

  /* Masonry / filter
	-------------------------------------------------------*/
  function initMasonry($el, $scope, type) {
    var $grid = $el,
      id = $scope.data("id"),
      $gridID = $(".masonry-grid__" + type + "-" + id),
      $filter = $(".isotope-filter-" + id)

    $grid.imagesLoaded(function () {
      $grid.isotope({
        itemSelector: ".masonry-item",
        masonry: {
          columnWidth: ".grid-sizer"
        },
        percentPosition: true,
        stagger: 30,
        hiddenStyle: {
          transform: "translateY(100px)",
          opacity: 0
        },
        visibleStyle: {
          transform: "translateY(0px)",
          opacity: 1
        }
      })
    })

    // Filter
    $filter.on("click", "a", function (e) {
      e.preventDefault()
      var filterValue = $(this).attr("data-filter")
      $gridID.isotope({ filter: filterValue })
      $filter.find("a").removeClass("active")
      $(this).closest("a").addClass("active")
    })

    // Watch the changes of spacing control
    if (elementorFrontend.isEditMode()) {
      elementor.channels.editor.on("change", function (view) {
        let changed = view.container.settings.changed

        if (changed.grid_style_rows_gap) {
          $grid.isotope()
        }
      })
    }
  }

  /* Nav Menu
	-------------------------------------------------------*/
  var deoNavMenu = function ($scope, $) {
    const $menu = $scope.find($(".deo-elementor-nav-menu--mobile-toggle-yes .deo-elementor-nav-menu--mobile"))
    const $navDropdownTrigger = $(".deo-elementor-nav-menu__dropdown-trigger")

    if (0 == $menu.length) {
      return
    }

    // Toggle dropdown menu
    if (elementorFrontend.config.environmentMode.edit) {
      if ($navDropdownTrigger.length > 0) {
        $navDropdownTrigger.on("click", function (e) {
          const $this = $(this)

          $this.toggleClass("nav__dropdown-trigger--is-open")
          $this.next().slideToggle()

          const attr = $this.attr("aria-expanded")
          if (attr == "true") {
            $this.attr("aria-expanded", "false")
          } else {
            $this.attr("aria-expanded", "true")
          }
        })
      }
    }

    // Stretch mega menu
    const stretchElement = new elementorModules.frontend.tools.StretchElement({ element: $menu })
    stretchElement.stretch()
    $window.on("resize", function () {
      stretchElement.stretch()
    })
  }

  /* Testimonials Slider
	-------------------------------------------------------*/
  var deoTestimonialsSlider = function ($scope, $) {
    let id = $scope.data("id")
    let slickSlider = $(".deo-testimonials-slider-" + id)
    if (slickSlider.length > 0) {
      slickSlider.not(".slick-initialized").slick()
    }
  }

  /* Hero Slider
	-------------------------------------------------------*/
  var deoHeroSlider = function ($scope, $) {
    let id = $scope.data("id")
    let slider = $(".deo-hero-slider-" + id)
    let settings = slider.data("slider-settings")
    const Swiper = elementorFrontend.utils.swiper

    if (slider.length > 0) {
      initSwiper()
      async function initSwiper() {
        var swiper = await new Swiper(slider, settings)

        // Watch the changes
        if (elementorFrontend.isEditMode()) {
          elementor.channels.editor.on("change", function (view) {
            let changed = view.container.settings.changed

            if (changed.slider_height) {
              swiper.slideNext()
            }
          })
        }
      }
    }
  }

  /* Pricing Toggle
	-------------------------------------------------------*/
  var deoPricingToggle = function ($scope, $) {
    $(".deo-toggle__button").on("click", function (e) {
      let $this = $(this)
      let tabID = $this.attr("data-tab-id")

      $this
        .parents(".deo-toggle")
        .siblings()
        .find("." + tabID)
        .stop()
        .show()
        .siblings()
        .hide()
      $this.addClass("deo-toggle__button--is-active").siblings().removeClass("deo-toggle__button--is-active")
      e.preventDefault()
    })
  }

  /* Projects Masonry
	-------------------------------------------------------*/
  var deoProjectsMasonry = function ($scope, $) {
    var $grid = $(".masonry-grid__project"),
      type = "project"

    if ($grid.length > 0) {
      initMasonry($grid, $scope, type)
    }
  }

  /* Projects Slider
	-------------------------------------------------------*/
  var deoProjectsSlider = function ($scope, $) {
    let $slickSlider = $(".deo-projects-slider")

    if ($slickSlider.length > 0) {
      let widgetId = $scope.data("id")

      $slickSlider.not(".slick-initialized").slick({
        prevArrow: $(".deo-slick-slider-arrow-prev-" + widgetId),
        nextArrow: $(".deo-slick-slider-arrow-next-" + widgetId)
      })
    }

    // Watch the changes of spacing control
    if (elementorFrontend.isEditMode()) {
      elementor.channels.editor.on("change", function (view) {
        let changed = view.container.settings.changed

        if (changed.grid_style_columns_gap) {
          $slickSlider.slick("setPosition")
        }
      })
    }
  }

  /* Projects Slider Wide
	-------------------------------------------------------*/
  var deoProjectsSliderWide = function ($scope, $) {
    let $slickSlider = $(".deo-projects-slider-wide")

    if ($slickSlider.length > 0) {
      $slickSlider.not(".slick-initialized").slick()
    }
  }

  /* Services Masonry
	-------------------------------------------------------*/
  var deoServicesMasonry = function ($scope, $) {
    var $grid = $(".masonry-grid__services"),
      type = "services"

    if ($grid.length > 0) {
      initMasonry($grid, $scope, type)
    }
  }

  /* Blog Masonry
	-------------------------------------------------------*/
  var deoBlogMasonry = function ($scope, $) {
    var $grid = $(".masonry-grid__blog"),
      type = "blog"

    if ($grid.length > 0) {
      initMasonry($grid, $scope, type)
    }
  }

  /* Before and After
	-------------------------------------------------------*/
  var deoBeforeAfter = function ($scope, $) {
    let widgetID = $scope.data("id")
    let $baSlider = $(".ba-slider-" + widgetID)

    if ($baSlider.length > 0) {
      $baSlider.beforeAfter()
    }
  }

  /* Video Lightbox
	-------------------------------------------------------*/
  var deoVideoLightbox = function ($scope, $) {
    $(".lightbox-img, .lightbox-video").magnificPopup({
      callbacks: {
        elementParse: function (item) {
          if (item.el.context.className == "lightbox-video") {
            item.type = "iframe"
          } else {
            item.type = "image"
          }
        }
      },
      type: "image",
      closeBtnInside: false,
      fixedContentPos: false,
      gallery: {
        enabled: true
      },
      image: {
        titleSrc: "title",
        verticalFit: true
      }
    })

    // Single video lightbox
    $(".single-video-lightbox").magnificPopup({
      type: "iframe",
      closeBtnInside: true,
      removalDelay: 500,
      callbacks: {
        beforeOpen: function () {
          // just a hack that adds mfp-anim class to markup
          this.st.iframe.markup = this.st.iframe.markup.replace("mfp-iframe-scaler", "mfp-iframe-scaler mfp-with-anim")
          this.st.mainClass = this.st.el.attr("data-effect")
        }
      },
      fixedContentPos: false,
      tLoading: "Loading image #%curr%..."
    })
  }

  /* Off-Canvas
	-------------------------------------------------------*/
  var OffCanvas = {
    _open: function (canvas_id) {
      var $canvas_element = $("#deo-offcanvas-" + canvas_id)

      $canvas_element.addClass("deo-offcanvas--is-open")
    },

    _close: function (canvas_id) {
      var $canvas_element = $("#deo-offcanvas-" + canvas_id)

      $canvas_element.removeClass("deo-offcanvas--is-open")
    }
  }

  /**
   * Trigger open Off Canvas On Click Icon
   */
  $document.off("click.opentrigger").on("click.opentrigger", ".js-offcanvas-trigger", function () {
    var canvas_id = $(this).closest(".elementor-element").data("id")

    OffCanvas._open(canvas_id)
  })

  /*
   * deo_offcanvas_init trigger
   */
  $document.on("deo_offcanvas_init", function (e, el_id) {
    /*
     * Close on scroll
     */
    $window.on("scroll", function () {
      $(".deo-offcanvas").each(function (index, value) {
        $(this).removeClass("deo-offcanvas--is-open")
      })
    })

    /*
     * Close on ESC
     */
    $document.on("keyup", function (e) {
      if (e.keyCode == 27) {
        $(".deo-offcanvas-parent").each(function () {
          var $this = $(this)
          var canvas_id = $this.closest(".elementor-element").data("id")
          OffCanvas._close(canvas_id)
        })
      }
    })

    /**
     * Close on Icon
     */
    $(".deo-offcanvas__close").click(function () {
      var $this = $(this)
      var canvas_id = $this.closest(".elementor-element").data("id")
      OffCanvas._close(canvas_id)
    })

    /**
     * Close On Overlay Click
     */
    $(".deo-offcanvas__overlay")
      .off("click.overlaytrigger")
      .on("click.overlaytrigger", function (e) {
        $(".deo-offcanvas-parent").each(function () {
          var $this = $(this)
          var canvas_id = $this.closest(".elementor-element").data("id")
          OffCanvas._close(canvas_id)
        })
      })
  })

  var deoOffcanvas = function ($scope, $) {
    if ("undefined" == typeof $scope) {
      return
    }

    $document.trigger("deo_offcanvas_init", [$scope.data("id")])
  }

  /* Google Map
	-------------------------------------------------------*/
  var deoGoogleMaps = function ($scope, $) {
    if ("undefined" == typeof $scope) {
      return
    }

    var mapEl = $scope.find(".deo-google-map").eq(0),
      locations = mapEl.data("locations"),
      map_style = mapEl.data("custom-style") != "" ? mapEl.data("custom-style") : "",
      map_options = mapEl.data("map_options"),
      predefined_style = mapEl.data("predefined-style") != "" ? mapEl.data("predefined-style") : "",
      info_window_size = mapEl.data("max-width") != "" ? mapEl.data("max-width") : "",
      info_window_opened,
      auto_center = mapEl.data("auto-center"),
      bounds = new google.maps.LatLngBounds(),
      i = ""

    var skins = {
      silver:
        '[{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]',
      retro:
        '[{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}]',
      dark: '[{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}]',
      night:
        '[{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}]',
      aubergine:
        '[{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}]',
      magnesium:
        '[{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]',
      classic_blue:
        '[{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"-40"},{"lightness":"36"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"saturation":"-77"},{"lightness":"28"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"saturation":"-24"},{"lightness":"61"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ff0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"road.local","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}]',
      aqua: '[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]',
      earth:
        '[{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]'
    }

    if ("undefined" != typeof skins[predefined_style]) {
      map_style = JSON.parse(skins[predefined_style])
    }

    ;(function initialize() {
      var latlng = new google.maps.LatLng(locations[0][0], locations[0][1])

      map_options.center = latlng
      map_options.styles = map_style

      if (false == map_options.gestureHandling) {
        map_options.gestureHandling = "none"
      }

      var map = new google.maps.Map($scope.find(".deo-google-map")[0], map_options)

      for (i = 0; i < locations.length; i++) {
        let icon = "",
          lat = locations[i][0],
          lng = locations[i][1],
          enable_iw = locations[i][2],
          title = locations[i][3],
          description = locations[i][4],
          icon_type = locations[i][5],
          icon_url = locations[i][6],
          icon_size = parseInt(locations[i][7]),
          click_open = locations[i][8]

        if ("undefined" === typeof locations[i]) {
          return
        }

        if ("" != lat.length && "" != lng.length) {
          if ("custom" == icon_type) {
            icon = {
              url: icon_url
            }
            if (!isNaN(icon_size)) {
              icon.scaledSize = new google.maps.Size(icon_size, icon_size)
              icon.origin = new google.maps.Point(0, 0)
              icon.anchor = new google.maps.Point(icon_size / 2, icon_size)
            }
          }

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
            title: title,
            icon: icon
          })

          if (locations.length > 1) {
            // Extend the bounds to include each marker's position
            bounds.extend(marker.position)
          }

          if (enable_iw && "iw_open" == click_open) {
            var content_markup =
              '<div class="deo-infowindow-content"><div class="deo-infowindow-title">' + title + "</div>"

            if ("" != description.length) {
              content_markup += '<div class="deo-infowindow-description">' + description + "</div>"
            }
            content_markup += "</div>"

            if ("" != info_window_size) {
              var width_val = parseInt(info_window_size)
              var infowindow = new google.maps.InfoWindow({
                content: content_markup,
                maxWidth: width_val
              })
            } else {
              var infowindow = new google.maps.InfoWindow({
                content: content_markup
              })
            }

            infowindow.open(map, marker)
            info_window_opened = infowindow
          }

          if (enable_iw && "" != locations[i][3]) {
            var infowindow = new google.maps.InfoWindow()

            google.maps.event.addListener(
              marker,
              "click",
              (function (marker, i, content, infowindow) {
                return function () {
                  if (info_window_opened) {
                    info_window_opened.close()
                  }

                  var content_markup =
                    '<div class="deo-infowindow-content"><div class="deo-infowindow-title">' +
                    locations[i][3] +
                    "</div>"

                  if ("" != locations[i][4].length) {
                    content_markup += '<div class="deo-infowindow-description">' + locations[i][4] + "</div>"
                  }

                  content_markup += "</div>"

                  infowindow.setContent(content_markup)

                  if ("" != info_window_size) {
                    var width_val = parseInt(info_window_size)
                    var InfoWindowOptions = { maxWidth: width_val }
                    infowindow.setOptions({ options: InfoWindowOptions })
                  }

                  info_window_opened = infowindow

                  infowindow.open(map, marker)
                }
              })(marker, i, content, infowindow)
            )
          }
        }
      }

      // Auto center
      if (locations.length > 1) {
        if ("center" == auto_center) {
          // Now fit the map to the newly inclusive bounds.
          map.fitBounds(bounds)
        }

        // Restore the zoom level after the map is done scaling.
        var listener = google.maps.event.addListener(map, "idle", function () {
          map.setZoom(map_options.zoom)
          google.maps.event.removeListener(listener)
        })
      }
    })()
  }

  /* Sticky Header
	-------------------------------------------------------*/
  function initStickyHeader() {
    var $stickyHeader = $(".deo-elementor-header--is-sticky")

    $stickyHeader.css({
      top: "-" + $stickyHeader.height() + "px"
    })

    if ($window.scrollTop() > 190) {
      $stickyHeader.addClass("deo-elementor-header--is-scrolling")
      $stickyHeader.css({
        top: ""
      })
    } else {
      $stickyHeader.removeClass("deo-elementor-header--is-scrolling")
    }
  }

  $document.ready(function () {
    initLoadMore()
  })

  $window.on("scroll", function () {
    initStickyHeader()
  })

  $window.on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-nav-menu.default", deoNavMenu)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-video-lightbox.default", deoVideoLightbox)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-before-after.default", deoBeforeAfter)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-testimonials-slider.default", deoTestimonialsSlider)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-hero-slider.default", deoHeroSlider)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-pricing-tables.default", deoPricingToggle)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-projects.default", deoProjectsMasonry)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-projects-slider.default", deoProjectsSlider)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-projects-slider-wide.default", deoProjectsSliderWide)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-services.default", deoServicesMasonry)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-blog-posts.default", deoBlogMasonry)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-offcanvas.default", deoOffcanvas)
    elementorFrontend.hooks.addAction("frontend/element_ready/deo-google-maps.default", deoGoogleMaps)
  })
})(jQuery)
