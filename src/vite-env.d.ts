/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SERVER_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
