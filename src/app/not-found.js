import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <section class={styles.wrapper}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist. Please check the URL and try again.</p>
    </section>
  );
};

export default NotFound;
