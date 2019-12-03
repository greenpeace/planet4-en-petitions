const $document = $(document);
$document.ready(function () {
  const $window = $(window);
  // Replace page background
  const $new_bg = $('.page-background');
  if ($new_bg.length) {
    const img = $new_bg.attr('src');
    if (img) {
      $('.page-header-background > img').attr('src', img);
    }
    $new_bg.hide();
  }

  $('.step-info-wrap').click(function () {
    const $parent = $(this).parent()
    if ($parent.hasClass('active')) {
      $parent.removeClass('active');
    } else {
      $('.col').removeClass('active');
      $parent.addClass('active');
    }
  });

  $('.country-select-dropdown').click(function () {
    $(this).parent().toggleClass('active-li');
    $('.country-select-box').toggle();
  });

  $('.country-select-box .country-list li').click(function () {
    const $this = $(this);
    $this.parents('.country-select-box').find('li').removeClass('active');
    $this.addClass('active');
  });

  $('div[class*="__contactDetails"]').click(function () {
    const checkbox = $(this).find('input[type="checkbox"]');
    if (checkbox.prop('checked')) {
      checkbox.prop('checked', false);
    } else {
      checkbox.prop('checked', true);
    }
  });

  $document.on('click', [
    '.navbar-dropdown-toggle',
    '.country-dropdown-toggle',
    '.navbar-search-toggle',
  ].join(), function toggleNavDropdown (evt) {
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

  $document.on('click', function closeInactiveMenus (evt) {
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

  $document.on('click', '.close-navbar-dropdown', function (evt) {
    evt.preventDefault();
    // Proxy to the main navbar close button
    $('.navbar-dropdown-toggle').trigger('click');
  });


  if ($window.width() <= 768) {
    const $searchBox = $('#search .search-box');
    const $searchTrigger = $('#search-trigger');
    let didScroll;
    let lastScrollTop = 0;
    const delta = 5;
    const navbarHeight = $('.top-navigation').outerHeight();

    $window.scroll(function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled () {
      var st = $(this).scrollTop();
      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      }
      if (st > lastScrollTop && st > navbarHeight) {
        $('.top-navigation').removeClass('nav-down').addClass('nav-up');
      } else {
        if (st + $window.height() < $document.height()) {
          $('.top-navigation').removeClass('nav-up').addClass('nav-down');
        }
      }
      lastScrollTop = st;
    }

    const $slider = $('.mobile-menus');

    $document.click(function () {
      const $menu = $('.menu');
      if ($menu.hasClass('active')) {
        //Hide the menus if visible
        $slider.animate({
          left: parseInt($slider.css('left'), 10) == 0
            ? -320
            : 0
        });
        $menu.removeClass('active');
      }
      if ($('.search-box').hasClass('active')) {
        //Hide the search if visible
        $searchBox.slideToggle().toggleClass('active');;
      }
    });

    $('.menu').click(function (event) {
      event.stopPropagation();
      $(this).toggleClass('active');
      $slider.animate({
        left: parseInt($slider.css('left'), 10) == -320 ?
          0 : -320
      });
    });

    $searchTrigger.on('click', function (event) {
      event.stopPropagation();
      $searchBox.slideToggle().toggleClass('active');
    });
  };

  $('.en__field__label').hide();
  $('.en__field__input--radio').next().show();

  $('input, select')
    .not('[type="radio"]')
    .not('[type="checkbox"]')
    .addClass('form-control');
  $('input, select').not('[type="checkbox"]').parent().not('.nav-search-wrap').addClass('form-group');

  $('input[name="transaction.ccvv"]').addClass('ccvv');

  $('.en__field__element--text').css('display', 'block');

  $('.en__field').css('padding-bottom', '0');

  $('.en__field__input--checkbox').parent().find('label')
    .css('display', 'block')
    .addClass('form-check-label')
    .css('margin-top', '-25px')
    .css('margin-left', '25px');

  $('.en__submit').find('button').addClass('btn btn-primary btn-block');

  $('.en__field--text').each(function () {
    const $this = $(this)
    const input = $this.find('input');
    const label = $this.find('label');
    const labelText = label.text();
    input.attr('placeholder', labelText);
  });

  // Navbar & Footer links
  var p4_site_url = 'https://www.greenpeace.org/international/';
  var p4_site_act_page = 'https://www.greenpeace.org/international/act/';
  var p4_site_explore_page = 'https://www.greenpeace.org/international/explore/';
  var p4_site_donate_btn = 'https://secured.greenpeace.org/international/en/supportus/?_ga=2.256767427.937523877.1515410303-280997801.1515410303';


  function search_form () {
    var searchme = $("#searchme").val();
    window.location = p4_site_url + "?orderby=relevant&s=" + searchme;
    return false;
  }

  if (typeof p4_site_act_page !== 'undefined' && p4_site_act_page != '') {
    $('a#act_page').attr('href', p4_site_act_page);
  }
  if (typeof p4_site_explore_page !== 'undefined' && p4_site_explore_page != '') {
    $('a#explore_page').attr('href', p4_site_explore_page);
  }
  if (typeof p4_site_donate_btn !== 'undefined' && p4_site_donate_btn != '') {
    $('a#donate_page').attr('href', p4_site_donate_btn);
  }
  if (typeof p4_fb_page !== 'undefined' && p4_fb_page != '') {
    $('a#fb_page').attr('href', p4_fb_page);
  }
  if (typeof p4_twitter_page !== 'undefined' && p4_twitter_page != '') {
    $('a#tw_page').attr('href', p4_twitter_page);
  }
  if (typeof p4_yt_page !== 'undefined' && p4_yt_page != '') {
    $('a#yt_page').attr('href', p4_yt_page);
  }
  if (typeof p4_instagram_page !== 'undefined' && p4_instagram_page != '') {
    $('a#insta_page').attr('href', p4_instagram_page);
  }
  if (typeof p4_site_news_page !== 'undefined' && p4_site_news_page != '') {
    $('a#news_page').attr('href', p4_site_news_page);
  }
  if (typeof p4_site_about_page !== 'undefined' && p4_site_about_page != '') {
    $('a#about_page').attr('href', p4_site_about_page);
  }
  if (typeof p4_site_jobs_page !== 'undefined' && p4_site_jobs_page != '') {
    $('a#jobs_page').attr('href', p4_site_jobs_page);
  }
  if (typeof p4_site_press_page !== 'undefined' && p4_site_press_page != '') {
    $('a#press_page').attr('href', p4_site_press_page);
  }
  if (typeof p4_site_privacy_page !== 'undefined' && p4_site_privacy_page != '') {
    $('a#privacy_page').attr('href', p4_site_privacy_page);
  }
  if (typeof p4_community_policy_page !== 'undefined' && p4_community_policy_page != '') {
    $('a#community_policy_page').attr('href', p4_community_policy_page);
  }
  if (typeof p4_search_archive_page !== 'undefined' && p4_search_archive_page != '') {
    $('a#search_archive_page').attr('href', p4_search_archive_page);
  }
});
