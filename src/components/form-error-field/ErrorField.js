import styles from './ErrorField.module.css';

export const ErrorField = ({ errorMessage }) => {
	return errorMessage && <p className={styles.errorField}>{errorMessage}</p>;
};
