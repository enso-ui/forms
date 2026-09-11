# Changelog

## 5.0.0

### Changed

- `input + checkbox` now renders a native CheckboxField; `input + switch` preserves the existing VueSwitch renderer
- exported CheckboxField and registered it in standard and grouped fields, with validation, readonly behavior, and aligned Bulma layout
- removed dedicated tabindex props from InputField and MoneyField in favor of native tab navigation
- added focused checkbox, switch, field-wrapper, and focus regression coverage
- pair with laravel-enso/forms 10.0.0 for strict input-content and switch boolean validation

- documented the `meta.editor` option for WYSIWYG fields, which is passed through to `@enso-ui/wysiwyg`

