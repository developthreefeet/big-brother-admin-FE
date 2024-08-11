import { ValueOf } from '@/lib/types';

export const BasicStatus = {
  DISABLE: 'DISABLE',
  ENABLE: 'ENABLE',
} as const;

export type BasicStatusEnumType = ValueOf<typeof BasicStatus>;

export const ResultEnum = {
  SUCCESS: 0,
  ERROR: -1,
  TIMEOUT: 401,
} as const;

export type ResultEnumType = ValueOf<typeof ResultEnum>;

export const StorageEnum = {
  User: 'user',
  Token: 'token',
  Settings: 'settings',
  I18N: 'i18nextLng',
} as const;

export type StorageEnumType = ValueOf<typeof StorageEnum>;

export const ThemeMode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type ThemeModeEnumType = ValueOf<typeof ThemeMode>;

export const ThemeLayout = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
  Mini: 'mini',
} as const;

export type ThemeLayoutEnumType = ValueOf<typeof ThemeLayout>;

export const ThemeColorPresets = {
  Default: 'default',
  Cyan: 'cyan',
  Purple: 'purple',
  Blue: 'blue',
  Orange: 'orange',
  Red: 'red',
} as const;

export type ThemeColorPresetsEnumType = ValueOf<typeof ThemeColorPresets>;

export const LocalEnum = {
  en_US: 'en_US',
  zh_CN: 'zh_CN',
} as const;

export type LocalEnumType = ValueOf<typeof LocalEnum>;

export const MultiTabOperation = {
  FULLSCREEN: 'fullscreen',
  REFRESH: 'refresh',
  CLOSE: 'close',
  CLOSEOTHERS: 'closeOthers',
  CLOSEALL: 'closeAll',
  CLOSELEFT: 'closeLeft',
  CLOSERIGHT: 'closeRight',
} as const;

export type MultiTabOperationEnumType = ValueOf<typeof MultiTabOperation>;

export const PermissionType = {
  CATALOGUE: 'CATALOGUE',
  MENU: 'MENU',
  BUTTON: 'BUTTON',
} as const;

export type PermissionTypeEnumType = ValueOf<typeof PermissionType>;
