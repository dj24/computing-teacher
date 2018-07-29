import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import LogoutDialog from '../components/LogoutDialog'
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const drawerWidth = 240;

const styles = {
  root: {
    flexGrow: 1,
    zIndex:1,
  },
  flex: {
    flex: 1,

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    height:'30px',
    flex: 1,
    alignSelf: 'center',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },

};

class TopBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    logoutConfirm: false,
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
  }



  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { anchor } = this.state;


    let list1 = (
      <div className={classes.root}>
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
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor={anchor}
        >
          <div className={classes.toolbar} />
          <Divider />
          {list1}
        </Drawer>
      );

    let logoutDialog =  (
      <LogoutDialog open={this.state.logoutConfirm}/>
    );

    return (
      <div className={classes.root}>
        {logoutDialog}
        <AppBar position="static">
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
            {auth && (
              <div>
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
              </div>
            )}
          </Toolbar>
        </AppBar>
          {drawer}
      </div>
    );
  }
}


TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
