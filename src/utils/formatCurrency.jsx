const formatCurrency = (value, locale = 'fr-FR', currency = 'EUR') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)

export default formatCurrency
