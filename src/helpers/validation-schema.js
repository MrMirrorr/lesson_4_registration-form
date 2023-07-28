import * as yup from 'yup';
import { regExp } from '../constants';

export const schema = yup
	.object({
		email: yup
			.string()
			.required('Это поле обязательно для заполнения')
			.email('Не корректный Email'),
		password: yup
			.string()
			.required('Это поле обязательно для заполнения')
			.min(6, 'Минимальная длина пароля 6 символов')
			.matches(
				regExp.PASS_REGEXP,
				'Пароль должен содержать хотя бы одну прописную и одну строчную латинскую букву, a также цифру.',
			),
		confirmPassword: yup
			.string()
			.required('Это поле обязательно для заполнения')
			.oneOf([yup.ref('password')], 'Пароли не совпадают'),
	})
	.required();
