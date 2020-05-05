import React, { Component } from "react";
import IDiabetes from "./IDiabetes";
import Firebase from "../Firebase"
let db = Firebase.firestore()
class Diabetes extends Component<any, any>{
    constructor(props: any) {
        super(props)
        let tempAdvice: IDiabetes = {
            advice_a: "", advice_b: "", advice_c: "", advice_d: "", advice_e: "",
            advice_f: "", advice_g: "", advice_h: "", advice_i: "", advice_j: "", description: ""
        }
        this.state = {
            advice: tempAdvice
        }
        this.renderNewData = this.renderNewData.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
    }

    componentDidMount() {
        let collect = db.collection("disease").doc("diabetes")
        collect.get().then(doc => {
            if (!doc.exists) {
                console.log("No Data ")
            }
            let docData = doc.data() as IDiabetes
            this.setState({
                advice: docData
            })
        })
    }

    renderNewData(event: any) {
        let target = event.target
        let tempAdvice: IDiabetes = {
            advice_a: (target.name === "advice_a" ? target.value : (this.state.advice as IDiabetes).advice_a),
            advice_b: (target.name === "advice_b" ? target.value : (this.state.advice as IDiabetes).advice_b),
            advice_c: (target.name === "advice_c" ? target.value : (this.state.advice as IDiabetes).advice_c),
            advice_d: (target.name === "advice_d" ? target.value : (this.state.advice as IDiabetes).advice_d),
            advice_e: (target.name === "advice_e" ? target.value : (this.state.advice as IDiabetes).advice_e),
            advice_f: (target.name === "advice_f" ? target.value : (this.state.advice as IDiabetes).advice_f),
            advice_g: (target.name === "advice_g" ? target.value : (this.state.advice as IDiabetes).advice_g),
            advice_h: (target.name === "advice_h" ? target.value : (this.state.advice as IDiabetes).advice_h),
            advice_i: (target.name === "advice_i" ? target.value : (this.state.advice as IDiabetes).advice_i),
            advice_j: (target.name === "advice_j" ? target.value : (this.state.advice as IDiabetes).advice_j),
            description: (this.state.advice as IDiabetes).description
        }
        this.setState({
            advice: tempAdvice
        })
    }

    updateDatabase() {
        let stateAdvice: IDiabetes = this.state.advice
        console.log(stateAdvice)
        db.collection("disease").doc("diabetes").update({
            advice_a: stateAdvice.advice_a,
            advice_b: stateAdvice.advice_b,
            advice_c: stateAdvice.advice_c,
            advice_d: stateAdvice.advice_d,
            advice_e: stateAdvice.advice_e,
            advice_f: stateAdvice.advice_f,
            advice_g: stateAdvice.advice_g,
            advice_h: stateAdvice.advice_h,
            advice_i: stateAdvice.advice_i,
            advice_j: stateAdvice.advice_j,
        }).then(ret => window.alert("Success")).catch(err => window.alert("Error " + err))
    }

    render() {
        let advice = this.state.advice as IDiabetes
        return (
            <div className="container">
                <br />
                <h3 className="subtitle is-3 kanit">โรคเบาหวาน </h3><hr />
                <form>
                    <div className="card">
                        <div className="card-content">
                            <h5 className="subtitle is-5 kanit"> <span className="tag is-success"> ไม่มีประวัติ </span> สำหรับผู้ที่ไม่มีประวัติเป็นเบาหวาน</h5>
                            <label className="label" ><span className="tag is-success"> SAFE </span> ผลอยู่เกณฑ์ดีมาก</label>
                            <textarea className="textarea" value={advice.advice_a} rows={3} onChange={this.renderNewData} name="advice_a"></textarea>
                            <label className="label" ><span className="tag is-warning"> WARNING </span>เสี่ยงต่อการเป็นเบาหวาน</label>
                            <textarea className="textarea" value={advice.advice_b} rows={3} onChange={this.renderNewData} name="advice_b"></textarea>
                            <label className="label" ><span className="tag is-danger"> DANGER </span> น้ำตาลสูงมาก</label>
                            <textarea className="textarea" value={advice.advice_c} rows={3} onChange={this.renderNewData} name="advice_c"></textarea>
                            <label className="label" ><span className="tag is-black"> MODERATE </span>เสี่ยงมาก ควรอยู่ในการดูแลของแพทย์</label>
                            <textarea className="textarea" value={advice.advice_d} rows={3} onChange={this.renderNewData} name="advice_d"></textarea>
                            <label className="label" ><span className="tag is-light"> NO DATA </span> ไม่ทราบข้อมูล</label>
                            <textarea className="textarea" value={advice.advice_e} rows={3} onChange={this.renderNewData} name="advice_e"></textarea>
                        </div>
                    </div>
                    <br />
                    <div className="card">
                        <div className="card-content">
                            <h5 className="subtitle is-5 kanit"><span className="tag is-warning "> มีประวัติ </span>สำหรับผู้ที่มีประวัติเป็นเบาหวาน</h5>
                            <label className="label" ><span className="tag is-success"> SAFE </span> ผลอยู่เกณฑ์ดี</label>
                            <textarea className="textarea" value={advice.advice_f} rows={3} onChange={this.renderNewData} name="advice_f"></textarea>
                            <label className="label" ><span className="tag is-warning"> WARNING </span>เสี่ยงต่อการเป็นเบาหวาน</label>
                            <textarea className="textarea" value={advice.advice_g} rows={3} onChange={this.renderNewData} name="advice_g"></textarea>
                            <label className="label" ><span className="tag is-danger"> DANGER </span> น้ำตาลสูงมาก</label>
                            <textarea className="textarea" value={advice.advice_h} rows={3} onChange={this.renderNewData} name="advice_h"></textarea>
                            <label className="label" ><span className="tag is-black"> MODERATE </span>เสี่ยงมาก ควรอยู่ในการดูแลของแพทย์</label>
                            <textarea className="textarea" value={advice.advice_i} rows={3} onChange={this.renderNewData} name="advice_i"></textarea>
                            <label className="label" ><span className="tag is-light"> NO DATA </span> ไม่ทราบข้อมูล</label>
                            <textarea className="textarea" value={advice.advice_j} rows={3} onChange={this.renderNewData} name="advice_j"></textarea>
                        </div>
                    </div>

                    <br />
                    <button className="button is-primary kanit" type="button" onClick={this.updateDatabase}>อัพเดทข้อมูล</button>
                </form>
            </div>
        )
    }
}
export default Diabetes