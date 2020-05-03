import React, { Component } from "react";
import Firebase from "../Firebase"
import IUserIdentifier from "./IUserIdentifer";
import IUserField from "./IUserField";
import { auth } from "firebase";
let authen = Firebase.auth()
let firestore = Firebase.firestore()
class LoginPhase extends Component<any, any>{
    constructor(props: any) {
        super(props)
        let userInfo: IUserIdentifier = {
            username: "",
            password: ""
        }
        this.state = {
            identifier: userInfo
        }
        this.handlingInput = this.handlingInput.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handlingInput(event: any) {
        let target = event.target
        let identiferState = this.state.identifier as IUserIdentifier
        let newIdentifier: IUserIdentifier = {
            username: (target.name == "email" ? target.value : identiferState.username),
            password: (target.name == "password" ? target.value : identiferState.password)
        }
        this.setState({
            identifier: newIdentifier
        })
    }


    handleLogin() {
        let identiferState = this.state.identifier as IUserIdentifier
        authen.signInWithEmailAndPassword(identiferState.username, identiferState.password)
            .then(ret => {
                // Check For Administrator Right
                firestore.collection("user").where('uuid','==',ret.user?.uid).limit(1).get().then(snapshot=>{
                    if(snapshot.empty){
                        window.alert("Sorry You don't have user account")
                        return
                    }
                    snapshot.forEach(doc=>{
                        let data = doc.data() as IUserField
                        if(data.adminStatus == true){
                             window.alert("Login Success Welcome " + ret.user?.email) 
                             // Return to Frontpage to Update Project State
                             this.props.updateState(ret.user?.email)
                        }
                        else{  
                            authen.signOut()
                            window.alert("Sorry You don't have Admin/Medical Right! If you are please contact other system admin")
                            return
                        }
                    })
                })
            }).catch(err => {
                window.alert("Error on catch" + err)
            })
    }

    render() {
        let stateIdentifier = this.state.identifier as IUserIdentifier
        return (
            <div className="container">
                <br />
                <h3 className="subtitle is-3 kanit">ลงชื่อเข้าใช้</h3>
                <hr />
                <div className="columns">
                    <div className="column is-6">
                        <div className="card">
                            <div className="card-content">
                                <form>
                                    <label> Email </label>
                                    <input className="input" onChange={this.handlingInput} value={stateIdentifier.username} type="email" name="email" />

                                    <label> Password </label>
                                    <input className="input" onChange={this.handlingInput} value={stateIdentifier.password} type="password" name="password" />
                                    <br /><br />
                                    <button type="button" onClick={this.handleLogin} className="button is-primary kanit">เข้าสู่ระบบ</button>
                                    <hr />
                                    <h6 className="subtitle is-6 kanit"> หมายเหตุ </h6>                                    <p className="content">
                                        <li>ผู้ที่มีสิทธิใช้งานระบบ ใช้ Email และ รหัสผ่านเดียวกับที่ใช้ในแอพพลิเคชั่น</li>
                                        <li>
                                            ระบบ CNR-PHR Dashboard นี้ออกแบบมาเพื่อผู้ดูแลระบบ
                                             และ บุคคลากรทางการแพทย์ผู้ใช้งานระบบนี้
                                             และได้รับการอนุญาติจากผู้ดูแลระบบนี้เท่านั้น ท่านที่เป็นผู้ใช้งานทั่วไป
                                             จะไม่สามารถใช้งานในส่วนนี้ได้
                                     </li>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default LoginPhase