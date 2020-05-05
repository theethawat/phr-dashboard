import Firebase from "../Firebase"
import { firestore } from "firebase"

export default interface IGlucose {
  adminUUID?: string
  age: number
  dataType: string
  deviceAddress: string
  local_id?: string
  measurementTime: firestore.Timestamp
  ownerUUID: string
  patientUUID?: string
  sampleLocation?: string
  sensorStatus: {
    batteryLow: boolean
    hasGeneralError: boolean
    hasTimeError: boolean
    incorrectStripType: boolean
    sampleSizeInsufficient: boolean
    sensorMalfunction: boolean
    sensorResultTooHigh: boolean
    sensorTempTooHigh: boolean
    sensorTempTooLow: boolean
    stripInsertionError: boolean
    stripWasPulledTooSoon: boolean
  }
  sequenceNumber: number
  timeOffset: number
  type: string
  unit: string
}
