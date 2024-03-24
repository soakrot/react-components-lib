# React-Components-Lib

![NPM Version](https://img.shields.io/npm/v/%40ravenwaven%2Freact-components-lib?style=flat&label=npm-package&labelColor=grey&color=brightgreen&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40ravenwaven%2Freact-components-lib)

React Components Library is a collection of user friendly components.
Along some hooks (e.g useRoveFocus) for making any custom
component accessible, but it does require some configuration.

**Note**: the library is still work in progress

## Overview

- [Getting started](#getting-started)
  - [Compatibility](#compatibility)
  - [Installation](#installition)
  - [Usage](#usage)
- [User guide](#user-guide)
  - [Components](#components)
    - [Select](#select)
    - [Scrollspy](#scrollspy)
    - [Carousel](#carousel)
  - [Hooks](#hooks)
    - [useRoveFocus](#userovefocus)

## Getting started

### Compatibility

| React | Newest compatible React-Components-Lib version |
| ----- | ---------------------------------------------- |
| >16.3 | latest                                         |

### Installation

Add React-Components-Lib by running the following command:

```
npm install @ravenwaven/react-components-lib
```

### Usage

Here's an example of basic usage:

```javascript
import '@ravenwaven/react-components-lib/dist/esm/main.css;
import { Carousel } from '@ravenwaven/react-components-lib;

function App() {
  const carouselItems = [<p>Slider-1</p>, <p>Slider-2</p>];

  return (
    <div>
      <Carousel items={carouselItems}/>
    </div>
  );
};
```

## User guide

### Components

#### Carousel

Basic usage:

```javascript
import '@ravenwaven/react-components-lib/dist/esm/main.css;
import { Carousel } from '@ravenwaven/react-components-lib;

function App() {
  const carouselItems = [<p>Slider-1</p>, <p>Slider-2</p>];

  return (
    <div>
      <Carousel items={carouselItems}/>
    </div>
  );
};
```

Carousel with custom indicators:

```javascript
<div>
  <Carousel items={carouselItems} Indicator={CustomIndicator} />
</div>
```

<!-- prettier-ignore -->
| Prop name | Description | Default value | Example |
|---|---|---|---|
| className | Class name(s) to be added to the main Carousel's `<div>` element along side "carousel" class | n/a | String: `class1 class2`
| items | An array of JSX elements for each slide. | n/a | `[<h1>Slide-1</h1>, <h1>Slide-2</h1>]` |
| Indicator | A reference to a react component to be used as indicator instead the defaults.
Passed component takes `className, index, onClick` as props | n/a | Component: <Carousel items={items} Indicator={CustomIndicator} />|

#### Select

Basic usage:

```javascript
import '@ravenwaven/react-components-lib/dist/esm/main.css;
import { Select } from '@ravenwaven/react-components-lib;

function App() {
  const [selectValue, setSelectValue] = useState("Cat");
  const selectOptions = [
    {label: "Cat", value: "cat"},
    {label: "Dog", value: "dog"},
    {label: "Rabbit", value: "rabbit"},
    {label: "Horse", value: "horse"}
  ];

  function handleOnSelectChange (value: string) {
      setSelectValue(value)
  };

  return (
    <div>
      <Select
        className="animals-select"
        options={selectOptions}
        value={selectValue}
        onChange={handleOnSelectChange}
      />
    </div>
  );
};
```

<!-- prettier-ignore -->
| Prop name | Description | Default value | Example |
|----|----|----|----|
| className | Class name(s) to be added to the main Select's `<div>` element along side "select-container" class.| n/a | String: `"class1 class2"`|
| disabled | Disable select element | `false` | Boolean: `true`
| options | An array of objects. Each object has `label` for option's inner-text and `value` for option's value. | n/a | Array of objects: `[{label: "Option1", value: "option1"}, {label: "option2", value: "option2"}]`|
| value | Displays the currently selected option. | n/a | String: `"option1"`|
| onChange | Handle Select changes. Passed function accepts a string value as an argument. | n/a | Function: `function handleOnChange(value: string):void`|

### Hooks

#### useRoveFocus

Basic usage:

```javascript
import '@ravenwaven/react-components-lib/dist/esm/main.css;
import { useRoveFocus } from '@ravenwaven/react-components-lib;

function Select() {
  const containerRef = useRef<HTMLDIVElement>(null);
  const optionsRef = useRef<HTMLLIElement[]>([]);

  const {currentFocus, isKeyboardActive} = useRoveFocus({
   container: containerRef,
   items: optionsRef,
   onEnter: handleOnEnterKeyPress,
   onEscape: handleOnEscKeyPress,
  });

  function handleEnterKeyPress({...
  };

  function handleEscKeyPress({...
  };

  function pushRef({...
  };

  return (
    <div ref={containerRef}>
      ...
      <ul>
        <li ref={pushRef}>
          ...
        </li>
      </ul>
    </div>
  );
};
```

<!-- prettier-ignore -->
| Arguments | Description | Default value | Example |
|---|---|---|---|
| container | A reference object to the container element to point the focus it. | n/a | Object: `containerRef{current: div}` |
| items | A reference object to the elements to be focused when navigating with keyboard. | n/a | Object: `itemsRef{current:[li,li]}` |
| onEnter | A function to handle enter key press. | n/a | Function: `()=> setIsOpen(true);` |
| onEscape | A function to handle escape key press. | n/a | Function: `()=> setIsOpen(false);` |
