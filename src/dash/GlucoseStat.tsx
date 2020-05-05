import React, { Component } from "react";
import GlucoseTemp from "../VitalSignInterface/GlucoseTemp"
import IGlucose from "../VitalSignInterface/IGlucose"
import Firebase from "../Firebase"
let firestore = Firebase.firestore()
class GlucoseStat extends Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            glucoseData: [],
            safeZone: 0,
            intermediateZone: 0,
            dangerZone: 0
        }
    }

    componentDidMount() {
        let glucoseCollection: IGlucose[] = []
        let safeCollect = 0
        let intermediateCollect = 0
        let dangerCollect = 0
        firestore.collection("glucose").orderBy("measurementTime", "desc").get().then(snapshot => {
            if (snapshot.empty) {
                console.log("No Glucose Data in Database")
            }
            snapshot.forEach(doc => {
                let tempGlucose: IGlucose = doc.data() as IGlucose
                glucoseCollection.push(tempGlucose)
                if (tempGlucose.value * 100000 <= 100)
                    safeCollect++
                if (tempGlucose.value * 100000 > 100 && tempGlucose.value * 100000 <= 125)
                    intermediateCollect++
                if (tempGlucose.value * 100000 > 125)
                    dangerCollect++
                this.setState({
                    glucoseData: glucoseCollection,
                    safeZone: safeCollect,
                    intermediateZone: intermediateCollect,
                    dangerZone: dangerCollect
                })
            })
        })
    }

    sortData() {
        let glucoseSet = this.state.glucoseData as IGlucose[]
    }

    percentCalculate(amount: number, allAmount: number): number {
        return (amount * 100) / allAmount
    }

    render() {
        let stateGlucose = this.state.glucoseData as IGlucose[]
        return (<div className="card">
            <div className="card-content">
                <h4 className="subtitle is-5">สถิติระดับน้ำตาลในเลือด</h4>
                <h4 className="subtitle is-5">จำนวน {stateGlucose.length} รายการ </h4>

                <label className="label">เกณฑ์ปลอดภัย {this.state.safeZone} รายการ ( {this.percentCalculate(this.state.safeZone as number, stateGlucose.length).toFixed(2)} % ) </label>

                <progress className="progress is-success" value={this.state.safeZone as number} max={stateGlucose.length} />

                <label className="label">เกณฑ์เสี่ยงเบาหวาน {this.state.intermediateZone}  รายการ ( {this.percentCalculate(this.state.intermediateZone as number, stateGlucose.length).toFixed(2)} % ) </label>

                <progress className="progress is-warning" value={this.state.intermediateZone as number} max={stateGlucose.length} />

                <label className="label">เกณฑ์เป็นเบาหวาน  {this.state.dangerZone} รายการ ( {this.percentCalculate(this.state.dangerZone as number, stateGlucose.length).toFixed(2)} % ) </label>

                <progress className="progress is-danger" value={this.state.dangerZone as number} max={stateGlucose.length} />


                <p>หมายเหตุ ใช้เกณฑ์อย่างง่ายในการวิเคราะห์</p>
            </div>
        </div>)
    }
}
export default GlucoseStat