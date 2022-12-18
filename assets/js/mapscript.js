var map, service;

function initMap() {
  const mapOptions = {
    center: { lat: 11.412, lng: 76.704 },
    zoom: 17,
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
    content: `<p class="map_title_display">Ooty<span>&nbsp;Taxi</span></p>`,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });

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
      console.log(review_star.length);
      let i=1;
      for (let review of place.reviews){
        review_img[i].src=review.profile_photo_url;
        review_content[i].innerHTML = review.text;
        reviewer_name[i].innerHTML = review.author_name;
        reviewer_name[i].href = review.author_url;
        review_star[i].innerHTML = starmapping(review.rating);
        i++;
        if(i==review_star.length-1) {i = 0;}
        console.log(review);
      }
    }
  }
}

window.addEventListener('load', (event) => { initMap; });
window.initMap = initMap;

function starmapping(quantify) {
    let starquantify='';
    quantify = Number(quantify);
    for ( let i = 0; i < quantify; i++) {
      starquantify += '&#11088;';
    }
    return starquantify;
  }
