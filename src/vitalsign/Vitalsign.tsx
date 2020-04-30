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
                        <textarea className="textarea" value={advice.advice_safe} rows={3}></textarea>
                        <label className="label"> <span className="tag is-warning kanit"> เสี่ยง</span> คำแนะนำสำหรับกลุ่มเสี่ยง </label>
                        <textarea className="textarea" value={advice.advice_risk} rows={3}></textarea>
                        <label className="label"> <span className="tag is-danger kanit">  อันตราย</span> คำแนะนำสำหรับกลุ่มอันตราย </label>
                        <textarea className="textarea" value={advice.advice_danger} rows={3}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}
export default Vitalsign