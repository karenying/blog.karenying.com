import React from 'react';

import styles from './Contacts.module.scss';

import { FaLinkedin, FaInfoCircle } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { GoMarkGithub } from 'react-icons/go';
import { IoMdMail } from 'react-icons/io';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const LightTooltip = withStyles(() => ({
  tooltip: {
    boxShadow: '0.3rem 0.3rem 1rem black',
    fontSize: 11,
    fontWeight: 700,
    fontFamily: 'Varela Round',
  },
}))(Tooltip);

const Contacts = () => (
  <div className={styles['contacts']}>
    <div className={`${styles['contacts__about']} ${styles['contacts__link']}`}>
      <LightTooltip
        title='About me'
        aria-label='about me'
        placement='top'
        arrow
      >
        <a
          href='http://karenying.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaInfoCircle size='1.05rem' />
        </a>
      </LightTooltip>
    </div>
    <div
      className={`${styles['contacts__github']} ${styles['contacts__link']}`}
    >
      <LightTooltip title='GitHub' aria-label='github' placement='top' arrow>
        <a
          href='https://github.com/karenying'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GoMarkGithub />
        </a>
      </LightTooltip>
    </div>
    <div className={`${styles['contacts__email']} ${styles['contacts__link']}`}>
      <LightTooltip title='Email' aria-label='email' placement='top' arrow>
        <a
          href='mailto:karenying7@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IoMdMail size='1.1rem' />
        </a>
      </LightTooltip>
    </div>
    <div
      className={`${styles['contacts__linkedin']} ${styles['contacts__link']}`}
    >
      <LightTooltip
        title='LinkedIn'
        aria-label='linkedin'
        placement='top'
        arrow
      >
        <a
          href='https://www.linkedin.com/in/kyying/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaLinkedin size='1.04rem' />
        </a>
      </LightTooltip>
    </div>
    <div
      className={`${styles['contacts__twitter']} ${styles['contacts__link']}`}
    >
      <LightTooltip title='Twitter' aria-label='twitter' placement='top' arrow>
        <a
          href='https://twitter.com/karen_ying_'
          target='_blank'
          rel='noopener noreferrer'
        >
          <AiFillTwitterCircle size='1.15rem' />
        </a>
      </LightTooltip>
    </div>
  </div>
);

export default Contacts;
