// Require React Methods and components.
var React = require('react');

// Requires the App's components.
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');
var Popular = require('./Popular');
var Me = require('./Me');
var Nav = require('./Nav');

// Require and setup the React routing system.
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


// The App class
class App extends React.Component {

    // Render
    render() {
        return (

            // Routing component
            <Router>
                <div className='container'>
                    {/* Navbar component coming from the ./Nav.js */}
                    <Nav />

                    {/* React Switch */}
                    <Switch>

                        {/* Routes calling on components through GET requests */}
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/Popular' component={Popular} />
                        <Route path='/Me' component={Me} />

                        {/* Wrongfull Path 404 render page. */}
                         <Route render={function () {
                            return (
                                <div className="fourOwFour">
                                    <h1>404 Not Found</h1>
                                    <img 
                                        src='https://media.licdn.com/dms/image/C4D03AQE_NUyiAQoIgw/profile-displayphoto-shrink_100_100/0?e=1529341200&v=beta&t=7dhd9dbUPypGCPxuAn20gZIaDtZs9ikdwQDD9npGs6E'
                                        alt="Thibs"
                                    />
                                    <p>Leave now or Agent 47 will deal with you! <br /> Permanently!</p>
                                </div>
                        );
                        }}/>
                        
                    </Switch>
                </div>
            </Router>
        )
    }
}

// exports App.js so it can be required
module.exports = App;