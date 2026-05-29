import React from 'react'
import { supabase } from '../supabaseClient'

const styles = {
  post: {
    padding: '12px 16px',
    borderBottom: '1px solid #2f3336',
    display: 'flex',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#1d9bf0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
    fontSize: '16px',
  },
  right: { flex: 1 },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  email: {
    fontWeight: 'bold',
    fontSize: '15px',
  },
  time: {
    color: '#71767b',
    fontSize: '13px',
  },
  content: {
    fontSize: '15px',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: '#71767b',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '2px 6px',
  },
}

function formatTime(ts) {
  const d = new Date(ts)
  return d.toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function Post({ post, currentUserId, onDeleted }) {
  async function handleDelete() {
    await supabase.from('posts').delete().eq('id', post.id)
    onDeleted()
  }

  const initial = post.user_email ? post.user_email[0].toUpperCase() : '?'

  return (
    <div style={styles.post}>
      <div style={styles.avatar}>{initial}</div>
      <div style={styles.right}>
        <div style={styles.header}>
          <span style={styles.email}>{post.user_email}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={styles.time}>{formatTime(post.created_at)}</span>
            {currentUserId === post.user_id && (
              <button style={styles.deleteBtn} onClick={handleDelete}>削除</button>
            )}
          </div>
        </div>
        <p style={styles.content}>{post.content}</p>
      </div>
    </div>
  )
}
