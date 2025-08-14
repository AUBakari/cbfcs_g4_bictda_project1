import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-in. Please try again or use a different method.",
        OAuthCallback: "Sign-in failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-in method. Try another option.",
        EmailCreateAccount:
          "This email can't be used to create an account. It may already exist.",
        Callback: "Something went wrong during sign-in. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Incorrect email or password. Try again or reset your password.",
        AccessDenied: "You don't have permission to sign in.",
        Configuration:
          "Sign-in isn't working right now. Please try again later.",
        Verification: "Your sign-in link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7F9FC] dark:bg-[#121212] p-4 transition-colors duration-200">
      <form
        noValidate
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-[#1E1E1E] p-8 shadow-xl border border-[#E7ECF3] dark:border-[#2A2A2A] transition-colors duration-200"
      >
        {/* CBFCS Branding */}
        <div className="text-center mb-8">
          <h1 className="font-montserrat font-bold text-2xl text-[#001D2E] dark:text-white mb-2">
            CBFCS
          </h1>
          <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Capacity Building for Civil Servants
          </p>
          <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Sign in to continue your ICT training
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#374151] dark:text-[#E5E7EB]">
              Email Address
            </label>
            <div className="overflow-hidden rounded-lg border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#262626] px-4 py-3 focus-within:border-[#30C4B5] focus-within:ring-1 focus-within:ring-[#30C4B5] transition-colors duration-200">
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full bg-transparent text-lg outline-none text-[#111827] dark:text-[#E5E7EB] placeholder-[#6B7280] dark:placeholder-[#9CA3AF]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#374151] dark:text-[#E5E7EB]">
              Password
            </label>
            <div className="overflow-hidden rounded-lg border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#262626] px-4 py-3 focus-within:border-[#30C4B5] focus-within:ring-1 focus-within:ring-[#30C4B5] transition-colors duration-200">
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-transparent text-lg outline-none text-[#111827] dark:text-[#E5E7EB] placeholder-[#6B7280] dark:placeholder-[#9CA3AF]"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] px-4 py-3 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          
          <p className="text-center text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Don't have an account?{" "}
            <a
              href={`/account/signup${
                typeof window !== "undefined" ? window.location.search : ""
              }`}
              className="text-[#30C4B5] hover:text-[#29AF9F] font-medium"
            >
              Sign up here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default MainComponent;