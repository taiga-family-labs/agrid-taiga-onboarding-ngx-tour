import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideEventPlugins} from '@taiga-ui/event-plugins';

import {AppConfig, APP_CONFIG_PROVIDER} from './app/app-config';
import {AppComponent} from './app/app.component';

AppConfig.load()
    .then(() =>
        bootstrapApplication(AppComponent, {
            providers: [
                APP_CONFIG_PROVIDER,
                provideAnimations(),
                provideEventPlugins(),
                provideRouter([]),
            ],
        }),
    )
    .catch(console.error);
