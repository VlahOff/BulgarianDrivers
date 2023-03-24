import styles from './HeroSection.module.css';
import img from '../../assets/bmw-e30-dtm-t7-7574.jpg';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <img src={img} alt="Hero" className={styles['car-bg']} />
      <h1 className={styles['hero-title']}> Rate Bulgaria`s drivers</h1>
    </section>
  );
};

export default HeroSection;