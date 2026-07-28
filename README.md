# AG Grid + Taiga UI onboarding with ngx-ui-tour

Учебный прототип трехшагового онбординга для AG Grid и правого сайдбара заметок. Демонстрационный сценарий построен вокруг планирования путешествий и не привязан к реальному корпоративному продукту. Навигация, регистрация anchors, backdrop, hotkeys и жизненный цикл тура реализованы библиотекой [`ngx-ui-tour-tui-hint`](https://hakimio.github.io/ngx-ui-tour/tui-hint/Setup).

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
    "enableOnboarding": true
  }
}
```

`provideTravelNotesTour()` проверяет флаг и предоставляет token `TRAVEL_NOTES_TOUR`:

- экземпляр `TravelNotesTourService`, когда флаг включен;
- `null`, когда флаг выключен.

При выключенном флаге feature-сервис не создается, шаги не инициализируются, а `[tourAnchor]` получает пустую строку и не регистрируется в библиотеке.

### Онбординг заметок о путешествии

`TravelNotesTourService` является feature-оберткой над библиотечным `TourService` и отвечает только за учебный сценарий заметок:

- инициализирует три шага;
- хранит выбранный `TravelPlanDto`;
- открывает sidebar перед переходом ко второму DOM-состоянию;
- сохраняет `muted` в `localStorage` после окончания тура;
- позволяет ручному запуску обойти muted-state без его удаления.

Anchors:

1. `travel-notes-trigger` — иконка заметок выбранного маршрута в AG Grid;
2. `travel-notes-tabs` — категории заметок в `tui-segmented`;
3. `travel-notes-checklist` — контрол `Добавить в чек-лист`.

Второй и третий шаги помечены `isAsync`, потому что их anchors появляются после открытия sidebar. Библиотека ожидает регистрацию DOM-элемента перед показом следующего шага.

`<tour-step-template>` использует собственный `ng-template`, поэтому содержимое шагов остается декларативным и оформляется компонентом `TravelNotesTourTemplateComponent`.

Backdrop создает сама библиотека. Активный anchor подсвечивается через стандартный класс `.touranchor--is-active`, но получает `pointer-events: none`, поэтому взаимодействовать можно только с кнопками внутри hint.

## Локальный запуск

```bash
npm ci
npm start
```

Откройте `http://localhost:4200`.

Чтобы отключить onboarding, установите `enableOnboarding: false` в `src/config.json` и перезапустите приложение.

Для повторной проверки первого посещения:

```js
localStorage.removeItem('@onboarding.travel-notes.v1');
location.reload();
```

## Демонстрационный сценарий

1. Таблица содержит вымышленные маршруты, страны, сезоны, длительность и статус планирования.
2. Первый шаг привязан к иконке заметок выбранного маршрута.
3. `Далее` открывает sidebar и переводит библиотечный tour на второй шаг.
4. Второй шаг объясняет категории `Все`, `Подготовка` и `Впечатления`.
5. Третий шаг показывает, как добавить важную заметку в чек-лист подготовки.
6. Крестик или `Понятно` завершают tour и сохраняют muted-state.
7. Библиотечный backdrop блокирует интерфейс под текущим шагом.
8. Кнопка `Запустить онбординг` повторно запускает tour без удаления muted-state.

## Production build

```bash
npm run build
```

Для GitHub Pages:

```bash
npm run build:pages
```

Результат находится в `dist/agrid-taiga-onboarding-ngx-tour/browser`.

CI устанавливает зависимости через `npm ci` с использованием закоммиченного `package-lock.json`.

После merge в `main` приложение будет доступно по адресу:

`https://taiga-family-labs.github.io/agrid-taiga-onboarding-ngx-tour/`
