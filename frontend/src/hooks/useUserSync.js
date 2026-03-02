import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

function useUserSync() {
  const {user} = useUser();
  const {isSignedIn} = useAuth();

  const {mutate :syncUserMutation, isPending, isSuccess, isError} = useMutation({
  mutationFn : syncUser,
  })

  useEffect(()=>{
    if(isSignedIn && user && !isPending && !isSuccess && !isError) { 
      const email = user.primaryEmailAddress?.emailAddress;
      const name = user.fullName ?? user.firstName ?? user.lastName;
      if(!email || !name) return;
        syncUserMutation({
            email,
            name,
            imageUrl : user.imageUrl,
        });
    }
  },[isSignedIn,user,syncUserMutation,isPending,isSuccess,isError])

  return {isSynced : isSuccess};
}

export default useUserSync ;