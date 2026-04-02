import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, LogIn } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const isEmail = formData.identifier.includes("@");
      const payload = isEmail
        ? { email: formData.identifier, password: formData.password }
        : { username: formData.identifier, password: formData.password };

      const response = await axios.post("/api/auth/login", payload);
      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        if (response.data.user && response.data.user.username) {
          localStorage.setItem("username", response.data.user.username);
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setError("");
    try {
      const response = await axios.post("/api/auth/google", {
        token: credentialResponse.credential,
      });
      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        if (response.data.user && response.data.user.username) {
          localStorage.setItem("username", response.data.user.username);
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-vibe-card border border-vibe-border rounded-2xl shadow-2xl w-full max-w-[440px] p-8 md:p-10 transition-transform hover:-translate-y-1 duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome Back</h2>
          <p className="text-vibe-muted text-sm border-b border-vibe-border pb-6">
            Login to your account to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            label="Username or Email"
            type="text"
            placeholder="Enter username or email"
            value={formData.identifier}
            onChange={(e) =>
              setFormData({ ...formData, identifier: e.target.value })
            }
            icon={<Mail size={18} />}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            icon={<Lock size={18} />}
            required
          />
          <div className="mt-2">
            <Button type="submit" isLoading={isLoading}>
              <LogIn size={18} className="mr-2" />
              Login
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-vibe-border"></div>
          <span className="text-vibe-muted text-xs uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-vibe-border"></div>
        </div>

        <div className="flex justify-center [&>div]:w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google login failed")}
            theme="filled_black"
            size="large"
            width={380}
            text="continue_with"
            shape="pill"
          />
        </div>

        <div className="mt-8 text-center text-sm text-vibe-muted">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-vibe-accent hover:text-vibe-accent-hover font-medium transition-colors hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
