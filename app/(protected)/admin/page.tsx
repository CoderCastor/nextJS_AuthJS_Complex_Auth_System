"use client"

import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@/lib/generated/prisma"

const AdminPage = () => {
    
    const role = useCurrentRole()
    
    return <Card className="w-[600px]">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">🔑 Admin</p>
        </CardHeader>
        <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You have access" />
            </RoleGate>
        </CardContent>
    </Card>


}

export default AdminPage