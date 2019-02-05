# Birla

> Birla is a CLI tool to easily create new file-structure scaffolds from template directories.

### Why did I make this ?

I was wasting a lot of time, creating files and folders whenever I made new components in React or Angular. Now, I just create a template for the component and using `birla` generate new components easily. `birla` will take care of changing file names and their content too. This is so much better than copy paste or code snippets.

## Advantages

1. Supercharge your productivity.
1. Maintain consistent structure of modules/components etc. across teams.
1. Write once, use 1000 times.
1. Focus on building features, not files.

## How To Use ?

1. Install the cli tool using `npm i -g birla`.
1. In your project root, create a `birla-templates` folder.
1. In this folder, you have to place your templates. Each template is a folder.
1. In terminal run `birla -n Name -t TemplateName DestinationDirectory`

### Example - 

#### Brief Idea:
For each template we create a folder inside `birla-templates`. In a template we can use $NAME to substitute it with the name provided in CLI.

We can also force convert the case of name with _c (camel), _p (pascal), _s (snake), _h (hyphen).

#### Sample Directory Structure:
```
birla-templates
    └───simple-component
        └───$NAME_s
                $NAME_h.css
                $NAME.js
                index.js
```

#### Sample File
```js
// /birla-templates/simple-component/$NAME_s/$NAME.js
const $NAME = () => {
  console.log('$NAME_h');
}

export default $NAME;

```

#### Sample Instruction
```
birla -n NewComponent -t simple-component app/components/
```

This will create a folder named `new_component` inside `app/components/` which will have 3 files `new-component.css`, `NewComponent.js`, `index.js`. In each file $NAME will be replaced by `NewComponent`. $NAME_h with `new-component` and so on.

It means that `app/components/new_component/NewComponent.js` will look like -
```js
const NewComponent = () => {
  console.log('new-component');
}

export default NewComponent;
```

### Pitfalls

* If the file/folder already exists, birla will fail.

Inspired from [remmy](https://github.com/colshacol/remmy/)
