import { useEffect, useState } from "react";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    fetch(`https://local-chef-bazar-server-theta.vercel.app/users/role/${email}`)
      .then(res => res.json())
      .then(data => {
        setRole(data.role);
        setLoading(false);
      });
  }, [email]);

  return { role, loading };
};

export default useRole;
