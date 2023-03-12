import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import RouterOutlet from './RouterOutlet';

import styles from './App.module.css';

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <RouterOutlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
