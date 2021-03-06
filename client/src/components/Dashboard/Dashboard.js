import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import Checkins from "../Checkins/Checkins";
import Calendar from "../Calendar/Calendar";
import "./dashboard.css"


class Dashboard extends React.Component {

    state = {
        currentUser: "",
        currentDate: new Date(),
        showData: false,
        showForm: true,
        showCalendar: false
    }

    displayData = () => {
        this.setState({ showData: true, showForm: false, showCalendar: false });
    }

    displayForm = () => {
        this.setState({ showForm: true, showData: false, showCalendar: false });
    }

    displayCalendar = () => {
        this.setState({ showCalendar: true, showData: false, showForm: false });
    }

    onChange = (date) => {
        this.setState({ currentDate: date })
        this.displayData();
    }

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <Header date={this.state.currentDate} />
                <main className="container row mainPageDash">
                    
                    {this.state.showData ? <div id="checkIN"><Checkins displayForm={this.displayForm} currentDate={this.state.currentDate} /> </div> : this.state.showForm ? <div id="checkINForm"><Form displayData={this.displayData} /> </div> : <div></div>}
                    <div><div id="calSpacing" className="hide-on-med-and-down"></div>
                    <div id="dashCal"><Calendar showCalendar={this.state.showCalendar} currentDate={this.state.currentDate} onChange={this.onChange}/> </div></div>
                </main>
                <Footer displayData={this.displayData} displayCalendar={this.displayCalendar} />
            </>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard);