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

#### Sample Directory Structure:
```
birla-templates
    └───simple-component
        └───$NAME
                $NAME.css
                $NAME.js
                index.js
```

#### Sample File
```js
// /birla-templates/simple-component/$NAME/$NAME.js
const $NAME = () => {
  console.log('$NAME');
}

export default $NAME;

```

#### Sample Instruction
```
birla -n Button -t simple-component app/components/
```

This will create a folder named `Button` inside `app/components/` which will have 3 files `Button.css`, `Button.js`, `index.js`. In each file $NAME will be replaced by `Button`.

It means that `app/components/Button/Button.js` will look like -
```js
const Button = () => {
  console.log('Button');
}

export default Button;
```

### Pitfalls

* If the file already exists, it'll be overwritten. I'm working on preventing that.

Inspired from [remmy](https://github.com/colshacol/remmy/)
