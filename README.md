# Forms

[![License](https://img.shields.io/badge/license-MIT-10b981.svg)](https://github.com/enso-ui/forms/blob/master/LICENSE)
[![Stable](https://img.shields.io/badge/stable-4.1.10-2563eb.svg)](https://www.npmjs.com/package/@enso-ui/forms)
[![Downloads](https://img.shields.io/npm/dm/@enso-ui/forms.svg)](https://www.npmjs.com/package/@enso-ui/forms)
[![Vue](https://img.shields.io/badge/vue-3.x-42b883.svg)](https://vuejs.org/)
[![JavaScript](https://img.shields.io/badge/javascript-ES2020-f7df1e.svg)](https://developer.mozilla.org/docs/Web/JavaScript)
[![SCSS](https://img.shields.io/badge/scss-supported-c6538c.svg)](https://sass-lang.com/)
[![npm](https://img.shields.io/badge/npm-package-cb3837.svg)](https://www.npmjs.com/package/@enso-ui/forms)
[![Issues](https://img.shields.io/github/issues/enso-ui/forms.svg)](https://github.com/enso-ui/forms/issues)
[![Merge Requests](https://img.shields.io/github/issues-pr/enso-ui/forms.svg)](https://github.com/enso-ui/forms/pulls)

## Description

Forms renders backend-generated Enso form contracts and ships the Bulma field, action, and section components used to display and submit them.

## Installation

Install the package:

```bash
yarn add @enso-ui/forms
```

This package is also available through the full `enso-ui` workspace bundle.

## Features

- exports `VueForm` and `EnsoForm` as the main form shells
- ships the renderless `CoreForm` contract that loads templates, tracks dirtiness, and submits payloads
- includes field components for input, select, date, time, money, switch, and textarea controls
- bundles shared layout pieces such as `FormField`, `FormActions`, `FormTabs`, `FormSection`, and `Confirmation`

## Usage

```vue
<script setup>
import { EnsoForm } from '@enso-ui/forms/bulma';
</script>

<EnsoForm :disable-state="false" />
```

## API

### Bulma exports

Import: `@enso-ui/forms/bulma`

Public exports:
- `VueForm`
- `EnsoForm`
- `FormField`
- `FormFieldGroup`
- `Action`
- `InputField`
- `SelectField`
- `DateField`
- `TimeField`
- `MoneyField`
- `SwitchField`
- `TextareaField`

### `CoreForm`

Renderless engine behind the Bulma shells.

Common props:
- `http: Function` required HTTP client used for fetch and submit calls.
- `path: string` required endpoint used to load the form contract.
- `template: object | null = null` optional preloaded form contract.
- `params: object | null = null` extra query params used during fetch.
- `submitPath: string | null = null` optional override for the submit endpoint.
- `disableState: boolean = false` disables state-based locking helpers.
- `i18n: Function = key => key`
- `locale: string = "en"`
- `errorHandler: Function`
- `routerErrorHandler: Function`

Emits:
- `ready`
- `loaded`
- `submit`
- `submitting`
- `submitted`
- `create`
- `show`
- `undo`
- `destroy`
- `error`
- `template-fetch-error`

### Field components

Shared field props:
- `field: object` backend-generated field contract.
- injected form helpers supplied by `CoreForm`.

Field emits:
- `InputField`: `blur`, `changed`, `focus`
- `SelectField`: `changed`
- `DateField`: `changed`
- `MoneyField`: `changed`
- `SwitchField`: `changed`
- `TextareaField`: `changed`

### Layout parts

Reusable pieces under `src/bulma/parts`:
- `FormActions`
- `FormContent`
- `FormHeader`
- `FormSection`
- `FormTabs`
- `RevealPassword`
- `ErrorIcon`
- `Confirmation`

## Companion Backend Package

- [`laravel-enso/forms`](https://docs.laravel-enso.com/backend/forms.html) [↗](https://github.com/laravel-enso/forms)

## Depends On

- [`@enso-ui/datepicker`](https://docs.laravel-enso.com/frontend/datepicker.html) [↗](https://github.com/enso-ui/datepicker)
- [`@enso-ui/directives`](https://docs.laravel-enso.com/frontend/directives.html) [↗](https://github.com/enso-ui/directives)
- [`@enso-ui/divider`](https://docs.laravel-enso.com/frontend/divider.html) [↗](https://github.com/enso-ui/divider)
- [`@enso-ui/laravel-validation`](https://docs.laravel-enso.com/frontend/laravel-validation.html) [↗](https://github.com/enso-ui/laravel-validation)
- [`@enso-ui/modal`](https://docs.laravel-enso.com/frontend/modal.html) [↗](https://github.com/enso-ui/modal)
- [`@enso-ui/money`](https://docs.laravel-enso.com/frontend/money.html) [↗](https://github.com/enso-ui/money)
- [`@enso-ui/select`](https://docs.laravel-enso.com/frontend/select.html) [↗](https://github.com/enso-ui/select)
- [`@enso-ui/vue-switch`](https://docs.laravel-enso.com/frontend/switch.html) [↗](https://github.com/enso-ui/switch)
- [`@enso-ui/tabs`](https://docs.laravel-enso.com/frontend/tabs.html) [↗](https://github.com/enso-ui/tabs)
- [`@enso-ui/wysiwyg`](https://docs.laravel-enso.com/frontend/wysiwyg.html) [↗](https://github.com/enso-ui/wysiwyg)

## Contributions

are welcome. Pull requests are great, but issues are good too.

Thank you to all the people who already contributed to Enso!

## License

[MIT](https://github.com/enso-ui/forms/blob/master/LICENSE)

