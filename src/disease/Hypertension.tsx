import React, { Component } from "react"
import Firebase from "../Firebase"
import IHypertension from "./IHypertension"
let db = Firebase.firestore()
class Hypertension extends Component<any, any> {
    constructor(props: any) {
        super(props)
        let tempAdviceHP: IHypertension = { advice_a: "", advice_b: "", advice_c: "", advice_d: "", advice_e: "", advice_f: "", advice_g: "", advice_no: "", description: "" }
        this.state = {
            advice: tempAdviceHP,
        }
        this.renderNewData = this.renderNewData.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
    }

    componentDidMount() {
        let hpCollection = db.collection("disease").doc("hypertension")
        hpCollection
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("No Document")
                }
                let docData = doc.data() as IHypertension
                this.setState({
                    advice: docData,
                })
            })
            .catch((err) => {
                console.log("Error Getting Document " + err)
            })
    }

    renderNewData(event: any) {
        let target = event.target
        let tempAdvice: IHypertension = {
            advice_a: (target.name === "optimal" ? target.value : (this.state.advice as IHypertension).advice_a),
            advice_b: (target.name === "normal" ? target.value : (this.state.advice as IHypertension).advice_b),
            advice_c: (target.name === "high-normal" ? target.value : (this.state.advice as IHypertension).advice_c),
            advice_d: (target.name === "ht1" ? target.value : (this.state.advice as IHypertension).advice_d),
            advice_e: (target.name === "ht2" ? target.value : (this.state.advice as IHypertension).advice_e),
            advice_f: (target.name === "ht3" ? target.value : (this.state.advice as IHypertension).advice_f),
            advice_g: (this.state.advice as IHypertension).advice_g,
            advice_no: (target.name === "tba" ? target.value : (this.state.advice as IHypertension).advice_no),
            description: (this.state.advice as IHypertension).description
        }
        this.setState({
            advice: tempAdvice
        })
    }

    updateDatabase() {
        let stateAdvice: IHypertension = this.state.advice
        console.log(stateAdvice)
        db.collection("disease").doc("hypertension").update({
            advice_a: stateAdvice.advice_a,
            advice_b: stateAdvice.advice_b,
            advice_c: stateAdvice.advice_c,
            advice_d: stateAdvice.advice_d,
            advice_e: stateAdvice.advice_e,
            advice_f: stateAdvice.advice_f,
            advice_no: stateAdvice.advice_no,
        }).then(ret => window.alert("Success")).catch(err => window.alert("Error " + err))
    }

    render() {
        let advice: IHypertension = this.state.advice
        console.log(advice)
        return (
            <div className="container">
                <br />
                <h3 className="subtitle is-3 kanit">โรคความดันโลหิตสูง</h3>
                <hr />
                <div className="card">
                    <div className="card-content">
                        <form >
                            <label className="label">
                                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Optimal (น้อยกว่า 120 และ
                                น้อยกว่า80)
              </label>
                            <textarea name="optimal" className="textarea" rows={3} onChange={this.renderNewData} value={advice.advice_a}></textarea>

                            <label className="label">
                                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Normal (120-129 หรือ
                                80-84)
              </label>
                            <textarea name="normal" className="textarea" rows={3} onChange={this.renderNewData} value={advice.advice_b}></textarea>

                            <label className="label">
                                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ High Normal (130-139 หรือ
                                85-89)
              </label>
                            <textarea
                                name="high-normal"
                                className="textarea"
                                rows={3}
                                value={advice.advice_c}
                            ></textarea>

                            <label className="label">
                                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Possible Hypertension
                                (140-159 หรือ 90-99)
              </label>
                            <textarea name="ht1" className="textarea" rows={3} onChange={this.renderNewData} value={advice.advice_d}></textarea>

                            <label className="label">
                                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Probable hypertension
                                (160-179หรือ 100-109)
              </label>
                            <textarea name="ht2" className="textarea" rows={3} onChange={this.renderNewData} value={advice.advice_e}></textarea>

                            <label className="label">
                                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Definite Hypertension
                                (>180 หรือ > 110)
              </label>
                            <textarea name="ht3" className="textarea" rows={3} onChange={this.renderNewData} value={advice.advice_f}></textarea>

                            <label className="label">
                                คำแนะนำสำหรับผู้ที่ไม่มีข้อมูล หรือ ไม่สามารถให้คำแนะนำได้
              </label>
                            <textarea name="tba" className="textarea" rows={3} onChange={this.renderNewData} value={advice.advice_no}></textarea>
                            <br />
                            <button type="button" onClick={this.updateDatabase} className="button is-primary kanit">ยืนยันการแก้ไขข้อมูล</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Hypertension
