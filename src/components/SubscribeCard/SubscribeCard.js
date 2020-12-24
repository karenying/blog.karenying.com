import React from 'react';

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
          <button
            type='submit'
            form='mc-embedded-subscribe-form'
            value='subscribe'
            name='subscribe'
            id='mc-embedded-subscribe'
            className={styles['Subscribe-button']}
          >
            subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
