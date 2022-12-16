var map, service;

function initMap() {
  const mapOptions = {
    zoom: 8,
    center: { lat: 11.412, lng: 76.704 },
  };
  map = new google.maps.Map(document.getElementById("ooty-taxi-map-content"), mapOptions);
  const marker = new google.maps.Marker({
    position: { lat: 11.412, lng: 76.704 },
    map: map,
    title: "Ooty Taxi",
  });
  const infowindow = new google.maps.InfoWindow({
    //content: `<p>Marker Location:${marker.getPosition()}<span class="map_title_display">Ooty Taxi</span></p>`,
    content: `<p>Ooty<span class="map_title_display">Taxi</span></p>`,
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
      let reviewEl = document.querySelector('.owl-carousel');
      for (let review of place.reviews){
        reviewEl.innerHTML =`<div class="home1-testm item">
                                <div class="home1-testm-single text-center">
                                    <div class="home1-testm-img">
                                        <img src="${review.profile_photo_url}" alt="img"/>
                                    </div>
							        <div class="home1-testm-txt">
							  	      <span class="icon section-icon">
							  	        <i class="fa fa-quote-left" aria-hidden="true"></i>
							  	      </span>
							  	      <p>${review.text}</p>
							  	      <h3><a href="#">${review.author_name}</a></h3>
							  	      <h4>${starmapping(review.rating)}</h4>
							        </div>
						        </div>
                            </div>`;
                        }
        
    }
  }
}

//google.maps.event.addDomListener(window, 'load', initMap);
window.addEventListener('load', (event) => { initMap });
window.initMap = initMap;

function starmapping(quantify) {
    let starquantify='';
    quantify = Number(quantify);
    for ( let i = 0; i < quantify; i++) {
      starquantify += '&#11088;';
    }
    return starquantify;
  }

/*function searchResult(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    // show first result on map and request for details
    var place = results[0];
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
    var infowindow = new google.maps.InfoWindow({
      content: place.name
    });
    infowindow.open(map, marker);

    service.getDetails({placeId: place.place_id}, function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let rating = document.querySelector('#rating');
        let reviewEl = document.querySelector('.review-list');
        
        rating.innerHTML = place.rating;
        
        for (let review of place.reviews){
          let li = document.createElement('li');
          li.innerHTML = `<div>Author: ${review.author_name}</div>
                          <em>${review.text}</em>
                          <img src="${review.profile_photo_url}" alt="Customer Image">
                          <div>Rating: ${review.rating} star(s)</div>`;
          reviewEl.appendChild(li);
          console.log(review);
        }
      }
    });
  }
}*/
