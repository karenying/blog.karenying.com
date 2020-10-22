import React from 'react';
import { getContactHref, getIcon } from '../../../utils';
import Icon from '../../Icon';
import styles from './Contacts.module.scss';

import { FaLinkedin, FaCode } from 'react-icons/fa';
import { AiFillTwitterCircle, AiFillMediumCircle } from 'react-icons/ai';
import { GoMarkGithub } from 'react-icons/go';
import { IoMdMail } from 'react-icons/io';
import Tooltip from '@material-ui/core/Tooltip';


const Contacts = () => (
  <div className={styles['contacts']}>
    <div className={`${styles['contacts__code']} ${styles['contacts__link']}`}>
      <Tooltip title="Site source code" aria-label="site source code" placement="top">
        <a
          href='https://github.com/karenying/blog.karenying.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaCode />
        </a>
      </Tooltip>

    </div>
    <div className={`${styles['contacts__github']} ${styles['contacts__link']}`}>
      <Tooltip title="GitHub" aria-label="github" placement="top">
        <a
          href='https://github.com/karenying'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GoMarkGithub />
        </a>
      </Tooltip>
    </div>
    <div className={`${styles['contacts__email']} ${styles['contacts__link']}`}>
      <Tooltip title="Email" aria-label="email" placement="top">
        <a
          href='mailto:karenying7@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IoMdMail size='1.1rem'/>
        </a>
      </Tooltip>
    </div>
    <div className={`${styles['contacts__linkedin']} ${styles['contacts__link']}`}>
      <Tooltip title="LinkedIn" aria-label="linkedin" placement="top">
        <a
          href='https://www.linkedin.com/in/kyying/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaLinkedin size='1.1rem'/>
        </a>
      </Tooltip>
    </div>
    <div className={`${styles['contacts__twitter']} ${styles['contacts__link']}`}>
      <Tooltip title="Twitter" aria-label="twitter" placement="top">
        <a
          href='https://twitter.com/karen_ying_'
          target='_blank'
          rel='noopener noreferrer'
        >
          <AiFillTwitterCircle size='1.2rem'/>
        </a>
      </Tooltip>
    </div>
  </div>
);

export default Contacts;
