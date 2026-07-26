import {InjectionToken, type Provider} from '@angular/core';

export interface Configuration {
    readonly features?: {
        readonly enableTriggersUiImprovement?: boolean;
    };
}

export const APP_CONFIG = new InjectionToken<Configuration>('[APP_CONFIG]: AppConfig');

export class AppConfig {
    public static settings: Configuration = {};

    public static async load(): Promise<void> {
        const response = await fetch(new URL('config.json', document.baseURI), {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to load config.json: ${response.status}`);
        }

        AppConfig.settings = (await response.json()) as Configuration;
    }
}

export const APP_CONFIG_PROVIDER: Provider = {
    provide: APP_CONFIG,
    useFactory: () => AppConfig.settings,
};
