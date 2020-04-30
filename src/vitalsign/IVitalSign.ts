export default interface IVitalSign {
    advice_danger: string,
    advice_risk: string,
    advice_safe: string,
    average_value: {
        men: [],
        women: []
    },
    density: {
        men: [],
        women: []
    },
    disease: []
}