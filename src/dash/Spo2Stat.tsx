import React, { Component } from "react"
import Firebase from "../Firebase"
import ISpo2 from "../VitalSignInterface/ISpo2"
let firestore = Firebase.firestore()
class Spo2Stat extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      spo2Data: [],
      amount: 0,
      safe: 0,
      risk: 0,
      danger: 0,
    }
  }

  componentDidMount() {
    firestore
      .collection("spo2")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No Snapshot Found")
          return
        }

        let amount = snapshot.size
        this.setState({
          amount: amount,
        })

        let safe = 0
        let risk = 0
        let danger = 0

        snapshot.forEach((doc) => {
          let data: ISpo2 = doc.data() as ISpo2
          if (data.pulseOximeter < 93) danger++
          else if (data.pulseOximeter >= 93 && data.pulseOximeter <= 96) risk++
          else if (data.pulseOximeter > 96) safe++

          this.setState({
            safe: safe,
            risk: risk,
            danger: danger,
          })
        })
      })
      .catch((err) => {
        console.log("Error Found" + err)
      })
  }

  percentCalculate(amount: number, allAmount: number): number {
    return (amount * 100) / allAmount
  }

  render() {
    let amount = this.state.amount as number
    let safe = this.state.safe as number
    let risk = this.state.risk as number
    let danger = this.state.danger as number

    return (
      <div className="card">
        <p className="card-header-title has-background-light ">
          สถิติระดับออกซิเจนในเลือด
        </p>
        <div className="card-content">
          <h4 className="subtitle is-5">จำนวน {amount} รายการ </h4>

          <label className="label">
            เกณฑ์ปลอดภัย {safe} รายการ (
            {this.percentCalculate(safe, amount).toFixed(2)} % )
          </label>

          <progress className="progress is-success" value={safe} max={amount} />

          <label className="label">
            เกณฑ์เสี่ยง {risk} รายการ (
            {this.percentCalculate(risk, amount).toFixed(2)} % ){" "}
          </label>

          <progress className="progress is-warning" value={risk} max={amount} />

          <label className="label">
            เกณฑ์อันตราย {danger}รายการ (
            {this.percentCalculate(danger, amount).toFixed(2)} % ){" "}
          </label>

          <progress
            className="progress is-danger"
            value={danger}
            max={amount}
          />
        </div>
      </div>
    )
  }
}
export default Spo2Stat
