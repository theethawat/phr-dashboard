import React, { Component } from "react"
import OverallStat from "./OverallStat"
class Frontpage extends Component<any, any>{
    render() {
        return (<div className="container">
            <h3 className="kanit subtitle is-3"> Dashboard </h3><hr />
            <OverallStat />

        </div>)
    }
}
export default Frontpage