import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";

const cx = classNames.bind(styles);
function AccountItem() {
  return (
    <div className={cx("wrappers")}>
      <img src={require("~/assets/images/avt.jpeg")} className={cx("avatar")} alt="avata" />
      <div className={cx("info")}>
        <p className={cx("name")}>
          <span>nguyen van a</span>
          <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
        </p>
        <p className={cx("username")}>nguyen van a</p>
      </div>
    </div>
  );
}

export default AccountItem;
