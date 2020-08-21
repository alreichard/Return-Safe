import API from "../API"




export default{
    
    showPosition: function(position, user) {

       console.log(user)
    
    var lat = position.coords.latitude
    var lon = position.coords.longitude

    console.log(lat)

    var lonLat = JSON.parse(localStorage.getItem("dist"));
 

    var oldLon_id = lonLat[0]
    var oldLat_id = lonLat[1]
  

    console.log(Math.abs(lon - oldLon_id) + ">" +  (.0000898 / Math.cos(lat)))
    console.log((.0000895 / Math.sin(90 - lon)))


    // if (Math.abs(lon - oldLon_id) >  (.0000898 / Math.cos(lat)) || Math.abs(lat - oldLat_id) >  (.0000895 / Math.sin(90 - lon))) {
        var duration = JSON.parse(localStorage.getItem("dur"));
        if (duration >= 10) {
            var start1 = new Date();
            var start = new Date(start1.setHours(0,0,0,0))
            var today = new Date()
            var diff =(today.getTime() - start.getTime()) / 60000;
            const location = 
                {
                  latitude: lat.toString(),
                  longitude: lon.toString(),
                  time: duration,
                  minutes: parseInt(diff)
                }
            API.saveLocation(user.id, location)

        localStorage.setItem("dur", JSON.stringify(0));
        localStorage.setItem("reset", "true");
        
        }
        // duration = 0
        var newLonLat = [lon, lat]
        localStorage.setItem("dist", JSON.stringify(newLonLat));
    // }
}
}
