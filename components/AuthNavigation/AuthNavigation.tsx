"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import buttonCss from "../Button/Button.module.css";

export default function AuthNavigation() {
  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/" className={`${buttonCss.button} ${buttonCss.large}`}>
          Home
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/notes/filter/all"
          className={`${buttonCss.button} ${buttonCss.large}`}
        >
          Notes
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          className={`${buttonCss.button} ${buttonCss.large}`}
        >
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          className={`${buttonCss.button} ${buttonCss.large}`}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}
