import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from "axios";
import './Join.css';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';


class Join extends Component {
    constructor(props) {
        super(props)

        this.state = {
            classes: [],
            cal_id: null
        }
        this.selectCal = this.selectCal.bind(this)
        this.submitCalendar = this.submitCalendar.bind(this)
    }

    componentDidMount() {
        axios.get(`api/calendars/get/2`).then(response => {
            this.setState({ classes: response.data })
        })
    }

    selectCal(calendar_id){
        this.setState({
            cal_id: calendar_id
        })
        console.log(this.state.cal_id)
    }

    submitCalendar(){
        axios.post(`/api/usercalendar/add/6/${this.state.cal_id}`).then( response => {
            console.log(response)
        })
    }

    render() {
        console.log(this.state.classes)
        return (
            <div className="classes-container">
                <MediaQuery query="(min-width: 1024.1px)">
                <Modal open={true}>
                    <Modal.Header>Select a Teacher</Modal.Header>
                    <Modal.Description>
                    
                        <div className="join-class-column"> 
                    <span>Teacher</span><span>Days of Week</span>
                </div>
                {this.state.classes.map((clss, index) => {
                    return (
                        <button className='classes' onClick={() => this.selectCal(clss.calendar_id)}>
                            <div className="teacher-and-days">
                                <span>{clss.calendar_name}</span>
                                <span>{clss.days}</span>
                            </div>
                        </button>
                    )
                })}
                <Link to="/dashboard" className="submit-btn"><button  onClick={this.submitCalendar}>Submit</button></Link>
                       
                    </Modal.Description>
                </Modal>
                </MediaQuery>

                <MediaQuery query="(max-width: 1024px)">                
                <div className="join-class-column"> 
                    <span>Teacher</span><span>Days of Week</span>
                </div>
                {this.state.classes.map((clss, index) => {
                    return (
                        <button className='classes' onClick={() => this.selectCal(clss.calendar_id)}>
                            <div className="teacher-and-days">
                                <span>{clss.calendar_name}</span>
                                <span>{clss.days}</span>
                            </div>
                        </button>
                    )
                })}
                <Link to="/dashboard" className="submit-btn"><button  onClick={this.submitCalendar}>Submit</button></Link>
                </MediaQuery>
                
            </div>
        )
    }
}


function mapStatetoProps(state) {
    return {
        user: state.user,
        email: state.email
    }
}

export default (connect(mapStatetoProps)(Join))