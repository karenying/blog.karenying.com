import React from 'react';
import { FaRssSquare } from 'react-icons/fa';
import { StyledTooltip } from '../Sidebar/Contacts/Contacts';

import styles from './SubscribeCard.module.scss';

const Subscribe = ({ isPost }) => {
  let title;

  if (isPost) {
    title = (
      <label>
        <div className={styles['Subscribe-small-text']}>
          Well, you made it this far
        </div>
        Get in the loop <br />
        for <span className='dark-pink-text'>new</span> posts
      </label>
    );
  } else {
    title = (
      <label>
        Get in the loop <br />
        for <span className='dark-pink-text'>new</span> posts
      </label>
    );
  }

  return (
    <div id='mc_embed_signup' className={styles['Subscribe']}>
      <form
        action='https://karenying.us7.list-manage.com/subscribe/post?u=04656b6c2bd14e4f84c561dd1&amp;id=bf4d948b83'
        method='post'
        id='mc-embedded-subscribe-form'
        name='mc-embedded-subscribe-form'
        className={styles['Subscribe-container']}
        target='_blank'
        noValidate
      >
        <div id='mc_embed_signup_scroll'>
          {title}
          <br />
          <input
            type='email'
            name='EMAIL'
            className='email'
            id='mce-EMAIL'
            placeholder='name@site.com'
            required
          />
          <div className={styles['Subscribe-buttons']}>
            <button
              type='submit'
              form='mc-embedded-subscribe-form'
              value='subscribe'
              name='subscribe'
              id='mc-embedded-subscribe'
            >
              subscribe
            </button>
            <StyledTooltip
              title='RSS Feed'
              aria-label='rss feed'
              placement='top'
              arrow
            >
              <a
                href='https://blog.karenying.com/rss.xml'
                target='_blank'
                rel='noopener noreferrer'
                className={styles['Subscribe-buttons-rss']}
              >
                <FaRssSquare size='1.05rem' />
              </a>
            </StyledTooltip>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
