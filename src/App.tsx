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

class App extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            navbarExpand: false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this)
    }

    toggleNavbar() {
        let navbarState = this.state.navbarExpand
        if (navbarState == true) {
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

    render() {
        let navBarMenuEnable = this.state.navbarExpand
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
                                    <Link to="" className="navbar-link">คำแนะนำสัญญาณชีพ</Link>

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
                                    </div>
                                </div>
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <Link to="" className="navbar-link">คำแนะนำโรค</Link>

                                    <div className="navbar-dropdown">
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
                                        <Link to="" className="button is-primary">
                                            <strong>สมัครใช้งาน</strong>
                                        </Link>
                                        <Link to="" className="button is-light">ล็อกอิน</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <Switch>
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
                </Router>
            </div>
        )
    }
}
function Home() {
    return <h2>Home</h2>
}

export default App
