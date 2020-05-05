import React, { Component } from "react";
import Firebase from "../Firebase"
import IVitalSignRange from "./IVitalSignRange";
let firestore = Firebase.firestore()
class EditSpecificRange extends Component<any, any> {
    constructor(props: any) {
        super(props)
        console.log(props)
        let tempVitalSignRange: IVitalSignRange = {
            danger: {
                max: 0,
                min: 0
            },
            risk: {
                max: 0,
                min: 0
            },
            safe: {
                max: 0,
                min: 0
            }
        }

        this.state = {
            vitalsign: props.vitalsign,
            vitalSignThaiName: props.thaiName,
            vitalSignRange: tempVitalSignRange
        }
        this.renderNewData = this.renderNewData.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
    }

    componentDidMount() {
        let collection = firestore.collection("vitalsign_analyze").doc((this.state.vitalsign) as string)
        collection.get().then(snapshot => {
            let currentRange = snapshot.data() as IVitalSignRange
            this.setState({
                vitalSignRange: currentRange
            })
        })
    }

    renderNewData(event: any) {
        let target = event.target
        let stateRange = this.state.vitalSignRange as IVitalSignRange
        // advice_safe: (target.name === "advice_safe" ? target.value : (this.state.advice as IVitalSign).advice_safe),
        let newRenderRange: IVitalSignRange = {
            danger: {
                max: (target.name === "danger-max" ? target.value : (stateRange.danger.max)),
                min: (target.name === "danger-min" ? target.value : (stateRange.danger.min))
            },
            risk: {
                max: (target.name === "risk-max" ? target.value : (stateRange.risk.max)),
                min: (target.name === "risk-min" ? target.value : (stateRange.risk.min))
            },
            safe: {
                max: (target.name === "safe-max" ? target.value : (stateRange.safe.max)),
                min: (target.name === "safe-min" ? target.value : (stateRange.safe.min))
            }
        }
        this.setState({
            vitalSignRange: newRenderRange
        })
    }

    updateDatabase() {
        let stateData = this.state.vitalSignRange as IVitalSignRange
        let vitalSignName = this.state.vitalsign
        firestore.collection("vitalsign_analyze").doc(vitalSignName).update({
            safe: stateData.safe,
            danger: stateData.danger,
            risk: stateData.risk
        }).then(result => {
            window.alert("Success Update Database")
        }).catch(err => {
            window.alert("Error on Update Database " + err)
        })
    }

    render() {
        let vitalSignType = this.state.vitalsign as string
        let vitalSignThaiName = this.state.vitalSignThaiName as string
        let vitalSignRange = this.state.vitalSignRange as IVitalSignRange
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <h5 className="subtitle is-5 "> สัญญาณ{vitalSignThaiName} ({vitalSignType})  </h5>
                        <form>
                            <div className="columns">
                                <div className="column">
                                    <label>ระดับปลอดภัย</label>
                                    <div className="columns  is-mobile">
                                        <div className="column is-4">
                                            <input type="text" className="input" onChange={this.renderNewData} name="safe-min" value={vitalSignRange.safe.min} />
                                        </div>
                                        <div className="column is-1">
                                            -
                                        </div>
                                        <div className="column is-4">
                                            <input type="text" className="input" onChange={this.renderNewData} name="safe-max" value={vitalSignRange.safe.max} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <label>ระดับเสี่ยง</label>
                                    <div className="columns  is-mobile">
                                        <div className="column is-4">
                                            <input type="text" className="input" onChange={this.renderNewData} name="risk-min" value={vitalSignRange.risk.min} />
                                        </div>
                                        <div className="column is-1">
                                            -
                                        </div>
                                        <div className="column is-4">
                                            <input type="text" className="input" onChange={this.renderNewData} name="risk-max" value={vitalSignRange.risk.max} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <label>ระดับอันตราย</label>
                                    <div className="columns  is-mobile">
                                        <div className="column is-4">
                                            <input type="text" className="input" onChange={this.renderNewData} name="danger-min" value={vitalSignRange.danger.min} />
                                        </div>
                                        <div className="column is-1">
                                            -
                                        </div>
                                        <div className="column is-4">
                                            <input type="text" className="input" onChange={this.renderNewData} name="danger-max" value={vitalSignRange.danger.max} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <button className="button is-link kanit" type="button" onClick={this.updateDatabase}> อัพเดทข้อมูล</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default EditSpecificRange