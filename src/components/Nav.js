// package imports 
import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon
} from '@material-ui/icons'

// project imports
import { handleLogoutUser } from '../actions/auth'

// Material-UI's style hook
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));


function Navbar({ authedUser, dispatch }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const drawerContents =
      <List>
        {['Sorting', 'Misc Algorithms', 'About'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

  return (
    <div className={classes.root}>
      <Hidden smUp implementation="css">
        <Drawer
          // container={container}
          className={classes.drawer}
          variant="temporary"
          anchor='left'
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContents}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.toolbar} />
          {drawerContents}
        </Drawer>
      </Hidden>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              CS Challenges
            </Link>
          </Typography>
          {authedUser
            ?
            <React.Fragment>
              <Typography variant="h6" className={classes.title}>
                {`Hello, ${authedUser.username}!`}
              </Typography>
              <Button
                color="inherit"
                onClick={() => dispatch(handleLogoutUser())}
              >Logout
                </Button>
            </React.Fragment>
            :
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >Login
              </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(Navbar);