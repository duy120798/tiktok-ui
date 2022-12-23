import PropTypes from "prop-types";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import Image from "../Image";
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);
function AccountItem({data}) {
  return (
    <Link to={`/@${data.nickname}`} className={cx("wrappers")}>
      <Image src={data.avatar} className={cx("avatar")} alt={data.avatar} />
      <div className={cx("info")}>
        <p className={cx("name")}>
          <span>{data.full_name}</span>
          {data.tick && <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />}
        </p>
        <p className={cx("username")}>{data.nickname}</p>
      </div>
    </Link>
  );
}
AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AccountItem;
