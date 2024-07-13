import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import classes from "./PageLayout.module.scss";

const PageLayout = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={`${classes.layoutBody} d-flex`}>
        <div className={classes.sideMenu}>
          <Menu />
        </div>
        <div className={classes.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
