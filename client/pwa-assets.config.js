import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: [
    'public/img1.png',
    'public/img2.png',
    'public/logo.png',
    'public/smallLogo.png',
    'public/react.svg',
    "public/vite.svg",
    "public/smallLogo.png",
    "public/logo.png",
]
})