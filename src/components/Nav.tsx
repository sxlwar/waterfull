import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import apiService from '../service/api.service';

export interface NavProps
  extends Partial<React.PropsWithChildren<JSX.Element>> {
  updateQuery: (query: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'sticky',
      zIndex: 20,
      top: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

export default function Nav(): JSX.Element {
  const classes = useStyles();
  const [help, showHelp] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Power By Pixabay
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {
                apiService.query$.next(event.target.value);
              }}
            />
          </div>
          <HelpIcon
            className="cursor-pointer ml-4"
            onClick={() => showHelp(true)}
          />
        </Toolbar>
      </AppBar>

      <Dialog open={help} onClose={() => showHelp(false)}>
        <DialogTitle>使用方法</DialogTitle>

        <DialogContent>
          <p>默认输入的内容为图片关键字</p>
          <p className="my-4">
            可以在关键字后增加搜索条件，搜索条件之间以空格分割，搜索条件由key:value组成，例如：lang:zh，表示搜索中文语言的图片
          </p>
          <p>
            你可以在
            <Link href="https://pixabay.com/api/docs/" rel="noopener">
              这里
            </Link>
            找到所有可用的搜索参数
          </p>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => showHelp(false)}
          >
            知道了
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
