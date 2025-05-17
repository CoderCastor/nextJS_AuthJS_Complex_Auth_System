"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
    const session = useCurrentUser();

    const hadleClick = () => {
        logout();
    };

    return (
        <div className="">
            <Button
                variant={"destructive"}
                onClick={hadleClick}
            >
                Logout
            </Button>
        </div>
    );
};

export default SettingsPage;
