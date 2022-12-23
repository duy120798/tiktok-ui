import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import PropTypes from "prop-types";

import Button from "../../Button";
const cx = classNames.bind(styles);

function MenuItem({data, onClick}) {
  const classes = cx("menu-item", {seperate: data.seperate});
  return (
    <Button className={cx(classes)} leftIcon={data.icon} to={data.to} onClick={onClick}>
      {data.title}
    </Button>
  );
}
MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
