import { useEffect, useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaAngleDown, FaHeart } from "react-icons/fa";
import { BiSolidCollection } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { MdSmartDisplay } from "react-icons/md";
import NavItem from "./components/NavItem";
import Container from "../layout/container";
import DropDown from "../dropdown/DropDown";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";
import SearchInput from "../search/SearchInput";

import defaultAvatar from "../../image/default_avatar.jpg";

import styles from "./styles.module.css";
import { AuthForm } from "../auth-form";
import useToggle from "../../hooks/useToggle";
import Modal from "../modal/Modal";

export default function Navbar() {
  const user = useUser();
  let navRef = useRef<HTMLEmbedElement | null>(null);
  let rootObserverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function scrollObserver(entires: IntersectionObserverEntry[]) {
      if (entires[0].isIntersecting) {
        navRef.current?.classList.remove(styles.nav_fill);
      } else {
        navRef.current?.classList.add(styles.nav_fill);
      }
    }
    let observer = new IntersectionObserver(scrollObserver, {
      rootMargin: "0px",
      threshold: 0.0,
    });
    if (rootObserverRef.current) {
      observer.observe(rootObserverRef.current);
    }
    return () => {
      if (observer && rootObserverRef?.current) {
        observer.unobserve(rootObserverRef.current);
      }
    };
  }, [navRef.current, rootObserverRef.current]);

  return (
    <>
      <nav className={`${styles.nav} fixed w-screen z-2`} ref={navRef}>
        <Container>
          <div className="flex flex-col space-between iteme-center  py-10 z-2">
            <div className="w-full flex gap-16 items-center space-between">
              <span className="flex gap-10 items-center">
                <Link
                  to="/"
                  className="text-lg color-white font-bold hidden sm:visible"
                >
                  Pyxis
                </Link>
              </span>
              <div>
                <Search />
              </div>
              <div className="flex gap-30">
                {user ? (
                  <Profile fullName={user.full_name} email={user.email} />
                ) : (
                  <AuthButtons />
                )}
              </div>
            </div>
          </div>
        </Container>
      </nav>
      <div className={styles.observer_ele} ref={rootObserverRef}></div>
    </>
  );
}

function Search() {
  let route = useNavigate();
  let path = useLocation();
  let [params, setParams] = useSearchParams();

  function handleInputSearch(searchTerm: string) {
    let p = new URLSearchParams(`q=${searchTerm}`);
    setParams(p);
  }

  function handleNavigateOnSearch() {
    if (path.pathname != "/search") {
      return route("/search");
    }
  }
  return (
    <div onClick={handleNavigateOnSearch}>
      <SearchInput
        handleInputChange={handleInputSearch}
        searchValue={params.toString().split("=")[1]}
      />
    </div>
  );
}

type ProfileProps = {
  fullName: string;
  avatarURL?: string;
  email: string;
};

function Profile({ fullName, avatarURL, email }: ProfileProps) {
  const { logout } = useAuth();
  return (
    <DropDown
      drpId="user_profile"
      styles="w-200"
      label={
        <div className="flex color-white items-center gap-10 cursor-pointer">
          <img
            src={avatarURL || defaultAvatar}
            className="rounded-full"
            height={36}
          />
          <i className="flex">
            <FaAngleDown />
          </i>
        </div>
      }
    >
      <div className="flex flex-col gap-10 bg-black py-10 rounded-lg border-1 border-gray">
        <div className="flex flex-col p-16">
          {fullName && (
            <span
              className="text-medium color-purple"
              style={{ whiteSpace: "nowrap" }}
            >
              {fullName}
            </span>
          )}
          <span>{email}</span>
        </div>
        <NavItem
          text="Profile"
          link="/user/profile"
          icon={<IoPerson />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Liked"
          link="/user/liked"
          icon={<FaHeart />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Watchlist"
          link="/user/watch-list"
          icon={<MdSmartDisplay />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Collections"
          link="/user/collections"
          icon={<BiSolidCollection />}
          classes="p-16 hover-bg-fade:hover"
        />
        <NavItem
          text="Logout"
          link="/"
          icon={<IoMdLogOut />}
          classes="p-16 hover-bg-fade:hover"
          onClick={logout}
        />
      </div>
    </DropDown>
  );
}

function AuthButtons() {
  const { toggle, handleToggle } = useToggle();
  return (
    <div className="flex gap-10">
      <button
        className="border-0 color-white font-semibold"
        onClick={handleToggle}
      >
        Sing up
      </button>
      <button
        className="border-0 color-white font-semibold"
        onClick={handleToggle}
      >
        Log in
      </button>
      {toggle && (
        <Modal handleClick={handleToggle}>
          <AuthForm />
        </Modal>
      )}
    </div>
  );
}
