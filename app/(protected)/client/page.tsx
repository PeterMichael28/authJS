"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "../_components/user-info";

const ClientPage = () => {
  const user = useCurrentUser();

  return ( 
    <UserInfo
      label="📱 Client component"
      user={user}
    />
   );
}
 
export default ClientPage;