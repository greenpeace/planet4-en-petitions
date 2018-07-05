$(document).ready(function() {

  // Replace page background
  const new_bg = $('.page-background');
  if (new_bg.length) {
    const img = $(new_bg).attr('src');
    $('.page-header-background > img').attr('src', img);
    $(new_bg).hide();
  }

  $(".step-info-wrap").click(function() {
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
    }
    else {
      $('.col').removeClass('active');
      $(this).parent().addClass('active');
    }
  });

  $('.country-select-dropdown').click(function() {
    $(this).parent().toggleClass('active-li');
    $('.country-select-box').toggle();
  });

  $('.country-select-box .country-list li').click(function() {
    $(this).parents('.country-select-box').find('li').removeClass('active');
    $(this).addClass('active');
  });

  $('div[class*="__contactDetails"]').click(function() {
    let checkbox = $(this).find('input[type="checkbox"]');
    if (checkbox.prop('checked')) {
      checkbox.prop('checked', false);
    } else {
      checkbox.prop('checked', true);
    }
  });

  $(document).on('click', [
    '.navbar-dropdown-toggle',
    '.country-dropdown-toggle',
    '.navbar-search-toggle',
  ].join(), function toggleNavDropdown(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var $button = $(this);
    var target = $button.data('target');
    if (!target) {
      throw new Error('Missing `data-target` attribute: specify the container to be toggled');
    }
    var toggleClass = $button.data('toggle');
    if (!toggleClass) {
      throw new Error('Missing `data-toggle` attribute: specify the class to toggle');
    }

    // Toggle visibility of the target specified via data-target.
    $(target).toggleClass(toggleClass);
    // Toggle aria-expanded attribute.
    $button.attr('aria-expanded', function (i, attr) {
      return attr === 'false' ? 'true' : 'false';
    });
  });

  $(document).on('click', function closeInactiveMenus(evt) {
    var clickedElement = evt.target;
    $('.btn-navbar-toggle[aria-expanded="true"]').each(function (i, button) {
      var $button = $(button);
      var buttonTarget = $($button.data('target')).get(0);
      if (buttonTarget && !$.contains(buttonTarget, clickedElement)) {
        // Spoof a click on the open menu's toggle to close that menu.
        $button.trigger('click');
      }
    });
  });

  $(document).on('click', '.close-navbar-dropdown', function(evt) {
    evt.preventDefault();
    // Proxy to the main navbar close button
    $('.navbar-dropdown-toggle').trigger('click');
  });


  if ($(window).width() <= 768) {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.top-navigation').outerHeight();

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta)
        return;
      if (st > lastScrollTop && st > navbarHeight) {
        $('.top-navigation').removeClass('nav-down').addClass('nav-up');
      } else {
        if (st + $(window).height() < $(document).height()) {
          $('.top-navigation').removeClass('nav-up').addClass('nav-down');
        }
      }
      lastScrollTop = st;
    }

    var $slider = $('.mobile-menus');

    $(document).click(function() {
      if ($('.menu').hasClass('active')) {
        //Hide the menus if visible
        $slider.animate({
          left: parseInt($slider.css('left'), 10) == 0 ?
            -320 : 0
        });
        $('.menu').removeClass('active');
      }
      if ($('.search-box').hasClass('active')) {
        //Hide the search if visible
        $searchBox.slideToggle().toggleClass('active');;
      }
    });

    $('.menu').click(function() {
      event.stopPropagation();
      $(this).toggleClass('active');
      $slider.animate({
        left: parseInt($slider.css('left'), 10) == -320 ?
          0 : -320
      });
    });

    var $searchBox = $('#search .search-box');
    var $searchTrigger = $('#search-trigger');

    $searchTrigger.on('click', function (e) {
      event.stopPropagation();
      $searchBox.slideToggle().toggleClass('active');
    });
  };

  $('.en__field__label').hide();
  $('.en__field__input--radio').next().show();

  $('input').addClass('form-control');
  $('input').parent().addClass('form-group');
  $('select').addClass('form-control');
  $('select').parent().addClass('form-group');
  $('input[type="radio"]').removeClass('form-control');
  $('.nav-search-wrap').removeClass('form-group');

  $('input[name="transaction.ccvv"]').addClass('ccvv');

  $('input[type="checkbox"]').removeClass('form-control');
  $('input[type="checkbox"]').parent().removeClass('form-group');

  $('.en__field__element--text').css("display", "block");

  $('.en__field').css("padding-bottom", "0px");

  $('.en__field__input--checkbox').parent().find('label').css("display", "block");
  $('.en__field__input--checkbox').parent().find('label').addClass("form-check-label");
  $('.en__field__input--checkbox').parent().find('label').css("margin-top", "-25px");
  $('.en__field__input--checkbox').parent().find('label').css("margin-left", "25px");

  $('.en__submit').find('button').addClass('btn btn-primary btn-block');

  $('.en__field--text').each(function () {
    var input = $(this).find('input');
    var label = $(this).find('label');
    var labelText = label.text();
    input.attr('placeholder', labelText);
  });

  // Navbar & Footer links
  var p4_site_url = "https://www.greenpeace.org/international/";
  var p4_site_act_page = "https://www.greenpeace.org/international/act/";
  var p4_site_explore_page = "https://www.greenpeace.org/international/explore/";
  var p4_site_donate_btn = "https://secured.greenpeace.org/international/en/supportus/?_ga=2.256767427.937523877.1515410303-280997801.1515410303";


  function search_form() {
    var searchme = $("#searchme").val();
    window.location = p4_site_url + "?orderby=relevant&s=" + searchme;
    return false;
  }

  if (p4_site_act_page != '') {
    $('a[id="act_page"]').attr('href', p4_site_act_page);
  }
  if (p4_site_explore_page != '') {
    $('a[id="explore_page"]').attr('href', p4_site_explore_page);
  }
  if (p4_site_donate_btn != '') {
    $('a[id="donate_page"]').attr('href', p4_site_donate_btn);
  }
  if (p4_fb_page != '') {
    $('a[id="fb_page"]').attr('href', p4_fb_page);
  }
  if (p4_twitter_page != '') {
    $('a[id="tw_page"]').attr('href', p4_twitter_page);
  }
  if (p4_yt_page != '') {
    $('a[id="yt_page"]').attr('href', p4_yt_page);
  }
  if (p4_instagram_page != '') {
    $('a[id="insta_page"]').attr('href', p4_instagram_page);
  }
  if (p4_site_news_page != '') {
    $('a[id="news_page"]').attr('href', p4_site_news_page);
  }
  if (p4_site_about_page != '') {
    $('a[id="about_page"]').attr('href', p4_site_about_page);
  }
  if (p4_site_jobs_page != '') {
    $('a[id="jobs_page"]').attr('href', p4_site_jobs_page);
  }
  if (p4_site_press_page != '') {
    $('a[id="press_page"]').attr('href', p4_site_press_page);
  }
  if (p4_site_privacy_page != '') {
    $('a[id="privacy_page"]').attr('href', p4_site_privacy_page);
  }
  if (p4_community_policy_page != '') {
    $('a[id="community_policy_page"]').attr('href', p4_community_policy_page);
  }
  if (p4_search_archive_page != '') {
    $('a[id="search_archive_page"]').attr('href', p4_search_archive_page);
  }
});
