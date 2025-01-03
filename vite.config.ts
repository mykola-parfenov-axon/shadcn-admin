import path from 'path'
import { defineConfig } from 'vite'
import { ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const PROXY_BASE_URL = 'https://billing.staging.axterior.com'

const PROXY_MAPPING = [
  {
    path: '/api/billing',
    target: `${PROXY_BASE_URL}:8000/billing`,
  },
]

const configureServiceProxy = ({
  path,
  target,
}: {
  path: string
  target: string
}): Record<string, ProxyOptions> => {
  return {
    [path]: {
      target,
      changeOrigin: true,
      rewrite: (fullPath) => fullPath.replace(path, ''),
    },
  }
}

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      ...PROXY_MAPPING.reduce(
        (acc, { path, target }) => ({
          ...acc,
          ...configureServiceProxy({ path, target }),
        }),
        {}
      ),
    },
  },
  build: {
    outDir: 'build',
  },
})
