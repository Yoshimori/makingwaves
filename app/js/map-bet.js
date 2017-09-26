 function myMapBet() {
	var mapProp = {
	    center:new google.maps.LatLng(50.471313,20.697743,16),
	    zoom:14,
	};
	var map = new google.maps.Map(document.getElementById("map-bet"),mapProp);


		var icons = {
      info: {
        icon: 'http://efcf.football/wp-content/themes/etcf/pointer-new.png'
      }
    };

    var features = [
    	 {
        position: new google.maps.LatLng(50.471313,20.697743,16),
        type: 'info'
      }
    ];

     features.forEach(function(feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
    });
}