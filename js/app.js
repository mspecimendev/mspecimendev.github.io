var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
  name: 'Male Specimen+', // App name
  theme: 'auto', // Automatic theme detection
  colors: {
    primary: '#ceaa42',
  },
  darkMode: true,
  el: '#app', // App root element

  // App store
  store: store,
  // App routes
  routes: routes,
  // Register service worker
  serviceWorker: {
    path: '/service-worker.js',
  },


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova,
    scrollIntoViewCentered: device.cordova,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});
var swiper = new Swiper(".swiper-orbit", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });


 var swiper = new Swiper(".swiper-thumbnail-portrait", {
      slidesPerView: 3,
      spaceBetween:8,
      loop: true,
      pagination: {
        el: ".swiper-pagination-portrait",
        clickable: true,
      },
      breakpoints: {
        "@0.00": {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        "@0.75": {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        "@1.00": {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        "@1.50": {
          slidesPerView: 5,
          spaceBetween: 5,
        },
      },
    }); 

    var swiper = new Swiper(".swiper-thumbnail-landscape", {
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: ".swiper-pagination-landscape",
        clickable: true,
      },
     breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        750: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1500: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
    });  

////////////////////////////////////////////////////////

function home_load_orbit(api) {
  return fetch(api)
    .then(response => response.json())
    .then(data => {
      const orbit_items = data.orbit;
      let html = '';

      if (data.error || (orbit_items.length === 0)) {
        console.log("Error: Home > Orbit > No Data Found");
      } else {
        for (let i = 0; i < orbit_items.length; i++) {
          const item = orbit_items[i];
          const title = item.text_title;
          const topheader = item.text_topheader || '';
          const buttonText = item.button_text || '';
          const img_small = item.image_small;  
          const show_category = item.show_category ;
          const content_year = item.content_year ;
          const content_episode= item.content_episode ;

          html += `
            <div class="swiper-slide">
              <img class="img-gradient img-fade-in" src="${img_small}" onload="this.classList.add('loaded')" loading="lazy">
              <div class="orbit-container">
                <div class="orbit-topheader">${topheader}</div>
                <div class="orbit-header">${title}</div>
                <div class="orbit-subheader">${content_year}
                  <span class="middot">&#x25cf;</span> ${show_category}
                  <span class="middot">&#x25cf;</span> ${content_episode}
                </div>
                <div class="orbit-button">
                  <a href="/show/" class="link button button-fill button-large button-round orbit-home-button">
                    <i class="icon material-icons if-md">play_arrow</i>${buttonText}
                  </a>
                </div>
                                      <p class="segmented segmented-raised orbit-segmented">
                        <button class="button"><i class="icon material-icons if-md">info</i> ABOUT </button>
                        <button class="button"> <i class="icon material-icons if-md">bookmark_add</i> ADD TO LIST</button>
                      </p>
                      <div class="orbit-text">
                        Squid Game Season 2 continues the deadly competition, with new players, higher stakes, and returning characters as the mysterious game expands its twisted reach.
                      </div>
              </div>
            </div>
          `;
        }
        $('#swiper-orbit-container').html(html);
      }
    })
    .catch(error => {
      console.error(error);
      console.log("Error: Home > Orbit > URL Problem");
    });
}


function home_load_section(id, api) {
  return fetch(api)
    .then(response => response.json())
    .then(data => {
      const home_newlyadded = data.home_newlyadded;
      let html= '';

      if (data.error || (home_newlyadded.length === 0)) {
        console.log("Error: Home > " + id + " > No Data Found ");
      } else {
        for (let i = 0; i < home_newlyadded.length; i++) {
          const item = home_newlyadded[i];
          const title = item.title;
          const thumbnail_url = item.thumbnail_url;
          const episode_number = item.episode_number;

          html += `
            <div class="swiper-slide">
              <a href="#" class="link no-ripple">
                <img src="${thumbnail_url}" class="img-responsive img-fade-in" onload="this.classList.add('loaded')" loading="lazy">
              </a>
              <div class="swiper-thumbnail-container">
                <div class="swiper-thumbnail-title">${title}</div>
                <div class="swiper-thumbnail-subtitle">Episode ${episode_number}</div>
              </div>
            </div> 
          `;
        }
        $('#block-header-'+id).text(id.replace('-', ' '));
        $('#'+id).html(html);
      }
    })
    .catch(error => {
      console.error(error);
      console.log("Error: Home > " + id + " > Url Problem");
    });
}

home_load_orbit('https://mistersoftheusa.com/_ms/plus/api/home_orbit.php');
home_load_section('newly-added', 'https://mistersoftheusa.com/_ms/plus/api/home_newly_added.php');
home_load_section('originals', 'https://mistersoftheusa.com/_ms/plus/api/home_originals.php');
home_load_section('series', 'https://mistersoftheusa.com/_ms/plus/api/home_series.php');
home_load_section('features', 'https://mistersoftheusa.com/_ms/plus/api/home_features.php');

app.ptr.create('.ptr-content');

$(document).on('ptr:refresh', '.ptr-content', function (e) {
  console.log("Pull to Refresh Triggered");

  Promise.all([
    home_load_orbit('https://mistersoftheusa.com/_ms/plus/api/home_orbit.php'),
    home_load_section('newly-added', 'https://mistersoftheusa.com/_ms/plus/api/home_newly_added.php'),
    home_load_section('originals', 'https://mistersoftheusa.com/_ms/plus/api/home_originals.php'),
    home_load_section('series', 'https://mistersoftheusa.com/_ms/plus/api/home_series.php'),
    home_load_section('features', 'https://mistersoftheusa.com/_ms/plus/api/home_features.php')
  ]).finally(() => {
    // When done, close PTR
    app.ptr.done();
  });
});


