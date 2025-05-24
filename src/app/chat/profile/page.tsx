import { createClient } from "@/app/utils/supabase/server";
import { UserMetadata } from "@supabase/supabase-js";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user:", error);
        return <div>Error loading profile</div>;
    }
    if (!user) {
        return <div>User not found</div>;
    }
    const profileData: UserMetadata = user.user.user_metadata;

    return (
        <div className="h-screen w-full flex justify-center items-center bg-base-300">
            <div className="card card-lg card-border border-base-200 bg-base-100 w-full max-w-md">
                <div className="card-body">
                    <h1 className="card-title mb-4">Edit Profile</h1>
                    <form className="flex flex-col gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="Enter your full name" defaultValue={profileData.full_name} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="Enter your username" defaultValue={profileData.username} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Avatar</span>
                            </label>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    );
}