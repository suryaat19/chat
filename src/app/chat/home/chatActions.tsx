import { createClient } from "@/app/utils/supabase/client";

// List of all chat actions

export async function deleteMessage(message_id: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('messages')
        .delete()
        .eq('message_id', message_id);
    if (error) {
        throw new Error(error.message);
    }
    return { success: true };
}

export async function editMessage(message_id: string, new_msg: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('messages')
        .update({ message_text: new_msg })
        .eq('message_id', message_id);
    if (error) {
        throw new Error(error.message);
    }
    return { success: true };
}

export async function sendMessage(conversation_id: string, message_text: string) {
    const supabase = await createClient();
    // Get current user id
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error('User not authenticated');
    }
    const sender_id = user.id;
    const { error, data } = await supabase
        .from('messages')
        .insert({ conversation_id, sender_id, message_text })
        .select();
    if (error) {
        throw new Error(error.message);
    }
    return { success: true, message: data?.[0] };
}


export async function newDirectConversation(username: string) {
    const supabase = await createClient();
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error('User not authenticated');
    }
    // Find the other user by username
    const { data: users, error: findError } = await supabase
        .from('users')
        .select('user_id')
        .eq('username', username)
        .limit(1);
    if (findError || !users || users.length === 0) {
        throw new Error('User not found');
    }
    const otherUserId = users[0].user_id;
    // Create conversation
    const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({ is_group_chat: false })
        .select();
    if (convError || !convData || convData.length === 0) {
        throw new Error('Failed to create conversation');
    }
    const conversation_id = convData[0].conversation_id;
    // Add both users as participants
    const { error: partError } = await supabase
        .from('conversation_participants')
        .insert([
            { conversation_id, user_id: user.id },
            { conversation_id, user_id: otherUserId }
        ]);
    if (partError) {
        throw new Error('Failed to add participants');
    }
    return { success: true, conversation_id };
}


export async function handleLikeToggle(message_id: string, like: boolean) {
    const supabase = await createClient();
    // Fetch current likes
    const { data, error: fetchError } = await supabase
        .from('messages')
        .select('likes')
        .eq('message_id', message_id)
        .single();
    if (fetchError || !data) {
        throw new Error('Message not found');
    }
    let newLikes = data.likes;
    if (like) {
        newLikes = Math.max(0, (data.likes || 0) + 1);
    } else {
        newLikes = Math.max(0, (data.likes || 0) - 1);
    }
    const { error } = await supabase
        .from('messages')
        .update({ likes: newLikes })
        .eq('message_id', message_id);
    if (error) {
        throw new Error(error.message);
    }
    return { success: true, likes: newLikes };
}

export async function newGroupConversation(name: string, usernames: string[]) {
    const supabase = await createClient();
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
        throw new Error('User not authenticated');
    }
    // Find user_ids for all usernames
    const { data: users, error: findError } = await supabase
        .from('users')
        .select('user_id, username')
        .in('username', usernames);
    if (findError) {
        throw new Error('Failed to find users');
    }
    const userIds = users ? users.map((u: any) => u.user_id) : [];
    if (!userIds.length) {
        throw new Error('No valid users found');
    }
    // Create group conversation
    const { data: convData, error: convError } = await supabase
        .from('conversations')
        .insert({ is_group_chat: true, name })
        .select();
    if (convError || !convData || convData.length === 0) {
        throw new Error('Failed to create group conversation');
    }
    const conversation_id = convData[0].conversation_id;
    // Add all users as participants (including current user)
    const allUserIds = Array.from(new Set([user.id, ...userIds]));
    const participants = allUserIds.map(uid => ({ conversation_id, user_id: uid }));
    const { error: partError } = await supabase
        .from('conversation_participants')
        .insert(participants);
    if (partError) {
        throw new Error('Failed to add participants');
    }
    return { success: true, conversation_id };
}