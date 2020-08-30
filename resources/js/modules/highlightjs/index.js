import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('xml', xml);

const elements = document.querySelectorAll('pre code');

Array.prototype.forEach.call(elements, function(block){
    hljs.highlightBlock(block);
});

