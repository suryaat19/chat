'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';

export default function ChatSettingsPage() {
    const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchSetting = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            const currentSetting = user?.user_metadata?.read_receipts_enabled;
            setReadReceiptsEnabled(!!currentSetting);
            setLoading(false);
        };
        fetchSetting();
    }, []);

    const handleToggle = async () => {
        setSaving(true);
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({
            data: {
                read_receipts_enabled: !readReceiptsEnabled,
            }
        });
        if (!error) {
            setReadReceiptsEnabled(!readReceiptsEnabled);
            setSuccess('Setting updated successfully!');
        }
        setSaving(false);
        setTimeout(() => setSuccess(''), 2000);
    };

    return (
        <div className="flex-grow flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-semibold mb-4">Chat Settings</h2>
                {loading ? (
                    <span className="loading loading-dots loading-lg" />
                ) : (
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Read Receipts</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={readReceiptsEnabled}
                                onChange={handleToggle}
                                disabled={saving}
                            />
                        </label>
                        {success && <p className="text-success mt-2">{success}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
