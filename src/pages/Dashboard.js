import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Comment from "../components/Comment";
import Profile from "../components/dashboardTabs/Profile";
import Messages from "../components/dashboardTabs/Messages";
import LifeGoalMain from "../components/LifeGoalMain";
import MyLifeGoals from "../components/dashboardTabs/MyLifeGoals";
import MyComments from "../components/dashboardTabs/MyComments";
import Settings from "../components/dashboardTabs/Settings";
import DashboardMain from "../components/dashboardTabs/DashboardMain";

//Redux
import { connect } from "react-redux";

// Material UI
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SettingsIcon from "@material-ui/icons/Settings";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import CommentIcon from "@material-ui/icons/Comment";
import MessageIcon from "@material-ui/icons/Message";
function Dashboard(props) {
  // const myComments = this.props.myComments
  //   .sort((a, b) => (a.comment.createdAt < b.comment.createdAt ? 1 : -1))
  //   .map((comment) => (
  //     <Comment
  //       postName={comment.post}
  //       comment={comment.comment.comment}
  //       createdAt={comment.comment.createdAt}
  //     />
  //   ));
  const lifeGoalRoutes = props.lifegoals.map((lifeGoal) => {
    return (
      <Route
        path={`/lifegoals/${lifeGoal._id}`}
        render={(props) => (
          <LifeGoalMain {...props} key={lifeGoal._id} data={lifeGoal} />
        )}
      />
    );
  });

  let menuTabs = [
    {
      icon: <AssignmentIndIcon className="icon-padding" />,
      path: "profile",
      name: "My Profile",
    },
    {
      icon: <WallpaperIcon className="icon-padding" />,
      path: "lifegoals",
      name: "My LifeGoals",
    },
    {
      icon: <MessageIcon className="icon-padding" />,
      path: "messages",
      name: "My Messages",
    },
    {
      icon: <CommentIcon className="icon-padding" />,
      path: "comments",
      name: "My Comments",
    },
    {
      icon: <SettingsIcon className="icon-padding" />,
      path: "settings",
      name: "Settings",
    },
  ];
  let sidebarMenu = menuTabs.map((item) => (
    <Link
      key={menuTabs.indexOf(item)}
      className="submenu-item"
      to={`/dashboard/${item.path}`}
    >
      <li>
        {item.icon}
        {item.name}
      </li>
    </Link>
  ));
  return (
    // <Router>
    <div className="dashboard-cont">
      <nav className="sidebar">
        <ul>{sidebarMenu}</ul>
      </nav>
      <Switch>
        {/* Tabs */}
        <main className="dashboard-main">
          <Route exact={true} path="/dashboard" component={DashboardMain} />
          <Route path="/dashboard/profile" component={Profile} />
          <Route path="/dashboard/messages" component={Messages} />
          <Route path="/dashboard/comments" component={MyComments} />
          <Route path="/dashboard/settings" component={Settings} />
          <Route path="/dashboard/lifegoals" component={MyLifeGoals} />
          {lifeGoalRoutes}
        </main>
      </Switch>
    </div>
    // </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    lifegoals: state.lifegoals.lifegoalsData,
  };
};

export default connect(mapStateToProps)(Dashboard);
