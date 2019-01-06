import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  withStyles,
  Button
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "./Search";

const styles = ({ breakpoints, palette, shape, spacing, transitions }) => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: shape.borderRadius,
    backgroundColor: fade(palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(palette.common.white, 0.25)
    },
    marginRight: spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [breakpoints.up("sm")]: {
      marginLeft: spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: spacing.unit,
    paddingRight: spacing.unit,
    paddingBottom: spacing.unit,
    paddingLeft: spacing.unit * 10,
    transition: transitions.create("width"),
    width: "100%",
    [breakpoints.up("md")]: {
      width: 200
    }
  },
  desktopSection: {
    display: "none",
    [breakpoints.up("md")]: {
      display: "flex"
    }
  },
  mobileSection: {
    display: "flex",
    [breakpoints.up("md")]: {
      display: "none"
    }
  }
});

const WebsiteHeader = ({ children }) => (
  <Link href="/">
    <Button color="inherit">
      <Typography variant="h6" color="inherit">
        {children}
      </Typography>
    </Button>
  </Link>
);

WebsiteHeader.propTypes = {
  children: PropTypes.object.isRequired
};

const DesktopMenuItem = ({ icon: Icon, href, children }) => (
  <Link href={href}>
    <Button color="inherit">
      <Icon />
      <Typography color="inherit" style={{ marginLeft: "7px" }}>
        {children}
      </Typography>
    </Button>
  </Link>
);

DesktopMenuItem.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

const MobileMenuItem = ({ icon: Icon, href, children }) => (
  <Link href={href}>
    <MenuItem>
      <IconButton color="inherit">
        <Icon />
      </IconButton>
      {children}
    </MenuItem>
  </Link>
);

MobileMenuItem.propTypes = {
  href: PropTypes.string.isRequired
};

class NavigationBar extends React.Component {
  state = {
    mobileMoreAnchorEl: null
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { classes, links } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const MobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        {links.map((link, index) => (
          <MobileMenuItem key={index} href={link.href} icon={link.icon}>
            {link.title}
          </MobileMenuItem>
        ))}
      </Menu>
    );

    const DesktopMenu = (
      <React.Fragment>
        {links.map((link, index) => (
          <DesktopMenuItem key={index} href={link.href} icon={link.icon}>
            {link.title}
          </DesktopMenuItem>
        ))}
      </React.Fragment>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <WebsiteHeader>
              <React.Fragment>
                <div className={classes.desktopSection}>Good Food Guide</div>
                <div className={classes.mobileSection}>GFG</div>
              </React.Fragment>
            </WebsiteHeader>
            <div className={classes.search}>
              <Search />
            </div>
            <div className={classes.grow} />
            <div className={classes.desktopSection}>{DesktopMenu}</div>
            <div className={classes.mobileSection}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {MobileMenu}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired
};

export default withStyles(styles)(NavigationBar);
