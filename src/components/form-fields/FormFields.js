import styles from './FormFields.module.css';

export const FormFields = ({ email, password, confirmPassword, handleInputChange }) => {
	return (
		<>
			<div className={styles.formGroup}>
				<label htmlFor="email">Email:</label>
				<input
					id="email"
					name="email"
					type="email"
					value={email}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="password">Пароль:</label>
				<input
					id="password"
					name="password"
					type="password"
					value={password}
					onChange={handleInputChange}
					required
					autoComplete="on"
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="confirmPassword">Повтор пароля:</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					value={confirmPassword}
					onChange={handleInputChange}
					required
					autoComplete="on"
				/>
			</div>
		</>
	);
};
