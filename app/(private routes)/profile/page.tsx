"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username || "Username"}</p>
          <p>Email: {user?.email || "Email"}</p>
        </div>
      </div>
    </main>
  );
}
