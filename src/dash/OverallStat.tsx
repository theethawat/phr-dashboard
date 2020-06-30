import React, { Component } from "react"
import Firebase from "../Firebase"
import UserFormat from "../Authen/IUserField"
import IStatUser from "./IOverallStat"
import IUserField from "../Authen/IUserField"
let firestore = Firebase.firestore()
class OverallStat extends Component<any, any> {
  constructor(props: any) {
    super(props)
    let overallUserData: UserFormat[] = []
    let tempAllStatUser: IStatUser = {
      coronary: 0,
      diabetes: 0,
      kidney: 0,
      size: 0,
    }
    this.state = {
      userData: overallUserData,
      totalStat: tempAllStatUser,
      allUserCount: 0,
    }
  }

  componentDidMount() {
    firestore
      .collection("user")
      .get()
      .then((snapshot) => {
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

        // Update All User Number
        this.setState({
          allUserCount: snapshot.size as number,
        })

        snapshot.forEach((doc) => {
          // Analyzing User Data For Get Amount of People Medical History
          let userArticle = doc.data() as UserFormat

          //  Filter only New Version of App will work
          if (userArticle.inputProgramUser != null) {
            tempUserData.push(userArticle)
            size++
            if (userArticle.kidney === true) kidneyAmount++
            if (userArticle.coronary === true) coronaryAmount++
            if (userArticle.diabetes === true) diabetesAmount++
          }

          // From the Interface
          let tempAllUserStat: IStatUser = {
            coronary: coronaryAmount,
            diabetes: diabetesAmount,
            kidney: kidneyAmount,
            size: size,
          }

          // Stsate Change
          this.setState({
            userData: tempUserData,
            totalStat: tempAllUserStat,
          })
        })

        // Debug
        console.log("User Data")
        console.log(this.state.userData as UserFormat[])
      })
  }

  render() {
    let userStat = this.state.totalStat as IStatUser
    return (
      <div>
        <h4 className="subtitle is-4">Overall Statistic</h4>
        <div className="card">
          <div className="card-content">
            <table className=" table is-bordered">
              <thead>
                <tr>
                  <th>จำนวนผู้ใช้งานในระบบใหม่ </th>
                  <th>ข้อมูลผู้ใช้งานทั้งหมด </th>
                  <th></th>
                  <th>ผู้มีประวัติป่วยเป็นเบาหวาน</th>
                  <th>ผู้มีประวัติป่วยเป็นโรคไต</th>
                  <th>ผู้มีประวัติป่วยเป็นโรคหลอดเลือดหัวใจ</th>
                  <th>หน่วย</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userStat.size}</td>
                  <td>{this.state.allUserCount} </td>
                  <td></td>
                  <td>{userStat.diabetes}</td>
                  <td> {userStat.kidney} </td>
                  <td>{userStat.coronary} </td>
                  <td> คน </td>
                </tr>
              </tbody>
            </table>

            <p>
              <b>หมายเหตุ</b> นับเฉพาะผู้ใช้งานในแอพพลิเคชั่นระบบใหม่เท่านั้น
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default OverallStat
