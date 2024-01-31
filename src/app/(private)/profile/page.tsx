import { UserForm, AvatarUploader } from "@/components";

export default function ProfilePage() {
  return (
    <div className="max-w-[800px] w-full mx-auto">
      <AvatarUploader />
      <UserForm />
    </div>
  );
}
