import styles from './Press.module.css';

const Press = () => {
	return (
		<section className={styles.press}>
			<h3 className={styles.title}>What the press says</h3>
			<div className={styles.quotes}>
				<article className={styles.card}>
					<p className={styles.quote}>
						<i className={`${styles.mark} fa-solid fa-quote-left`}></i> Lorem
						ipsum dolor sit amet consectetur adipisicing elit. Ut magnam aut
						temporibus, dolorum amet inventore? Est explicabo debitis architecto
						voluptatibus iusto? Ex in dolore illum libero voluptas fugiat
						ducimus voluptate.
					</p>
					<p className={styles.author}>The New York Times</p>
				</article>
				<article className={styles.card}>
					<p className={styles.quote}>
						<i className={`${styles.mark} fa-solid fa-quote-left`}></i> Lorem
						ipsum dolor sit amet consectetur adipisicing elit. Ut magnam aut
						temporibus, dolorum amet inventore? Est explicabo debitis architecto
						voluptatibus iusto? Ex in dolore illum libero voluptas fugiat
						ducimus voluptate.
					</p>
					<p className={styles.author}>BBC</p>
				</article>
			</div>
		</section>
	);
};

export default Press;
