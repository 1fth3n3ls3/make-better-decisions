import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src="../decision-logo.png" alt="logo make better decisions"></img>
      </div>
      <h1>Make Better Decisions</h1>
    </div>
  );
}
