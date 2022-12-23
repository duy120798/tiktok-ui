import {useEffect, useRef, useState} from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import {faCircleXmark, faSearch, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import * as searchService from "~/services/searchService";
import styles from "./Search.module.scss";
import {Wrapper as PopperWrapper} from "../../../../components/Popper";
import AccountItem from "../../../../components/AccountItem";
import {useDebounce} from "~/hook";
const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const handleChange = (e) => {
    setSearchValue(e.target.value.trimStart());
    // let searchtext = e.target.value;
    // const check = () => {
    //   if (searchtext.startsWith(" ")) {
    //     searchtext = searchtext.slice(1);
    //     check();
    //   }
    // };
    // check();
    // setSearchValue(searchtext);
  };
  const handleClickOutside = () => {
    setShowResults(false);
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    const fetchAPI = async () => {
      setLoading(true);
      const result = await searchService.search(debounced);
      setSearchResult(result);
      setLoading(false);
    };

    fetchAPI();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);
  return (
    // Using a wrapper <div> or <span> tag around
    // the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive={true}
        visible={searchResult.length > 0 && showResults}
        onClickOutside={handleClickOutside}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Account</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}>
        <div className={cx("search")}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search account and videos"
            spellCheck={false}
            value={searchValue}
            onChange={handleChange}
            onFocus={() => {
              setShowResults(true);
            }}
          />
          {searchValue && !loading && (
            <button
              className={cx("clear")}
              onClick={() => {
                setSearchValue("");
                inputRef.current.focus();
              }}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx("spinner")} icon={faSpinner} />}

          <button className={cx("search_btn")} onMouseDown={(e) => e.preventDefault}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
