'use client';
import { useEffect, useState } from 'react';
import { createClient } from "@/app/utils/supabase/client";



export default function ProfilePage() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch user profile on mount
    useEffect(() => {
        async function fetchProfile() {
            const supabase = createClient();
            const { data: user, error } = await supabase.auth.getUser();
            if (user && user.user) {
                setFullName(user.user.user_metadata.full_name || "");
                setUsername(user.user.user_metadata.username || "");
                setAvatarUrl(user.user.user_metadata.avatar_url || undefined);
            }
        }
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        const supabase = createClient();
        let avatar_url = avatarUrl;
        if (avatarFile) {
            const user = await supabase.auth.getUser();
            const user_id = user.data.user?.id;
            const fileExt = avatarFile.name.split('.').pop();
            const fileName = `${username}.${fileExt}`;
            const filePath = `${user_id}/${fileName}`;
            const { data, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, avatarFile, { upsert: true });
            if (uploadError) {
                console.log(uploadError)
                setError("Failed to upload Avatar");
                setLoading(false);
                return;
            }
            avatar_url = data?.path ? supabase.storage.from('avatars').getPublicUrl(data.path).data.publicUrl : undefined;
            setAvatarUrl(avatar_url); // Update avatar preview after upload
        }
        // Update user profile
        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                full_name: fullName,
                username: username,
                avatar_url: avatar_url,
            }
        });
        if (updateError) {
            setError("Failed to update profile");
        } else {
            setSuccess("Profile updated successfully!");
        }
        setLoading(false);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-base-300">
            <div className="card card-lg card-border border-base-200 bg-base-100 w-full max-w-md">
                <div className="card-body">
                    <h1 className="card-title mb-4">Edit Profile</h1>
                    {
                        fullName ? (
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                {/* Avatar Preview */}
                                {avatarUrl && (
                                    <div className="flex justify-center mb-2">
                                        <img src={avatarUrl} alt="Avatar" className="rounded-full w-24 h-24 object-cover border border-base-200" />
                                    </div>
                                )}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Avatar</span>
                                    </label>
                                    <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
                                </div>
                                <button type="submit" className="btn btn-primary mt-2" disabled={loading}>{loading ? <span className="loading loading-dots loading-xl"></span> : 'Save Changes'}</button>
                                {error && <div className="text-error mt-2">{error}</div>}
                                {success && <div className="text-success mt-2">{success}</div>}
                            </form>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">
                                <span className="loading loading-dots loading-xl">
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}