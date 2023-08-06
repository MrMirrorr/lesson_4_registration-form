export const passwordSymbolsValidator = (value) =>
	/\S+/.test(value) &&
	/[a-zA-Z]+/.test(value) &&
	/[0-9]+/.test(value) &&
	/\W+/.test(value)
		? null
		: 'Пароль должен состоять из хотя бы одной буквы, цифры и символа';
