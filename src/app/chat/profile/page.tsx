

'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from "@/app/utils/supabase/client";
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/app/utils/cropImage';
import { Dialog } from '@headlessui/react';

export default function ProfilePage() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showCropModal, setShowCropModal] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

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

    const handleCropComplete = useCallback((_: any, croppedPixels: any) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageDataUrl = await readFile(file);
        setCropImageUrl(imageDataUrl);
        setAvatarFile(file);
        setShowCropModal(true);
    };

 

    const readFile = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result as string));
            reader.readAsDataURL(file);
        });
    };

    // New function to show cropped preview immediately
    const showCroppedImagePreview = async () => {
        if (!cropImageUrl || !croppedAreaPixels) return;
        try {
            const croppedBlob = await getCroppedImg(cropImageUrl, croppedAreaPixels);
            if (!croppedBlob) return;
            const previewUrl = URL.createObjectURL(croppedBlob);
            setAvatarUrl(previewUrl); // update preview immediately
        } catch (error) {
            console.error("Failed to show cropped preview", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        const supabase = createClient();
        let newAvatarUrl = avatarUrl;

        if (avatarFile && croppedAreaPixels && cropImageUrl) {
            try {
                const croppedBlob = await getCroppedImg(cropImageUrl, croppedAreaPixels);
                const user = await supabase.auth.getUser();
                const user_id = user.data.user?.id;
                const fileExt = avatarFile.name.split('.').pop();
                const fileName = `${username}.${fileExt}`;
                const filePath = `${user_id}/${fileName}`;

                const { data, error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, croppedBlob, { upsert: true });

                if (uploadError) {
                    console.log(uploadError);
                    setError("Failed to upload Avatar");
                    setLoading(false);
                    return;
                }

                newAvatarUrl = data?.path
                    ? supabase.storage.from('avatars').getPublicUrl(data.path).data.publicUrl
                    : undefined;
                setAvatarUrl(newAvatarUrl);
            } catch (err) {
                setError("Failed to crop or upload avatar");
                setLoading(false);
                return;
            }
        }

        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                full_name: fullName,
                username: username,
                avatar_url: newAvatarUrl,
            }
        });

        if (updateError) {
            setError("Failed to update profile");
        } else {
            setSuccess("Profile updated successfully! \n Refresh to apply the changes");
        }
        setLoading(false);
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-base-300">
            <div className="card card-lg card-border border-base-200 bg-base-100 w-full max-w-md">
                <div className="card-body">
                    <h1 className="card-title mb-4">Edit Profile</h1>
                    {fullName ? (
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            {avatarUrl && (
                                <div className="flex justify-center mb-2">
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar"
                                        className="rounded-full w-24 h-24 object-cover border border-base-200"
                                    />
                                </div>
                            )}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Avatar</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={handleAvatarSelect}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary mt-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-dots loading-xl"></span>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                            {error && <div className="text-error mt-2">{error}</div>}
                            {success && <div className="text-success mt-2">{success}</div>}
                        </form>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            <span className="loading loading-dots loading-xl"></span>
                        </div>
                    )}
                </div>
            </div>

            {/* Cropper Dialog */}
            <Dialog
                open={showCropModal}
                onClose={() => setShowCropModal(false)}
                className="fixed z-50 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen px-4">
                    <Dialog.Panel className="bg-base-100 p-4 rounded-xl shadow-xl">
                        <h2 className="text-lg font-bold mb-4">Crop your avatar</h2>
                        <div className="relative w-72 h-72 bg-base-200">
                            {cropImageUrl && (
                                <Cropper
                                    image={cropImageUrl}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={handleCropComplete}
                                />
                            )}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="btn"
                                onClick={() => {
                                    setShowCropModal(false);
                                    setAvatarFile(null); // optional: clear selected file if cancelled
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={async () => {
                                    await showCroppedImagePreview();
                                    setShowCropModal(false);
                                }}
                            >
                                Done
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}



