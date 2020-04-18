import React, { Component } from "react"
import Firebase from "../Firebase"
let db = Firebase.firestore()
class Hypertension extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advice: "",
    }
  }

  componentDidMount() {
    let hpCollection = db.collection("disease").doc("hypertension")
    hpCollection
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No Document")
        }
        let docData = doc.data()
        this.setState({
          advice: docData,
        })
      })
      .catch((err) => {
        console.log("Error Getting Document " + err)
      })
  }

  render() {
    let advice = this.state.advice
    console.log(advice)
    return (
      <div className="container">
        <br />
        <h3 className="subtitle is-3 kanit">โรคความดันโลหิตสูง</h3>
        <hr />
        <div className="card">
          <div className="card-content">
            <form>
              <label className="label">
                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Optimal (น้อยกว่า 120 และ
                น้อยกว่า80)
              </label>
              <textarea name="optimal" className="textarea" rows="3"></textarea>

              <label className="label">
                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Normal (120-129 หรือ
                80-84)
              </label>
              <textarea name="normal" className="textarea" rows="3"></textarea>

              <label className="label">
                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ High Normal (130-139 หรือ
                85-89)
              </label>
              <textarea
                name="high-normal"
                className="textarea"
                rows="3"
              ></textarea>

              <label className="label">
                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Possible Hypertension
                (140-159 หรือ 90-99)
              </label>
              <textarea name="ht1" className="textarea" rows="3"></textarea>

              <label className="label">
                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Probable hypertension
                (160-179หรือ 100-109)
              </label>
              <textarea name="ht2" className="textarea" rows="3"></textarea>

              <label className="label">
                คำแนะนำสำหรับผู้มีความดันโลหิตในเกณฑ์ Definite Hypertension
                (>180 หรือ > 110)
              </label>
              <textarea name="ht3" className="textarea" rows="3"></textarea>

              <label className="label">
                คำแนะนำสำหรับผู้ที่ไม่มีข้อมูล หรือ ไม่สามารถให้คำแนะนำได้
              </label>
              <textarea name="tba" className="textarea" rows="3"></textarea>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Hypertension
