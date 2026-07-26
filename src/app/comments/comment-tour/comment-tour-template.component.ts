import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {type IStepOption, TourService} from 'ngx-ui-tour-tui-hint';

import {COMMENT_TOUR} from './comment-tour.provider';
import {COMMENT_TOUR_STEPS} from './comment-tour.service';

@Component({
    selector: 'comment-tour-template',
    imports: [TuiButton, TuiTitle],
    template: `
        <article class="step">
            <button
                appearance="flat"
                aria-label="Закрыть онбординг"
                class="close"
                iconStart="@tui.x"
                size="xs"
                tuiIconButton
                type="button"
                (click)="tour.end()"
            ></button>

            @switch (step().stepId) {
                @case (steps.trigger) {
                    <h3 tuiTitle>
                        Обоснования переехали
                        <span tuiSubtitle>По иконке комментария теперь можно увидеть и отклонения по заявке</span>
                    </h3>

                    <div class="preview rows-preview">
                        @for (name of names; track name; let index = $index) {
                            <div class="row">
                                <span>{{ name }}</span>
                                <span class="comment" [class.warning]="index === 2">●</span>
                            </div>
                        }
                    </div>
                }
                @case (steps.tabs) {
                    <h3 tuiTitle>
                        Все комментарии в одном месте
                        <span tuiSubtitle>Комментарии, отклонения и обоснования теперь будут находиться здесь</span>
                    </h3>

                    <div class="preview tabs-preview">
                        <div class="segments">
                            <span>Все</span>
                            <span>Обоснования</span>
                            <span>Другие комментарии</span>
                        </div>

                        <div class="panel">
                            <strong>Отклонения от правил в заявке</strong>
                            <span>• Превышение рекомендаций</span>
                            <span>• Новый CR выше текущего</span>
                        </div>
                    </div>
                }
                @case (steps.justification) {
                    <h3 tuiTitle>
                        Комментарий как обоснование
                        <span tuiSubtitle>Если по заявке есть отклонения от правил, комментарий может учитываться как обоснование</span>
                    </h3>

                    <div class="preview justification-preview">
                        <span class="checkbox"></span>
                        <span>Учитывать как обоснование</span>
                    </div>
                }
            }

            <footer>
                <span>{{ currentIndex + 1 }} из {{ tour.steps.length }}</span>

                @if (tour.hasNext(step())) {
                    <button
                        appearance="flat"
                        size="s"
                        tuiButton
                        type="button"
                        (click)="next()"
                    >
                        Далее
                    </button>
                } @else {
                    <button
                        appearance="flat"
                        size="s"
                        tuiButton
                        type="button"
                        (click)="tour.end()"
                    >
                        Понятно
                    </button>
                }
            </footer>
        </article>
    `,
    styles: `
        :host {
            display: block;
            inline-size: min(29rem, calc(100vw - 1rem));
            max-inline-size: calc(100vw - 1rem);
        }

        .step {
            position: relative;
            display: grid;
            gap: 1rem;
            min-inline-size: 0;
            padding: 0.25rem;
        }

        .close {
            position: absolute;
            z-index: 1;
            inset-block-start: -0.25rem;
            inset-inline-end: -0.25rem;

            --tui-text-action: #b5d2ff;
            --tui-text-action-hover: #d8e7ff;
        }

        h3 {
            padding-inline-end: 2rem;
        }

        .preview {
            overflow: hidden;
            border-radius: 0.75rem;
            background: #fff;
            color: #333;
        }

        .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-block-size: 2.1rem;
            padding: 0 0.75rem;
            border-block-end: 1px solid #e7e9ec;
            font-size: 0.75rem;
        }

        .comment {
            color: #8a929c;
        }

        .warning {
            color: #e5484d;
        }

        .tabs-preview,
        .justification-preview {
            min-block-size: 8.75rem;
        }

        .segments {
            display: flex;
            gap: 0.25rem;
            padding: 0.625rem;
            font-size: 0.7rem;
        }

        .segments span {
            padding: 0.35rem 0.5rem;
            border-radius: 0.4rem;
            background: #f0f1f2;
        }

        .panel {
            display: grid;
            gap: 0.5rem;
            margin: 0 0.625rem 0.625rem;
            padding: 0.75rem;
            border-radius: 0.6rem;
            background: #f5f6f7;
            font-size: 0.7rem;
        }

        .justification-preview {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
        }

        .checkbox {
            inline-size: 1.25rem;
            block-size: 1.25rem;
            border: 1px solid #c9ced6;
            border-radius: 0.35rem;
        }

        footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            inline-size: 100%;
        }

        footer [tuiButton] {
            min-inline-size: 5.75rem;
            background: #fff;
            color: #303744;
        }

        footer [tuiButton]:hover {
            background: #f2f5fa !important;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentTourTemplateComponent {
    protected readonly tour = inject(TourService);
    protected readonly commentTour = inject(COMMENT_TOUR);
    protected readonly steps = COMMENT_TOUR_STEPS;
    protected readonly names = [
        'Анна Агафонова',
        'Николай Арсеньев',
        'Олег Володин',
        'Татьяна Воробьева',
    ];

    public readonly step = input.required<IStepOption>();

    protected get currentIndex(): number {
        return this.tour.steps.indexOf(this.step());
    }

    protected next(): void {
        this.commentTour?.next();
    }
}
