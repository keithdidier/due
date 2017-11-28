import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer'
import SideNav from '../navbar/SideNav.js';
import MobileNav from '../navbar/MobileNav.js';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'



class Class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [],
            topFive: [],
        }
    }

    componentDidMount() {
        this.props.getUser()
        console.log(this.props)
        console.log(this.props.user.user_id)

        axios.get(`/api/assignments/get/class/${this.props.user.user_id}/${this.props.classId}`).then(
            response => {
                console.log('get class response', response)
                response.data.map((event, index) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)

                })
                this.setState({
                    events: response.data
                })
                console.log(this.state.events)
            })
                console.log(this.props)
            axios.get(`/api/assignments/get/topfiveclass/${this.props.user.user_id}/${this.props.calId}`).then(response => {
                console.log('top five response', response)
                this.setState({ topFive: response.data })
            })

            
            
    }

   
    componentWillReceiveProps(newProps) {
        console.log(newProps.calId)

        axios.get(`/api/assignments/get/class/${newProps.user.user_id}/${newProps.calId}`).then(
            response => {
                console.log('get class response', response)
                response.data.map((event, index) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)

                })
                this.setState({
                    events: response.data
                })
                console.log(this.state.events)
            })
            axios.get(`/api/assignments/get/topfiveclass/${this.props.user.user_id}/${newProps.calId}`).then(response => {
                console.log('top five response', response)
                this.setState({ topFive: response.data })
            })

            
    }

    render() {

        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
          }

        return (
            <div className='class'>
                <MediaQuery query="(min-width: 1024.1px)">
                    <SideNav />
                    <div className='dashboardContainer'>



                        {this.state.topFive.length !== 0 ?
                            <div className="upcomingContainer">
                                {
                                    this.state.topFive.map((assignment, index) => {

                                        return (
                                            <div className="upcomingAssignment">
                                                <div className="assignmentContainer">
                                                    <div className="assignmentDisplay">
                                                        <span className="title">{assignment.title}</span>
                                                        <span className="class">Class: {assignment.desc}</span>
                                                        <span className="dueDate">{formatDate(new Date(assignment.start))}</span>
                                                        <span className="pointsPoss">Points possible: {assignment.points_possible}</span>
                                                        {/* <input type="checkbox" value={assignment.complete}/> */}
                                                    </div>
                                                </div>
                                                {index < this.state.topFive.length - 1 ? <div className="separator"></div> : null}
                                            </div>
                                        )


                                    })
                                }
                            </div>


                            :
                            <div className="upcomingContainer">
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                            </div>

                        }


                        <div className="calendarWrapper">
                            <BigCalendar
                                events={this.state.events}
                                //   views={{month: true, week: true}}
                                // views={allViews}
                                step={60}
                                defaultDate={new Date()}
                            />
                        </div>
                    </div>

                </MediaQuery>
                <MediaQuery query="(max-width: 1024px)">
                    <MobileNav />
                    <div className="calendarWrapper">
                        <BigCalendar
                            events={this.state.events}
                            views={{ month: true, week: true }}
                            // views={allViews}
                            step={60}
                            defaultDate={new Date()}
                        />
                    </div>
                </MediaQuery>
            </div>
        )
    }
}




function mapStatetoProps(state) {
    return {
        user: state.user,
        calId: state.calId,
    }

}

export default (connect(mapStatetoProps, { getUser })(Class))