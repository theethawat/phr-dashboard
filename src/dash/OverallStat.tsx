import React, { Component } from "react";
import Firebase from "../Firebase"
import UserFormat from "../Authen/IUserField"
let firestore = Firebase.firestore()
class OverallStat extends Component<any, any> {
    constructor(props: any) {
        super(props)
        let overallUserData: UserFormat[] = []
        this.state = {
            userData: overallUserData,
            userSize: 0
        }
    }

    componentDidMount() {
        firestore.collection("user").get()
            .then(snapshot => {
                let tempUserData: UserFormat[] = []
                if (snapshot.empty) {
                    console.log("No User Data")
                    return
                }
                snapshot.forEach(doc => {
                    let userArticle = doc.data() as UserFormat
                    if (userArticle.inputProgramUser != null) {
                        tempUserData.push(userArticle)
                    }
                    this.setState({
                        userData: tempUserData,
                        userSize: tempUserData.length
                    })
                })
                console.log("User Data")
                console.log(this.state.userData as UserFormat[])
            })
    }
    render() {
        return (<div>
            <h4 className="subtitle is-4">Overall Statistic</h4>
            <div className="card">
                <div className="card-content">
                    <h5 className="subtitle is-5">จำนวนผู้ใช้งานในระบบ {this.state.userSize} คน </h5>
                    <p>หมายเหตุ นับเฉพาะผู้ใช้งานในแอพพลิเคชั่นระบบใหม่เท่านั้น</p>

                </div>
            </div>
        </div>)
    }
}
export default OverallStat