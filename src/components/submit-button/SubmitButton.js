import styles from './SubmitButton.module.css';

export const SubmitButton = ({ errorMessage, btnSubmitRef }) => {
	return (
		<button
			type="submit"
			className={styles.submitButton}
			disabled={errorMessage !== null}
			ref={btnSubmitRef}
		>
			Зарегистрироваться
		</button>
	);
};
