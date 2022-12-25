var map, service;
let review_data_map = [];
function initMap() {
  const mapOptions = {
    center: { lat: 11.412, lng: 76.704 },
    zoom: 15,
    gestureHandling: "none",
    zoomControl: false,
  };
  map = new google.maps.Map(document.getElementById("ooty-taxi-map-content"), mapOptions);
  const marker = new google.maps.Marker({
    position: { lat: 11.412, lng: 76.704 },
    map: map,
    title: "Ooty Taxi",
  });
  const infowindow = new google.maps.InfoWindow({
    content: `<p class="map_title_display">Ooty<span>&nbsp;Taxi</span></p>`+
    `<div><p>#9/11, Abu Sait Street, Main Bazzar, The Nilgiris Fernhill Post, Ooty Tamilnadu, India</p></div>`,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });
  infowindow.open(map, marker);

  service = new google.maps.places.PlacesService(map);
  var request = {
    placeId: 'ChIJqfItYyuWqDsRjBHi9Xa-URM',
    fields: ['reviews'],
  };
  service.getDetails(request, callback);
  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      const review_img = document.querySelectorAll(".reviewer_img");
      const review_content = document.querySelectorAll(".review_content");
      const reviewer_name = document.querySelectorAll(".reviewer_name");
      const review_star = document.querySelectorAll(".review_stars");
      let j=0;
      if (review_data_map.length !=5) {
        for (let review of place.reviews) {
          review_data_map[j] = {name: review.author_name, namelink: review.author_url, photo: review.profile_photo_url, content: review.text, stars: review.rating}
          j++;
        }
      }
      let i = 0;
      for(let j=0; j<review_star.length; j++) {
        review_img[j].src=review_data_map[i].photo;
        review_content[j].innerHTML = review_data_map[i].content;
        reviewer_name[j].innerHTML = review_data_map[i].name;
        reviewer_name[j].href = review_data_map[i].namelink;
        review_star[j].innerHTML = starmapping(review_data_map[i].stars);
        i++;
        if (i === 5) {
          i=0;
        }
      }
    }
  }
}

window.addEventListener('load', (event) => { initMap;});
window.initMap = initMap;

function starmapping(quantify) {
    let starquantify='';
    quantify = Number(quantify);
    for ( let i = 0; i < quantify; i++) {
      starquantify += '&#11088;';
    }
    return starquantify;
  }
