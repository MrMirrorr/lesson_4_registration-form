import { useEffect, useRef, useState } from 'react';
import styles from './app.module.css';
import { Field } from './components';
import {
	emailValidator,
	passwordMinValidator,
	passwordSymbolsValidator,
} from './validators';
export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

	const submitBtnRef = useRef(null);

	const onSubmit = (e) => {
		e.preventDefault();
		console.log({ email, password });
	};

	const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;

	useEffect(() => {
		if (isFormValid) {
			submitBtnRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<Field
					type="text"
					placeholder="Почта..."
					name="email"
					value={email}
					setValue={setEmail}
					setIsValid={setIsEmailValid}
					validators={[emailValidator]}
				/>
				<Field
					type="password"
					placeholder="Пароль..."
					name="password"
					value={password}
					setValue={setPassword}
					setIsValid={setIsPasswordValid}
					validators={[passwordMinValidator, passwordSymbolsValidator]}
				/>
				<Field
					type="password"
					placeholder="Повтор пароля..."
					name="confirmPassword"
					value={confirmPassword}
					setValue={setConfirmPassword}
					setIsValid={setIsConfirmPasswordValid}
					validators={[
						(value) => (value === password ? null : 'Пароли не совпадают'),
					]}
					dependencies={{ password }}
					forceValidation={(value) =>
						value.length > 0 && value.length >= password.length
					}
				/>
				<button type="submit" disabled={!isFormValid} ref={submitBtnRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
