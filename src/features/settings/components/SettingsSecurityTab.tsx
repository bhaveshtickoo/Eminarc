import React, { useState } from "react";
import { Lock, ShieldCheck, Key, Smartphone, LogOut, Check } from "lucide-react";
import { toast } from "sonner";

export const SettingsSecurityTab: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [ipEnforcement, setIpEnforcement] = useState(false);

  const handleRevokeOtherSessions = () => {
    toast.success("All other active sessions have been terminated");
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6">
        <div className="border-b border-[rgba(0,0,0,0.06)] pb-4">
          <h3 className="font-bold text-lg text-[#111111] flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#716D64]" />
            Security Policies & Authentication
          </h3>
          <p className="text-xs text-[#52525B] mt-0.5">
            Manage multi-factor authentication, active user sessions, IP allowlisting, and SSO
            options.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-[#EDF6F0] text-[#2D6A4F]">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#111111] flex items-center gap-2">
                  Two-Factor Authentication (2FA)
                  <span className="font-mono text-[10px] bg-[#EDF6F0] text-[#2D6A4F] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
                    ENFORCED
                  </span>
                </h4>
                <p className="text-xs text-[#52525B] mt-0.5">
                  Require TOTP authentication apps (Google Authenticator, 1Password) for all
                  workspace sign-ins.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                toast.success(`2FA setting updated`);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                twoFactorEnabled ? "bg-[#000000]" : "bg-[#E5E0D6]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-[#111111] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#716D64]" /> Active Session Termination
              </h4>
              <button
                type="button"
                onClick={handleRevokeOtherSessions}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Revoke All Other Sessions</span>
              </button>
            </div>
            <p className="text-xs text-[#52525B]">
              Currently logged in from <strong>San Francisco, USA (Chrome 128 / macOS)</strong>. 2
              other sessions active.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-3">
            <h4 className="font-bold text-xs text-[#111111] flex items-center gap-1.5">
              <Key className="h-4 w-4 text-[#716D64]" /> Inactivity Session Timeout
            </h4>
            <div className="flex items-center space-x-3">
              {["15", "30", "60", "120"].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => {
                    setSessionTimeout(mins);
                    toast.success(`Session timeout set to ${mins} minutes`);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition-colors cursor-pointer ${
                    sessionTimeout === mins
                      ? "bg-[#000000] text-[#FFFFFF] border-black font-bold"
                      : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]"
                  }`}
                >
                  {mins} mins
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
