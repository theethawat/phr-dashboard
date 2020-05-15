import React, { Component } from "react"
import Firebase from "../Firebase"
import IHeartRate from "../VitalSignInterface/IHeartRate"
let firestore = Firebase.firestore()
class PulseStat extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            pulseData: [],
            amount: 0,
            danger: 0,
            risk: 0,
            safe: 0,
            other: 0
        }
    }

    componentDidMount() {
        firestore.collection("heart_rate").get().then(snapshot => {
            if (snapshot.empty) {
                console.log("No Data Found on Snapshot")
                return
            }

            let amount = snapshot.size
            this.setState({
                amount: amount
            })

            let danger = 0
            let risk = 0
            let safe = 0
            let other = 0

            snapshot.forEach(doc => {
                let data: IHeartRate = doc.data() as IHeartRate

                if (data.value >= 60 && data.value <= 80)
                    safe++
                else if (data.value > 80 && data.value <= 100)
                    risk++
                else if (data.value > 100)
                    danger++
                else
                    other++

                this.setState({
                    safe: safe,
                    risk: risk,
                    danger: danger,
                    other: other
                })
            })

        }).catch(err => {
            console.log("Error " + err)
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
        let other = this.state.other as number

        return (
            <div className="card">
                <div className="card-content">
                    <h4 className="subtitle is-5">สถิติอัตราการเต้นของหัวใจ</h4>
                    <h4 className="subtitle is-5">จำนวน {amount} รายการ </h4>



                    <label className="label">
                        เกณฑ์ปลอดภัย {safe} รายการ
                ({this.percentCalculate(safe, amount).toFixed(2)} % )
            </label>

                    <progress className="progress is-success" value={safe} max={amount} />

                    <label className="label">
                        เกณฑ์เสี่ยง {risk}  รายการ
                ({this.percentCalculate(risk, amount).toFixed(2)} % ) </label>

                    <progress className="progress is-warning" value={risk} max={amount} />

                    <label className="label">
                        เกณฑ์อันตราย {danger} รายการ
                ({this.percentCalculate(danger, amount).toFixed(2)} % ) </label>

                    <progress className="progress is-danger" value={danger} max={amount} />

                    <label className="label">
                        อื่น ๆ {other} รายการ
                ({this.percentCalculate(other, amount).toFixed(2)} % ) </label>

                    <progress className="progress is-info" value={other} max={amount} />


                </div>
            </div>
        )
    }
}
export default PulseStat