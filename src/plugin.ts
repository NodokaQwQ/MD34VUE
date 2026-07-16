import type { App, Plugin } from 'vue'
import * as components from './components'

export interface Md34VueOptions {
  componentPrefix?: string
}

export function createMd34Vue(options: Md34VueOptions = {}): Plugin {
  return {
    install(app: App) {
      const prefix = options.componentPrefix ?? ''

      Object.entries(components).forEach(([name, component]) => {
        app.component(`${prefix}${name}`, component)
      })
    }
  }
}

export default createMd34Vue()
