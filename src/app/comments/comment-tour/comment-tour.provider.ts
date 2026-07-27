import {inject, InjectionToken, type Provider} from '@angular/core';

import {APP_CONFIG} from '../../app-config';
import {CommentTourService} from './comment-tour.service';

export const COMMENT_TOUR = new InjectionToken<CommentTourService | null>(
    '[COMMENT_TOUR]: CommentTourService',
);

export function provideCommentTour(): Provider {
    return [
        CommentTourService,
        {
            provide: COMMENT_TOUR,
            useFactory: () =>
                inject(APP_CONFIG).features?.enableTriggersUiImprovement
                    ? inject(CommentTourService)
                    : null,
        },
    ];
}
