import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Snapwash Loyalty Points App',
    short_name: 'CLPA',
    description: 'A customer loyalty points app',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/snap4.png',
        sizes: '196x196',
        type: 'image/png',
      },
      
    ],
  }
}