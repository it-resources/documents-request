var onFocusValue = '';

var documentCount = 2;
var documentRequirementsCount = 2;

var isValidCaptcha = "invalid";

$('document').ready(function(){

	
	var dataPrivacyModal = document.getElementById("dataPrivacyModal");
	var dataPrivacyClose = document.getElementById("dataPrivacyClose");
	dataPrivacyClose.onclick = function() { 
		dataPrivacyModal.style.display = "none";
	}
	
	
	var validationFormModal = document.getElementById("validationFormModal");
	var validationFormClose = document.getElementById("validationFormClose");
	validationFormClose.onclick = function() { 
		validationFormModal.style.display = "none";
	}
	
	
	var errorModal = document.getElementById("errorModal");
	var errorClose = document.getElementById("errorClose");
	errorClose.onclick = function() { 
		errorModal.style.display = "none";
	}
	
	
	formatTableRowDesign('personalInformationTable',false);
	//formatTableRowDesign('claimingOptionsTable',false);
	
	var radioValue = $("input[name='isForDelivery']:checked").val();
	
	if(radioValue == '0'){
		$('#addressee').val('');	
		$('#addressee').attr('disabled','true');
		
		$('#addresseeContactNo').val('');	
		$('#addresseeContactNo').attr('disabled','true');
		
		$('#mailingAddressBldgNo').val('');	
		$('#mailingAddressBldgNo').attr('disabled','true');
		
		$('#mailingAddressStreetName').val('');	
		$('#mailingAddressStreetName').attr('disabled','true');
		
		$('#mailingAddressCity').val('');	
		$('#mailingAddressCity').attr('disabled','true');
		
		$('#mailingAddressProvince').val('');	
		$('#mailingAddressProvince').attr('disabled','true');
		
		$('#mailingAddressCountry').val('');	
		$('#mailingAddressCountry').attr('disabled','true');
		
		$('#mailingAddressZipCode').val('');	
		$('#mailingAddressZipCode').attr('disabled','true');
		
		$('#sameMailingAddress').attr('disabled','true');
		$('#sameMailingAddress').attr('checked',false);
	}else{
		$('#addressee').removeAttr('disabled');
		$('#addresseeContactNo').removeAttr('disabled');
		$('#mailingAddressBldgNo').removeAttr('disabled');
		$('#mailingAddressStreetName').removeAttr('disabled');
		$('#mailingAddressCity').removeAttr('disabled');
		$('#mailingAddressProvince').removeAttr('disabled');
		$('#mailingAddressCountry').removeAttr('disabled');
		$('#mailingAddressZipCode').removeAttr('disabled');
		$('#sameMailingAddress').removeAttr('disabled');
	}
	
	$('#sameMailingAddress').click(function(){
		var isChecked = $('#sameMailingAddress').is(':checked');
		
		if(isChecked){

			$('#mailingAddressBldgNo').val($('#presentAddressBldgNo').val());	
			$('#mailingAddressStreetName').val($('#presentAddressStreetName').val());	
			$('#mailingAddressCity').val($('#presentAddressCity').val());	
			$('#mailingAddressProvince').val($('#presentAddressProvince').val());	
			$('#mailingAddressCountry').val($('#presentAddressCountry').val());	
			$('#mailingAddressZipCode').val($('#presentAddressZipCode').val());	
		}

	});
	
	$('#samePermanentAddress').click(function(){
		var isChecked = $('#samePermanentAddress').is(':checked');
		
		if(isChecked){

			$('#permanentAddressBldgNo').val($('#presentAddressBldgNo').val());	
			$('#permanentAddressStreetName').val($('#presentAddressStreetName').val());	
			$('#permanentAddressCity').val($('#presentAddressCity').val());	
			$('#permanentAddressProvince').val($('#presentAddressProvince').val());	
			$('#permanentAddressCountry').val($('#presentAddressCountry').val());	
			$('#permanentAddressZipCode').val($('#presentAddressZipCode').val());	
		}

	});
	
	
	$('#dataPolicy').click(function(){
		var isChecked = $('#dataPolicy').is(':checked');
		
		if(isChecked){

			//enableOpaqueBackground();
			//showPopup('popupDataPrivacyForm');
			//$('#popupDataPrivacyForm').animate({scrollTop : 0},800);

			
			
			var modal = document.getElementById("dataPrivacyModal");
			modal.style.display = "block";
			
		}
		
		
		$('#isPolicyViewed').attr('checked', true);
	});
	
	$('#closeDataPrivacyPopUp').click(function(){
		$('#backgroundOpaque').fadeOut('slow');
		$('#popupDataPrivacyForm').fadeOut('slow');
	});
	
	$('#emailAd').focus(function(){
		onFocusValue = $(this).val();
	});
	
	$('#emailAd').blur(function(){
		var prevEmailAddress = onFocusValue;
		var newEmailAddress = $(this).val();
		
		if(newEmailAddress != prevEmailAddress){
			if($('#emailAd').val() != ''){
				$.ajax({			
					type: 'POST',
					url: "isValidEmailAddress.htm",
					data: {emailAd: $('#emailAd').val()},
					async: false,
					success: function(result){
						
						if(result!="valid"){
							fadeMessage('emailMsg', result);
							$('#emailAd').val('');
							
						}else{
							
						}
						
					 			
					},
					error: function(request, status, error){
						//alert(request.responseText);
						alert("Error: "+error);
					}
					  
				});
				
			}
		}
	});
	getDocumentRequestTypeByCategoryId();
	if($('#documentRequestTypeCategoryId :selected').text() == 'High School'){
		$('#shsTr').removeAttr('hidden');
		$('#collegeTr').attr('hidden','true');
		
		$('#strand').val('');
		$('#course').val('');

	}
	
	if($('#documentRequestTypeCategoryId :selected').text() == 'College'){
		$('#collegeTr').removeAttr('hidden');
		$('#shsTr').attr('hidden','true');
		
		$('#strand').val('');
		$('#course').val('');

	}
	
	$('#documentRequestTypeCategoryId').change(function(){
		
		getDocumentRequestTypeByCategoryId();
		if($('#documentRequestTypeCategoryId :selected').text() == 'High School'){
			$('#shsTr').removeAttr('hidden');
			$('#collegeTr').attr('hidden','true');
			
			$('#strand').val('');
			$('#course').val('');

		}
		
		if($('#documentRequestTypeCategoryId :selected').text() == 'College'){
			$('#collegeTr').removeAttr('hidden');
			$('#shsTr').attr('hidden','true');
			
			$('#strand').val('');
			$('#course').val('');

		}
		
	});
	
	$('#course').change(function(){
		
		if($('#course').val()!=''){
			$('#newCourseStrand').val('');
		}
		
	});
	
	$('#strand').change(function(){
		
		if($('#strand').val()!=''){
			$('#newCourseStrand').val('');
		}
		
	});
	
	$('#newCourseStrand').blur(function(){
		if($('#newCourseStrand').val()!=''){
			$('#strand').val('');
			$('#course').val('');
		}
	});
	
	
	$('#documentRequestTypeId').change(function(){
		var price = roundOff2Decimal(getPriceByDocumentRequestTypeId($('#documentRequestTypeId').val())) * $('#quantity').val();
		$('#documentPriceSpan').html(formatMoney(roundOff2Decimal(price)));
		//$('#documentRow').find('td').eq(3).html(formatMoney(roundOff2Decimal(price)));
		
//		$($("tr[id^='savedDocumentRow']")).each(function(){
//		
//			var rowId = $(this).attr('id');	
//			var documentRowId = rowId.replace("savedDocumentRow", "");
//			var savedPrice = roundOff2Decimal($('#savedDocumentRow'+documentRowId).find('td').eq(3).html().replaceAll(",", ""));
//
//			price = parseFloat(price) + parseFloat(savedPrice);
//
//		});
//		$('#totalPayable').html(formatMoney(roundOff2Decimal(price)));
	});
	
	$('#quantity').change(function(){
		var price = roundOff2Decimal(getPriceByDocumentRequestTypeId($('#documentRequestTypeId').val())) * $('#quantity').val();
		$('#documentPriceSpan').html(formatMoney(roundOff2Decimal(price)));
		
		//$('#documentRow').find('td').eq(3).html(formatMoney(roundOff2Decimal(price)));
		
//		$($("tr[id^='savedDocumentRow']")).each(function(){
//			
//			var rowId = $(this).attr('id');	
//			var documentRowId = rowId.replace("savedDocumentRow", "");
//			var savedPrice = roundOff2Decimal($('#savedDocumentRow'+documentRowId).find('td').eq(3).html().replaceAll(",", ""));
//
//			price = parseFloat(price) + parseFloat(savedPrice);
//
//			
//		});
//		$('#totalPayable').html(formatMoney(roundOff2Decimal(price)));
	});
	
	
	$('#addDocumentButton').click(function(){
		

		var documentRequestTypeId = $('#documentRequestTypeId').val();
		var documentRequestTypeName = $( "#documentRequestTypeId option:selected" ).text();
		var purpose = $('#purpose').val();
		var quantity = $('#quantity').val();
		var price = $('#documentPriceSpan').html();
		var breakdown = $('#documentBreakdownSpan').html();
		
		if(documentRequestTypeId!='0' && purpose!='' && quantity!='0' && quantity!=''){
			documentCount++;
			
			var newRow  = "<tr id='savedDocumentRow"+documentCount +"' >";
			newRow += "<td>"+documentRequestTypeName+"</td>";
			newRow += "<td>"+purpose+"</td>";
			newRow += "<td>"+quantity+"</td>";
			newRow += "<td>"+price+"</td>";
			
			breakdown = breakdown.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');
			newRow += "<td>";
			newRow += "<span style='color:gray;size:5px'>("+breakdown+")</span>";
			
			newRow += "</td>";

			
			
			newRow += "<td>";
			newRow += "<input type='button' class='action_link' value='Edit' align='left' id='editDocumentButton"+documentCount+"' onclick='editDocumentButton("+documentCount+")'/>";
			newRow += "<input type='button' class='action_link' value='Delete' align='left' id='deleteDocumentButton"+documentCount+"' onclick='deleteDocumentButton("+documentCount+")'/></td>";
			
			newRow += "</td>";
			
			newRow  += "</tr>";

			
			$('#documentTable tr[id=totalRow]').before(newRow);

			$('#documentRequestTypeId').val(0);
			$('#purpose').val('');
			$('#quantity').val('');
			$('#documentPriceSpan').html('');
			$('#documentBreakdownSpan').html('');
			
			
			var price = 0;

			$($("tr[id^='savedDocumentRow']")).each(function(){
				
				var rowId = $(this).attr('id');	
				var documentRowId = rowId.replace("savedDocumentRow", "");
				var savedPrice = roundOff2Decimal($('#savedDocumentRow'+documentRowId).find('td').eq(3).html().replaceAll(",", ""));
				price = parseFloat(price) + parseFloat(savedPrice);
	
				
			});
			$('#totalPayable').html(formatMoney(roundOff2Decimal(price)));
			
			$('#addDocumentDiv').fadeOut('slow').css('display','none');
			$('#addAnotherDocumentDiv').fadeOut('slow').css('display','block');
			
		}else{
			//fadeMessage('documentMsg', "Document Type,Purpose and Quantity Fields are required.");
			var errorMsg = '* Document Type,Purpose and Quantity Fields are required.';
			
			$('#formError').html(errorMsg);
			var modal = document.getElementById("errorModal");
			modal.style.display = "block";
			return false;
		}
		
	});
	
	$('#addAnotherDocumentButton').click(function(){
		
		$('#addAnotherDocumentDiv').fadeOut('slow').css('display','none');
		$('#addDocumentDiv').fadeOut('slow').css('display','block');
		
	});
	
//	$('#addDocumentRequirementsButton').click(function(){
//		
//
//		var documentName = $('#documentName').val();
//		var documentFile = $('#documentFile').val();
//
//		if(documentName!='' && documentFile!=''){
//			documentRequirementsCount++;
//			
//			var newRow  = "<tr id='savedDocumentRequirementsRow"+documentRequirementsCount +"' >";
//			newRow += "<td width='100'><input id='documentName"+documentRequirementsCount +"' style='width:250px;'  type='text' maxlength='200' onkeypress='return isAlphaNum(event)' /></td>";
//			newRow += "<td width='100'><input type='file' maxLength='200' id='documentFile"+documentRequirementsCount +"' style='width:200px;' onkeypress='return isAlphaNum(event)'/></td>";
//			newRow += "<td>";
//			newRow += "<input type='button' class='action_link' value='Delete' align='left' id='deleteDocumentRequirementsButton"+documentRequirementsCount+"' onclick='deleteDocumentRequirementsButton("+documentRequirementsCount+")'/></td>";
//			
//			newRow += "</td>";
//			
//			newRow  += "</tr>";
//
//			
//			$('#documentRequirementsTable').append(newRow);
//
//			
//		}else{
//			fadeMessage('documentRequirementsMsg', "Document Name and File Fields are required.");
//		}
//		
//	});
	
	
	$('#showvalidationPopup').click(function(){
		
		var errorMsg = '';
		var defaultErrorMsg = '<b>Input all required details:</b><br>';
		
		var hasDocument = false;
		var hasPendingDocument = false;

//		if($('#documentRequestTypeId').val()!='0' && $('#purpose').val()!='' && $('#quantity').val()!='0' && $('#quantity').val()!=''){
//			hasDocument = true;
//		}
		
		$($("tr[id^='savedDocumentRow']")).each(function(){
			
			var rowId = $(this).attr('id');	
			var documentRowId = rowId.replace("savedDocumentRow", "");
			
			var documentRequestTypeName = $('#savedDocumentRow'+documentRowId).find('td').eq(0).html();
			var purpose = $('#savedDocumentRow'+documentRowId).find('td').eq(1).html();
			var quantity = $('#savedDocumentRow'+documentRowId).find('td').eq(2).html();
			
			var button = $('#savedDocumentRow'+documentRowId).find('td').eq(5).find('input').attr('id');

			if(button.startsWith("updateDocumentButton")){
				hasPendingDocument = true;
			}
			
			if(documentRequestTypeName!='' && purpose!='' && quantity!='0' && quantity!=''){
				hasDocument = true;
			}

			
		});
		
		if(hasPendingDocument){
			errorMsg+= '* Please update all Documents first.<br>';
		}
		
		if(!hasDocument){
			errorMsg+= '* Atleast 1 Document Type Request is Required.<br>';
		}
		
		if($('#lastname').val() == null || $('#lastname').val() ==''){
			errorMsg+= '* Last Name Required.<br>';
		}
		
		if($('#firstname').val() == null || $('#firstname').val() ==''){
			errorMsg+= '* First Name Required.<br>';
		}
		
		if($('#dateOfBirth').val() == null || $('#dateOfBirth').val() ==''){
			errorMsg+= '* Date of Birth Required.<br>';
		}
		
		if($('#birthPlace').val() == null || $('#birthPlace').val() ==''){
			errorMsg+= '* Place of Birth Required.<br>';
		}
		
		if($('#fatherLastname').val() == null || $('#fatherLastname').val() ==''
			||$('#fatherFirstname').val() == null || $('#fatherFirstname').val() ==''){
			errorMsg+= "* Father's Name Required.<br>";
		}
		
		if($('#motherLastname').val() == null || $('#motherLastname').val() ==''
			||$('#motherFirstname').val() == null || $('#motherFirstname').val() ==''){
			errorMsg+= "* Mother's Name Required.<br>";
		}

		
		
		if($('#presentAddressBldgNo').val() == null || $('#presentAddressBldgNo').val() ==''
			|| $('#presentAddressStreetName').val() == null || $('#presentAddressStreetName').val() ==''
			|| $('#presentAddressCity').val() == null || $('#presentAddressCity').val() ==''
			|| $('#presentAddressProvince').val() == null || $('#presentAddressProvince').val() ==''
			|| $('#presentAddressCountry').val() == null || $('#presentAddressCountry').val() ==''
			|| $('#presentAddressZipCode').val() == null || $('#presentAddressZipCode').val() ==''){
			errorMsg+= '* Present Address Required.<br>';
		}
		
		if($('#permanentAddressBldgNo').val() == null || $('#permanentAddressBldgNo').val() ==''
			|| $('#permanentAddressStreetName').val() == null || $('#permanentAddressStreetName').val() ==''
			|| $('#permanentAddressCity').val() == null || $('#permanentAddressCity').val() ==''
			|| $('#permanentAddressProvince').val() == null || $('#permanentAddressProvince').val() ==''
			|| $('#permanentAddressCountry').val() == null || $('#permanentAddressCountry').val() ==''
			|| $('#permanentAddressZipCode').val() == null || $('#permanentAddressZipCode').val() ==''){
			errorMsg+= '* Permanent Address Required.<br>';
		}
		
		var radioValue = $("input[name='isForDelivery']:checked").val();
		
		if(radioValue == '1'){
			if($('#addressee').val() == null || $('#addressee').val() ==''){
				errorMsg+= '* Addressee Required.<br>';
			}
			
			if($('#addresseeContactNo').val() == null || $('#addresseeContactNo').val() ==''){
				errorMsg+= '* Addressee Contact No. Required.<br>';
			}
			
			if($('#mailingAddressBldgNo').val() == null || $('#mailingAddressBldgNo').val() ==''
				|| $('#mailingAddressStreetName').val() == null || $('#mailingAddressStreetName').val() ==''
				|| $('#mailingAddressCity').val() == null || $('#mailingAddressCity').val() ==''
				|| $('#mailingAddressProvince').val() == null || $('#mailingAddressProvince').val() ==''
				|| $('#mailingAddressCountry').val() == null || $('#mailingAddressCountry').val() ==''
				|| $('#mailingAddressZipCode').val() == null || $('#mailingAddressZipCode').val() ==''){
				errorMsg+= '* Mailing Address Required.<br>';
			}
		}
		
/*		if($('#provincialAddress').val() == null || $('#provincialAddress').val() ==''){
			errorMsg+= '* Provincial Address Required.<br>';
		}*/
		
		if($('#contactNo').val() == null || $('#contactNo').val() ==''){
			errorMsg+= '* Contact No Required.<br>';
		}
		
		if($('#emailAd').val() == null || $('#emailAd').val() ==''){
			errorMsg+= '* Email Address Required.<br>';
		}


		var hasRequiredDocument = false;
		
		$($("tr[id^='savedDocumentRequirementsRow']")).each(function(){
			
			var rowId = $(this).attr('id');	
			var documentRequirementsRowId = rowId.replace("savedDocumentRequirementsRow", "");
			var documentName = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentName').val();
			var documentFile = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentFile').val();
			if(documentName!='' && documentFile!=''){

				hasRequiredDocument = true;	
			}

			
		});
		
		if(!hasRequiredDocument){
			errorMsg+= '* Please upload atleast 1 Document Requirement.<br>';
		}
		
		if($('#dataPolicy').is(':checked') == false){
			errorMsg+= '* Data Privacy Policy Required.<br>';
		}
		
		if(isValidCaptcha !='valid'){
			errorMsg+= '* Captcha Required.<br>';
    	}
		
		
		
		
		
		if(errorMsg != ''){
			
			$('#formError').html(errorMsg);
			var modal = document.getElementById("errorModal");
			modal.style.display = "block";
			return false;
		}

		$('#isPreviewed').attr('checked', true);
		showvalidationPopup();
	});
	
	$('#closeValidationPopUp').click(function(){
		$('#backgroundOpaque').fadeOut('slow');
		$('#popupValidationForm').fadeOut('slow');
	});
	
	
	$('#form').submit(function(){
		var errorMsg = '';
		var defaultErrorMsg = '<b>Input all required details:</b><br>';
		
		var hasDocument = false;
		var hasPendingDocument = false;

//		if($('#documentRequestTypeId').val()!='0' && $('#purpose').val()!='' && $('#quantity').val()!='0' && $('#quantity').val()!=''){
//			hasDocument = true;
//		}
		
		$($("tr[id^='savedDocumentRow']")).each(function(){
			
			var rowId = $(this).attr('id');	
			var documentRowId = rowId.replace("savedDocumentRow", "");
			
			var documentRequestTypeName = $('#savedDocumentRow'+documentRowId).find('td').eq(0).html();
			var purpose = $('#savedDocumentRow'+documentRowId).find('td').eq(1).html();
			var quantity = $('#savedDocumentRow'+documentRowId).find('td').eq(2).html();
			
			var button = $('#savedDocumentRow'+documentRowId).find('td').eq(5).find('input').attr('id');

			if(button.startsWith("updateDocumentButton")){
				hasPendingDocument = true;
			}
			
			if(documentRequestTypeName!='' && purpose!='' && quantity!='0' && quantity!=''){
				hasDocument = true;
			}

			
		});
		
		if(hasPendingDocument){
			errorMsg+= '* Please update all Documents first.<br>';
		}
		
		if(!hasDocument){
			errorMsg+= '* Atleast 1 Document Type Request is Required.<br>';
		}
		
		if($('#lastname').val() == null || $('#lastname').val() ==''){
			errorMsg+= '* Last Name Required.<br>';
		}
		
		if($('#firstname').val() == null || $('#firstname').val() ==''){
			errorMsg+= '* First Name Required.<br>';
		}
		
		if($('#dateOfBirth').val() == null || $('#dateOfBirth').val() ==''){
			errorMsg+= '* Date of Birth Required.<br>';
		}
		
		if($('#birthPlace').val() == null || $('#birthPlace').val() ==''){
			errorMsg+= '* Place of Birth Required.<br>';
		}
		
		if($('#fatherLastname').val() == null || $('#fatherLastname').val() ==''
			||$('#fatherFirstname').val() == null || $('#fatherFirstname').val() ==''){
			errorMsg+= "* Father's Name Required.<br>";
		}
		
		if($('#motherLastname').val() == null || $('#motherLastname').val() ==''
			||$('#motherFirstname').val() == null || $('#motherFirstname').val() ==''){
			errorMsg+= "* Mother's Name Required.<br>";
		}
		

		if($('#presentAddressBldgNo').val() == null || $('#presentAddressBldgNo').val() ==''
			|| $('#presentAddressStreetName').val() == null || $('#presentAddressStreetName').val() ==''
			|| $('#presentAddressCity').val() == null || $('#presentAddressCity').val() ==''
			|| $('#presentAddressProvince').val() == null || $('#presentAddressProvince').val() ==''
			|| $('#presentAddressCountry').val() == null || $('#presentAddressCountry').val() ==''
			|| $('#presentAddressZipCode').val() == null || $('#presentAddressZipCode').val() ==''){
			errorMsg+= '* Present Address Required.<br>';
		}
		
		if($('#permanentAddressBldgNo').val() == null || $('#permanentAddressBldgNo').val() ==''
			|| $('#permanentAddressStreetName').val() == null || $('#permanentAddressStreetName').val() ==''
			|| $('#permanentAddressCity').val() == null || $('#permanentAddressCity').val() ==''
			|| $('#permanentAddressProvince').val() == null || $('#permanentAddressProvince').val() ==''
			|| $('#permanentAddressCountry').val() == null || $('#permanentAddressCountry').val() ==''
			|| $('#permanentAddressZipCode').val() == null || $('#permanentAddressZipCode').val() ==''){
			errorMsg+= '* Permanent Address Required.<br>';
		}
		
		var radioValue = $("input[name='isForDelivery']:checked").val();
		
		if(radioValue == '1'){
			if($('#addressee').val() == null || $('#addressee').val() ==''){
				errorMsg+= '* Addressee Required.<br>';
			}
			
			if($('#addresseeContactNo').val() == null || $('#addresseeContactNo').val() ==''){
				errorMsg+= '* Addressee Contact No. Required.<br>';
			}
			
			if($('#mailingAddressBldgNo').val() == null || $('#mailingAddressBldgNo').val() ==''
				|| $('#mailingAddressStreetName').val() == null || $('#mailingAddressStreetName').val() ==''
				|| $('#mailingAddressCity').val() == null || $('#mailingAddressCity').val() ==''
				|| $('#mailingAddressProvince').val() == null || $('#mailingAddressProvince').val() ==''
				|| $('#mailingAddressCountry').val() == null || $('#mailingAddressCountry').val() ==''
				|| $('#mailingAddressZipCode').val() == null || $('#mailingAddressZipCode').val() ==''){
				errorMsg+= '* Mailing Address Required.<br>';
			}
		}
		
		
		if($('#contactNo').val() == null || $('#contactNo').val() ==''){
			errorMsg+= '* Contact No Required.<br>';
		}
		
		if($('#emailAd').val() == null || $('#emailAd').val() ==''){
			errorMsg+= '* Email Address Required.<br>';
		}
		
		var hasRequiredDocument = false;
		
		$($("tr[id^='savedDocumentRequirementsRow']")).each(function(){
			
			var rowId = $(this).attr('id');	
			var documentRequirementsRowId = rowId.replace("savedDocumentRequirementsRow", "");
			var documentName = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentName').val();
			var documentFile = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentFile').val();
			if(documentName!='' && documentFile!=''){

				hasRequiredDocument = true;	
			}

			
		});
		
		if(!hasRequiredDocument){
			errorMsg+= '* Please upload atleast 1 Document Requirement.<br>';
		}
		
		if($('#dataPolicy').is(':checked') == false){
			errorMsg+= '* Data Privacy Policy Required.<br>';
		}
		
		if(isValidCaptcha !='valid'){
			errorMsg+= '* Captcha Required.<br>';
    	}
		
		
		if($('#isPreviewed').is(':checked') == false){
			errorMsg+= '* Click Preview first.<br>';
		}
		
		
		if(errorMsg != ''){
			
			$('#formError').html(errorMsg);
			var modal = document.getElementById("errorModal");
			modal.style.display = "block";
			return false;
		}
		
		var index = 0;
		var hiddenItemDetails =  $('<td></td>');
		$($("tr[id^='savedDocumentRow']")).each(function(){
			
			var rowId = $(this).attr('id');	
			var documentRowId = rowId.replace("savedDocumentRow", "");
			
			var documentRequestTypeName = $('#savedDocumentRow'+documentRowId).find('td').eq(0).html();
			
			var documentRequestTypeId = 0;
			$('#documentRequestTypeIdHidden option').each(function() { 
				if(documentRequestTypeName === $(this).text() ){
					documentRequestTypeId = $(this).val();
				}
			});
			
			
			var purpose = $('#savedDocumentRow'+documentRowId).find('td').eq(1).html();
			var quantity = $('#savedDocumentRow'+documentRowId).find('td').eq(2).html();


			
			hiddenItemDetails.append($('<input></input>').attr('type', 'hidden').attr('name','documentRequestItemForms[' + index + '].documentRequestTypeId')
		  			.attr('id','documentRequestItemForms' + index + '.documentRequestTypeId').val(documentRequestTypeId));
			
			hiddenItemDetails.append($('<input></input>').attr('type', 'hidden').attr('name','documentRequestItemForms[' + index + '].purpose')
		  			.attr('id','documentRequestItemForms' + index + '.purpose').val(purpose));
			
			hiddenItemDetails.append($('<input></input>').attr('type', 'hidden').attr('name','documentRequestItemForms[' + index + '].quantity')
		  			.attr('id','documentRequestItemForms' + index + '.quantity').val(quantity));
			
			index++;
			
		});
		$("#documentTable").append(hiddenItemDetails);
		
		
/*		var index = 0;
		var hiddenItemDetails =  $('<td></td>');
		$($("tr[id^='savedDocumentRequirementsRow']")).each(function(){
			
			var rowId = $(this).attr('id');	
			var documentRequirementsRowId = rowId.replace("savedDocumentRequirementsRow", "");
			
			alert(documentRequirementsRowId);
			var documentName = $('#documentName'+documentRequirementsRowId).val();
			
			var documentFile = $('#documentFile'+documentRequirementsRowId).val();

			alert(documentFile);
			
			hiddenItemDetails.append($('<input></input>').attr('type', 'hidden').attr('name','requestRequirementsForms[' + index + '].documentName')
		  			.attr('id','requestRequirementsForms' + index + '.documentName').val(documentName));
			
			hiddenItemDetails.append($('<input></input>').attr('type', 'file').attr('name','requestRequirementsForms[' + index + '].documentFile')
		  			.attr('id','requestRequirementsForms' + index + '.documentFile').val(documentFile));

			
			index++;
			
		});
		$("#documentRequirementsTable").append(hiddenItemDetails);
		*/
		
		
	});
	
	$('#close').click(function(){
		var modal = document.getElementById("errorModal");
		modal.style.display = "none";
	});
	
});


function validateEmailAddress(){
	if($('#emailAd').val() != ''){
		$.ajax({			
			type: 'POST',
			url: "isValidEmailAddress.htm",
			data: {emailAd: $('#emailAd').val()},
			async: false,
			success: function(result){
				
				if(result!="valid"){
					fadeMessage('emailMsg', result);
					$('#emailAd').val('');
					
				}else{
					
				}
				
			 			
			},
			error: function(request, status, error){
				//alert(request.responseText);
				alert("Error: "+error);
			}
			  
		});
		
	}
}


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

function FilterInput (event) {
	var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
	
	// returns false if a numeric character has been entered
	return (chCode < 48 /* '0' */ || chCode > 57 /* '9' */);
}	

function isValidCharacterForName(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if(isValidCharForName(charCode)){
		return false;
	}else{
		return true;
	}
}

function isValidCharForName(charCode){
	if(charCode == 33 || charCode == 64 || charCode == 35 || charCode ==36
		|| charCode == 37 || charCode == 94 || charCode == 38 || charCode == 42
		|| charCode == 126 || charCode == 96 || charCode == 95 || charCode == 61
		|| charCode == 59 || charCode == 58 || charCode == 39 || charCode == 34
		|| charCode == 44 || charCode == 60 || charCode == 62 || charCode == 40
		|| charCode == 47 || charCode == 63 || charCode == 92 || charCode == 124
		|| charCode == 91 || charCode == 123 || charCode == 93 || charCode == 125
		|| charCode == 41 || charCode == 43){
		return true;
	}else {
		return false;
	}
}


$(function(){
	
	//$('#dateOfBirth').datepicker();
	$('#dateOfBirth').datepicker({ dateFormat: 'mm-dd-yy' }).val();

});

function checkDate(str,e){
	if((str.value.length == 2 || str.value.length == 5) && e.keyCode != 8){
		$(str).val(str.value+'-');
	}
	return isNumeric(e);
}

function isDateFormat(date){


	 // get the date value and separate it by the (-)
	 var dateString = date.value;
	 var dateParts = dateString.split('-');

	 // initialized the date value into Date and get the year-month-day of the Date
	 dateString = new Date(
	                       parseInt(dateParts[1], 10) - 1, // month, starts with 0
	                       parseInt(dateParts[2], 10), //day
	                       parseInt(dateParts[0], 10));    // year

	 
	 // get the date today
	 var dateNow = new Date();
	 // set the hours, min, sec and ms
	 dateNow.setHours(00, 00, 00, 00);
	 
	 if (date.value != '') {
	    // if (!/^\d((0\d)|(1[012]))-(([012]\d)|3[01])-{4}$/.test(date.value)  || (isBirthDateValid(date.value) == false) ) {
		 if (!/^((0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])[-](19|20)?[0-9]{2})*$/.test(date.value) ) {
//	       $('#birthdate').val('');
//	       $('#birthdate').focus();
			 date.value=''; 
			 date.focus(); 
			 var errorMsg = '* Invalid Date.';
				
				$('#formError').html(errorMsg);
				var modal = document.getElementById("errorModal");
				modal.style.display = "block";
			 return false;
	     }
		 
		 if(date.id == 'dateOfBirth'){
			 var mm = date.value.substring(0, 2);
				var dd = date.value.substring(3, 5);
				var yyyy = date.value.substring(6, 10);

				 
				var date1 = new Date(yyyy+"-"+mm+"-"+dd);
				var today = new Date();

				if(date1 > today){
					var errorMsg = '* Invalid Date of Birth.';
					
					$('#formError').html(errorMsg);
					var modal = document.getElementById("errorModal");
					modal.style.display = "block";
					date.value=''; 
					return false;
				}
		 }
		
		 

	 }
}

function editDocumentButton(buttonId){

	var documentRequestTypeName = $('#savedDocumentRow'+buttonId).find('td').eq(0).html();
	var purpose = $('#savedDocumentRow'+buttonId).find('td').eq(1).html();
	var quantity = $('#savedDocumentRow'+buttonId).find('td').eq(2).html();
	
	
	
	$('#savedDocumentRow'+buttonId).find('td').eq(0).html('');
	$('#savedDocumentRow'+buttonId).find('td').eq(1).html('');
	$('#savedDocumentRow'+buttonId).find('td').eq(2).html('');
	$('#savedDocumentRow'+buttonId).find('td').eq(5).html('');
	
	var documentTypes = '';
	$('#documentRequestTypeIdHidden option').each(function() { 
		if(documentRequestTypeName === $(this).text() ){
			documentTypes += "<option value='"+ $(this).val() +"' selected";
			documentTypes += ">"+ $(this).text() +"</option>";
		}else{
			documentTypes += "<option value='"+ $(this).val() +"'";
			documentTypes += ">"+ $(this).text() +"</option>";
		}
		
		
		
	});

	$('#savedDocumentRow'+buttonId).find('td').eq(0).append("<select id='editDocumentRequestTypeId"+buttonId+"' onchange='return getPriceByDocumentRequestTypeIdEdit("+buttonId+")' style='width:150px;' >"+documentTypes+"</select>");
	$('#savedDocumentRow'+buttonId).find('td').eq(1).append("<input id='editPurpose"+buttonId+"' value='"+purpose+"' style='width:250px;'  type='text' maxlength='200' onkeypress='return isAlphaNum(event)' />");
	$('#savedDocumentRow'+buttonId).find('td').eq(2).append("<input type='text' id='editQuantity"+buttonId+"' value='"+quantity+"' onchange='return getPriceByDocumentRequestTypeIdEdit("+buttonId+")' style='width:50px;' maxLength='9' onkeypress='return isNumeric(event)' onpaste='return false;' />");
	
	$('#savedDocumentRow'+buttonId).find('td').eq(5).append( "<input type='button' class='action_link' value='Update' align='left' id='updateDocumentButton"+buttonId+"' onclick='updateDocumentButton("+buttonId+")'/>");


}

function updateDocumentButton(buttonId){

	var documentRequestTypeId = $('#editDocumentRequestTypeId'+buttonId).val();
	var documentRequestTypeName = $( "#editDocumentRequestTypeId"+buttonId+" option:selected" ).text();
	var purpose = $('#editPurpose'+buttonId).val();
	var quantity = $('#editQuantity'+buttonId).val();


	if(documentRequestTypeId!='0' && purpose!='' && quantity!='0' && quantity!=''){

		$('#savedDocumentRow'+buttonId).find('td').eq(0).html('');
		$('#savedDocumentRow'+buttonId).find('td').eq(1).html('');
		$('#savedDocumentRow'+buttonId).find('td').eq(2).html('');
		$('#savedDocumentRow'+buttonId).find('td').eq(5).html('');
		
		$('#savedDocumentRow'+buttonId).find('td').eq(0).append(documentRequestTypeName);
		$('#savedDocumentRow'+buttonId).find('td').eq(1).append(purpose);
		$('#savedDocumentRow'+buttonId).find('td').eq(2).append(quantity);
		$('#savedDocumentRow'+buttonId).find('td').eq(5).append( "<input type='button' class='action_link' value='Edit' align='left' id='editDocumentButton"+buttonId+"' onclick='editDocumentButton("+buttonId+")'/><input type='button' class='action_link' value='Delete' align='left' id='deleteDocumentButton"+buttonId+"' onclick='deleteDocumentButton("+buttonId+")'/>");
		


			
			
	}else{
		//fadeMessage('documentMsg', "Document,Purpose and Quantity Fields are required.");
		var errorMsg = '* Document Type,Purpose and Quantity Fields are required.';
		
		$('#formError').html(errorMsg);
		var modal = document.getElementById("errorModal");
		modal.style.display = "block";
		return false;
	}

	
}


function deleteDocumentButton(buttonId){
	$("#documentTable tr[id=savedDocumentRow" + buttonId + "]").remove();
	var price=0;
	$($("tr[id^='savedDocumentRow']")).each(function(){
		
		var rowId = $(this).attr('id');	
		var documentRowId = rowId.replace("savedDocumentRow", "");
		var savedPrice = roundOff2Decimal($('#savedDocumentRow'+documentRowId).find('td').eq(3).html().replaceAll(",", ""));

		price = parseFloat(price) + parseFloat(savedPrice);

		
	});
	$('#totalPayable').html(formatMoney(roundOff2Decimal(price)));
}

function getPriceByDocumentRequestTypeId(documentRequestTypeId){
	var price = 0;
	
	if(documentRequestTypeId > 0){
		$.ajax({			
			type: 'POST',
			url: "getPriceByDocumentRequestTypeId.htm",
			data: {documentRequestTypeId: documentRequestTypeId},
			async: false,
			success: function(result){
				
				if(result.id > 0){
					price =result.price;
					
					var breakdown = result.breakdown.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');

					$('#documentBreakdownSpan').html("<span style='color:gray;size:5px'>("+breakdown+")</span>");
				}
				
			 			
			},
			error: function(request, status, error){
				//alert(request.responseText);
				alert("Error: "+error);
			}
			  
		});
		
	}
	return price;
}
         
function getPriceByDocumentRequestTypeIdEdit(rowId){

	var documentRequestTypeId = $('#editDocumentRequestTypeId'+rowId).val();
	$('#savedDocumentRow'+rowId).find('td').eq(3).html('');
	$('#savedDocumentRow'+rowId).find('td').eq(4).html('');
	if(documentRequestTypeId > 0){
		$.ajax({			
			type: 'POST',
			url: "getPriceByDocumentRequestTypeId.htm",
			data: {documentRequestTypeId: documentRequestTypeId},
			async: false,
			success: function(result){
				
				if(result.id > 0){
					var price = roundOff2Decimal(result.price) * $('#editQuantity'+rowId).val();

					$('#savedDocumentRow'+rowId).find('td').eq(3).append(formatMoney(roundOff2Decimal(price)));
					$('#savedDocumentRow'+rowId).find('td').eq(4).append(result.breakdown);
				}
				
			 			
			},
			error: function(request, status, error){
				//alert(request.responseText);
				alert("Error: "+error);
			}
			  
		});
		
	}
	
	var price = roundOff2Decimal(getPriceByDocumentRequestTypeId($('#documentRequestTypeId').val())) * $('#quantity').val();
	
	$('#documentRow').find('td').eq(3).html(formatMoney(roundOff2Decimal(price)));
	
	$($("tr[id^='savedDocumentRow']")).each(function(){
		
		var rowId = $(this).attr('id');	
		var documentRowId = rowId.replace("savedDocumentRow", "");
		var savedPrice = roundOff2Decimal($('#savedDocumentRow'+documentRowId).find('td').eq(3).html().replaceAll(",", ""));

		price = parseFloat(price) + parseFloat(savedPrice);

		
	});
	$('#totalPayable').html(formatMoney(roundOff2Decimal(price)));
}

function addDocumentRequirementsButton(rowId){
	
	var documentRequirementsRowId = rowId.replace("addDocumentRequirementsButton", "");
	var documentName = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentName').val();
	var documentFile = $('#documentRequestRequirementsForms'+documentRequirementsRowId+'documentFile').val();
	if(documentName!='' && documentFile!=''){
		documentRequirementsCount++;
		                       
		var newRow  = "<tr id='savedDocumentRequirementsRow"+documentRequirementsCount +"' >";
		newRow += "<td><input type='text' maxLength='200' placeholder='Document Name' id='documentRequestRequirementsForms"+documentRequirementsCount+"documentName' name='documentRequestRequirementsForms["+documentRequirementsCount+"].documentName' onkeypress='return isAlphaNum(event)'/></td>";
		newRow += "<td><input type='file' maxLength='200' id='documentRequestRequirementsForms"+documentRequirementsCount+"documentFile' name='documentRequestRequirementsForms["+documentRequirementsCount+"].documentFile' onchange='validateFileType(this.id)'/></td>";
		
		newRow += "<td>";
		newRow += "<input type='button' class='action_link' value='Add' align='left' id='addDocumentRequirementsButton"+documentRequirementsCount+"' onclick='addDocumentRequirementsButton(this.id)'/>";
		
		newRow += "</td>";
		
		newRow  += "</tr>";

		$('#documentRequirementsTable').append(newRow);
		$('#savedDocumentRequirementsRow'+documentRequirementsRowId).find('td').eq(2).html('');
		$('#savedDocumentRequirementsRow'+documentRequirementsRowId).find('td').eq(2).append("<input type='button' class='action_link' value='Delete' align='left' id='deleteDocumentRequirementsButton"+documentRequirementsRowId+"' onclick='deleteDocumentRequirementsButton("+documentRequirementsRowId+")'/>");

	
	}else{

		var errorMsg = '* Document Name and File Fields are required.';
		
		$('#formError').html(errorMsg);
		var modal = document.getElementById("errorModal");
		modal.style.display = "block";
		return false;
	}
}


function deleteDocumentRequirementsButton(buttonId){
	$("#documentRequirementsTable tr[id=savedDocumentRequirementsRow" + buttonId + "]").remove();
}


function showvalidationPopup(){
	enableOpaqueBackground();
	
	$('#studentNoSpan').html($('#studentNo').val());
	$('#studentNameSpan').html($('#lastname').val()+", "+$('#firstname').val()+" "+$('#middlename').val());
	$('#dateOfBirthSpan').html($('#dateOfBirth').val());
	$('#palceOfBirthSpan').html($('#birthPlace').val());
	$('#genderSpan').html($('#gender :selected').text());
	$('#fatherNameSpan').html($('#fatherLastname').val()+", "+$('#fatherFirstname').val()+" "+$('#fatherMiddlename').val());
	$('#motherNameSpan').html($('#motherLastname').val()+", "+$('#motherFirstname').val()+" "+$('#motherMiddlename').val());
	$('#presentAddressSpan').html($('#presentAddressBldgNo').val()+" "+$('#presentAddressStreetName').val()
			+" "+$('#presentAddressCity').val()+" "+$('#presentAddressProvince').val()+" "+$('#presentAddressCountry').val()
			+" "+$('#presentAddressZipCode').val());
	
	$('#permanentAddressSpan').html($('#permanentAddressBldgNo').val()+" "+$('#permanentAddressStreetName').val()
			+" "+$('#permanentAddressCity').val()+" "+$('#permanentAddressProvince').val()+" "+$('#permanentAddressCountry').val()
			+" "+$('#permanentAddressZipCode').val());
	$('#contactNoSpan').html($('#contactNo').val());
	$('#emailAdSpan').html($('#emailAd').val());
	$('#inclusiveYearSpan').html($('#yearFrom').val()+" to "+$('#yearTo').val());

	$('#claimingOptionsTd').html('');
	
	var radioValue = $("input[name='isForDelivery']:checked").val();
	
	if(radioValue == '0'){
		
		$('#claimingOptionsTd').html('Pick-up');
	}else{
		
		$('#addresseeSpan').html($('#addressee').val());
		$('#addresseeContactNoSpan').html($('#addresseeContactNo').val());
		
		var documentItems = "<span>";
		documentItems += "Delivery<br>";
		documentItems += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
		documentItems += "Mailing Address : "+$('#mailingAddressBldgNo').val()+" "+$('#mailingAddressStreetName').val()
		+" "+$('#mailingAddressCity').val()+" "+$('#mailingAddressProvince').val()+" "+$('#mailingAddressCountry').val()
		+" "+$('#mailingAddressZipCode').val();
		documentItems  += "</span>";
		$('#claimingOptionsTd').append(documentItems);
		
		
	}
	
	$('#documentsTableSpan tr:not(:first)').remove();
	
	$($("tr[id^='savedDocumentRow']")).each(function(){
		
		var rowId = $(this).attr('id');	
		var documentRowId = rowId.replace("savedDocumentRow", "");
		var documentRequestTypeName = $('#savedDocumentRow'+documentRowId).find('td').eq(0).html();
		var purpose = $('#savedDocumentRow'+documentRowId).find('td').eq(1).html();
		var quantity = $('#savedDocumentRow'+documentRowId).find('td').eq(2).html();
		var price = $('#savedDocumentRow'+documentRowId).find('td').eq(3).html();
		var breakdown = $('#savedDocumentRow'+documentRowId).find('td').eq(4).html();
		
		var documentItems = "<tr>";
		documentItems += "<td>"+documentRequestTypeName+"</td>";
		documentItems += "<td>"+purpose+"</td>";
		documentItems += "<td>"+quantity+"</td>";
		documentItems += "<td>"+price+"</td>";
		documentItems += "<td>"+breakdown+"</td>";
		documentItems  += "</tr>";
		
		$('#documentsTableSpan').append(documentItems);
	});
	
	var documentItems = "<tr style='border-bottom: double'>";
	documentItems += "<td colspan='100%'></td>";
	documentItems += "</tr>";
	
	documentItems += "<tr>";
	documentItems += "<td>Total Charge</td>";
	documentItems += "<td></td>";
	documentItems += "<td></td>";
	documentItems += "<td><b><span style='color:blue'>"+$('#totalPayable').html()+"</span></b></td>";
	documentItems += "<td></td>";
	documentItems  += "</tr>";

	$('#documentsTableSpan').append(documentItems);
	
//	showPopup('popupValidationForm');
//	$('#popupValidationForm').animate({scrollTop : 0},800);
	
	var modal = document.getElementById("validationFormModal");
	modal.style.display = "block";
}

function getDocumentRequestTypeByCategoryId(){
	
	
	$('#documentRequestTypeId').empty();
	$('#documentRequestTypeId').append($('<option></option>').attr('value','').html(''));	
	$.ajax({			
		type: 'POST',
		url: "getDocumentRequestTypeByCategoryId.htm",
		data: {documentRequestTypeCategoryId: $('#documentRequestTypeCategoryId').val()},
		async: false,
		success: function(result){
			
			$.each(result,function(id,documentRequestType){
				$('#documentRequestTypeId').append($('<option></option>').attr('value',documentRequestType.id).html(documentRequestType.name));	
				
			});
			
			$('#documentRequestTypeId').val('');	
			$('#purpose').val('');
			$('#quantity').val('');
			$('#documentPriceSpan').html('');
			$('#documentBreakdownSpan').html('');
			
			$("#documentTable tr[id^=savedDocumentRow]").remove();
			$('#totalPayable').html('');
		},
		error: function(request, status, error){
			//alert(request.responseText);
			alert("Error: "+error);
		}
		  
	});
}

function changeDeliveryOption(){
	var radioValue = $("input[name='isForDelivery']:checked").val();
	
	if(radioValue == '0'){
		
		$('#addressee').val('');	
		$('#addressee').attr('disabled','true');
		
		$('#addresseeContactNo').val('');	
		$('#addresseeContactNo').attr('disabled','true'); 
		
		$('#mailingAddressBldgNo').val('');	
		$('#mailingAddressBldgNo').attr('disabled','true');
		
		$('#mailingAddressStreetName').val('');	
		$('#mailingAddressStreetName').attr('disabled','true');
		
		$('#mailingAddressCity').val('');	
		$('#mailingAddressCity').attr('disabled','true');
		
		$('#mailingAddressProvince').val('');	
		$('#mailingAddressProvince').attr('disabled','true');
		
		$('#mailingAddressCountry').val('');	
		$('#mailingAddressCountry').attr('disabled','true');
		
		$('#mailingAddressZipCode').val('');	
		$('#mailingAddressZipCode').attr('disabled','true');
		
		$('#sameMailingAddress').attr('disabled','true');
		$('#sameMailingAddress').attr('checked',false);
	}else{
		$('#addressee').removeAttr('disabled');
		$('#addresseeContactNo').removeAttr('disabled');
		$('#mailingAddressBldgNo').removeAttr('disabled');
		$('#mailingAddressStreetName').removeAttr('disabled');
		$('#mailingAddressCity').removeAttr('disabled');
		$('#mailingAddressProvince').removeAttr('disabled');
		$('#mailingAddressCountry').removeAttr('disabled');
		$('#mailingAddressZipCode').removeAttr('disabled');
		$('#sameMailingAddress').removeAttr('disabled');
	}

}

function validateFileType(id){

    var val = $('#'+id).val();
    
    switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()){
        case 'gif': case 'jpg': case 'png': case 'PNG': case 'JPG': case 'JPEG': case 'jpeg':
            break;
        default:
        	$('#'+id).val('');
	        var errorMsg = '* Invalid File format. Kindly upload PNG, JPG or JPEG files only.';
			
			$('#formError').html(errorMsg);
			var modal = document.getElementById("errorModal");
			modal.style.display = "block";
			
            break;
    }
}



