import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  small = false,
  large = false,
  primary = false,
  outline = false,
  text = false,
  disable = false,
  rounder = false,
  className,
  children,
  leftIcon,
  rightIcon,
  onClick,
  ...more
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...more,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  if (disable) {
    delete props.onClick;
  }
  const classes = cx("wrapper", {
    rounder,
    disable,
    text,
    primary,
    outline,
    small,
    large,
    [className]: className,
  });

  return (
    <Comp className={classes} {...props}>
      <span className={cx("icon")}>{leftIcon && leftIcon}</span>
      <span>{children}</span>
      <span className={cx("icon")}>{rightIcon && rightIcon}</span>
    </Comp>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  disable: PropTypes.bool,
  rounder: PropTypes.bool,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
