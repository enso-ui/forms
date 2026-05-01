import {
    faArrowLeft,
    faCheck,
    faCircleInfo,
    faEye,
    faEyeSlash,
    faPlus,
    faRotateLeft,
    faTrashCan,
    faTriangleExclamation,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

const icons = {
    'arrow-left': faArrowLeft,
    check: faCheck,
    'circle-info': faCircleInfo,
    eye: faEye,
    'eye-slash': faEyeSlash,
    plus: faPlus,
    'rotate-left': faRotateLeft,
    undo: faRotateLeft,
    'trash-alt': faTrashCan,
    'trash-can': faTrashCan,
    'triangle-exclamation': faTriangleExclamation,
    times: faXmark,
    xmark: faXmark,
};

const icon = value => (typeof value === 'string'
    ? icons[value] ?? value
    : value);

export { icon };
