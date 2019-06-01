# Ace Collab React

### Prerequisites

Make sure that you have installed:
- *NodeJS* (v8.10.0)
- *npm* (v3.5.2)

### Installing

1. Clone the repository

```
git clone https://github.com/piotrek-b/ace-collab-react.git && cd ace-collab-react
```

2. Run following command

```
npm run bundle
```

3. After successful build, copy the bundled js file into your index.html directory

a) Linux
```
mkdir YOUR_INDEX_HTML_DIR/collab && cp -a ./dist/. YOUR_INDEX_HTML_DIR/collab
```

b) Windows
```
mkdir "YOUR_INDEX_HTML_DIR/collab" && xcopy /s .\dist YOUR_INDEX_HTML_DIR\collab
```


4. Include the bundled script in your index.html file

```html
...

<script src="./collab/bundle.min.js"></script>
<script src="./main.js"></script>

...
```

5. Use the method in code:

*main.js:*
```html
    var editorElement = document.querySelector('#editor');
    var interfaceElement = document.querySelector('main');
    
    var options = {
      anchorDOM: editorElement,
      mode: 'ace/mode/javascript',
      theme: 'ace/theme/monokai',
      server: {
        host: '127.0.0.1',
        port: '0000',
        username: 'John Doe',
        ssl: false
      }
    };


    runAceCollab(options, interfaceElement);
```
