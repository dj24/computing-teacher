const styles = {
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
}

render() {

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
