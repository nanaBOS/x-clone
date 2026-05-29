import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  logo: {
    fontSize: '40px',
    marginBottom: '32px',
  },
  card: {
    width: '100%',
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    textAlign: 'center',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#000',
    color: '#e7e9ea',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
  },
  btn: {
    padding: '12px',
    borderRadius: '24px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '100%',
  },
  btnPrimary: {
    background: '#1d9bf0',
    color: '#fff',
  },
  btnSecondary: {
    background: 'transparent',
    color: '#1d9bf0',
    border: '1px solid #1d9bf0',
  },
  error: {
    color: '#f4212e',
    fontSize: '14px',
    textAlign: 'center',
  },
  tab: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  tabBtn: {
    flex: 1,
    padding: '8px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '2px solid transparent',
  },
}

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.logo}>𝕏</div>
      <div style={styles.card}>
        <div style={styles.tab}>
          <button
            style={{
              ...styles.tabBtn,
              color: mode === 'login' ? '#1d9bf0' : '#71767b',
              borderBottomColor: mode === 'login' ? '#1d9bf0' : 'transparent',
            }}
            onClick={() => setMode('login')}
          >
            ログイン
          </button>
          <button
            style={{
              ...styles.tabBtn,
              color: mode === 'signup' ? '#1d9bf0' : '#71767b',
              borderBottomColor: mode === 'signup' ? '#1d9bf0' : 'transparent',
            }}
            onClick={() => setMode('signup')}
          >
            新規登録
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            style={styles.input}
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="パスワード（6文字以上）"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button
            type="submit"
            style={{ ...styles.btn, ...styles.btnPrimary }}
            disabled={loading}
          >
            {loading ? '処理中...' : mode === 'login' ? 'ログイン' : '登録する'}
          </button>
        </form>
      </div>
    </div>
  )
}
