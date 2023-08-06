export const passwordMinValidator = (value) =>
	value.length >= 6 ? null : 'Минимальная длина пароля не мене 6 символов';
