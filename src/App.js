import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {Header} from './components/ui/Header';
import {UserView} from './components/user/UserView';
import {UserUpdate} from './components/user/UserUpdate';
import {PatientView} from './components/patient/PatientView';
import {PatientUpdate} from './components/patient/PatientUpdate';
import {AppointmentView} from './components/appointments/AppointmentView';
import {AppointmentUpdate} from './components/appointments/AppointmentUpdate';
import {AvailabilityView} from './components/availabilities/AvailabilityView';
import {AvailabilityUpdate} from './components/availabilities/AvailabilityUpdate';

export const App = () => {
    return <Router>
                <Header/>
                <Switch>
                    <Route exact path='/' component={UserView} />
                    <Route exact path='/user/' component={UserView} />
                    <Route exact path='/user/edit/:userId' component={UserUpdate} />
                    <Route exact path='/patient/' component={PatientView} />
                    <Route exact path='/patient/edit/:patientId' component={PatientUpdate} />
                    <Route exact path='/appointment/' component={AppointmentView} />
                    <Route exact path='/appointment/edit/:appointmentId' component={AppointmentUpdate} />
                    <Route exact path='/availability/' component={AvailabilityView} />
                    <Route exact path='/availability/edit/:availabilityId' component={AvailabilityUpdate} />
                    <Redirect to='/'/>
                </Switch>
            </Router>
}
