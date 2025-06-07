// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [tailwindcss(), react()],
// // })


// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   server: {
//     port: 5173, // optional, default is 5173
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//         // optional for advanced control:
//         configure: (proxy) => {
//           proxy.on('proxyReq', (proxyReq) => {
//             proxyReq.setHeader('Origin', 'http://localhost:5173');
//           });
//         }
//       }
//     }
//   }
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // No need for configure unless debugging
      },
    },
  },
});