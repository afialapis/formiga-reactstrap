# formiga-reactstrap
[![NPM Version](https://badge.fury.io/js/formiga-reactstrap.svg)](https://www.npmjs.com/package/formiga-reactstrap)
[![NPM Downloads](https://img.shields.io/npm/dm/formiga-reactstrap.svg?style=flat)](https://www.npmjs.com/package/formiga-reactstrap)
![formiga-reactstrap logo](https://www.afialapihttps://www.afialapis.com/os/formiga-reactstrap/logo.png)


---

> **[formiga](https://academia.gal/dicionario/-/termo/formiga)**. substantivo femenino:

> **Pequeno insecto da orde dos himenópteros, polo xeral de cor negra, que vive en colonias moi numerosas organizadas en clases, e do que existen varias especies.**

> _As formigas escavan complexas galerías subterráneas._


---

# Intro

[`formiga-reactstrap`](https://www.afialapis.com/os/formiga-reactstrap/) is a [`reactstrap`](https://reactstrap.github.io) implementation of [`formiga `](https://www.afialapis.com/os/formiga/).

# Components

## `FForm`

A flexible form component that integrates with form validation and provides built-in form buttons.

### Props

#### Basic

- `id` (string): Form element ID
- `className` (string): Additional CSS classes
- `inline` (boolean): Display form controls inline (default: `false`)

#### Children

You may render `children` inputs as normal children componentes, or do it using `renderChildren` function.

This function receives an instance with the `form` attributes:

`renderChildren({node, ref, valid, elements, hasChanged})`

#### Buttons

Every `form` will likely need some button. With _formiga_reactstrap_ you may do it in two ways:

##### Using `onSave` and `onCancel` events

If you pass an `onSave` event prop, an primary-style button will be rendered.
If you pass an `onCancel` event prop, an secondary-style button will be rendered.

You can style the buttons using these properties:
· `colors`: By default `["primary", "secondary"]`
· `icons`: By default `["ban", "save"]`
· `labels`: By default `["Cancelar", "Guardar"]`
· `autoDisable`: By default `true`. If enabled, _formiga-reactstrap_ will use internali `form`'s `validity` state to disable (or not) the buttons.
· `disabled`: By default `false`. Use it to customize when to disable the buttons (`autoDisable`must be `false`).
· `buttonsStyle` (object): Inline styles for buttons container

##### Using `renderButtons` function

You can render your won buttons using `renderButtons` function.

This function receives an instance with the `form` attributes:

`renderButtons({node, ref, valid, elements, hasChanged})`



## Inputs

### The Input Group

 * `label`
 * `description`
 * `icon`
 * `inline= false`
 * `formClassName`
 * `keepHeight= false`
 * `formGroupStyle`
 * `inputGroupStyle`
 * `middleElement`
 * `bsSize`

### `FInputText`

* `id`
* `name`
* `inputType= 'text'`
* `maxLength`
* `minLength`
* `placeholder`
* `readOnly`
* `required`
* `autocomplete`
* `inputStyle`
* `showValidity`
- `false` | `'never'` : never
- `true`  | `'default'` | `'changes+invalid'`: after changes + only invalid
- `'changes'` : after changes
- `'always'` : on render
- `'invalid'` : on render + only invalid
* `value`
* `setValue`
* `icon= 'text'`




### `FInputEmail`

* `id`
* `name`
* `maxLength`
* `minLength`
* `placeholder`
* `readOnly`
* `required`
* `autocomplete`
* `inputStyle`
* `showValidity`
- `false` | `'never'` : never
- `true`  | `'default'` | `'changes+invalid'`: after changes + only invalid
- `'changes'` : after changes
- `'always'` : on render
- `'invalid'` : on render + only invalid
* `value`
* `setValue`
* `icon= 'email'`

### `FInputUrl`
### `FInputPassword`
### `FInputTextArea`
### `FInputFloat`
### `FInputInt`
### `FInputUInt`
### `FInputFloatSum`
### `FInputFloatSumModal`
### `FInputDate`
### `FInputTime`
### `FInputEpoch`
### `FInputDateIso`
### `FInputColor`
### `FInputCheckbox`
### `FInputCheckbox2`
### `FInputSelect`
### `FInputSelectMultiple`
### `FInputSelectSearch`
### `FInputFile`





