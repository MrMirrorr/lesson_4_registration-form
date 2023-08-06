export const emailValidator = (value) =>
	/^\S{2,}@\S{2,}\.[a-zA-Z]{2,8}$/.test(value) ? null : 'Неверная почта';
