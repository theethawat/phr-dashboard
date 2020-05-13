export default interface IHeartRate {
    adminUUID?: string,
    age: number,
    datatype: string,
    deviceAddress: string,
    energyExpended?: string,
    local_id?: string,
    rrinterval?: number,
    unit: string,
    value: number,
    ownerUUID: string,
    patientUUID: string,
    measurementTime: firebase.firestore.Timestamp
}