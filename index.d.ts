import type { Mongo } from 'meteor/mongo';

declare module 'meteor/vlasky:blaze-s-alert' {
  export type SAlertCondition = 'info' | 'error' | 'success' | 'warning';

  export type SAlertPosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top'
    | 'bottom';

  export type SAlertEffect =
    | 'jelly'
    | 'genie'
    | 'stackslide'
    | 'scale'
    | 'slide'
    | 'flip'
    | 'bouncyflip'
    | '';

  export interface SAlertStackConfig {
    spacing?: number;
    limit?: number;
  }

  export type SAlertBeep =
    | string
    | {
        info?: string;
        error?: string;
        success?: string;
        warning?: string;
      };

  export interface SAlertData {
    _id?: string;
    message?: string;
    condition?: SAlertCondition;
    effect?: SAlertEffect;
    position?: SAlertPosition;
    timeout?: number | 'none';
    html?: boolean;
    onRouteClose?: boolean;
    stack?: boolean | SAlertStackConfig;
    offset?: number;
    beep?: boolean | SAlertBeep;
    onOpen?: (data: SAlertData) => void;
    onClose?: (data?: SAlertData) => void;
    template?: string;
    [key: string]: unknown;
  }

  export interface SAlert {
    settings: SAlertData;
    collection: Mongo.Collection<SAlertData>;
    config(configObj: SAlertData): void;
    closeAll(): void;
    close(id: string): void;
    info(msg: string | SAlertData, customSettings?: SAlertData): string | undefined;
    error(msg: string | SAlertData, customSettings?: SAlertData): string | undefined;
    success(msg: string | SAlertData, customSettings?: SAlertData): string | undefined;
    warning(msg: string | SAlertData, customSettings?: SAlertData): string | undefined;
  }

  export const sAlert: SAlert;
  export default sAlert;
}

declare global {
  // eslint-disable-next-line no-var
  var sAlert: import('meteor/vlasky:blaze-s-alert').SAlert;
}

export {};
