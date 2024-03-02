import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: [
    'src/assets/img1.png',
    'src/assets/img2.png',
    "public/logo.png",
    "public/smallLogo.png",
]
})