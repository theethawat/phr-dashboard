import React, { Component } from "react"
import IWeightAdvice from "./IWeightAdvice"
import Firebase from "../Firebase"
const db = Firebase.firestore()
class Weight extends Component<any, any> {
    constructor(props: any) {
        super(props)
        let tempWeightAdvice: IWeightAdvice = { advice_a: "", advice_b: "", advice_c: "", advice_d: "" }
        this.state = {
            advice: tempWeightAdvice
        }
        this.renderNewData = this.renderNewData.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
    }

    componentDidMount() {
        let collectionRef = db.collection("disease").doc("obesity")
        collectionRef.get().then(doc => {
            if (!doc.exists) {
                console.log("Data Not Exist")
            }
            let docData = doc.data() as IWeightAdvice
            this.setState({
                advice: docData
            })
        })
    }

    renderNewData(event: any) {
        let target = event.target
        let tempAdvice: IWeightAdvice = {
            advice_a: target.name == "low" ? target.value : (this.state.advice as IWeightAdvice).advice_a,
            advice_b: target.name == "normal" ? target.value : (this.state.advice as IWeightAdvice).advice_b,
            advice_c: target.name == "fat" ? target.value : (this.state.advice as IWeightAdvice).advice_c,
            advice_d: target.name == "obesity" ? target.value : (this.state.advice as IWeightAdvice).advice_d
        }
        this.setState({
            advice: tempAdvice
        })
    }


    updateDatabase() {
        let stateAdvice: IWeightAdvice = this.state.advice
        console.log(stateAdvice)
        db.collection("disease").doc("obesity").update({
            advice_a: stateAdvice.advice_a,
            advice_b: stateAdvice.advice_b,
            advice_c: stateAdvice.advice_c,
            advice_d: stateAdvice.advice_d
        }).then(ret => window.alert("Success")).catch(err => window.alert("Error " + err))
    }

    render() {
        let weightAdvice = this.state.advice as IWeightAdvice
        return (
            <div className="container">
                <br />
                <h3 className="subtitle is-3 kanit">สภาวะน้ำหนักตัว</h3><hr />
                <div className="card">
                    <div className="card-content">
                        <form>
                            <label>คำแนะนำสำหรับน้ำหนักตัวต่ำกว่าเกณฑ์</label>
                            <textarea className="textarea" onChange={this.renderNewData} name="low" value={weightAdvice.advice_a} rows={3}>  </textarea>
                            <label>คำแนะนำสำหรับน้ำหนักตัวปกติ</label>
                            <textarea className="textarea" onChange={this.renderNewData} name="normal" value={weightAdvice.advice_b} rows={3}>  </textarea>
                            <label>คำแนะนำสำหรับน้ำหนักตัวอ้วน</label>
                            <textarea className="textarea" onChange={this.renderNewData} name="fat" value={weightAdvice.advice_c} rows={3}>  </textarea>
                            <label>คำแนะนำสำหรับน้ำหนักตัวอ้วนอันตราย</label>
                            <textarea className="textarea" onChange={this.renderNewData} name="obesity" value={weightAdvice.advice_d} rows={3}>  </textarea>
                            <hr />
                            <button className="button is-primary kanit" type="button" onClick={this.updateDatabase} >บันทึกข้อมูล</button>
                        </form>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}
export default Weight