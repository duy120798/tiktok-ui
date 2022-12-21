import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";

import styles from "./Menu.module.scss";
import {Wrapper as PopperWrapper} from "~/components/Popper";
import MenuItem from "./MenuItem";
import Header from "./header";
import {useState} from "react";

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({hideOnClick = false, children, items = [], onChange = defaultFn}) {
  const [history, setHistory] = useState([{data: items}]);
  const current = history[history.length - 1];
  const renderItem = () => {
    return current.data.map((item, index) => {
      const isParrent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParrent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };
  return (
    <Tippy
      delay={[0, 500]}
      hideOnClick={hideOnClick}
      interactive
      placement="bottom-end"
      offset={[12, 8]}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header
                title={"Language"}
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            {renderItem()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => {
        setHistory((prev) => prev.slice(0, 1));
      }}>
      {children}
    </Tippy>
  );
}

export default Menu;
