import { otherAccounts } from "@/lib/mock-data";
import { Account } from "@/types";
import { X, ChevronUp, UserPlus, LogOut, Cloud, Camera } from "lucide-react";

const AccountItem = ({ account }: { account: Account }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700 cursor-pointer">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
        account.avatar.length > 1 ? "" : "bg-green-500"
      }`}
    >
      {account.avatar}
    </div>
    <div>
      <p className="font-semibold text-sm">{account.name}</p>
      <p className="text-xs text-zinc-400">{account.email}</p>
    </div>
  </div>
);

type ProfileCardProps = {
  onClose: () => void; 
};

export default function ProfileCard({ onClose }: ProfileCardProps) {
  return (
    <div className="absolute top-16 right-6 w-96 bg-[#28292d] rounded-2xl shadow-2xl text-zinc-200 p-4 border border-zinc-700">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium flex mx-auto">ad298suncity@gmail.com</p>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-zinc-700"
        >
          <X size={20} />
        </button>
      </div>

      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-2">
          <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-5xl">
            🎵
          </div>
          <button className="absolute bottom-0 right-0 bg-zinc-600 p-1.5 rounded-full border-2 border-[#28292d]">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-semibold">Hi, Atharv!</h2>
        <button className="mt-4 w-full py-2 border border-zinc-600 rounded-full hover:bg-zinc-700 transition-colors text-sm font-medium">
          Manage your Google Account
        </button>
      </div>

      <div className="my-4 border-t border-zinc-700" />

      <div>
        <div className="flex justify-between items-center p-2">
          <h3 className="text-sm font-medium">Hide more accounts</h3>
          <ChevronUp size={20} />
        </div>
        <div className="flex flex-col gap-1 mt-2">
          {otherAccounts.map((acc) => (
            <AccountItem key={acc.email} account={acc} />
          ))}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700 cursor-pointer">
            <UserPlus size={20} className="ml-1.5" />
            <p className="font-medium text-sm">Add another account</p>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700 cursor-pointer">
            <LogOut size={20} className="ml-1.5" />
            <p className="font-medium text-sm">Sign out of all accounts</p>
          </div>
        </div>
      </div>

      <div className="my-4 border-t border-zinc-700" />

      <div className="flex items-center gap-3 p-2">
        <Cloud size={20} />
        <p className="text-sm">0% of 2 TB used</p>
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-zinc-400">
          Privacy Policy • Terms of Service
        </p>
      </div>
    </div>
  );
}
