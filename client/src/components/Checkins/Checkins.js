import React, { useState, useEffect } from "react";
import 'materialize-css';
import { Button, Collection, CollectionItem, Icon } from 'react-materialize';
import "./checkins.css";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Map from "../map/map"
import ContactTrace from "../contactTrace/contactTrace"


function Checkins(props) {
    const [checkins, setCheckins] = useState([]);
    const { user } = props.auth;
    useEffect(() => {

        let lowDate = new Date(props.currentDate.toDateString());
        let date = new Date(props.currentDate);
        let highDate = new Date(date.setHours(23, 59, 59, 999));

        API.find(user.id, lowDate, highDate)
            .then(res => {
                if (res.data[0].checkins) {
                    setCheckins(res.data[0].checkins);
                }
            })
            .catch(err => console.log(err));
    }, [props.currentDate]);

    return (
        <section className="section center col s12 l6" id="dataResults">
            <div className="mapOnCheckinPage">
            <Map currentDate = {props.currentDate} />
            </div>
            <ContactTrace currentDate = {props.currentDate}/>
            <h3 className="checkinLogsTitle">Check-in Logs</h3>

            {props.currentDate.toDateString() === new Date().toDateString() && <Button id="addCheckinButton" className="waves-effect waves-light btn hoverable"><span className="left" onClick={props.displayForm}><i className="small material-icons left">create</i>Add Check-in</span></Button>}

            {checkins.length === 0 ? <section><Icon large className="virusICON">coronavirus</Icon></section> : checkins.map(checkin => {

                return <Collection header={new Date(checkin.date).toLocaleTimeString()} className="row" key={checkin._id} >
                    {
                        Object.keys(checkin).map((item) => {

                            if (checkin[item] && item !== "date" && item !== "_id") {
                                switch (item) {
                                    case "cough":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Cough</CollectionItem>
                                    case "shortnessOfBreath":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Breathlessness</CollectionItem>
                                    case "fatigue":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Fatigue</CollectionItem>
                                    case "bodyAche":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Muscle Aches</CollectionItem>
                                    case "headache":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Headache</CollectionItem>
                                    case "senseLoss":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Loss of senses</CollectionItem>
                                    case "soreThroat":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Sore Throat</CollectionItem>
                                    case "congestion":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Congestion</CollectionItem>
                                    case "nausea":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Nausea</CollectionItem>
                                    case "diarrhea":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>Diarrhea</CollectionItem>
                                    case "temperature":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">{checkin[item] > 100 ? "sick" : "emoji_emotions"}</i>{checkin[item]}</CollectionItem>
                                    case "comments":
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s12">Comments: {checkin[item]}</CollectionItem>
                                    default:
                                        return <CollectionItem key={`${checkin._id}${item}`} className="valign-wrapper col s6"><i className="small material-icons">check</i>{item}</CollectionItem>
                                }
                            }
                        })
                    }
                </Collection>

            })}
        </section>
    )
}

Checkins.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Checkins);