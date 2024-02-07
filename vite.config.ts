import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const definedEnv = {};
  for (const key of Object.keys(env)) {
    if (key.startsWith('VITE_')) {
      definedEnv[key] = env[key];
    }
  }

  return {
    plugins: [
      react({
        include: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.scss'],
      }),
      tsconfigPaths(),
      EnvironmentPlugin('all'),
    ],
    define: {
      'process.env': definedEnv,
    },
    server: {
      middleware: [
        (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          next();
        },
      ],
      proxy: {
        "/pdf": {
          target: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra",
          changeOrigin: true,
          followRedirects: true,
          rewrite: (path) => path.replace(/^\/pdf/, ''),
          secure: false
        },
      },
    },
  };
});
