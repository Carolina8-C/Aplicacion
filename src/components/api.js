const currencyConverterEndPoint = "https://api.frankfurter.app"

export const fetchCurrencyLatest = () => {
  return fetch(`${currencyConverterEndPoint}/latest`)
    .then(response => response.json())
    .then(data => Object.keys(data.rates))
}

export const convertCurrencyAPI = (amount, sourceCurrency, targetCurrency) => {
  return fetch(`${currencyConverterEndPoint}/latest?amount=${amount}&from=${sourceCurrency}&to=${targetCurrency}`)
    .then(response => response.json())
}