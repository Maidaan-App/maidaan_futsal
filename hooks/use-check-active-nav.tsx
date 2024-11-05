import { usePathname } from 'next/navigation'

export default function useCheckActiveNav() {
  const pathname = usePathname()

  const checkActiveNav = (nav: string) => {
    const normalizedNav = nav.replace(/^\//, '')
    const pathArray = pathname?.split('/').filter((item) => item !== '') || []

    // Exception handling: If the current path is a subpath of /admin, do not activate /admin
    if (nav === '/admin' && pathname !== '/admin' && pathname.startsWith('/admin/')) {
      return false
    }

    // General case: Check if the path starts with the nav (handles nested paths)
    if (pathname === nav || pathname.startsWith(`${nav}/`)) {
      return true
    }

    // Handle exact match for subpaths
    if (pathArray.join('/') === normalizedNav) return true

    return false
  }

  return { checkActiveNav }
}
