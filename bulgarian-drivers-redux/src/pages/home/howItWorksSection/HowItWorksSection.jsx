import LinkTo from '../../../components/UI/links/LinkTo';
import Step from './Step';

import step1 from '../../../assets/step-1.jpg';
import step2 from '../../../assets/step-2.jpg';
import step3 from '../../../assets/step-3.jpg';
import step4 from '../../../assets/step-4.jpg';
import step5 from '../../../assets/step-5.jpg';
import styles from './HowItWorksSection.module.css';

const HowItWorksSection = () => {
	return (
		<section className={styles['how-it-works']}>
			<h2 className={styles.title}>How it works?</h2>
			<ul className={styles.steps}>
				<Step
					img={step1}
					alt="Step 1"
					description={<LinkTo to="/create-post">1. Make a post</LinkTo>}
				/>
				<Step
					img={step2}
					alt="Step 2"
					description={'2. Enter car number'}
				/>
				<Step
					img={step3}
					alt="Step 3"
					description={'3. Add a title'}
				/>
				<Step
					img={step4}
					alt="Step 4"
					description={'4. Add a comment'}
				/>
				<Step
					img={step5}
					alt="Step 5"
					description={'5. Post it!'}
				/>
			</ul>
		</section>
	);
};

export default HowItWorksSection;
