# AG Grid + Taiga UI onboarding with ngx-ui-tour

Учебный прототип трехшагового онбординга для AG Grid и правого сайдбара комментариев. Интерфейс повторяет проект `agrid-taiga-onboarding`, но навигация, регистрация anchors, backdrop, hotkeys и жизненный цикл тура реализованы библиотекой [`ngx-ui-tour-tui-hint`](https://hakimio.github.io/ngx-ui-tour/tui-hint/Setup).

## Стек

- Angular 19.2.6;
- Taiga UI 4.69.0;
- AG Grid 34.2.0;
- `ngx-ui-tour-tui-hint` 8.0.0.

Версия `ngx-ui-tour-tui-hint` 8 совместима с Angular 19 и Taiga UI 4.

## Архитектура

### Runtime configuration

До bootstrap приложение загружает `src/config.json` и предоставляет конфигурацию через `APP_CONFIG`.

```json
{
  "features": {
    "enableTriggersUiImprovement": true
  }
}
```

`provideCommentTour()` проверяет флаг и предоставляет token `COMMENT_TOUR`:

- экземпляр `CommentTourService`, когда флаг включен;
- `null`, когда флаг выключен.

При выключенном флаге feature-сервис не создается, шаги не инициализируются, а `[tourAnchor]` получает пустую строку и не регистрируется в библиотеке.

### Онбординг комментариев

`CommentTourService` является feature-оберткой над библиотечным `TourService` и отвечает только за сценарий комментариев:

- инициализирует три шага;
- хранит выбранный `ProposalDto`;
- открывает sidebar перед переходом со второго DOM-состояния;
- сохраняет `muted` в `localStorage` после окончания тура;
- позволяет ручному запуску обойти muted-state без его удаления.

Anchors:

1. `comment-trigger` — иконка комментария выбранной строки AG Grid;
2. `comment-tabs` — `tui-segmented` в sidebar;
3. `comment-justification` — контрол `Учитывать как обоснование`.

Второй и третий шаги помечены `isAsync`, потому что их anchors появляются после открытия sidebar. Библиотека ожидает регистрацию DOM-элемента перед показом следующего шага.

`<tour-step-template>` использует собственный `ng-template`, поэтому содержимое шагов остается декларативным и оформляется компонентом `CommentTourTemplateComponent`.

Backdrop создает сама библиотека. Активный anchor подсвечивается через стандартный класс `.touranchor--is-active`, но получает `pointer-events: none`, поэтому взаимодействовать можно только с кнопками внутри hint.

## Локальный запуск

```bash
npm install
npm start
```

Откройте `http://localhost:4200`.

Чтобы отключить onboarding, измените флаг в `src/config.json` и перезапустите приложение.

Для повторной проверки первого посещения:

```js
localStorage.removeItem('@onboarding.comment-triggers.v1');
location.reload();
```

## Поведение

1. Первый шаг привязан к иконке комментария первой заявки.
2. `Далее` открывает sidebar и переводит библиотечный tour на второй шаг.
3. Второй шаг привязан к `tui-segmented`.
4. Третий шаг привязан к контролу `Учитывать как обоснование`.
5. Крестик или `Понятно` завершают tour и сохраняют muted-state.
6. Библиотечный backdrop блокирует интерфейс под текущим шагом.
7. Кнопка `Запустить онбординг` повторно запускает tour без удаления muted-state.

## Production build

```bash
npm run build
```

Для GitHub Pages:

```bash
npm run build:pages
```

Результат находится в `dist/agrid-taiga-onboarding-ngx-tour/browser`.

После merge в `main` приложение будет доступно по адресу:

`https://taiga-family-labs.github.io/agrid-taiga-onboarding-ngx-tour/`
