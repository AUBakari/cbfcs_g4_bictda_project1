import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };
  
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F7F9FC] dark:bg-[#121212] p-4 transition-colors duration-200">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#1E1E1E] p-8 shadow-xl border border-[#E7ECF3] dark:border-[#2A2A2A] transition-colors duration-200">
        {/* CBFCS Branding */}
        <div className="text-center mb-8">
          <h1 className="font-montserrat font-bold text-2xl text-[#001D2E] dark:text-white mb-2">
            CBFCS
          </h1>
          <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Capacity Building for Civil Servants
          </p>
          <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
            Thank you for using our platform
          </p>
        </div>

        <div className="text-center mb-6">
          <h2 className="font-montserrat font-semibold text-xl text-[#374151] dark:text-[#E5E7EB] mb-2">
            Sign Out
          </h2>
          <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Are you sure you want to sign out of your training session?
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full rounded-lg bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] px-4 py-3 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-offset-2 disabled:opacity-50"
        >
          Sign Out
        </button>

        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-[#30C4B5] hover:text-[#29AF9F] font-medium text-sm"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;