import menuConfig from './menu'
import textConfig from './text'

export type ConfigType = {
  height: number,
  menus: string[]
}

export default Object.assign(
  {},
  menuConfig,
  textConfig,
)