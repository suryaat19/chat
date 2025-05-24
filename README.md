'DummyChatApp' is a realtime Web-Chat application which allows multiple users to communicate and coordinate with each other via different mediums effectively. 

## Setup 

Clone the Git Repository

`URL goes here`

then

```bash
cd chat
npm install
```

To run the development server:
```bash
npm run dev
```
To run the release build:
```bash
npm build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note that you will also need to set up the `.env.local` file in the root of the project directory and set the following parameters accordingly (Supabase):

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Automatic Setup along with Supabase and Vercel (TODO)

## Features (Current)
- User Registration and Login
- Session Management
### TODO
    [x] Project Setup
        [x] Initialize repository with proper structure
        [x] Set up development environment
    [ ] User Authentication
        [x] Registration and login system
        [ ] User profiles with customizable avatars
        [x] Session management
        [ ] Password recovery mechanism
    [ ] Basic Chat Interface
        [ ] Clean, responsive UI
        [ ] Message input and display
        [ ] Basic conversation threading
        [ ] Read receipts along with timestamp
    [ ] Real-time Communication
        [ ] Implement websocket connections
        [ ] Message delivery status indicators
        [ ] Typing indicators
        [ ] Online/offline status
    [ ] Advanced Chat Features
        [ ] Group chat functionality
        [ ] Direct messaging between users
        [ ] Message reactions (likes, emoji responses)
    [ ] Media Support
        [ ] Image sharing and previews
        [ ] File attachments
        [ ] Link previews
        [ ] Voice messages (optional)

Day 3: Polish & Other Optional Features

    [ ] Search & Organization
        [ ] Message search functionality
        [ ] Chat history
        [ ] Message threading/replies
        [ ] Pin important messages
    [ ] Notifications
        [ ] Real-time notifications
        [ ] Email notifications (optional)
        [ ] Notification preferences
        [ ] Mention functionality (@username)
    [ ] Final Touches
        [ ] Theme customization (light/dark mode)
        [ ] Performance optimization

## Code Structure

- src
    - app
        - api (Contains all API endpoints)
        - auth (Authentication Confirmation related utilities)
        - authentication (Login / Sign Up Page)
        - utils (Utilities related to Supabase Clients)
        - chat (Main Chat Interface)
