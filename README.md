# Ace Collab React

### Prerequisites

Make sure that you have installed:
- node
- npm

### Installing

1. Clone the repository

```git
git clone https://github.com/piotrek-b/ace-collab-react.git && cd ace-collab-react
```

2. Run following command

```
npm run build
```

3. After successful build, copy the bundled js file into your index.html directory

```
cp ./build/static/js/main.[hash].chunk.js YOUR_INDEX_HTML_DIR
```

4. Include the bundled script in your index.html file

```html
...

<script src="./main.[hash].chunk.js"></script>

...
```

5. Use the method in code:

```html
<script>
    var options = {
      anchorDOM: document.querySelector('#editor'),
      mode: 'ace/mode/javascript',
      theme: 'ace/theme/monokai',
      server: {
        docId: getDocId(),
        host: '127.0.0.1',
        port: '3333',
        username,
        ssl: false
      }
    };
    var interfaceContainer = document.querySelector('main');


    runAceCollab(options, interfaceContainer);
</script>
```
