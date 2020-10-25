import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import { createStyles, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: '40px',
      right: '18px',
      color: theme.palette.secondary.light,
      fontSize: '3em',
      opacity: 0.3,
      '&:hover': {
        opacity: 1,
      },
      transition: 'all .5s',
      cursor: 'pointer',
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
  })
);

export default function BackTop() {
  const [visible, setVisible] = useState(false);

  const styles = useStyles();

  useEffect(() => {
    const listener = () => {
      const visible = window.scrollY > 300;

      setVisible(visible);
    };
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [visible]);

  return visible ? (
    <PublishRoundedIcon
      className={styles.root}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    />
  ) : null;
}
