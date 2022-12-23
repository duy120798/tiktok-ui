import classNames from "classnames/bind";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faPlus,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {Link} from "react-router-dom";

import styles from "./Header.module.scss";
import images from "~/assets/images";
import Button from "../../../components/Button";
import Menu from "../../../components/Popper/Menu";
import {InboxIcon, MessageIcon} from "../../../components/Icons";
import Image from "../../../components/Image";
import Search from "./Search";
import config from "~/config";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          code: "en",
          title: "English",
        },
        {
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Keyboard shortcuts",
  },
];

function Header() {
  const currentUser = true;

  // hande logic
  const handleMenuChange = (MenuItem) => {
    console.log(MenuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: "/@hoaa",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Get coins",
      to: "/coins",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Settings",
      to: "/Settings",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      to: "/logout",
      seperate: true,
    },
  ];
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to={config.routes.home}>
            <img src={images.logo} alt="tiktok" />
          </Link>
        </div>
        <Button>click me!</Button>
        <Search />
        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Button outline small leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>

              <Tippy content="Messages" placement="bottom">
                <button className={cx("action-btn")}>
                  <MessageIcon />
                  <div className={cx("quantity")}>9</div>
                </button>
              </Tippy>

              <Tippy content="Inbox" placement="bottom">
                <button className={cx("action-btn")}>
                  <InboxIcon />
                  <div className={cx("quantity")}>99+</div>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ab269e382e333d73e85a09bbc82905b1~c5_100x100.jpeg?x-expires=1671588000&x-signature=M1MehR3Hz4ni6xeO7ewtoKrJCpY%3D"
                alt="nguyen van a"
                className={cx("avatar")}
                fallback="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/9f0f69cf487966fac829b0b722dbba35~c5_100x100.jpeg?x-expires=1671606000&x-signature=ygzvhcO3NC%2FhAalTpkdLs5o883c%3D"
              />
            ) : (
              <button className={cx("more-btn")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
