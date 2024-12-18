import { useEffect } from "react";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Ensure navigation occurs only after layout mount
    const timer = setTimeout(() => {
      router.replace("/dashboard");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default Index;