import axios from "axios";

export default {

    
    saveLocation: function(id, locationData) {
        console.log("id: " + id);
        console.log("location data: ");
        console.log(locationData);
        return axios.post("/api/mapping/" + id, locationData);
      },
      getLocations: function(id, lowDate, highDate){
        return axios.get(`/api/mapping/${id}/${lowDate}/${highDate}`);
    },
    getBox: function(id){
        return axios.get("/api/mapping/marker/" + id);
     },
    saveCheckin: function(id, checkinData) {
        return axios.post("/api/checkins/" + id, checkinData);
    },
    find: function(id, lowDate, highDate) {
        return axios.get(`/api/checkins/${id}/${lowDate}/${highDate}`);
    },
    contactTrack: function(name, minutes, lon, lat, lowDate, highDate, user) {
        return axios.get(`/api/tracing/${name}/${minutes}/${lon}/${lat}/${lowDate}/${highDate}/${user}`);
    }
    
}
