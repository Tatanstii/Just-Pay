import { AxiosError } from "axios";
import { Button } from "../../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { login } from "../../../services/auth";
import { loginSchema } from "../../../schemas/auth";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "../../../store/useToastStore";

export default function LoginForm() {
    const navigate = useNavigate();
    const toast = useToast();
    const fetchUser = useAuthStore(state => state.fetchUser);

    const handleBack = () => {
        navigate({ to: "/" });
    }

    const handleGoRegister = () => {
        navigate({ to: "/register" });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());
        const validated = loginSchema.safeParse(values);

        if (!validated.success) {
            const errors = validated.error!.issues.map(issue => issue.message);
            toast.show("Validation errors occurred.", 'error', errors);
            return;
        }

        try {
            const response = await login(validated.data);
            if (response.status === 'success') {
                await fetchUser();
                toast.show("Login successful!", "success");
            }

            navigate({ to: "/dashboard" });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.show(error.response?.data?.message, 'error');
                return;
            }
            toast.show("An unexpected error occurred.", 'error');
        }
    }

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" name="email" type="email" placeholder="Email" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" name="password" type="password" placeholder="Password" />
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full mt-4">Login</Button>
                                <Button type="button" variant="secondary" className="w-full mt-4" onClick={handleBack}>Cancel</Button>
                            </Field>
                            <Field>
                                <Button variant="link" className="w-full mt-2" onClick={handleGoRegister}>Don't have an account? Register  </Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    )
}