import React, { Component } from "react"
import Firebase from "../Firebase"
import IPressureStack from "../VitalSignInterface/IPressureStack"
import IBloodPressure from "../VitalSignInterface/IBloodPressure"
let firestore = Firebase.firestore()
class PressureStat extends Component<any, any> {
  constructor(props: any) {
    super(props)
    let tempPressureDataStack: IPressureStack = {
      systolic: {
        safe: 0,
        risk: 0,
        danger: 0,
      },
      diastolic: {
        safe: 0,
        risk: 0,
        danger: 0,
      },
    }
    this.state = {
      pressure: [],
      amount: 0,
      pressureData: tempPressureDataStack,
    }
  }

  componentDidMount() {
    let pressureDataStack: IPressureStack = {
      systolic: {
        safe: 0,
        risk: 0,
        danger: 0,
      },
      diastolic: {
        safe: 0,
        risk: 0,
        danger: 0,
      },
    }

    firestore
      .collection("blood_pressure")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No Data On DB Snapshot")
          return
        }
        let amount: number = snapshot.size
        this.setState({
          amount: amount,
        })

        snapshot.forEach((doc) => {
          let currentData = doc.data() as IBloodPressure
          if (currentData.systolic <= 120) {
            pressureDataStack.systolic.safe++
          } else if (currentData.systolic > 120 && currentData.systolic < 140) {
            pressureDataStack.systolic.risk++
          } else if (currentData.systolic >= 140) {
            pressureDataStack.systolic.danger++
          }

          if (currentData.diastolic <= 80) {
            pressureDataStack.diastolic.safe++
          } else if (currentData.diastolic > 80 && currentData.diastolic < 90) {
            pressureDataStack.diastolic.risk++
          } else if (currentData.diastolic >= 90) {
            pressureDataStack.diastolic.danger++
          }

          this.setState({
            pressureData: pressureDataStack,
          })
        })
      })
  }

  percentCalculate(amount: number, allAmount: number): number {
    return (amount * 100) / allAmount
  }

  render() {
    let pressureData = this.state.pressureData as IPressureStack
    let amount: number = this.state.amount
    return (
      <div className="card">
        <p className="card-header-title has-background-light ">
          สถิติความดันโลหิต
        </p>
        <div className="card-content">
          <h4 className="subtitle is-5">จำนวน {amount} รายการ </h4>

          <h5 className="subtitle is-5">Systolic</h5>

          <label className="label">
            เกณฑ์ปลอดภัย {pressureData.systolic.safe} รายการ (
            {this.percentCalculate(pressureData.systolic.safe, amount).toFixed(
              2
            )}{" "}
            % )
          </label>

          <progress
            className="progress is-success"
            value={pressureData.systolic.safe}
            max={amount}
          />

          <label className="label">
            เกณฑ์เสี่ยง {pressureData.systolic.risk} รายการ (
            {this.percentCalculate(pressureData.systolic.risk, amount).toFixed(
              2
            )}{" "}
            % ){" "}
          </label>

          <progress
            className="progress is-warning"
            value={pressureData.systolic.risk}
            max={amount}
          />

          <label className="label">
            เกณฑ์อันตราย {pressureData.systolic.danger}รายการ (
            {this.percentCalculate(
              pressureData.systolic.danger,
              amount
            ).toFixed(2)}{" "}
            % ){" "}
          </label>

          <progress
            className="progress is-danger"
            value={pressureData.systolic.danger}
            max={amount}
          />

          <h5 className="subtitle is-5">Diastolic</h5>

          <label className="label">
            เกณฑ์ปลอดภัย {pressureData.diastolic.safe} รายการ (
            {this.percentCalculate(pressureData.diastolic.safe, amount).toFixed(
              2
            )}{" "}
            % )
          </label>

          <progress
            className="progress is-success"
            value={pressureData.diastolic.safe}
            max={amount}
          />

          <label className="label">
            เกณฑ์เสี่ยง {pressureData.diastolic.risk} รายการ (
            {this.percentCalculate(pressureData.diastolic.risk, amount).toFixed(
              2
            )}{" "}
            % )
          </label>

          <progress
            className="progress is-warning"
            value={pressureData.diastolic.risk}
            max={amount}
          />

          <label className="label">
            เกณฑ์อันตราย {pressureData.diastolic.danger} รายการ (
            {this.percentCalculate(
              pressureData.diastolic.danger,
              amount
            ).toFixed(2)}{" "}
            % )
          </label>

          <progress
            className="progress is-danger"
            value={pressureData.diastolic.danger}
            max={amount}
          />
        </div>
      </div>
    )
  }
}
export default PressureStat
