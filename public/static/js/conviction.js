/**
 * Javascript for convictions page.
 *  Author: Mike Cooper
 */
jQuery(function () 
{
    showDependantTypeFields($('#defType'));
    
    $('body').on("change","#defType", function(e) {
            showDependantTypeFields(this);
    });
});

function showDependantTypeFields(dependant) 
{
    //console.log($(dependant).val());
    if ($(dependant).val() == 'defendant_type.operator') {
        $('#personFirstname, #personLastname').val('');
        $('#personFirstname, #personLastname').parent().addClass('visually-hidden');
        $("[name='defendant-details[dateOfBirth][month]']").parent().addClass('visually-hidden');
        $('#operatorName').parent().removeClass('visually-hidden');
    } else {
        $('#personFirstname, #personLastname').parent().removeClass('visually-hidden');
        $('#operatorName').val('');
        $('#operatorName').parent().addClass('visually-hidden');
        $("[name='defendant-details[dateOfBirth][month]']").parent().removeClass('visually-hidden');
    }
}


