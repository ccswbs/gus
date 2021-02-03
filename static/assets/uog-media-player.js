(function() {
    let mediaElements = document.querySelectorAll('video.ugplayer,audio.ugplayer');

    if (mediaElements.length > 0) {

        loadCSS('https://www.uoguelph.ca/css/mediaelementplayer.dist.css')
            .then(() => { return loadJS('https://www.uoguelph.ca/js/mediaelement-and-player-dist.js') })
            .then(() => { return loadJS('https://www.uoguelph.ca/js/vimeo.min.js') })
            .then(() => { return loadJS('https://www.uoguelph.ca/js/transcript-link.js') })

            .then(() => {
                //Once the CSS and all the nessessary js files are loaded, we can change all the video and audio elements to the mediaelementplayer
                $(mediaElements).mediaelementplayer({
                    features: ['playpause', 'current', 'progress', 'duration', 'volume', 'tracks', 'transcript', 'fullscreen'],
                });
            })
            .catch((e) => {
                console.error(e);
            });

    }

    function loadCSS(url) {
        return new Promise(function(resolve, reject) {
            let stylesheet = document.createElement('link');

            stylesheet.setAttribute('rel', 'stylesheet');
            stylesheet.setAttribute('href', url);
            stylesheet.onload = () => {
                resolve('Loaded ' + url + ' Successfully!');
            }
            stylesheet.onerror = (e) => {
                reject('Failed to load ' + url)
            }

            document.head.appendChild(stylesheet);
        });
    }

    function loadJS(url) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');

            script.setAttribute('src', url);
            script.onload = () => {
                resolve('Loaded ' + url + ' Successfully!');
            }
            script.onerror = (e) => {
                reject(Error('Failed to load ' + url));
            }

            document.body.appendChild(script);
        });
    }
})();