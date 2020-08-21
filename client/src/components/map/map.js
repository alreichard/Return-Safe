import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { boxWrapStyle } from './Marker/boxWrapper';
import Marker from "./Marker/markerWrap"
import API from '../../utils/API';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./map.css";
import { AutoInit } from 'materialize-css';

function Map(props) {
    const { user } = props.auth
    const container = useRef();

    const Boxy = ({ text }) => <div class = "box" ref={container} style={boxWrapStyle} ><div class="tri bottom"></div>{text}</div>;
    const [zoomin, setZoom] = useState(9)
    
    useEffect(() => {

        document.addEventListener("mouseup", handleClickOutside);
        
        loadLocations()
        if(!center){
            setCenter([40,-75])
            setZoom(7)
        } 
        
    }, [props.currentDate])


    

    const handleClickOutside = event => {
        
        if (container.current && !container.current.contains(event.target)) {
            setInfoBox({
                text: "",
        long: 0,
        lati:0

            })
            setZoom(12)
        }
    }






    const [mapping, setLocation] = useState([])

    const [center, setCenter] = useState()

    const [infoBox, setInfoBox] = useState({
        text: "",
        long: 0,
        lati:0

    })

    

    // useEffect(() => {
    //     console.log(infoBox)
    // }, [infoBox])

    
    
    
          
    const loadBox = (time, record, lon, lat) => {
        // if (time > 60){
        //     var remake = (time)/60
        //     var remakeArr = String(times).split(".")
            
        // }
        var textIn = ""
        var times = (record-time)/60
        var timesArr = String(times).split(".")
        var hour = timesArr[0]
        if(timesArr.length == 2){
        var minute = parseInt(parseFloat(`.${timesArr[1]}`)*60)
    }else{var minute = "00"}
    if (hour > 12) {
        hour = hour - 12
        textIn = `You arrived at ${hour}:${minute}pm, and stayed for ${time} minutes.`

    } else{textIn = `You arrived at ${hour}:${minute}am, and stayed for ${time} minutes.`}

        console.log(minute)
    //    var times = record.substr(11, 5)
    //    if (parseInt(times.substr(0, 2)) > 12){
    //        times = parseInt(times.substr(0, 2))-12 + ":" + times.substr(3, 2) + "pm"
    //        console.log(times)
    //    } else {times = times + "am"}

           
         console.log(typeof lon) 
    setInfoBox({text: textIn, long:lon, lati:lat})
        var newCenter = []
       
        newCenter.push(lat)
        newCenter.push(lon)
        console.log(newCenter)
        setCenter(newCenter)
        setZoom(16)
          
    }







    function loadLocations() {

        let lowDate = new Date(props.currentDate.toDateString());
        let date = new Date(props.currentDate);
        let highDate = new Date(date.setHours(23, 59, 59, 999));
        console.log(lowDate, highDate)
        API.getLocations(user.id, lowDate, highDate)
        
            .then(res => {
                console.log(res)
                console.log(res)
                var latitudeness = 0
                var longitudeness = 0
                
                for(var i = 0; i < res.data[0].locations.length; i++){
                   longitudeness =  parseFloat(res.data[0].locations[i].longitude.$numberDecimal) + longitudeness
                   latitudeness =  parseFloat(res.data[0].locations[i].latitude.$numberDecimal) + latitudeness
                }
   
                var origin = []
                origin.push(latitudeness/res.data[0].locations.length)
                origin.push(longitudeness/res.data[0].locations.length)

                console.log(origin)

                
                setCenter(origin);
                setLocation(res.data[0].locations);

            



            })
            .catch(err => console.log(err))
    };


    return (
       

        <div className="googleMapLayout">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDpbrCe5t8RSBADdOMb17DP4LVmtV0Zbp4" }}
                center = {center}
                zoom= {zoomin}
                
            >
                
                {mapping.map((location) =>
                    
                    <Marker
                        onClick = {() =>loadBox(location.time, location.minutes, parseFloat(location.longitude.$numberDecimal), parseFloat(location.latitude.$numberDecimal ))}
                         
                        
                    
                        lat={location.latitude.$numberDecimal}
                        lng={location.longitude.$numberDecimal}

                    />
                
                    )}
                  {infoBox.text !== "" ?
                 
                 <Boxy 
                  
                 lat = {infoBox.lati}
                 lng = {infoBox.long}
                 text = {infoBox.text}
                   /> 
                  : <div></div>
                }

            </GoogleMapReact>
            
        </div>
    );




}
Map.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Map);








// import React, { useState, useEffect, useRef } from 'react';
// import GoogleMapReact from 'google-map-react';
// import Marker from './Marker/markerWrap';
// import {boxWrapStyle} from './Marker/boxWrapper';
// // import Marker from "./marker"
// // import API from '../../utils/API';

// function Map() {

//     const container = useRef();

//     const Boxy = ({ text }) => <div ref={container} style = {boxWrapStyle}>{text}</div>;

//     useEffect(() => {

//         document.addEventListener("mouseup", handleClickOutside);

//             }, [])



//     const handleClickOutside = event => {

//         if (container.current && !container.current.contains(event.target)) {
//           setInfoBox("")
//     }
//     }






// //     const [mapping, setLocation] = useState([])

// //     const [center, setCenter] = useState({
// //         latitudeness: "",
// //         longitudeness: ""
// //     })

//     const [infoBox, setInfoBox] = useState({
//         text: "",
//         long: 0,
//         lati: 0
//     })




// //     useEffect(() => {
// //         loadLocations()
// //         loadSpot()
// //     }, [])

//    function loadBox(id, lon, lat) {
//     console.log(handleClickOutside)
//     setInfoBox({text: id, long:lon, lati:lat})


//     // API.getBox(id)
//     // .then(res => {
//     //   console.log(res)

//     }

// //    }

// //     function loadLocations() {



// //         API.getLocations(date)
// //             .then(res => {
// //                 const latitudeness = (res.latitude.reduce((a, b) => (a + b)) / res.length);
// //                 const longitudeness = (res.longitude.reduce((a, b) => (a + b)) / res.length);

// //                 setLocation(res),
// //                 setCenter({longitudeness: longitudeness,  latitudeness: latitudeness})


// //             })
// //             .catch(err => console.log(err))
// //     };


//     return (

//         <div style={{ height: '50vh', width: '50vw' }}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: "AIzaSyDpbrCe5t8RSBADdOMb17DP4LVmtV0Zbp4" }}
//                 defaultCenter = {{
//                     lat: 22.7,
//                     lng: 33
//     }}
//                 // {center}
//                 defaultZoom={9}
//             >
//                 {/* {mapping.map(location => */}

//                     <Marker
//                          onClick = {() =>loadBox("This is text that is written in a box right here", 22.3, 33)}

//                         // style = {MarkStyle}

//                         // lat={location.lat}
//                         // lng={location.lon}
//                         lat = {22.3}
//                         lng = {33}
//                     />
//                     {/* )} */}
//                    {infoBox !== "" ?

//                     <Boxy 

//                     lat = {infoBox.long}
//                     lng = {infoBox.lati}
//                     text = {infoBox.text}
//                       /> : <div></div>
//                    }

//             </GoogleMapReact>
//         </div>
//     );




// }


// export default Map;








// import React, { useState, useEffect, useRef } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { boxWrapStyle } from './Marker/boxWrapper';
// import Marker from "./Marker/markerWrap"
// import API from '../../utils/API';
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import "./map.css";
// import { AutoInit } from 'materialize-css';
// function Map(props) {
//     const [mapping, setLocation] = useState([])
//     const [center, setCenter] = useState()
//     const [infoBox, setInfoBox] = useState({
//         showBox: false,
//         text: "Boxy",
//         lati: 0,
//         long: 0
//     })
//     const [zoomin, setZoom] = useState(9)
//     const { user } = props.auth
//     const container = useRef();
//     const Boxy = ({ text }) => <div ref={container} style={boxWrapStyle} className={infoBox.showBox === false && "hide"}>{text}</div>;
//     useEffect(() => {
//         document.addEventListener("mouseup", handleClickOutside);
//         loadLocations()
//         if(!center){
//             setCenter([40,-75])
//             setZoom(7)
//         } 
//     }, [props.currentDate])
//     const handleClickOutside = event => {
//         if (container.current && !container.current.contains(event.target)) {
//             setInfoBox({
//                 ...infoBox,
//                 showBox: false
//             })
//             setZoom(12)
//         }
//     }
//     // const loadBox = (time, record, lon, lat) => {
//     //    var times = record.substr(11, 5)
//     //    if (parseInt(times.substr(0, 2)) > 12){
//     //        times = parseInt(times.substr(0, 2))-12 + ":" + times.substr(3, 2) + "pm"
//     //    } else {times = times + "am"}
//     //        const textBox = (`You were here for ${time} minutes at ${times}.`)
//     //        var newCenter = []
//     //        newCenter.push(lat)
//     //        newCenter.push(lon)
//     //        setCenter(newCenter)
//     //        setZoom(16)
//     //        setInfoBox({
//     //            showBox: true,
//     //            text: textBox, 
//     //            long:lon, 
//     //            lati:lat
//     //         })
//     // }
//     const clickMarker = (time, lon, lat) => {
//         console.log(time + "<<<<<")
//         setInfoBox({
//             showBox: true,
//             text: `You were here ${time}`,
//             longi: lon,
//             lati: lat

//         })
//     }
//     function loadLocations() {
//         let lowDate = new Date(props.currentDate.toDateString());
//         let date = new Date(props.currentDate);
//         let highDate = new Date(date.setHours(23, 59, 59, 999));
//         API.getLocations(user.id, lowDate, highDate)
//             .then(res => {
//                 console.log(res.data[0].locations)
//                 var latitudeness = 0
//                 var longitudeness = 0
//                 for(var i = 0; i < res.data[0].locations.length; i++){
//                    longitudeness =  parseFloat(res.data[0].locations[i].longitude.$numberDecimal) + longitudeness
//                    latitudeness =  parseFloat(res.data[0].locations[i].latitude.$numberDecimal) + latitudeness
//                 }
//                 var origin = []
//                 origin.push(latitudeness/res.data[0].locations.length)
//                 origin.push(longitudeness/res.data[0].locations.length)
//                 console.log(origin)
//                 setCenter(origin);
//                 setLocation(res.data[0].locations);
//             })
//             .catch(err => console.log(err))
//     };
//     return (
//         <div className="googleMapLayout">
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: "AIzaSyDpbrCe5t8RSBADdOMb17DP4LVmtV0Zbp4" }}
//                 center = {center}
//                 zoom={zoomin}
//             >
//                 {mapping.map((location) =>
//                     <Marker
//                         // onClick = {() =>loadBox(location.time, location.recordedAt, parseFloat(location.longitude.$numberDecimal), parseFloat(location.latitude.$numberDecimal ))}
//                         onClick={() => clickMarker(location.time, parseFloat(location.longitude.$numberDecimal), location.latitude.$numberDecimal)}
//                         lat={location.latitude.$numberDecimal}
//                         lng={location.longitude.$numberDecimal}
//                     />
//                     )}
//                    {infoBox ?
//                     <Boxy 
//                     lat = {-75}
//                     lng = {39}
//                     text = {infoBox.text}
//                       /> : <div></div>
//                    }
//             </GoogleMapReact>
//         </div>
//     );
// }
// Map.propTypes = {
//     auth: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//     auth: state.auth
// });
// export default connect(
//     mapStateToProps
// )(Map);