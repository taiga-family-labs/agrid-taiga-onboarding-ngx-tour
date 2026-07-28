import {inject, InjectionToken, type Provider} from '@angular/core';

import {APP_CONFIG} from '../../app-config';
import {TravelNotesTourService} from './comment-tour.service';

export const TRAVEL_NOTES_TOUR = new InjectionToken<TravelNotesTourService | null>(
    '[TRAVEL_NOTES_TOUR]: TravelNotesTourService',
);

export function provideTravelNotesTour(): Provider {
    return [
        TravelNotesTourService,
        {
            provide: TRAVEL_NOTES_TOUR,
            useFactory: () =>
                inject(APP_CONFIG).features?.enableOnboarding
                    ? inject(TravelNotesTourService)
                    : null,
        },
    ];
}
