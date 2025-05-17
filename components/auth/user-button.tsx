"use client"

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"

import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/use-current-user"
import LogoutButton from "./logout-button"
import { LogOut } from 'lucide-react';

export const UserButton = () => {

    const user = useCurrentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                     <AvatarFallback className="bg-purple-800">
                        <FaUser color="white"/>  
                     </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogoutButton>
                    <DropdownMenuItem>
                       <LogOut/>  Logout 
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}