import React from 'react';

import styles from './SubscribeCard.module.scss';

const Subscribe = ({ isPost }) => {
  let title;

  if (isPost) {
    title = (
      <label for='mce-EMAIL'>
        <div className={styles['Subscribe-small-text']}>
          Well, you made it this far
        </div>
        Get in the loop <br />
        for <span className='dark-pink-text'>new</span> posts
      </label>
    );
  } else {
    title = (
      <label for='mce-EMAIL'>
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
        class={styles['Subscribe-container']}
        target='_blank'
        novalidate
      >
        <div id='mc_embed_signup_scroll'>
          {title}
          <br />
          <input
            type='email'
            name='EMAIL'
            class={styles['Subscribe-email']}
            id='mce-EMAIL'
            placeholder='name@site.com'
            required
          />
          <div class='clear'>
            <input
              type='submit'
              value='subscribe'
              name='subscribe'
              id='mc-embedded-subscribe'
              class={styles['Subscribe-button']}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
