import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp, h, nextTick, reactive } from 'vue';
import CheckboxField from '../src/bulma/fields/CheckboxField.vue';
import InputField from '../src/bulma/fields/InputField.vue';
import MoneyField from '../src/bulma/fields/MoneyField.vue';
import SwitchField from '../src/bulma/fields/SwitchField.vue';
import CoreForm from '../src/renderless/CoreForm.vue';
import FormField from '../src/bulma/parts/FormField.vue';
import FormFieldGroup from '../src/bulma/parts/FormFieldGroup.vue';

vi.mock('../src/bulma/fields/DateField.vue', () => ({ default: {} }));
vi.mock('../src/bulma/fields/TimeField.vue', () => ({ default: {} }));
vi.mock('../src/bulma/fields/SelectField.vue', () => ({ default: {} }));
vi.mock('../src/bulma/fields/TextareaField.vue', () => ({ default: {} }));
vi.mock('../src/bulma/fields/WysiwygField.vue', () => ({ default: {} }));

const mounted = [];
const mount = (component, props, provide = {}) => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const app = createApp({ render: () => h(component, props) });
    Object.entries(provide).forEach(([key, value]) => app.provide(key, value));
    app.mount(element);
    mounted.push(() => { app.unmount(); element.remove(); });
    return element;
};
const field = (content = 'checkbox', value = false) => reactive({
    name: 'enabled', label: 'Enabled', value, meta: { type: 'input', content },
});
const errors = () => ({ has: vi.fn(() => false), clear: vi.fn(), get: () => 'Required', empty: vi.fn() });

afterEach(() => {
    mounted.splice(0).forEach(unmount => unmount());
    vi.useRealTimers();
});

describe('boolean form inputs', () => {
    it('selects separate native checkbox and existing switch components', () => {
        expect(CoreForm.methods.fieldType(field())).toBe('checkbox-field');
        expect(CoreForm.methods.fieldType(field('switch'))).toBe('switch-field');
        expect(() => CoreForm.methods.fieldType(field('invalid'))).toThrow('Misconfigured field');
    });

    it('binds native checkbox values, clears errors and emits after each change', async () => {
        const inputField = field();
        const validation = errors();
        const changed = vi.fn(() => inputField.value);
        const element = mount(CheckboxField, { field: inputField, errors: validation, onChanged: changed });
        const input = element.querySelector('input[type="checkbox"]');
        expect(element.querySelector('.vue-switch')).toBeNull();
        expect(input.checked).toBe(false);
        input.click();
        await nextTick();
        expect(inputField.value).toBe(true);
        expect(changed.mock.results[0].value).toBe(true);
        input.click();
        await nextTick();
        expect(inputField.value).toBe(false);
        expect(changed).toHaveBeenCalledTimes(2);
        expect(validation.clear).toHaveBeenCalledWith('enabled');
        inputField.value = true;
        await nextTick();
        expect(input.checked).toBe(true);
        expect(changed).toHaveBeenCalledTimes(2);
    });

    it.each(['disabled', 'readonly', 'formReadonly'])('prevents changes when %s', async (mode) => {
        const inputField = field('checkbox', true);
        inputField.meta[mode] = true;
        const changed = vi.fn();
        const element = mount(CheckboxField, {
            field: inputField, errors: errors(), readonly: mode === 'formReadonly', onChanged: changed,
        });
        const input = element.querySelector('input');
        expect(input.disabled).toBe(true);
        input.click();
        await nextTick();
        expect(inputField.value).toBe(true);
        expect(changed).not.toHaveBeenCalled();
    });

    it('exposes translated accessible labels, validation state and focus events', () => {
        const validation = errors();
        validation.has.mockReturnValue(true);
        const focused = vi.fn();
        const blurred = vi.fn();
        const element = mount(CheckboxField, {
            field: field(), errors: validation, i18n: key => `Translated ${key}`,
            onFocus: focused, onBlur: blurred,
        });
        const input = element.querySelector('input');
        expect(input.getAttribute('aria-label')).toBe('Translated Enabled');
        expect(input.getAttribute('aria-invalid')).toBe('true');
        expect(input.hasAttribute('tabindex')).toBe(false);
        expect(input.tabIndex).toBe(0);
        input.focus();
        input.blur();
        expect(focused).toHaveBeenCalledOnce();
        expect(blurred).toHaveBeenCalledOnce();
    });

    it.each([
        [InputField, 'text', 'example'],
        [InputField, 'number', 12],
        [MoneyField, 'money', 12],
        [CheckboxField, 'checkbox', false],
    ])('keeps %s with %s content naturally focusable', (component, content, value) => {
        const element = mount(component, {
            field: field(content, value), errors: errors(), i18n: key => key,
        });
        const input = element.querySelector('input');
        expect(component.props).not.toHaveProperty('tabindex');
        expect(input.hasAttribute('tabindex')).toBe(false);
        expect(input.tabIndex).toBe(0);
        input.focus();
        expect(document.activeElement).toBe(input);
    });

    it('retains VueSwitch rendering and value updates', async () => {
        const inputField = field('switch');
        const validation = errors();
        const changed = vi.fn();
        const element = mount(SwitchField, { field: inputField, errors: validation, onChanged: changed });
        element.querySelector('.control-switch').click();
        await nextTick();
        expect(element.querySelector('.vue-switch')).not.toBeNull();
        expect(inputField.value).toBe(true);
        expect(validation.clear).toHaveBeenCalledWith('enabled');
        expect(changed).toHaveBeenCalledOnce();
    });

    it.each([FormField, FormFieldGroup])('renders checkbox labels/errors and autosaves through $name', async (component) => {
        vi.useFakeTimers();
        const inputField = field();
        const validation = errors();
        validation.has.mockReturnValue(true);
        const submit = vi.fn();
        const element = mount(component, { field: inputField, isGrouped: true }, {
            fieldType: CoreForm.methods.fieldType, errors: validation, http: vi.fn(),
            i18n: key => key, isReadonly: () => false, locale: 'en', submit,
            state: { data: { labels: true, autosave: true, debounce: 10 } },
        });
        expect(element.querySelector('.label').textContent).toContain('Enabled');
        expect(element.querySelector('.help.is-danger').textContent).toBe('Required');
        element.querySelector('input[type="checkbox"]').click();
        await nextTick();
        vi.runAllTimers();
        expect(inputField.value).toBe(true);
        expect(submit).toHaveBeenCalledOnce();
    });
});
