-- Supabase SQL Editorで実行してください

-- postsテーブルを作成
create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  user_email text not null,
  content text not null,
  created_at timestamptz default now() not null
);

-- Row Level Security を有効化
alter table posts enable row level security;

-- 全員が投稿を読める
create policy "Anyone can read posts"
  on posts for select
  using (true);

-- ログイン済みユーザーが自分の投稿を作成できる
create policy "Users can insert their own posts"
  on posts for insert
  with check (auth.uid() = user_id);

-- 自分の投稿だけ削除できる
create policy "Users can delete their own posts"
  on posts for delete
  using (auth.uid() = user_id);
