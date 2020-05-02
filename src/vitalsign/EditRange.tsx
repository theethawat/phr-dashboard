import React, { Component } from "react";
import EditSpecificRange from "./EditSpecificRange";
class EditRange extends Component<any, any> {
    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <div className="container">
                <br />
                <h3 className="subtitle is-3 kanit" > แก้ไขเกณฑ์จำแนกความเสี่ยง </h3>
                <p>กำหนดค่าสำหรับเป็นเกณฑ์ในการจำแนกความเสี่ยง ในค่าตัวชี้วัดทางสุขภาพแต่ละอย่างของผู้ใช้งาน </p>
                <hr />
                <EditSpecificRange thaiName="ความดันโลหิตเมื่อหัวใจบีบตัว" vitalsign="systolic" />
                <br />
                <EditSpecificRange thaiName="ความดันโลหิตเมื่อหัวใจคลายตัว" vitalsign="diastolic" />
                <br />
                <EditSpecificRange thaiName="ความอิ่มตัวของออกซิเจนในเลือด" vitalsign="spo2" />
                <br />
                <EditSpecificRange thaiName="อัตราการเต้นของหัวใจ" vitalsign="heart_rate" />
                <br />
                <EditSpecificRange thaiName="ระดับน้ำตาลในเลือด" vitalsign="glucose" />
                <br />
            </div>
        )
    }
}
export default EditRange