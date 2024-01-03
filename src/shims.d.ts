import 'react'

declare module 'react' {
  interface SVGProps<T> extends SVGAttributes<T>, ClassAttributes<T> {
    w?: string
    h?: string
  }
}
