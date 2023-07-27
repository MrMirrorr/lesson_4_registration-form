import { useEffect, useRef, useState } from 'react';
import styles from './RegistrationForm.module.css';
import { regExp } from '../../constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
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

export const RegistrationForm = () => {
	// const btnRef = useRef(null);
	const [btnDisabled, setBtnDisabled] = useState(false);

	const {
		register,
		handleSubmit,
		// getValues,
		// getFieldState,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	// const isValidPassword = !getFieldState('password').invalid;
	// const isValidConfirmPassword = !getFieldState('confirmPassword').invalid;

	// const passwordValue = getValues('password');
	// const confirmPasswordValue = getValues('confirmPassword');

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	useEffect(() => {
		if (emailError || passwordError || confirmPasswordError) {
			setBtnDisabled(true);
		} else {
			setBtnDisabled(false);
		}
	}, [emailError, passwordError, confirmPasswordError]);

	// useEffect(() => {
	// 	if (
	// 		isValidPassword &&
	// 		isValidConfirmPassword &&
	// 		passwordValue &&
	// 		confirmPasswordValue
	// 	) {
	// 		btnRef.current.focus();
	// 	}
	// }, [isValidPassword, isValidConfirmPassword, passwordValue, confirmPasswordValue]);

	const onSubmit = (data) =>
		console.log({ email: data.email, password: data.password });

	return (
		<form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.formGroup}>
				<label htmlFor="email">Email:</label>
				<input id="email" {...register('email')} />
				<p>{errors.email?.message}</p>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="password">Пароль:</label>
				<input id="password" type="password" {...register('password')} />
				<p>{errors.password?.message}</p>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="confirmPassword">Повтор пароля:</label>
				<input
					id="confirmPassword"
					type="password"
					{...register('confirmPassword')}
				/>
				<p>{errors.confirmPassword?.message}</p>
			</div>
			<button
				// ref={btnRef}
				disabled={btnDisabled}
				type="submit"
				className={styles.submitButton}
			>
				Зарегистрироваться
			</button>
		</form>
	);
};
