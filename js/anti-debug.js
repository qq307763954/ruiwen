/**
 * anti-debug.js
 * 禁止右键与F12查看代码
 */

(function() {
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // 禁用F12、Ctrl+Shift+I、Ctrl+Shift+J、Ctrl+Shift+C、Ctrl+U等开发者工具快捷键
    document.addEventListener('keydown', function(e) {
        // F12键 (keyCode 123)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (检查元素)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (控制台)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (检查元素)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (查看源代码)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
    });

    // 检测开发者工具是否打开
    function detectDevTools() {
        // 方法1: 通过窗口大小差异检测
        const threshold = 160;
        const devtools = {
            isOpen: false,
            orientation: null
        };

        const emitEvent = (isOpen, orientation) => {
            window.dispatchEvent(new CustomEvent('devtoolschange', {
                detail: {
                    isOpen,
                    orientation
                }
            }));
        };

        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            const orientation = widthThreshold ? 'vertical' : 'horizontal';

            if (
                !(heightThreshold && widthThreshold) &&
                ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
                    widthThreshold ||
                    heightThreshold)
            ) {
                if (!devtools.isOpen || devtools.orientation !== orientation) {
                    emitEvent(true, orientation);
                }

                devtools.isOpen = true;
                devtools.orientation = orientation;
            } else {
                if (devtools.isOpen) {
                    emitEvent(false, null);
                }

                devtools.isOpen = false;
                devtools.orientation = null;
            }
        }, 500);

        // 当开发者工具打开时，页面进行处理
        window.addEventListener('devtoolschange', function(e) {
            if (e.detail.isOpen) {
                // 可以在这里添加开发者工具打开时的处理，比如页面跳转或提示
                // alert('禁止使用开发者工具查看本页面！');
                // window.location.href = 'about:blank';
            }
        });
    }

    // 覆盖console方法
    function disableConsole() {
        // 保存原始console方法的引用
        const originalConsole = {
            log: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error,
            debug: console.debug
        };

        // 重写console方法
        console.log = console.info = console.warn = console.error = console.debug = function() {
            return false;
        };

        // 禁用debugger语句
        setInterval(function() {
            debugger;
        }, 100);
    }

    // 执行防护
    detectDevTools();
    disableConsole();
})(); 