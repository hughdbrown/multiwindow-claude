let zIndex = 1;

document.getElementById('new-window').addEventListener('click', createWindow);

function createWindow() {
    const windowTypes = [
        { url: '/hello', title: 'Hello World' },
        { url: '/calculator', title: 'Calculator' },
        { url: '/job_application', title: 'Job Application' }
    ];
    const randomType = windowTypes[Math.floor(Math.random() * windowTypes.length)];
    
    const window = document.createElement('div');
    window.className = 'window';
    window.style.width = '300px';
    window.style.height = '200px';
    window.style.left = `${Math.random() * (document.body.clientWidth - 300)}px`;
    window.style.top = `${Math.random() * (document.body.clientHeight - 200)}px`;
    window.style.zIndex = zIndex++;

    window.innerHTML = `
        <div class="window-header">
            <span>${randomType.title}</span>
            <div>
                <span class="minimize">-</span>
                <span class="maximize">□</span>
                <span class="close">×</span>
            </div>
        </div>
        <div class="window-content">
            <iframe src="${randomType.url}" width="100%" height="100%"></iframe>
        </div>
    `;

    document.getElementById('windows-container').appendChild(window);

    const header = window.querySelector('.window-header');
    makeDraggable(window, header);
    makeResizable(window);

    window.addEventListener('mousedown', () => {
        window.style.zIndex = zIndex++;
    });

    window.querySelector('.minimize').addEventListener('click', () => {
        window.style.height = '30px';
    });

    window.querySelector('.maximize').addEventListener('click', () => {
        if (window.style.width === '100%') {
            window.style.width = '300px';
            window.style.height = '200px';
            window.style.left = '50px';
            window.style.top = '50px';
        } else {
            window.style.width = '100%';
            window.style.height = '100%';
            window.style.left = '0';
            window.style.top = '0';
        }
    });

    window.querySelector('.close').addEventListener('click', () => {
        window.remove();
    });
}

function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function makeResizable(element) {
    const resizer = document.createElement('div');
    resizer.className = 'resizer';
    resizer.style.width = '10px';
    resizer.style.height = '10px';
    resizer.style.background = 'red';
    resizer.style.position = 'absolute';
    resizer.style.right = 0;
    resizer.style.bottom = 0;
    resizer.style.cursor = 'se-resize';
    element.appendChild(resizer);

    resizer.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
    }

    function resize(e) {
        element.style.width = (e.clientX - element.offsetLeft) + 'px';
        element.style.height = (e.clientY - element.offsetTop) + 'px';
    }

    function stopResize(e) {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }
}