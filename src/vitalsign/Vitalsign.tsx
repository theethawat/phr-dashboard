import React, { Component } from "react";
import Firebase from "../Firebase"
import IVitalSign from "./IVitalSign";
let firestore = Firebase.firestore()
class Vitalsign extends Component<any, any> {
    constructor(props: any) {
        super(props)
        console.log(props.value)
        let tempVitalSign: IVitalSign = {
            advice_danger: "", advice_risk: "", advice_safe: "",
            average_value: { men: [], women: [] },
            density: { men: [], women: [] },
            disease: []
        }
        this.state = {
            vitalSignName: props.value,
            advice: tempVitalSign
        }
        this.renderNewData = this.renderNewData.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
    }

    componentWillReceiveProps(nextProps: any) {
        let vitalSignName: string = nextProps.value
        console.log(nextProps)
        console.log("Vital Sign Name")
        console.log(vitalSignName)
        this.setState({
            vitalSignName: vitalSignName
        })
        let collectionRef = firestore.collection("vitalsign_advice").doc(vitalSignName)
        collectionRef.get().then(snapshot => {
            let snapData = snapshot.data() as IVitalSign
            this.setState({
                advice: snapData
            })
        })
    }

    componentDidMount() {
        let vitalSignName = this.state.vitalSignName
        let collectionRef = firestore.collection("vitalsign_advice").doc(vitalSignName)
        collectionRef.get().then(snapshot => {
            let snapData = snapshot.data() as IVitalSign
            this.setState({
                advice: snapData
            })
        })
    }

    renderNewData(event: any) {
        let target = event.target
        // advice_a: (target.name == "advice_a" ? target.value : (this.state.advice as IDiabetes).advice_a),
        let tempAdvice: IVitalSign = {
            advice_safe: (target.name == "advice_safe" ? target.value : (this.state.advice as IVitalSign).advice_safe),
            advice_risk: (target.name == "advice_risk" ? target.value : (this.state.advice as IVitalSign).advice_risk),
            advice_danger: (target.name == "advice_danger" ? target.value : (this.state.advice as IVitalSign).advice_danger),
            average_value: (this.state.advice as IVitalSign).average_value,
            density: (this.state.advice as IVitalSign).density,
            disease: (this.state.advice as IVitalSign).disease
        }
        this.setState({
            advice: tempAdvice
        })
    }

    updateDatabase() {
        let adviceState = this.state.advice as IVitalSign
        firestore.collection("vitalsign_advice").doc(this.state.vitalSignName as string).update({
            advice_safe: adviceState.advice_safe,
            advice_risk: adviceState.advice_risk,
            advice_danger: adviceState.advice_danger
        }).then(ret => { window.alert("Success Database Update") }).catch(err => { window.alert("Fail transaction " + err) })
    }


    render() {
        let vitalSignName = this.state.vitalSignName
        let advice = this.state.advice as IVitalSign
        return (
            <div className="container">
                <br />
                <h3 className="subtitle is-3 kanit is-uppercase">{vitalSignName}</h3><hr />
                <div className="card">
                    <div className="card-content">
                        <label className="label"> <span className="tag is-success kanit"> ปลอดภัย</span> คำแนะนำสำหรับกลุ่มปลอดภัย </label>
                        <textarea className="textarea" value={advice.advice_safe} rows={3} name="advice_safe" onChange={this.renderNewData}></textarea>
                        <label className="label"> <span className="tag is-warning kanit"> เสี่ยง</span> คำแนะนำสำหรับกลุ่มเสี่ยง </label>
                        <textarea className="textarea" value={advice.advice_risk} rows={3} name="advice_risk" onChange={this.renderNewData}></textarea>
                        <label className="label"> <span className="tag is-danger kanit">  อันตราย</span> คำแนะนำสำหรับกลุ่มอันตราย </label>
                        <textarea className="textarea" value={advice.advice_danger} rows={3} name="advice_danger" onChange={this.renderNewData}></textarea>
                        <hr />
                        <button type="button" className="button is-primary kanit" onClick={this.updateDatabase}>อัพเดทข้อมูล</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Vitalsign