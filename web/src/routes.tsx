import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import isAuthenticated from './auth'

import Landing from './pages/Landing';
import NewPost from './pages/NewPost';
import NewsDetails from './pages/NewsDetails';
import ReportDetails from './pages/ReportDetails';
import ReportPost from './pages/ReportPost';
import DeathReports from './pages/DeathReports';
import PopNewsPage from './pages/PopNewsPage';
import PopNewsDetail from './pages/PopNewsDetails';
import PopNewPost from './pages/PopNewsPost';
import NewsPage from './pages/NewsPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Options from './pages/Options';
import SportsPage from './pages/SportsPage';
import SportsPost from './pages/SportsPost';
import SportsDetail from './pages/SportDetails';


const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
            )
    )} />
)

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/newspage" component={NewsPage} />
                <Route path="/deathreports" component={DeathReports} />
                <Route path="/report-detail/:id" component={ReportDetails} />
                <PrivateRoute path="/report-post" component={ReportPost} />
                <PrivateRoute path="/news-post" component={NewPost} />
                <Route path="/news-detail/:id" component={NewsDetails} />
                <Route path="/popnews" component={PopNewsPage} />
                <Route path="/popnews-detail/:id" component={PopNewsDetail} />
                <PrivateRoute path="/popnews-post" component={PopNewPost} />
                <Route path="/sports" component={SportsPage} />
                <PrivateRoute path="/sports-post" component={SportsPost} />
                <Route path="/sports-detail/:id" component={SportsDetail} />
                <PrivateRoute path="/options" component={Options} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;