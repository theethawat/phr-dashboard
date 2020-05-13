export default interface IPressureStack {
    systolic: {
        safe: number,
        risk: number,
        danger: number
    },
    diastolic: {
        safe: number,
        risk: number,
        danger: number
    }
}