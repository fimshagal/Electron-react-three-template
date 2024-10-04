# Demo scene

Another day I make another electron.js app

After installing packages execute

```shell
npm start
```

## Main concept

This time I placed into Main Stream only low-level managers like: file system, databases, window manager etc. It prevents 
IPC code's overspreading and makes structure of code base much more transparent.

So now we have Main Stream to control low-level stuff around application and Renderer Stream to control application itself. Let's go further

## Main Stream components
- **Main Stream Controller** manages all the stuff and managers around app 
- **Window Manager** manage windows appearance and behaviour

## Renderer Stream components
- **Renderer Stream Controller** manages app logic and view
- **Data Manager** data storage
- **Game Scene Manager** manages 3d game scene with Three.js
- **Ui Manager** manages ui behaviour with React.js
