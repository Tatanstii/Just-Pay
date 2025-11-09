import { AxiosError } from "axios";
import { Button } from "../../ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../../ui/field";
import { Input } from "../../ui/input";
import { register } from "../../../services/auth";
import { registerSchema } from "../../../schemas/auth";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "../../../store/useToastStore";
import type { RegisterResponse, SuccessResponse } from "../../../type";

export default function RegisterForm() {
    const navigate = useNavigate();
    const toast = useToast();
    const fetchUser = useAuthStore(state => state.fetchUser);

    const handleBack = () => {
        navigate({ to: "/" });
    }

    const handleGoLogin = () => {
        navigate({ to: "/login" });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData.entries());
        const validated = registerSchema.safeParse(values);

        if (!validated.success) {
            const errors = validated.error!.issues.map(issue => issue.message);
            toast.show("Validation errors occurred.", 'error', errors);
            return;
        }

        try {
            const response = await register(validated.data);
            if (response.status === 'success') {
                const safeResponse = (response as SuccessResponse<RegisterResponse>);
                localStorage.setItem('auth_token', safeResponse.data.access_token);
                await fetchUser();
                toast.show("Registration successful!", "success");
            }

            navigate({ to: "/dashboard" });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.show(error.message, 'error');
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
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input id="name" name="name" type="text" placeholder="Name" autoComplete="name" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" name="email" type="email" placeholder="Email" autoComplete="email" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" name="password" type="password" placeholder="Password" autoComplete="new-password" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                                <Input id="password-confirmation" name="password_confirmation" type="password" placeholder="Confirm Password" autoComplete="new-password" />
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full mt-4">Register</Button>
                                <Button type="button" variant="secondary" className="w-full mt-4" onClick={handleBack}>Cancel</Button>
                            </Field>
                            <Field>
                                <Button type="button" variant="link" className="w-full mt-2" onClick={handleGoLogin}>Already have an account? Login</Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    )
}