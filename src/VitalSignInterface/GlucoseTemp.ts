import IGlucose from "./IGlucose"
import { firestore } from "firebase"

let GlucoseTemp: IGlucose = {
  age: 15,
  dataType: "BLOOD_GLUCOSE",
  deviceAddress: "",
  measurementTime: firestore.Timestamp.fromDate(new Date()),
  ownerUUID: "",
  sensorStatus: {
    batteryLow: false,
    hasGeneralError: false,
    hasTimeError: false,
    incorrectStripType: false,
    sampleSizeInsufficient: false,
    sensorMalfunction: false,
    sensorResultTooHigh: false,
    sensorTempTooHigh: false,
    sensorTempTooLow: false,
    stripInsertionError: false,
    stripWasPulledTooSoon: false,
  },
  sampleLocation: "Sample Location Unavaliable",
  sequenceNumber: 0,
  timeOffset: 0,
  type: "Undeterminied Plasma",
  unit: "KG_PER_L",
  value: 0,
}

export default GlucoseTemp
