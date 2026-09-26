# StudyOS — Placement Command Center

A professional starter UI for a 90-day AI/IT placement tracker.

## Current release
This package is a front-end demo. It includes:
- Student/Admin role preview
- Command Center
- Daily execution
- Skill progress
- Recovery queue
- Weekly push
- Resources
- Responsive Zoho-inspired business UI
- No user data is sent anywhere in demo mode

## Linux setup

Install Git and Node.js (Node 20+ recommended).

Then:
```bash
cd placement_study_pro
git init
git add .
git commit -m "Initial StudyOS placement tracker"
```

Create a GitHub repository, then:
```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Local preview
This UI can be opened directly, but for a better local server:
```bash
npx serve .
```
Open the URL shown by the command.

## Production architecture
- GitHub: source code/version history
- Vercel: website hosting
- Supabase Auth: real user/admin login
- Supabase PostgreSQL: tasks, progress, users, weekly reviews
- Supabase Row Level Security: students see their own records; admins see authorized team records

## Important
The current demo buttons do not create real cloud accounts. The next implementation step is to connect Supabase and replace demoLogin() with real authentication.
