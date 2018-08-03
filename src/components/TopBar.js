import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import LogoutDialog from '../components/LogoutDialog'
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


const drawerWidth = 240;

const styles = theme => ({
  list: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flex: 1,
  },
  logo: {
    height:'30px',
    flex: 1,
    alignSelf: 'center',
  },
});

class TopBar extends React.Component {
  state = {
    mobileOpen: false,
    anchorEl: null,
    logoutConfirm: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget, logoutConfirm: false });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, logoutConfirm: false });
  };

  renderLogoutDialog = () => {
    this.setState({ logoutConfirm: true});
  };




  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { anchor } = this.state;

    let iconList = (
      <div className={classes.list}>
      <List component="nav">
       <ListItem button>
         <ListItemIcon>
           <InboxIcon />
         </ListItemIcon>
         <ListItemText primary="Inbox" />
       </ListItem>
       <ListItem button>
         <ListItemIcon>
           <DraftsIcon />
         </ListItemIcon>
         <ListItemText primary="Drafts" />
       </ListItem>
     </List>
     <Divider />
     <List component="nav">
       <ListItem button>
         <ListItemText primary="Trash" />
       </ListItem>
       <ListItem button component="a" href="#simple-list">
         <ListItemText primary="Spam" />
       </ListItem>
     </List>
     </div>
    )

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        {iconList}
      </div>
    );


    let logoutDialog =  (
      <LogoutDialog open={this.state.logoutConfirm}/>
    );


    return (
      <div className={classes.root}>
      {logoutDialog}
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <div class={classes.flex}>
              <img src={this.props.logo} class={classes.logo}/>
            </div>
            <IconButton
              aria-owns={'menu-appbar'}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
            <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              <MenuItem onClick={this.renderLogoutDialog}>Sign Out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>

      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TopBar);
