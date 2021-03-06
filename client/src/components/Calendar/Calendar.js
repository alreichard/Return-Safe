import React from "react";
import { Calendar as ReactCal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Calendar.css"

export default function Calendar(props) {

    return (

        <div>
            <section className={props.showCalendar ? "center" : "center hide-on-med-and-down"}>

                <div>
                    <ReactCal
                        onChange={props.onChange}
                        value={props.currentDate}
                        maxDate={new Date()}
                    />
                </div>
            </section>
        </div>
    )
}