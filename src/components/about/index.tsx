import Image from 'next/image';
import iconImg from '../../../public/defalut/icon.webp';
import MYNAME from '@/constants/myname';
import TagLayout from '../tag';
import Link from 'next/link';
import styles from './index.module.scss';

type AboutMeProps = {
  children: React.ReactNode;
  tag: string;
  isVisible: boolean;
};

const AboutMeLayout = ({ children, tag, isVisible }: AboutMeProps) => {
  return (
    <div>
      <div className={styles.profile}>
        <div className={styles.info}>
          <p className={styles.name}>{MYNAME}</p>
          <div className={styles.tag}>
            <TagLayout>{tag}</TagLayout>
          </div>
          <div className={styles.detail}>{children}</div>
          {isVisible && (
            <div className={styles.detailLink}>
              <Link href={'/about'}>詳しくみる</Link>
            </div>
          )}
        </div>
        <div className={styles.selfie}>
          <Image src={iconImg} alt="アイコン" className={styles.icon} />
        </div>
      </div>
    </div>
  );
};
export default AboutMeLayout;
