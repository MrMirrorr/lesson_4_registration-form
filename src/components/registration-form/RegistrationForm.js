import { useEffect, useRef, useState } from 'react';
import styles from './RegistrationForm.module.css';

import { sendFormData } from '../../helpers';
import { useStore } from '../../hooks';
import { regExp } from '../../constants';
import { FormFields, SubmitButton, ErrorField } from '../../components';

export const RegistrationForm = () => {
	const { getState, updateState } = useStore();
	const { email, password, confirmPassword } = getState();
	const [errorMessage, setErrorMessage] = useState(null);
	const btnSubmitRef = useRef(null);

	useEffect(() => {
		if (
			regExp.EMAIL_REGEXP.test(email) &&
			regExp.PASS_REGEXP.test(password) &&
			confirmPassword === password
		) {
			btnSubmitRef.current.focus();
		}
	}, [email, password, confirmPassword]);

	const handleInputChange = (e) => {
		setErrorMessage(null);
		updateState(e.target.name, e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let error = null;

		if (!regExp.EMAIL_REGEXP.test(email)) {
			error = 'Email должен быть вида: example@mail.com';
		} else if (!regExp.PASS_REGEXP.test(password)) {
			error = `Пароль должен содержать хотя бы одну прописную и одну строчную латинскую букву, a также цифру. Минимальная длина пароля 6 символов`;
		} else if (confirmPassword !== password) {
			error = 'Пароли не совпадают.';
		} else {
			sendFormData({ email, password });
		}

		setErrorMessage(error);
	};

	return (
		<form className={styles.formContainer} onSubmit={handleSubmit}>
			<FormFields
				email={email}
				password={password}
				confirmPassword={confirmPassword}
				handleInputChange={handleInputChange}
			/>
			<SubmitButton errorMessage={errorMessage} btnSubmitRef={btnSubmitRef} />
			<ErrorField errorMessage={errorMessage} />
		</form>
	);
};
