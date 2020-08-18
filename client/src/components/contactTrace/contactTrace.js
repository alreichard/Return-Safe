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

    const [traceInfo, setTraceInfo] = useState([])
    const [userCompare, setUserCompare] = useState([])
    const [checkinData, setCheckinData] = useState([])


    useEffect(() => {
        API.getLocations(user.id, lowDate, highDate)
            .then(res => {
                console.log("This is what we want")
                console.log(res.data[0].locations)
                
               
             runTracer(res.data[0].locations)
               
            })

    }, [])
    function runTracer(traceInfo) {
        console.log("itmade it")
        console.log(traceInfo)
        for (var i = 0; i<traceInfo.length; i++) {
         
            API.contactTrack(traceInfo[i].time, traceInfo[i].minutes, traceInfo[i].longitude.$numberDecimal, traceInfo[i].latitude.$numberDecimal, lowDate, highDate, user.id)
                .then(res => {
                    console.log("anything")
                    
                    console.log(res)
                    checkinInfo(res)
                })
        }
    }
    function checkinInfo(userCompare){
    for (var c = 0; c<userCompare.length; c++){
        API.find(userCompare[c]._id, lowDate, highDate)
        .then(res => {
            console.log("anything")
            setCheckinData(res)
            console.log(res)
            

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
