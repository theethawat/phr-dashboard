import { firestore } from "firebase";

export default interface IBloodPressure {
    adminUUID?: string,
    age: number,
    datatype: string,
    deviceAddress: string,
    local_id?: string,
    systolic: number,
    diastolic: number,
    mean: number,
    pulse: number,
    unit: string,
    userId: string,
    ownerUUID: string,
    patientUUID: string,
    measurementTime: firestore.Timestamp
}