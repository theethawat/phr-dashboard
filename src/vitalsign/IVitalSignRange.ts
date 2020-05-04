export default interface IVitalSignRange {
    danger: {
        max: number,
        min: number
    },
    risk: {
        max: number,
        min: number
    },
    safe: {
        max: number,
        min: number
    }
}