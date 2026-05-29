import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

const MAX_LEN = 140

const styles = {
  form: {
    borderBottom: '1px solid #2f3336',
    padding: '12px 16px',
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
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  textarea: {
    background: 'transparent',
    border: 'none',
    color: '#e7e9ea',
    fontSize: '18px',
    resize: 'none',
    outline: 'none',
    width: '100%',
    minHeight: '60px',
    fontFamily: 'inherit',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  counter: {
    fontSize: '14px',
    color: '#71767b',
  },
  btn: {
    padding: '8px 20px',
    borderRadius: '24px',
    border: 'none',
    background: '#1d9bf0',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}

export default function TweetForm({ userId, userEmail, onPosted }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!content.trim() || loading) return

    setLoading(true)
    const { error } = await supabase
      .from('posts')
      .insert({ user_id: userId, content: content.trim(), user_email: userEmail })
    if (!error) {
      setContent('')
      onPosted()
    }
    setLoading(false)
  }

  const initial = userEmail ? userEmail[0].toUpperCase() : '?'
  const remaining = MAX_LEN - content.length
  const canPost = content.trim().length > 0 && remaining >= 0

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.avatar}>{initial}</div>
      <div style={styles.right}>
        <textarea
          style={styles.textarea}
          placeholder="いまどうしてる？"
          value={content}
          onChange={e => setContent(e.target.value)}
          maxLength={MAX_LEN}
        />
        <div style={styles.footer}>
          <span style={{ ...styles.counter, color: remaining < 20 ? '#f4212e' : '#71767b' }}>
            {remaining}
          </span>
          <button
            type="submit"
            style={{ ...styles.btn, ...(canPost && !loading ? {} : styles.btnDisabled) }}
            disabled={!canPost || loading}
          >
            {loading ? '...' : '投稿'}
          </button>
        </div>
      </div>
    </form>
  )
}
