/* jshint esversion: 6 */
/* global $ */

$(document).ready(function() {
    // Helper function to remove font-family styles
    function removeFontFamilyStyles() {
        $('.note-editable').find('*').css('font-family', '');
    }
    
    // Helper function to remove inline font-family from spans
    function removeInlineFontFamily() {
        $('.note-editable').find('div span[style*="font-family"]').each(function() {
            $(this).css('font-family', '');
        });
    }
    
    // Override Summernote's default font settings
    // This configuration removes the default font styling (Courier New)
    $('.summernote').summernote({
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        styleTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        // Disable font family selection to prevent Courier New from being added
        disableDragAndDrop: false,
        callbacks: {
            onInit: function() {
                // Remove any existing inline font-family styles when editor initializes
                removeFontFamilyStyles();
            },
            onChange: function(contents) {
                // Remove any inline font-family styles that might be added during editing
                removeInlineFontFamily();
            }
        }
    });
});