import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styles from './WelcomePage.module.css';
import { getAssetUrl } from '../utils/assetUrl';


export default function WelcomePage() {
  const navigate = useNavigate();
  const { username } = useUser();

  return (
    <div className={`${styles.container} fade-enter`}>
      <img src={getAssetUrl('/assets/newicon.png')} alt="Chemicat" className={styles.logoSmall} />

      <p className={styles.message}>
        <span className={styles.username}>{username}</span>
        你好！Chemicat致力于提供化学单词的背诵服务，你可以挑选一只小猫作为你的学习伙伴~
      </p>
      <button className={styles.button} onClick={() => navigate('/select-cat')}>
        选择小猫
      </button>
    </div>
  );
}
