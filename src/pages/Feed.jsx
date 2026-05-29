import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import TweetForm from '../components/TweetForm'
import Post from '../components/Post'

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '100vh',
    borderLeft: '1px solid #2f3336',
    borderRight: '1px solid #2f3336',
  },
  header: {
    position: 'sticky',
    top: 0,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    padding: '12px 16px',
    borderBottom: '1px solid #2f3336',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #536471',
    borderRadius: '24px',
    color: '#e7e9ea',
    padding: '6px 16px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  loading: {
    padding: '32px',
    textAlign: 'center',
    color: '#71767b',
  },
  empty: {
    padding: '32px',
    textAlign: 'center',
    color: '#71767b',
  },
}

export default function Feed({ session }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchPosts() {
    setLoading(true)
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.headerTitle}>ホーム</span>
        <button style={styles.logoutBtn} onClick={handleLogout}>ログアウト</button>
      </div>

      <TweetForm
        userId={session.user.id}
        userEmail={session.user.email}
        onPosted={fetchPosts}
      />

      {loading ? (
        <p style={styles.loading}>読み込み中...</p>
      ) : posts.length === 0 ? (
        <p style={styles.empty}>まだ投稿がありません</p>
      ) : (
        posts.map(post => (
          <Post
            key={post.id}
            post={post}
            currentUserId={session.user.id}
            onDeleted={fetchPosts}
          />
        ))
      )}
    </div>
  )
}
