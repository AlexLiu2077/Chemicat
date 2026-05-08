import styles from './TopBar.module.css';
import { getAssetUrl } from '../utils/assetUrl';


export default function TopBar() {
  return (
    <header className={styles.topBar}>
      <div className={styles.logoContainer}>
        <img src={getAssetUrl('/assets/newicon.png')} alt="Chemicat Logo" className={styles.logo} />

        <h1 className={styles.brandName}>Chemicat</h1>
      </div>
    </header>
  );
}
