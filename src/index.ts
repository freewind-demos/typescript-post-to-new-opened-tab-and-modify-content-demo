import './index.css';

const form = document.getElementById('form') as HTMLFormElement;

const NEW_TAB_NAME = 'new-tab';

form!.target = NEW_TAB_NAME;
form!.addEventListener('submit', () => {
    const newTab = window.open('', NEW_TAB_NAME)!;

    console.log("### start")
    newTab.window.addEventListener('unload', () => {
        console.log("### unload")
        setTimeout(() => {
            console.log("### setTimeout")
            newTab.window.addEventListener('load', () => {
                console.log("### load")
                // NOTE will throw cross-origin error, but which means the code runs correctly
                newTab!.document.body.style.border = "3px solid red";
            })
        })
    })

})
