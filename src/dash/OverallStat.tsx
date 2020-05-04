import React, { Component } from "react";
import Firebase from "../Firebase"
import UserFormat from "../Authen/IUserField"
import IStatUser from "./IOverallStat"
let firestore = Firebase.firestore()
class OverallStat extends Component<any, any> {
    constructor(props: any) {
        super(props)
        let overallUserData: UserFormat[] = []
        let tempAllStatUser: IStatUser = {
            coronary: 0,
            diabetes: 0,
            kidney: 0,
            size: 0
        }
        this.state = {
            userData: overallUserData,
            totalStat: tempAllStatUser
        }
    }

    componentDidMount() {
        firestore.collection("user").get()
            .then(snapshot => {
                let tempUserData: UserFormat[] = []

                // define for create Temp IStatUser Interface
                let coronaryAmount: number = 0
                let diabetesAmount: number = 0
                let kidneyAmount: number = 0
                let size: number = 0


                if (snapshot.empty) {
                    console.log("No User Data")
                    return
                }

                snapshot.forEach(doc => {
                    // Analyzing User Data For Get Amount of People Medical History
                    let userArticle = doc.data() as UserFormat

                    //  Filter only New Version of App will work
                    if (userArticle.inputProgramUser != null) {
                        tempUserData.push(userArticle)
                        size++
                        if (userArticle.kidney == true)
                            kidneyAmount++
                        if (userArticle.coronary == true)
                            coronaryAmount++
                        if (userArticle.diabetes == true)
                            diabetesAmount++
                    }

                    // From the Interface
                    let tempAllUserStat: IStatUser = {
                        coronary: coronaryAmount,
                        diabetes: diabetesAmount,
                        kidney: kidneyAmount,
                        size: size
                    }

                    // Stsate Change
                    this.setState({
                        userData: tempUserData,
                        totalStat: tempAllUserStat
                    })
                })

                // Debug
                console.log("User Data")
                console.log(this.state.userData as UserFormat[])
            })
    }


    render() {
        let userStat = this.state.totalStat as IStatUser
        return (<div>
            <h4 className="subtitle is-4">Overall Statistic</h4>
            <div className="card">
                <div className="card-content">
                    <h5 className="subtitle is-5">จำนวนผู้ใช้งานในระบบ {userStat.size} คน </h5>
                    <div className="columns">
                        <div className="column">
                            <h5 className="subtitle is-6">ผู้มีประวัติป่วยเป็นเบาหวาน {userStat.diabetes}คน</h5>
                        </div>

                        <div className="column">
                            <h5 className="subtitle is-6">ผู้มีประวัติป่วยเป็นโรคไต {userStat.kidney}คน</h5>
                        </div>

                        <div className="column">
                            <h5 className="subtitle is-6">ผู้มีประวัติป่วยเป็นโรคหลอดเลือดหัวใจ {userStat.coronary}คน</h5>
                        </div>
                    </div>
                    <p>หมายเหตุ นับเฉพาะผู้ใช้งานในแอพพลิเคชั่นระบบใหม่เท่านั้น</p>

                </div>
            </div>
        </div>)
    }
}
export default OverallStat