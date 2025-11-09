import RegisterForm from "../components/form/register";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function RegisterPage() {
    return <main className="py-4 px-10 grid place-items-center">
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Create a new user</CardTitle>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
        </Card>
    </main>
}