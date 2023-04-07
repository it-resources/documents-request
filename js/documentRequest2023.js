const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
let currentStep = formSteps.findIndex((step) => {
    return step.classList.contains("active");
});

if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
    let incrementor;
    if (e.target.matches("[data-next]")) {
        const inputs = [...formSteps[currentStep].querySelectorAll("input")];
        const select = [...formSteps[currentStep].querySelectorAll("select")];
        const allValid = inputs.every((input) => input.reportValidity());
        const selectValid = select.every((select) => select.reportValidity());
        if (allValid && selectValid) {
            incrementor = 1;
            currentStep += incrementor;
            showCurrentStep();
        } 
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1;
        currentStep += incrementor;
        showCurrentStep();
    } else if (e.target.matches("[data-first]")) {
        currentStep = 0;
        showCurrentStep();
    } else if (e.target.matches("[data-second]")) {
        currentStep = 1;
        showCurrentStep();
    } else if (e.target.matches("[data-third]")) {
        currentStep = 2;
        showCurrentStep();
    } else if (e.target.matches("[data-fourth]")) {
        currentStep = 3;
        showCurrentStep();
    } else if (e.target.matches("[data-fifth]")) {
        currentStep = 4;
        showCurrentStep();
    }

    if (incrementor == null) return;

    
});

formSteps.forEach((step) => {
    step.addEventListener("animationend", (e) => {
        formSteps[currentStep].classList.remove("hide");
        e.target.classList.toggle("hide", !e.target.classList.contains("active"));
    });
});

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });
}

//Scroll to top
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

$(document).ready(function(){
    $('button').click(function(){
        scrollToTop();
    });

    //Set navlist active desktop
    $(".navList").click(function() {
        $(".navList").removeClass("active");
        $(this).addClass("active");
    });

    
    //Next Step button desktop view
    $('#btnNext1').click(function(){
        if($('#studentNo').prop('required')){
            if($('#studentNo').val()=='' || $('#firstname').val()=='' || $('#lastname').val()=='' || $('#dateOfBirth').val()==''
            || $('#gender').val()=='' || $('#fatherLastname').val()=='' || $('#fatherFirstname').val()=='' || $('#motherLastname').val()==''
            || $('#motherFirstname').val()=='' || $('#presentAddressBldgNo').val()=='' || $('#presentAddressStreetName').val() ==''
            || $('#presentAddressCity').val() =='' || $('#presentAddressProvince').val() =='' || $('#presentAddressCountry').val() ==''
            || $('#presentAddressZipCode').val() =='' || $('#permanentAddressBldgNo').val() =='' || $('#permanentAddressStreetName').val() ==''
            || $('#permanentAddressCity').val() =='' || $('#permanentAddressProvince').val() =='' || $('#permanentAddressCountry').val() ==''
            || $('#permanentAddressZipCode').val() =='' || $('#contactNo').val() =='' || $('#emailAd').val() =='') {
                return;
            }else {
                $('#iconCheck1').css('display','block');
                $('#nav1').removeClass('unclickable');
                $('#nav1').removeClass('active');
                $('#nav2').removeClass('unclickable');
                $('#nav2').addClass('active');
                $('#navMobile2').addClass('activeMobile');
                $('#navMobile2').removeClass('unclickable');
                $('#line2').addClass('activeMobile');
            }
        }
    });
    
    $('#btnNext2').click(function(){
        if($('#addressee').prop('required')){
            if($('#addressee').val() =='' || $('#addresseeContactNo').val() =='' || $('#mailingAddressBldgNo').val() =='' || $('#mailingAddressStreetName').val() ==''
            || $('#mailingAddressCity').val() =='' || $('#mailingAddressProvince').val() =='' || $('#mailingAddressCountry').val() =='' || $('#mailingAddressZipCode').val() =='') {
                return;
            }else {
                $('#iconCheck2').css('display','block');
                $('#nav2').removeClass('unclickable');
                $('#nav2').removeClass('active');
                $('#nav3').removeClass('unclickable');
                $('#nav3').addClass('active');
                $('#navMobile3').addClass('activeMobile');
                $('#navMobile3').removeClass('unclickable');
                $('#line3').addClass('activeMobile');
            }
        }else {
            $('#iconCheck2').css('display','block');
            $('#nav2').removeClass('unclickable');
            $('#nav2').removeClass('active');
            $('#nav3').removeClass('unclickable');
            $('#nav3').addClass('active');
            $('#navMobile3').addClass('activeMobile');
            $('#navMobile3').removeClass('unclickable');
            $('#line3').addClass('activeMobile');
        }
        
    });
    
    $('#btnNext3').click(function(){
        $('#iconCheck3').css('display','block');
        $('#nav3').removeClass('unclickable');
        $('#nav3').removeClass('active');
        $('#nav4').removeClass('unclickable');
        $('#nav4').addClass('active');
        $('#navMobile4').addClass('activeMobile');
        $('#navMobile4').removeClass('unclickable');
        $('#line4').addClass('activeMobile');
    });
    
    $('#btnNext4').click(function(){
        $('#iconCheck4').css('display','block');
        $('#nav4').removeClass('unclickable');
        $('#nav4').removeClass('active');
        $('#nav5').removeClass('unclickable');
        $('#nav5').addClass('active');
        $('#navMobile5').addClass('activeMobile');
        $('#navMobile5').removeClass('unclickable');
        $('#line5').addClass('activeMobile');
    });
    
    $('#btnNext5').click(function(){
        $('#iconCheck5').css('display','block');
        $('#nav5').removeClass('unclickable');
        $('#nav5').addClass('active');
    });

    //Previous Step Button
    $('#btnPrev2').click(function(){
        $('#nav1').addClass('active');
        $('#nav2').removeClass('active');
    });
    
    $('#btnPrev3').click(function(){
        $('#nav2').addClass('active');
        $('#nav3').removeClass('active');
    });
    
    $('#btnPrev4').click(function(){
        $('#nav3').addClass('active');
        $('#nav4').removeClass('active');
    });

    //Mobile view next step button
    $('#mobileBtnNext2').click(function(){
        $('#navMobile3').addClass('activeMobile');
        $('#navMobile3').removeClass('unclickable');
        $('#line3').addClass('activeMobile');
    });
    $('#mobileBtnNext3').click(function(){
        $('#navMobile4').addClass('activeMobile');
        $('#navMobile4').removeClass('unclickable');
        $('#line4').addClass('activeMobile');
    });
    $('#mobileBtnNext4').click(function(){
        $('#navMobile5').addClass('activeMobile');
        $('#navMobile5').removeClass('unclickable');
        $('#line5').addClass('activeMobile');
    });

    // delivery
    $('#forDelivery').css('opacity','.3');
    $('#forDelivery').css('pointer-events','none');
    $('#delivery').click(function(){
        $('#forDelivery').css('opacity','1');
        $('#forDelivery').css('pointer-events','auto');
        $('#addressee').attr('required', true);
        $('#addresseeContactNo').attr('required', true);
        $('#mailingAddressBldgNo').attr('required', true);
        $('#mailingAddressStreetName').attr('required', true);
        $('#mailingbarangay').attr('required', true);
        $('#mailingAddressCity').attr('required', true);
        $('#mailingAddressProvince').attr('required', true);
        $('#mailingAddressCountry').attr('required', true);
        $('#mailingAddressZipCode').attr('required', true);
    });

    // pick-up
    $('#pickup').click(function(){
        $('#forDelivery').css('opacity','.3');
        $('#forDelivery').css('pointer-events','none');
        $('#addressee').removeAttr('required');
        $('#addresseeContactNo').removeAttr('required');
        $('#mailingAddressBldgNo').removeAttr('required');
        $('#mailingAddressStreetName').removeAttr('required');
        $('#mailingbarangay').removeAttr('required');
        $('#mailingAddressCity').removeAttr('required');
        $('#mailingAddressProvince').removeAttr('required');
        $('#mailingAddressCountry').removeAttr('required');
        $('#mailingAddressZipCode').removeAttr('required');

        $('#sameMailingAddress').prop('checked', false);
        $('#addressee').val('');
        $('#addresseeContactNo').val('');
        $('#mailingAddressBldgNo').val('');
        $('#mailingAddressStreetName').val('');
        $('#mailingbarangay').val('');
        $('#mailingAddressCity').val('');
        $('#mailingAddressProvince').val('');
        $('#mailingAddressCountry').val('');
        $('#mailingAddressZipCode').val('');
    });

    // Same as present address
    $('#samePermanentAddress').click(function(){
		var isChecked = $('#samePermanentAddress').is(':checked');
		
		if(isChecked){

			$('#permanentAddressBldgNo').val($('#presentAddressBldgNo').val());	
			$('#permanentAddressStreetName').val($('#presentAddressStreetName').val());	
			$('#permanentBarangay').val($('#presentBarangay').val());	
			$('#permanentAddressCity').val($('#presentAddressCity').val());	
			$('#permanentAddressProvince').val($('#presentAddressProvince').val());	
			$('#permanentAddressCountry').val($('#presentAddressCountry').val());	
			$('#permanentAddressZipCode').val($('#presentAddressZipCode').val());	
		}else {
            $('#permanentAddressBldgNo').val('');	
			$('#permanentAddressStreetName').val('');
			$('#permanentBarangay').val('');		
			$('#permanentAddressCity').val('');	
			$('#permanentAddressProvince').val('');	
			$('#permanentAddressCountry').val('');	
			$('#permanentAddressZipCode').val('');
        }

	});

    //Same as present address for mailing address
    $('#sameMailingAddress').click(function(){
		var isChecked = $('#sameMailingAddress').is(':checked');
		
		if(isChecked){

			$('#mailingAddressBldgNo').val($('#presentAddressBldgNo').val());	
			$('#mailingAddressStreetName').val($('#presentAddressStreetName').val());
			$('#mailingBarangay').val($('#presentBarangay').val());	
			$('#mailingAddressCity').val($('#presentAddressCity').val());	
			$('#mailingAddressProvince').val($('#presentAddressProvince').val());	
			$('#mailingAddressCountry').val($('#presentAddressCountry').val());	
			$('#mailingAddressZipCode').val($('#presentAddressZipCode').val());	
		}else {
            $('#mailingAddressBldgNo').val('');	
			$('#mailingAddressStreetName').val('');	
			$('#mailingAddressCity').val('');	
			$('#mailingAddressCity').val('');	
			$('#mailingAddressProvince').val('');	
			$('#mailingAddressCountry').val('');	
			$('#mailingAddressZipCode').val('');	
        }

	});

});


var documentRequirementsCount = 2;
//Document requirements
function addDocumentRequirementsButton(rowId){
	
	var documentRequirementsRowId = rowId.replace("addDocumentRequirementsButton", "");
	var documentName = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentName').val();
	var documentFile = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentFile').val();
	if(documentName!='' && documentFile!=''){
		documentRequirementsCount++;
         
		var newRow  = '<hr class="breakLine"><br><div class="form-row" id="savedDocumentRequirementsRow'+documentRequirementsCount +'">';
        newRow += '<div class="form-group col-lg-3 col-md-4"> <label for="documentName">Document Name</label> <input type="text" class="form-control" maxLength="200" name="documentRequestRequirementsForms['+documentRequirementsCount+'].documentName" id="documentRequestRequirementsForms'+documentRequirementsCount+'documentName" onkeypress="return isAlphaNum(event)"/> </div>';
		newRow += '<div class="form-group col-lg-4 col-md-5"> <label for="documentFile">Document File</label> <input type="file" class="form-control" id="documentRequestRequirementsForms'+documentRequirementsCount+'documentFile" name="documentRequestRequirementsForms['+documentRequirementsCount+'].documentFile" accept="image/png,image/jpeg,image/jpg" /> </div>';
		newRow += '<div class="form-group col-lg-5 col-md-3 addButton"> <div class="docFileLoop"> <span class="actionButtons leftBtn" id="addDocumentRequirementsButton'+documentRequirementsCount+'" onclick="addDocumentRequirementsButton(this.id)"> <iconify-icon class="actionIcon" icon="material-symbols:edit"></iconify-icon> Add </span>&nbsp;&nbsp; </div> </div>';
		newRow += "</div>";

		$('#documentRequirementsTable').append(newRow);
        $('#savedDocumentRequirementsRow'+documentRequirementsRowId).find('div').eq(2).html('');
		$('#savedDocumentRequirementsRow'+documentRequirementsRowId).find('div').eq(2).append('<div class="docFileLoop"> <span class="actionButtons delete" id="deleteDocumentRequirementsButton'+documentRequirementsCount+'" onclick="deleteDocumentRequirementsButton('+documentRequirementsRowId+')"> <iconify-icon class="actionIcon" icon="material-symbols:delete-forever-rounded"></iconify-icon> Delete </span> </div>');
	}else{
        alert('error');              
		return false;
	}
}


function deleteDocumentRequirementsButton(buttonId){
	$('#documentRequirementsTable hr').remove();
	$("#documentRequirementsTable div[id=savedDocumentRequirementsRow" + buttonId + "]").remove();
}


// recaptcha
var verifyCallback = function(response) {
	verifyCaptcha(response)
	};


	var onloadCallback = function() {
		grecaptcha.render('html_element', {
		  'sitekey' : '6LeMnqUUAAAAAOiG4EqnJakjhf71-xkL7tAVu0zU',
		  'callback' : verifyCallback,
		  'theme' : 'white'

		});
		};

function reloadRecaptcha() {
	var publicKey = "6LeMnqUUAAAAAOiG4EqnJakjhf71-xkL7tAVu0zU";
	var div = "recap";
	Recaptcha.create(publicKey,div,{theme: "white"});
	return false;
}

function verifyCaptcha(response){
	$.ajax({
		type: 'POST',
		url: 'verifyRecaptcha.htm',
		async: false,
		data: {captchaValue: response},
		success: function(result){
			
			isValidCaptcha = result;
		},
		error: function(request, status, error){
			alert("Error:"+error+request+status);
		}
		
		
	});
}