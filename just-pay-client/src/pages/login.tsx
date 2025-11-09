import Logo from "@/components/logo";
import LoginForm from "../components/form/login";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function LoginPage() {
    return <main className="py-4 px-10 grid place-items-center min-h-dvh bg-primary/10">
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <Logo className="text-primary" />
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    </main>
}