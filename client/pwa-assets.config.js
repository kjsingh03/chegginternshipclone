import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: [
    'src/assets/img1.png',
    'src/assets/img2.png',
    'src/assets/logo.png',
    'src/assets/smallLogo.png',
    'src/assets/react.svg',
    "public/vite.svg"
]
})