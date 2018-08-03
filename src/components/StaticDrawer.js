
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
}
class StaticDrawer extends React.Component {
  state = {
    anchorEl: null,
  };
render() {

  const { classes } = this.props;
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

    return (
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
    )
  }
}



StaticDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticDrawer);
