var textArea = document.querySelector('.use-keyboard');

const keyboard = {
    elements: {
        main: null,
        keyContainer: null,
        keys: []
    },
    properties: {
        value: '',
        capslock: false
    },
    createKey(){
        var keyList = ['1','2','3','4','5','6','7','8','9','0','backspace',
                    'q','w','r','t','y','u','i','o','p',
                    'capslock','a','s','d','f','g','h','j','k','l','enter',
                    'done','z','x','c','v','b','n','m',',','.','?',
                'spacebar'];
        let fragment = document.createDocumentFragment();
        keyList.forEach((key)=>{
            var newKey = document.createElement('button');
            newKey.setAttribute('type', 'button');
            newKey.classList.add('keyboard-button');
            //insert icons for special characters / letters and numbers
            switch(key){
                case 'backspace':
                    newKey.classList.add('wide-button')
                    newKey.appendChild(htmlIcon('backspace'));
                    newKey.addEventListener('click',function(){
                        keyboard.properties.value = keyboard.properties.value.substr(0,keyboard.properties.value.length-1);
                        textArea.value = keyboard.properties.value;
                    })
                break;
                case 'capslock':
                    newKey.classList.add('wide-button', 'capslock')
                    newKey.appendChild(htmlIcon('keyboard_capslock'));
                    newKey.addEventListener('click', function(){
                        keyboard.toggleCapslock();
                    });
                break;
                case 'enter':
                    newKey.classList.add('wide-button')
                    newKey.appendChild(htmlIcon('keyboard_return'));
                    newKey.addEventListener('click', function(){
                        keyboard.onInput('\n');
                    })  
                break;
                case 'done':
                    newKey.classList.add('wide-button','dark')
                    newKey.appendChild(htmlIcon('check_circle'));
                    newKey.setAttribute('onclick' , 'keyboard.close()');                    
                break;
                case 'spacebar':
                    newKey.classList.add('extra-wide-button')
                    newKey.appendChild(htmlIcon('space_bar'));
                    newKey.addEventListener('click', function(){
                        keyboard.onInput(' ');
                    })  
                break;

                default:
                    this.properties.capslock ? newKey.textContent = key.toUpperCase() : newKey.textContent = key.toLowerCase();
                    
                    newKey.addEventListener('click', function(){
                        keyboard.onInput(newKey.textContent);
                    })                    
                break;
            }
            //create htmlIcon
            function htmlIcon(gIcon){
                var icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.textContent = gIcon;
                return icon;
            }
            fragment.appendChild(newKey);

            //add breakLine
            if(['backspace', 'p','enter','?'].indexOf(key) != -1){
                fragment.appendChild(document.createElement('br'));
            }
        })
        return fragment;
    },
    init(){
        //create main containers
        this.elements.main = document.createElement('div');
        this.elements.main.classList.add('keyboard-container', 'hide');
        this.elements.keyContainer  =document.createElement('div');
        this.elements.keyContainer.classList.add('keyboard');
        this.elements.main.appendChild(this.elements.keyContainer);
        this.elements.keyContainer.appendChild(this.createKey());  
        document.body.appendChild(this.elements.main);
    },
    open(){
        this.elements.main.classList.remove('hide');
    },
    close(){
        this.elements.main.classList.add('hide');
        this.properties.capslock = false;
        this.properties.value = '';
    },
    toggleCapslock(){
        this.properties.capslock = !this.properties.capslock;
        document.querySelector('.capslock').classList.toggle('capslockActive');
    },
    onInput(key){
        this.properties.value += key;
        textArea.value = this.properties.value;
    }
}


window.addEventListener('DOMContentLoaded', function(){
    keyboard.init();
})

textArea.addEventListener('focus', ()=>{
    keyboard.open();
    
});


