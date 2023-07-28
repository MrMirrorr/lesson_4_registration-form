import styles from './RegistrationForm.module.css';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, onSubmit } from '../../helpers';

export const RegistrationForm = () => {
	const btnRef = useRef(null);
	const [btnDisabled, setBtnDisabled] = useState(false);

	const {
		register,
		handleSubmit,
		getValues,
		getFieldState,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const isValidEmail = !getFieldState('email').invalid;
	const isValidPassword = !getFieldState('password').invalid;
	const isValidConfirmPassword = !getFieldState('confirmPassword').invalid;

	const emailValue = getValues('email');
	const passwordValue = getValues('password');
	const confirmPasswordValue = getValues('confirmPassword');

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

	useEffect(() => {
		if (
			isValidEmail &&
			isValidPassword &&
			isValidConfirmPassword &&
			emailValue &&
			passwordValue &&
			confirmPasswordValue
		) {
			setTimeout(() => {
				btnRef.current.focus();
			}, 0);
		}
	}, [isValidPassword, isValidConfirmPassword, passwordValue, confirmPasswordValue]);

	return (
		<form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.formGroup}>
				<label htmlFor="email">Email:</label>
				<input id="email" {...register('email')} />
				{emailError && <p>{emailError}</p>}
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="password">Пароль:</label>
				<input id="password" type="password" {...register('password')} />
				{passwordError && <p>{passwordError}</p>}
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="confirmPassword">Повтор пароля:</label>
				<input
					id="confirmPassword"
					type="password"
					{...register('confirmPassword')}
				/>
				{confirmPasswordError && <p>{confirmPasswordError}</p>}
			</div>
			<button
				ref={btnRef}
				disabled={btnDisabled}
				type="submit"
				className={styles.submitButton}
			>
				Зарегистрироваться
			</button>
		</form>
	);
};
