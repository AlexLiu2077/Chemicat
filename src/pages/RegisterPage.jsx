import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styles from './RegisterPage.module.css';
import { getAssetUrl } from '../utils/assetUrl';


export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUsername } = useUser();
  const [usernameVal, setUsernameVal] = useState('');

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (!usernameVal.trim()) return;
    setUsername(usernameVal.trim());
    navigate('/welcome');
  };

  return (
    <div className={`${styles.container} fade-enter`}>
      <img src={getAssetUrl('/assets/newicon.png')} alt="Chemicat" className={styles.logoSmall} />


      <form className={styles.stepWrapper} onSubmit={handleUsernameSubmit}>
        <h2 className={styles.heading}>请输入你的用户名</h2>
        <input
          type="text"
          className={styles.input}
          placeholder="你的名字"
          maxLength={20}
          value={usernameVal}
          onChange={(e) => setUsernameVal(e.target.value)}
          autoFocus
        />
        <button type="submit" className={styles.button} disabled={!usernameVal.trim()}>
          完成
        </button>
      </form>
    </div>
  );
}
