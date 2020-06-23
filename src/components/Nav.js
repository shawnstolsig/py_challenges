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
import challengesData from '../content/challenges'

// set a width for nav drawer
const drawerWidth = 240;

// set up classes for styles
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
  greetingText: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  }
}));

// a ListItemLink implementation for using ListItem and react-router-dom
function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

function Nav({ authedUser, dispatch }) {
  const classes = useStyles();

  // state for controlling wether drawer is open or not (applicable to xs screen size only)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // the contents of the nav drawer.  update labels/links/icons
  const drawerContents = <List>
                          {Object.keys(challengesData).map((key) => 
                            <ListItemLink 
                              key={challengesData[key].id}
                              to={challengesData[key].path} 
                              primary={challengesData[key].name} 
                              icon={<KeyboardArrowRightIcon />}
                            />
                            )}
                        </List>

  return (
    <React.Fragment>
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
              <Typography variant="h6" className={classes.greetingText}>
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
      <nav className={classes.drawer}>

        {/* temporary drawer for small screens */}
        <Hidden smUp implementation="css">
          <Drawer
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
      </nav>
    </React.Fragment>

  )
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(Nav);