import React, { Component } from "react"
import "bulma/css/bulma.min.css"
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Router>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="#">
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  width="112"
                  height="28"
                />
              </a>

              <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start kanitlight">
                <Link to="/" className="navbar-item">
                  แดชบอร์ด
                </Link>

                <Link className="navbar-item">วิเคราะห์</Link>

                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link">แก้ไขข้อมูลในระบบ</Link>

                  <div className="navbar-dropdown">
                    <Link to="/vitalsign" className="navbar-item">
                      คำแนะนำสัญญาณชีพ
                    </Link>
                    <Link to="/disease" className="navbar-item">
                      คำแนะนำต่อโรค
                    </Link>
                    <Link to="/range" className="navbar-item">
                      เกณฑ์การแบ่งความเสี่ยง
                    </Link>
                    <hr className="navbar-divider" />
                    <Link className="navbar-item">Report an issue</Link>
                  </div>
                </div>

                <Link to="/" className="navbar-item">
                  จำลองข้อมูล
                </Link>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons kanit">
                    <Link className="button is-primary">
                      <strong>สมัครใช้งาน</strong>
                    </Link>
                    <Link className="button is-light">ล็อกอิน</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <Switch>
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
