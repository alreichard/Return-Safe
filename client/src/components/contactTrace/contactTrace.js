import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatBox from "./statBox"
import API from '../../utils/API';

function ContactTrace(props) {
    const { user } = props.auth

    let lowDate = new Date(props.currentDate.toDateString());
    let date = new Date(props.currentDate);
    let highDate = new Date(date.setHours(23, 59, 59, 999));

    
    const [allPoints, setAllPoints] = useState([])
    const [checkinData, setCheckinData] = useState([])


    useEffect(() => {
        API.getLocations(user.id, lowDate, highDate)
            .then(res => {
                
                
               
             runTracer(res.data[0].locations)
               
            })

    }, [])
    function runTracer(traceInfo) {
        
        
        for (var i = 0; i<traceInfo.length; i++) {
         console.log(traceInfo[i].time, traceInfo[i].minutes, parseFloat(traceInfo[i].longitude.$numberDecimal), parseFloat(traceInfo[i].latitude.$numberDecimal), lowDate, highDate, user.id)
            API.contactTrack(traceInfo[i].time, traceInfo[i].minutes, traceInfo[i].longitude.$numberDecimal, traceInfo[i].latitude.$numberDecimal, lowDate, highDate, user.id)
                .then(res => {
                    console.log(res)
                    // setAllPoints(allPoints.concat(res))
                    checkinInfo(res)
                })
        }
    }
    function checkinInfo(userCompare){
        console.log(userCompare.data)
    for (var c = 0; c<userCompare.data.length; c++){
        console.log(userCompare.data[c]._id)
        API.find(userCompare.data[c]._id, lowDate, highDate)
        .then(res => {
           
            setCheckinData(res)
            if (res.data[0].checkins) {
                console.log(res.data[0].checkins);
            } else {console.log("none to give")}
           
            
        })
    }
    }




    return (
        <StatBox></StatBox>
    )
}
ContactTrace.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(ContactTrace);
