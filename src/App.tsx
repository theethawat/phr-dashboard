import React, { Component } from "react"
import "bulma/css/bulma.min.css"
import phrLogo from "./text-logo-2.png"
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Hypertension from "./disease/Hypertension"
import Firebase from "./Firebase"
import Weight from "./vitalsign/Weight"
import Diabetes from "./disease/Diabetes"
import Vitalsign from "./vitalsign/Vitalsign"
import EditRange from "./vitalsign/EditRange"
import LoginPhase from "./Authen/LoginPhase"
import Frontpage from "./dash/FrontPage"
let auth = Firebase.auth()

/** Nav bar expand use for expand bulma navigation
 * Handle the login of Google Login by hand display area state
 */
class App extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            navbarExpand: false,
            displayArea: null,
            userName: ''
        }
        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.updateLoginState = this.updateLoginState.bind(this)
        this.logoutHandle = this.logoutHandle.bind(this)
    }

    toggleNavbar() {
        let navbarState = this.state.navbarExpand
        if (navbarState === true) {
            this.setState({
                navbarExpand: false
            })
        }
        else {
            this.setState({
                navbarExpand: true
            })
        }
    }

    updateLoginState(userName: string) {
        let displayingArea = <Switch>
            <Route path="/hypertension">
                <Hypertension />
            </Route>
            <Route path="/diabetes">
                <Diabetes />
            </Route>
            <Route path="/weight">
                <Weight />
            </Route>
            <Route path="/spo2">
                <Vitalsign value="spo2" />
            </Route>
            <Route path="/blood-pressure">
                <Vitalsign value="blood_pressure" />
            </Route>
            <Route path="/glucose">
                <Vitalsign value="glucose" />
            </Route>
            <Route path="/heartrate">
                <Vitalsign value="heart_rate" />
            </Route>
            <Route path="/edit-range">
                <EditRange />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
        if (userName) {
            this.setState({
                displayArea: displayingArea,
                userName: userName
            })
        }
    }

    logoutHandle() {
        auth.signOut().then(() => {
            window.alert("Sign Out Success")
            this.setState({
                userName: ""
            })
        }).catch(err => {
            window.alert("Sign Out Fail " + err)
        })
    }

    componentDidMount() {
        // The Prebuilt Container UI for handling
        let displayingArea = <Switch>
            <Route path="/hypertension">
                <Hypertension />
            </Route>
            <Route path="/diabetes">
                <Diabetes />
            </Route>
            <Route path="/weight">
                <Weight />
            </Route>
            <Route path="/spo2">
                <Vitalsign value="spo2" />
            </Route>
            <Route path="/blood-pressure">
                <Vitalsign value="blood_pressure" />
            </Route>
            <Route path="/glucose">
                <Vitalsign value="glucose" />
            </Route>
            <Route path="/heartrate">
                <Vitalsign value="heart_rate" />
            </Route>
            <Route path="/edit-range">
                <EditRange />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
        // Handling the Authentication State
        auth.onAuthStateChanged(user => {
            if (user) {
                console.log("welcome " + user.email)
                this.setState({
                    displayArea: displayingArea,
                    userName: user.email
                })
            }
            else {
                console.log("Auth State Change has call but no user found")
                this.setState({
                    displayArea: <LoginPhase updateState={this.updateLoginState} />
                })
            }
        })
    }

    render() {
        let navBarMenuEnable = this.state.navbarExpand
        let displayAreaMember = this.state.displayArea
        let loginButtonState = this.state.userName === "" ? "button is-light" : "button is-light is-hidden"
        let logoutButtonState = this.state.userName === "" ? "button is-light is-hidden" : "button is-light"
        return (
            <div>
                <Router>
                    <nav
                        className="navbar"
                        role="navigation"
                        aria-label="main navigation"
                    >
                        <div className="navbar-brand">
                            <a className="navbar-item" href="/">
                                <img
                                    src={phrLogo}
                                    width="114"
                                    height="28"
                                />
                            </a>

                            <a
                                role="button"
                                className={navBarMenuEnable ? "navbar-burger burger is-active" : "navbar-burger burger"}
                                aria-label="menu"
                                aria-expanded="false"
                                data-target="navbarBasicExample"
                                onClick={this.toggleNavbar}
                            >
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" className={navBarMenuEnable ? "navbar-menu is-active" : "navbar-menu"}>
                            <div className="navbar-start kanitlight">
                                <Link to="/" className="navbar-item">
                                    แดชบอร์ด
                </Link>

                                <Link to="/edit-range" className="navbar-item">แก้เกณฑ์การวิเคราะห์</Link>

                                <div className="navbar-item has-dropdown is-hoverable">
                                    <Link to="" className="navbar-link">แก้ไขคำแนะนำ</Link>

                                    <div className="navbar-dropdown">
                                        <Link to="/spo2" className="navbar-item">
                                            ออกซิเจนในเลือด
                    </Link>
                                        <Link to="/glucose" className="navbar-item">
                                            ระดับน้ำตาลในเลือด
                    </Link>
                                        <Link to="/blood-pressure" className="navbar-item">
                                            ความดันโลหิต
                    </Link>
                                        <Link to="/heartrate" className="navbar-item">
                                            อัตราการเต้นของหัวใจ
                    </Link>
                                        <hr className="navbar-divider" />
                                        <Link to="/weight" className="navbar-item">
                                            ภาวะน้ำหนักตัว
                                        </Link>

                                        <hr className="navbar-divider" />

                                        <Link to="/hypertension" className="navbar-item">
                                            โรคความดันโลหิตสูง
                                        </Link>

                                        <Link to="/diabetes" className="navbar-item">
                                            โรคเบาหวาน
                                        </Link>
                                    </div>
                                </div>

                                <Link to="/" className="navbar-item">
                                    จำลองข้อมูล
                </Link>
                            </div>

                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <div className="buttons kanit">
                                        <span className="kanitlight"> {this.state.userName}  </span>
                                        <Link to="" className={loginButtonState}>ล็อกอิน</Link>
                                        <Link to="" onClick={this.logoutHandle} className={logoutButtonState}>ออกจากระบบ</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {displayAreaMember}
                </Router>
                <div >
                    <hr />
                    <p className="kanitlight acenter"> Made with love from Centre for Network Research  Computer Engineering, Prince of Songkla University </p> <br />
                </div>
            </div>
        )
    }
}
function Home() {
    return <Frontpage />
}

export default App
