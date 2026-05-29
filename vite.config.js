import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages用: リポジトリ名に合わせて変更してください
  // 例: リポジトリが "x-clone" なら base: '/x-clone/'
  base: process.env.VITE_BASE_PATH || '/',
})
