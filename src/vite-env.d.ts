/// <reference types="vite/client" />

declare module '*.md?raw' {
  const content: string
  export default content
}

declare module 'virtual:galleries' {
  export type Gallery = {
    slug: string
    name: string
    order: number
    thumb: string
    images: string[]
  }

  export const galleries: Gallery[]
}
