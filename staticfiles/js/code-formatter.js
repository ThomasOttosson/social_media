document.addEventListener('DOMContentLoaded', function() {
    // Find all pre elements that might contain code blocks
    const preElements = document.querySelectorAll('article pre');
    
    preElements.forEach(function(preElement) {
        // Check if this pre element contains a code block
        const codeElement = preElement.querySelector('code');
        
        if (codeElement) {
            // Get the first line of the code block to check for language identifier
            const firstLine = codeElement.textContent.trim().split('\n')[0];
            
            // Check if the first line indicates a language (like "html", "javascript", etc.)
            let language = null;
            
            if (firstLine === 'html' || firstLine === 'HTML' || firstLine === 'Copy code') {
                language = 'language-markup';
            } else if (firstLine === 'css' || firstLine === 'CSS') {
                language = 'language-css';
            } else if (firstLine === 'javascript' || firstLine === 'js' || firstLine === 'JavaScript') {
                language = 'language-javascript';
            } else if (firstLine === 'python' || firstLine === 'Python') {
                language = 'language-python';
            } else if (firstLine === 'bash' || firstLine === 'shell') {
                language = 'language-bash';
            } else if (firstLine === 'typescript' || firstLine === 'ts') {
                language = 'language-typescript';
            } else if (firstLine === 'jsx') {
                language = 'language-jsx';
            } else if (firstLine === 'tsx') {
                language = 'language-tsx';
            } else if (firstLine === 'yaml' || firstLine === 'yml') {
                language = 'language-yaml';
            }
            
            // If we identified a language, format the code block properly
            if (language) {
                // Remove the language identifier line
                const codeContent = codeElement.textContent.split('\n').slice(1).join('\n');
                
                // Remove "Copy code" line if it exists as the second line
                let finalCode = codeContent;
                const lines = codeContent.split('\n');
                if (lines[0].trim() === 'Copy code') {
                    finalCode = lines.slice(1).join('\n');
                }
                
                // Set the class on the code element for Prism.js to highlight
                codeElement.className = language;
                codeElement.textContent = finalCode;
                
                // Add a class to the pre element as well
                preElement.className = language;
            }
        }
    });
});