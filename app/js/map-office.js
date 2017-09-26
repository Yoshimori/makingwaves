function myMap() {
		var mapProp = {
		    center:new google.maps.LatLng(50.457733,20.710786,17),
		    zoom:14,
		};
		var map = new google.maps.Map(document.getElementById("main-map"),mapProp);


  		var icons = {
	      info: {
	        icon: 'http://efcf.football/wp-content/themes/etcf/pointer-new.png'
	      }
	    };

	    var features = [
	    	 {
            position: new google.maps.LatLng(50.457733,20.710786,17),
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

