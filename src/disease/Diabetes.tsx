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
                            <textarea className="textarea" value={advice.advice_a} rows={3}></textarea>
                            <label className="label" ><span className="tag is-warning"> WARNING </span>เสี่ยงต่อการเป็นเบาหวาน</label>
                            <textarea className="textarea" value={advice.advice_b} rows={3}></textarea>
                            <label className="label" ><span className="tag is-danger"> DANGER </span> น้ำตาลสูงมาก</label>
                            <textarea className="textarea" value={advice.advice_c} rows={3}></textarea>
                            <label className="label" ><span className="tag is-black"> MODERATE </span>เสี่ยงมาก ควรอยู่ในการดูแลของแพทย์</label>
                            <textarea className="textarea" value={advice.advice_d} rows={3}></textarea>
                            <label className="label" ><span className="tag is-light"> NO DATA </span> ไม่ทราบข้อมูล</label>
                            <textarea className="textarea" value={advice.advice_e} rows={3}></textarea>
                        </div>
                    </div>
                    <br />
                    <div className="card">
                        <div className="card-content">
                            <h5 className="subtitle is-5 kanit"><span className="tag is-warning "> มีประวัติ </span>สำหรับผู้ที่มีประวัติเป็นเบาหวาน</h5>
                            <label className="label" ><span className="tag is-success"> SAFE </span> ผลอยู่เกณฑ์ดี</label>
                            <textarea className="textarea" value={advice.advice_f} rows={3}></textarea>
                            <label className="label" ><span className="tag is-warning"> WARNING </span>เสี่ยงต่อการเป็นเบาหวาน</label>
                            <textarea className="textarea" value={advice.advice_g} rows={3}></textarea>
                            <label className="label" ><span className="tag is-danger"> DANGER </span> น้ำตาลสูงมาก</label>
                            <textarea className="textarea" value={advice.advice_h} rows={3}></textarea>
                            <label className="label" ><span className="tag is-black"> MODERATE </span>เสี่ยงมาก ควรอยู่ในการดูแลของแพทย์</label>
                            <textarea className="textarea" value={advice.advice_i} rows={3}></textarea>
                            <label className="label" ><span className="tag is-light"> NO DATA </span> ไม่ทราบข้อมูล</label>
                            <textarea className="textarea" value={advice.advice_j} rows={3}></textarea>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Diabetes