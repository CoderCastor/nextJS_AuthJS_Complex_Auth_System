"use server"

import { signOut } from "@/auth";

export const logout = async () => {
    
    //for doing cleaning before log out user
    
    await signOut()
}