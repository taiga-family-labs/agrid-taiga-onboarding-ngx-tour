import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {TuiButton, TuiTitle} from '@taiga-ui/core';
import {type IStepOption, TourService} from 'ngx-ui-tour-tui-hint';

import {TRAVEL_NOTES_TOUR} from './comment-tour.provider';
import {TRAVEL_NOTES_TOUR_STEPS} from './comment-tour.service';

@Component({
    selector: 'travel-notes-tour-template',
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
                        Заметки прямо из таблицы
                        <span tuiSubtitle>У каждого маршрута есть отдельная панель для идей и деталей поездки</span>
                    </h3>

                    <div class="preview rows-preview">
                        @for (route of routes; track route; let index = $index) {
                            <div class="row">
                                <span>{{ route }}</span>
                                <span class="note" [class.active]="index === 0">●</span>
                            </div>
                        }
                    </div>
                }
                @case (steps.tabs) {
                    <h3 tuiTitle>
                        Разделяйте заметки по смыслу
                        <span tuiSubtitle>Переключайтесь между подготовкой к поездке и впечатлениями после нее</span>
                    </h3>

                    <div class="preview tabs-preview">
                        <div class="segments">
                            <span>Все</span>
                            <span>Подготовка</span>
                            <span>Впечатления</span>
                        </div>

                        <div class="panel">
                            <strong>Подготовка к маршруту</strong>
                            <span>• Проверить расписание поездов</span>
                            <span>• Сохранить адрес отеля</span>
                        </div>
                    </div>
                }
                @case (steps.checklist) {
                    <h3 tuiTitle>
                        Добавляйте важное в чек-лист
                        <span tuiSubtitle>Отметьте заметку, если ее нужно выполнить до начала поездки</span>
                    </h3>

                    <div class="preview checklist-preview">
                        <span class="checkbox"></span>
                        <span>Добавить в чек-лист</span>
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
            padding: 1.5rem;
            color: #fff;
            white-space: normal;
        }

        .close {
            position: absolute;
            z-index: 1;
            inset-block-start: 1rem;
            inset-inline-end: 1rem;

            --tui-text-action: #bbd1fb;
            --tui-text-action-hover: #d8e7ff;
        }

        h3 {
            padding-inline-end: 2.5rem;
            color: #fff;
        }

        h3 [tuiSubtitle] {
            color: inherit;
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

        .note {
            color: #8a929c;
        }

        .active {
            color: #4584e6;
        }

        .tabs-preview,
        .checklist-preview {
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

        .checklist-preview {
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
            color: #fff;
        }

        footer [tuiButton] {
            min-inline-size: 5.75rem;
            background: #fff;
            color: #586dcd;
        }

        footer [tuiButton]:hover {
            background: #f2f5fa !important;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TravelNotesTourTemplateComponent {
    protected readonly tour = inject(TourService);
    protected readonly travelNotesTour = inject(TRAVEL_NOTES_TOUR);
    protected readonly steps = TRAVEL_NOTES_TOUR_STEPS;
    protected readonly routes = [
        'Киото и Нара',
        'Лиссабон и Синтра',
        'Таллин и острова',
        'Рим и Флоренция',
    ];

    public readonly step = input.required<IStepOption>();

    protected get currentIndex(): number {
        return this.tour.steps.indexOf(this.step());
    }

    protected next(): void {
        this.travelNotesTour?.next();
    }
}
