/**
 * Javascript for impoundings page.
 *  Author: Ian Lindsay
 */

jQuery(function () 
{
    $( document ).ready(function() {
        checkImpoundingType();              
        
        $('body').on("change", "#impoundingType", function() {
            checkImpoundingType();
        });
    });
    
    function checkImpoundingType() {
        var impoundingType = $('#impoundingType').val();
        
        switch(impoundingType){
            case 'impounding_type.1':
                toggleHearingFieldset('show');
                break;
            case 'impounding_type.2':
                toggleHearingFieldset('hide');
                break;
        }
    }
    
    function toggleHearingFieldset(action) {
        if(action === 'show'){
            $( "fieldset:eq(1) select, fieldset:eq(1) input" ).prop('disabled', false);
            $( "fieldset:eq(1)" ).show();
        }
        else{
            $( "fieldset:eq(1) select, fieldset:eq(1) input" ).prop('disabled', 'disabled');
            $( "fieldset:eq(1)" ).hide();
        } 
    } 
});
