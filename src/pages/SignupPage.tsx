import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "@/lib/language";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const SignupPage = () => {
  const { language } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error(signup[language].errors.passwordMismatch);
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);

    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (result) {
      toast.success(signup[language].success);
      navigate("/auth/login");
    } else {
      toast.error(signup[language].errors.failed);
    }

    setLoading(false);
  };

  return (
    <section className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{signup[language].header}</CardTitle>
          <CardDescription>{signup[language].description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            aria-labelledby="signup-title"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-3">
              <Label htmlFor="name">{signup[language].name}</Label>
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">
                {signup[language].confirmPassword}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {signup[language].button}
            </Button>

            <p className="text-center text-sm">
              {signup[language].footer}{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                {signup[language].signin}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export { SignupPage };
