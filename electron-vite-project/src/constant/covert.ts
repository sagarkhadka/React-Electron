export const temperatureConvert = (fahrenheit: number) => {
  const celsius = (fahrenheit - 32) * 5 / 9

  return Math.round(celsius * 100) / 200
}