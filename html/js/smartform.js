<!-- SmartForms JavaScript -->
var sfcc$ = {};
sf$.doSetup=false;
sfjq$(document).ready(function() {
/* Required value - you will be issued a security token ID */
sf$.token="114741";

/* set to false after a successful configuration */
sf$.showSmartFormAlerts=false;
sf$.showCriticalAlerts=false;

/* Visible Input field ID mapping for end user company input data */
sf$.firstNameFieldAlias="FirstName";
sf$.lastNameFieldAlias="LastName";
sf$.emailFieldAlias="Email";
sf$.phoneFieldAlias="Phone";
sf$.companyNameFieldAlias="Company";
sf$.stateFieldAlias="State";
sf$.countryFieldAlias="Country";

/* Optional mappings: Hidden field ID mappings for MATCHED SITE company append data */
sf$.mCityFieldAlias="RF_SITE_City__c";
sf$.mCountryFieldAlias="RF_SITE_Country__c";
sf$.mPhoneFieldAlias="RF_SITE_Phone__c";
sf$.mSicNameFieldAlias="RF_SITE_SicName__c";
sf$.mStateCodeFieldAlias="RF_SITE_StateCode__c";
sf$.mUrlFieldAlias="RF_SITE_URL__c";
sf$.mZipFieldAlias="RF_SITE_Zip__c";
sf$.mNaicsNameFieldAlias="RF_SITE_NAICSName__c";

/* Optional mappings: Hidden field ID mappings for HEADQUARTER company append data */
sf$.hqCompanyNameFieldAlias="RF_HQ_Company__c";
sf$.hqCityFieldAlias="RF_HQ_City__c";
sf$.hqZipFieldAlias="RF_HQ_Zip__c";
sf$.hqCountryFieldAlias="RF_HQ_Country__c";
sf$.hqPhoneFieldAlias="RF_HQ_Phone__c";
sf$.hqStateCodeFieldAlias="RF_HQ_StateCode__c";
sf$.hqSicNameFieldAlias="RF_HQ_SicName__c";

/* Socially inferred data */
sf$.inferredIndustryFieldAlias="RF_inferredIndustry__c";

/* Required mappings: */
sf$.confidenceLevelFieldAlias="RF_ConfidenceLevel__c"; /* Field ID to hold the confidence level of a company match */

/* Optional hover color */
sf$.selectListHoverColor="#c60c30";

/* Marketo SmartForms Submit */
  sfcc$.checkFormExist = setInterval(function() {
          if (typeof sf$.grabInputID(sf$.companyNameFieldAlias) != 'undefined' && sfjq$("#" + sf$.grabInputID(sf$.companyNameFieldAlias)).length) {
              sfcc$.formID=sfjq$("input[name=formid]").val();

              if (typeof Mkto === "object" && typeof Mkto.formSubmit === "function") {
                  /* Mkto Forms 1.0 submit injection */
                  sf$.smartFormID="mktForm_" + sfcc$.formID;
                  sf$.overrideSubmit=true;
              } else {
                  /* Mkto Forms 2.0 submit injection */
                  sf$.smartFormID="mktoForm_" + sfcc$.formID;
                  sf$.overrideSubmit=false;
              }

              sf$.assignIDsByName=true;
              sf$.doSetup=true;
              sf$.runSFSetup();

              if (!sf$.overrideSubmit) {
                  sfcc$.doAppend=true;
                  sfcc$.form=MktoForms2.getForm(sfcc$.formID);
                  sfcc$.form.onSubmit(function() {
                      if (typeof sf$.forceSelection === "function" && sfcc$.doAppend && sf$.formCheck()) {
                            
                          sfcc$.form.submitable(false)
                          sfcc$.doAppend = false;
                          sf$.forceSelection();
                          return false;
                      }
                      /* return true to allow submit when SF submit injection completes - submit request initiated with sf$.doSmartFormSubmit() */
                      return true;
                  });

                  /* override sf$.doSmartFormSubmit() so that we force an original form submit, not a scripted form.submit() */
                  sf$.doSmartFormSubmit = function() {
                      sfcc$.form.submitable(true);
                      sfjq$("#"+sf$.smartFormID+" :submit").removeAttr("disabled").click();
                  };
              }

              clearInterval(sfcc$.checkFormExist);
          }
      }, 100);
  });
