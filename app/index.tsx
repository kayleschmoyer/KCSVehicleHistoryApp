import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}