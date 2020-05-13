export default interface ISpo2 {
    adminUUID?: string,
    age: number,
    dataType: string,
    deviceAddress: string,
    local_id?: string,
    pulseOximeter: number,
    unit: string,
    ownerUUID: string,
    patientUUID: string,
    measurementTime: firebase.firestore.Timestamp
}