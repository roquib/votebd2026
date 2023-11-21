var path = require('path');
var PHPUnserialize = require('php-unserialize');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


function IsNumeric(input) {
  return (input - 0) == input && ('' + input).trim().length > 0;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////MERGE profiles_17c (income tax)////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//oldds.connector.query("SELECT * FROM profiles_17c WHERE candidate_id<>0 AND publish='publish' limit 0,8000", '', function (err, rows, fields) {
//  if (err) {
//    console.log(err);
//    throw err;
//  }
//
//  console.log(rows.length);
//  //console.log(rows);
//
//  var iter = 1;
//  if (rows.length) {
//    var comitbefore = {};
//    var arr = [];
//    var arr2 = [];
//    rows.forEach(function (eachRow) {
//      console.log("updating person: ", eachRow.person_id, " ,CandidateId: ", eachRow.candidate_id, " ,IncomeTaxId: ", eachRow.PROFILE_ID);
//      //console.log(eachRow);
//      var candidateTR = {};
//      candidateTR.oldIncomeTaxId = eachRow.PROFILE_ID;
//      candidateTR.statusTR = true;
//
//      //general info
//      if(eachRow.TIN)
//      candidateTR.TIN_TR= eachRow.TIN;
//      if(eachRow.utin_number)
//      candidateTR.UTIN_TR= eachRow.utin_number;
//      if(eachRow.national_id_number)
//      candidateTR.NIDNumberTR= eachRow.national_id_number;
//      if(eachRow.VAT_NUMBER)
//      candidateTR.VATNumberTR= eachRow.VAT_NUMBER;
//      if(eachRow.NAME)
//      candidateTR.taxPayerNameTR= eachRow.NAME;
//
//      var dignityTR = eachRow.DIGNITY.split('##');
//      var newDignityTR = {};
//
//      for(i=0;i<dignityTR.length;i++){
//        if(dignityTR[i]=='person' || dignityTR[i]=='company' || dignityTR[i]=='farm' || dignityTR[i]=='natural_law' || dignityTR[i]=='person_org')
//        newDignityTR[dignityTR[i]]= true;
//      }
//
//      if(Object.keys(newDignityTR).length){
//        candidateTR.dignityTR=newDignityTR;
//      }
//
//      if(eachRow.CIRCLE)
//      candidateTR.circleTR= eachRow.CIRCLE;
//      if(eachRow.AREA)
//      candidateTR.taxAreaTR= eachRow.AREA;
//      if(eachRow.TAX_YEAR)
//      candidateTR.taxYearBnTR= eachRow.TAX_YEAR;
//      if(eachRow.BUSINESS_NAME)
//      candidateTR.businessNameTR= eachRow.BUSINESS_NAME;
//      if(eachRow.SPOUSE_NAME)
//      candidateTR.husbandSpouseNameTR= eachRow.SPOUSE_NAME;
//      if(eachRow.FATHERS_NAME)
//      candidateTR.fatherNameTR= eachRow.FATHERS_NAME;
//      if(eachRow.MOTHERS_NAME)
//      candidateTR.motherNameTR= eachRow.MOTHERS_NAME;
//      if(eachRow.BIRTH_DATE)
//      candidateTR.dobOldTR= eachRow.BIRTH_DATE;
//      if(eachRow.ADDRESS_PRESENT)
//      candidateTR.presentAddressTR= eachRow.ADDRESS_PRESENT;
//      if(eachRow.ADDRESS_PAR)
//      candidateTR.permanentAddressTR= eachRow.ADDRESS_PAR;
//      if(eachRow.is_new_flag)
//      candidateTR.isNewFlagTR= true;
//      if(eachRow.taxfill_type)
//      candidateTR.taxfillTypeTR= eachRow.taxfill_type;
//
//      if(eachRow.LOCALITIY)
//      candidateTR.localityTR= eachRow.LOCALITIY;
//
//      if(eachRow.PHONE_NUM_OFFICE)
//      candidateTR.phoneOfficeTR= eachRow.PHONE_NUM_OFFICE;
//      if(eachRow.PHONE_NUM_RS)
//      candidateTR.phoneResidenceTR= eachRow.PHONE_NUM_RS;
//
//      //console.log(candidateTR);
//
//      app.models.candidate.updateAll({oldId: eachRow.candidate_id}, candidateTR, function (errr, info) {
//        if (errr)
//          throw errr;
//
//        console.log(info, iter++);
//      });
//
//    })
//  }
//
//
//  //oldds.disconnect();
//});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////MERGE profiles_17c2 (income tax - income)////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//oldds.connector.query("SELECT c2.*,c.publish,c.candidate_id FROM profiles_17c2 c2 LEFT JOIN profiles_17c c ON c2.PROFILE_ID=c.PROFILE_ID WHERE c.candidate_id<>0 AND c.publish='publish' limit 0,8000", '', function (err, rows, fields) {
////oldds.connector.query("SELECT * FROM profiles_17c  limit 0,40", '', function (err, rows, fields) {
//  if (err) {
//    console.log(err);
//    throw err;
//  }
//
//  console.log(rows.length);
//  //console.log(rows);
//
//  var iter = 1;
//  if (rows.length) {
//    var comitbefore = {};
//    var arr = [];
//    var arr2 = [];
//    rows.forEach(function (eachRow) {
//      console.log("updating person: ", eachRow.person_id, " ,CandidateId: ", eachRow.candidate_id, " ,IncomeTaxId: ", eachRow.PROFILE_ID);
//      //console.log(eachRow);
//      var candidateTR = {};
//      candidateTR.oldIncomeTaxId = eachRow.PROFILE_ID;
//      candidateTR.statusTR = true;
//
//      ////income detail
//      candidateTR.endDateOldTR= eachRow.END_DATE;
//      //candidateTR.endDateTR= eachRow.;
//      //candidateTR.endDateTimestampTR= eachRow.;
//      candidateTR._1SalaryTR= Number(eachRow.SALARY);
//      candidateTR._2SecurityTR= Number(eachRow.SECURITY);
//      candidateTR._3HouseIncomeTR= Number(eachRow.HOUSE_INCOME);
//      candidateTR._4AgriIncomeTR= Number(eachRow.AGRI_INCOME);
//      candidateTR._5BusinessIncomeTR= Number(eachRow.BUSINESS_INCOME);
//      candidateTR._6FirmIncomeTR= Number(eachRow.FARM);
//      candidateTR._7HusbandWifeSonIncomeTR= Number(eachRow.SON_INCOME);
//      candidateTR._8CapitalProfitTR= Number(eachRow.CAPITAL);
//      candidateTR._9OtherSourceIncomeTR= Number(eachRow.OTHERS_INCOME);
//
//      candidateTR._10_1to9TotalTR= Number(eachRow.SALARY)+Number(eachRow.SECURITY)+Number(eachRow.HOUSE_INCOME)+Number(eachRow.AGRI_INCOME)+Number(eachRow.BUSINESS_INCOME)+Number(eachRow.FARM)+Number(eachRow.SON_INCOME)+Number(eachRow.CAPITAL)+Number(eachRow.OTHERS_INCOME);
//
//      candidateTR._11ForeignIncomeTR= Number(eachRow.OUT_INCOME);
//
//      candidateTR._12_10to11_totalTR= Number(candidateTR._10_1to9TotalTR)+Number(eachRow.OUT_INCOME);
//
//      candidateTR._13ApplicableTaxTR= Number(eachRow.TAX);
//      candidateTR._14TaxCommissionTR= Number(eachRow.TAX_COMMISION);
//
//      candidateTR._15_13_sub_14_givenTaxTR= Number(eachRow.TAX)-Number(eachRow.TAX_COMMISION);
//
//      candidateTR._16_aReducedTaxTR= Number(eachRow.REDUCED_TAX);
//      candidateTR._16_bAdvancedTaxTR= Number(eachRow.ADVANCED_TAX);
//      candidateTR._16_cGivenTaxTR= Number(eachRow.GIVEN_TAX);
//      candidateTR._16_dBalanceTaxTR= Number(eachRow.BALANCE_TAX);
//
//      candidateTR._16_abcdTotalTR= Number(eachRow.REDUCED_TAX)+Number(eachRow.ADVANCED_TAX)+Number(eachRow.GIVEN_TAX)+Number(eachRow.BALANCE_TAX);
//
//      candidateTR._17_sub_15_16_abcdTotalTR= Number(candidateTR._15_13_sub_14_givenTaxTR)-Number(candidateTR._16_abcdTotalTR);
//
//      candidateTR._18_honorTaxTR= Number(eachRow.HONUR_TAX);
//      candidateTR._19_previousTaxTR= Number(eachRow.PREVIOUS_TAX);
//
//      app.models.candidate.updateAll({oldId: eachRow.candidate_id}, candidateTR, function (errr, info) {
//        if (errr)
//          throw errr;
//
//        console.log(info, iter++);
//      });
//
//    })
//  }
//
//
//  //oldds.disconnect();
//});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////MERGE profiles_17c3 (income tax - salary property investment)////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//oldds.connector.query("SELECT c3.*,c.publish,c.candidate_id FROM profiles_17c3 c3 LEFT JOIN profiles_17c c ON c3.PROFILE_ID=c.PROFILE_ID WHERE c.candidate_id<>0 AND c.publish='publish' limit 0,8000", '', function (err, rows, fields) {
////oldds.connector.query("SELECT * FROM profiles_17c  limit 0,40", '', function (err, rows, fields) {
//  if (err) {
//    console.log(err);
//    throw err;
//  }
//
//  console.log(rows.length);
//  //console.log(rows);
//
//  var iter = 1;
//  if (rows.length) {
//    var comitbefore = {};
//    var arr = [];
//    var arr2 = [];
//    rows.forEach(function (eachRow) {
//      //console.log("updating person: ", eachRow.person_id, " ,CandidateId: ", eachRow.candidate_id, " ,IncomeTaxId: ", eachRow.PROFILE_ID);
//      //console.log(eachRow);
//      var candidateTR = {};
//      candidateTR.oldIncomeTaxId = eachRow.PROFILE_ID;
//      candidateTR.statusTR = true;
//
//      //_1BasicSalaryTR
//      var _1BasicSalaryTR = eachRow.BASIC_SALARY.split('##'),_1BasicSalaryTR_Income=0,_1BasicSalaryTR_ReduceIncome=0;
//      if(Number(_1BasicSalaryTR[0]))
//        _1BasicSalaryTR_Income=Number(_1BasicSalaryTR[0]);
//      if(Number(_1BasicSalaryTR[1]))
//        _1BasicSalaryTR_ReduceIncome=Number(_1BasicSalaryTR[1]);
//      if(_1BasicSalaryTR_Income || _1BasicSalaryTR_ReduceIncome){
//        candidateTR._1BasicSalaryTR={};
//        candidateTR._1BasicSalaryTR.income=_1BasicSalaryTR_Income;
//        candidateTR._1BasicSalaryTR.reduceIncome=_1BasicSalaryTR_ReduceIncome;
//        candidateTR._1BasicSalaryTR.netIncome=_1BasicSalaryTR_Income-_1BasicSalaryTR_ReduceIncome;
//      }
//
//      //_1SpecialSalaryTR
//      var _1SpecialSalaryTR = eachRow.SPECIAL_SALARY.split('##'),_1SpecialSalaryTR_Income=0,_1SpecialSalaryTR_ReduceIncome=0;
//      if(Number(_1SpecialSalaryTR[0]))
//        _1SpecialSalaryTR_Income=Number(_1SpecialSalaryTR[0]);
//      if(Number(_1SpecialSalaryTR[1]))
//        _1SpecialSalaryTR_ReduceIncome=Number(_1SpecialSalaryTR[1]);
//      if(_1SpecialSalaryTR_Income || _1SpecialSalaryTR_ReduceIncome){
//        candidateTR._1SpecialSalaryTR={};
//        candidateTR._1SpecialSalaryTR.income=_1SpecialSalaryTR_Income;
//        candidateTR._1SpecialSalaryTR.reduceIncome=_1SpecialSalaryTR_ReduceIncome;
//        candidateTR._1SpecialSalaryTR.netIncome=_1SpecialSalaryTR_Income-_1SpecialSalaryTR_ReduceIncome;
//      }
//
//      //_1CommissionTR
//      var _1CommissionTR = eachRow.COMMISION.split('##'),_1CommissionTR_Income=0,_1CommissionTR_ReduceIncome=0;
//      if(Number(_1CommissionTR[0]))
//        _1CommissionTR_Income=Number(_1CommissionTR[0]);
//      if(Number(_1CommissionTR[1]))
//        _1CommissionTR_ReduceIncome=Number(_1CommissionTR[1]);
//      if(_1CommissionTR_Income || _1CommissionTR_ReduceIncome){
//        candidateTR._1CommissionTR={};
//        candidateTR._1CommissionTR.income=_1CommissionTR_Income;
//        candidateTR._1CommissionTR.reduceIncome=_1CommissionTR_ReduceIncome;
//        candidateTR._1CommissionTR.netIncome=_1CommissionTR_Income-_1CommissionTR_ReduceIncome;
//      }
//
//      //_1TransportTR
//      var _1TransportTR = eachRow.TRANSPORT.split('##'),_1TransportTR_Income=0,_1TransportTR_ReduceIncome=0;
//      if(Number(_1TransportTR[0]))
//        _1TransportTR_Income=Number(_1TransportTR[0]);
//      if(Number(_1TransportTR[1]))
//        _1TransportTR_ReduceIncome=Number(_1TransportTR[1]);
//      if(_1TransportTR_Income || _1TransportTR_ReduceIncome){
//        candidateTR._1TransportTR={};
//        candidateTR._1TransportTR.income=_1TransportTR_Income;
//        candidateTR._1TransportTR.reduceIncome=_1TransportTR_ReduceIncome;
//        candidateTR._1TransportTR.netIncome=_1TransportTR_Income-_1TransportTR_ReduceIncome;
//      }
//
//      //_1HouseRentTR
//      var _1HouseRentTR = eachRow.HOUSE_RENT.split('##'),_1HouseRentTR_Income=0,_1HouseRentTR_ReduceIncome=0;
//      if(Number(_1HouseRentTR[0]))
//        _1HouseRentTR_Income=Number(_1HouseRentTR[0]);
//      if(Number(_1HouseRentTR[1]))
//        _1HouseRentTR_ReduceIncome=Number(_1HouseRentTR[1]);
//      if(_1HouseRentTR_Income || _1HouseRentTR_ReduceIncome){
//        candidateTR._1HouseRentTR={};
//        candidateTR._1HouseRentTR.income=_1HouseRentTR_Income;
//        candidateTR._1HouseRentTR.reduceIncome=_1HouseRentTR_ReduceIncome;
//        candidateTR._1HouseRentTR.netIncome=_1HouseRentTR_Income-_1HouseRentTR_ReduceIncome;
//      }
//
//      //_1TreatmentTR
//      var _1TreatmentTR = eachRow.TREATMENT.split('##'),_1TreatmentTR_Income=0,_1TreatmentTR_ReduceIncome=0;
//      if(Number(_1TreatmentTR[0]))
//        _1TreatmentTR_Income=Number(_1TreatmentTR[0]);
//      if(Number(_1TreatmentTR[1]))
//        _1TreatmentTR_ReduceIncome=Number(_1TreatmentTR[1]);
//      if(_1TreatmentTR_Income || _1TreatmentTR_ReduceIncome){
//        candidateTR._1TreatmentTR={};
//        candidateTR._1TreatmentTR.income=_1TreatmentTR_Income;
//        candidateTR._1TreatmentTR.reduceIncome=_1TreatmentTR_ReduceIncome;
//        candidateTR._1TreatmentTR.netIncome=_1TreatmentTR_Income-_1TreatmentTR_ReduceIncome;
//      }
//
//      //_1BoyTR
//      var _1BoyTR = eachRow.BOY.split('##'),_1BoyTR_Income=0,_1BoyTR_ReduceIncome=0;
//      if(Number(_1BoyTR[0]))
//        _1BoyTR_Income=Number(_1BoyTR[0]);
//      if(Number(_1BoyTR[1]))
//        _1BoyTR_ReduceIncome=Number(_1BoyTR[1]);
//      if(_1BoyTR_Income || _1BoyTR_ReduceIncome){
//        candidateTR._1BoyTR={};
//        candidateTR._1BoyTR.income=_1BoyTR_Income;
//        candidateTR._1BoyTR.reduceIncome=_1BoyTR_ReduceIncome;
//        candidateTR._1BoyTR.netIncome=_1BoyTR_Income-_1BoyTR_ReduceIncome;
//      }
//
//      //_1LeaveTR
//      var _1LeaveTR = eachRow.LEAVE.split('##'),_1LeaveTR_Income=0,_1LeaveTR_ReduceIncome=0;
//      if(Number(_1LeaveTR[0]))
//        _1LeaveTR_Income=Number(_1LeaveTR[0]);
//      if(Number(_1LeaveTR[1]))
//        _1LeaveTR_ReduceIncome=Number(_1LeaveTR[1]);
//      if(_1LeaveTR_Income || _1LeaveTR_ReduceIncome){
//        candidateTR._1LeaveTR={};
//        candidateTR._1LeaveTR.income=_1LeaveTR_Income;
//        candidateTR._1LeaveTR.reduceIncome=_1LeaveTR_ReduceIncome;
//        candidateTR._1LeaveTR.netIncome=_1LeaveTR_Income-_1LeaveTR_ReduceIncome;
//      }
//
//      //_1HonurTR
//      var _1HonurTR = eachRow.HONUR.split('##'),_1HonurTR_Income=0,_1HonurTR_ReduceIncome=0;
//      if(Number(_1HonurTR[0]))
//        _1HonurTR_Income=Number(_1HonurTR[0]);
//      if(Number(_1HonurTR[1]))
//        _1HonurTR_ReduceIncome=Number(_1HonurTR[1]);
//      if(_1HonurTR_Income || _1HonurTR_ReduceIncome){
//        candidateTR._1HonurTR={};
//        candidateTR._1HonurTR.income=_1HonurTR_Income;
//        candidateTR._1HonurTR.reduceIncome=_1HonurTR_ReduceIncome;
//        candidateTR._1HonurTR.netIncome=_1HonurTR_Income-_1HonurTR_ReduceIncome;
//      }
//
//      //_1OvertimeTR
//      var _1OvertimeTR = eachRow.OVERTIME.split('##'),_1OvertimeTR_Income=0,_1OvertimeTR_ReduceIncome=0;
//      if(Number(_1OvertimeTR[0]))
//        _1OvertimeTR_Income=Number(_1OvertimeTR[0]);
//      if(Number(_1OvertimeTR[1]))
//        _1OvertimeTR_ReduceIncome=Number(_1OvertimeTR[1]);
//      if(_1OvertimeTR_Income || _1OvertimeTR_ReduceIncome){
//        candidateTR._1OvertimeTR={};
//        candidateTR._1OvertimeTR.income=_1OvertimeTR_Income;
//        candidateTR._1OvertimeTR.reduceIncome=_1OvertimeTR_ReduceIncome;
//        candidateTR._1OvertimeTR.netIncome=_1OvertimeTR_Income-_1OvertimeTR_ReduceIncome;
//      }
//
//      //_1BonusTR
//      var _1BonusTR = eachRow.BONUS.split('##'),_1BonusTR_Income=0,_1BonusTR_ReduceIncome=0;
//      if(Number(_1BonusTR[0]))
//        _1BonusTR_Income=Number(_1BonusTR[0]);
//      if(Number(_1BonusTR[1]))
//        _1BonusTR_ReduceIncome=Number(_1BonusTR[1]);
//      if(_1BonusTR_Income || _1BonusTR_ReduceIncome){
//        candidateTR._1BonusTR={};
//        candidateTR._1BonusTR.income=_1BonusTR_Income;
//        candidateTR._1BonusTR.reduceIncome=_1BonusTR_ReduceIncome;
//        candidateTR._1BonusTR.netIncome=_1BonusTR_Income-_1BonusTR_ReduceIncome;
//      }
//
//      //_1OtherAllowanceTR = other_allowance other_allowance_discount
//      var _1OtherAllowanceTR = eachRow.BASIC_SALARY.split('##'),_1OtherAllowanceTR_Income=0,_1OtherAllowanceTR_ReduceIncome=0;
//      if(Number(_1OtherAllowanceTR[0]))
//        _1OtherAllowanceTR_Income=Number(_1OtherAllowanceTR[0]);
//      if(Number(_1OtherAllowanceTR[1]))
//        _1OtherAllowanceTR_ReduceIncome=Number(_1OtherAllowanceTR[1]);
//      if(_1OtherAllowanceTR_Income || _1OtherAllowanceTR_ReduceIncome){
//        candidateTR._1OtherAllowanceTR={};
//        candidateTR._1OtherAllowanceTR.income=_1OtherAllowanceTR_Income;
//        candidateTR._1OtherAllowanceTR.reduceIncome=_1OtherAllowanceTR_ReduceIncome;
//        candidateTR._1OtherAllowanceTR.netIncome=_1OtherAllowanceTR_Income-_1OtherAllowanceTR_ReduceIncome;
//      }
//
//      //_1FutureTollTR
//      var _1FutureTollTR = eachRow.FUTURE_TOLL.split('##'),_1FutureTollTR_Income=0,_1FutureTollTR_ReduceIncome=0;
//      if(Number(_1FutureTollTR[0]))
//        _1FutureTollTR_Income=Number(_1FutureTollTR[0]);
//      if(Number(_1FutureTollTR[1]))
//        _1FutureTollTR_ReduceIncome=Number(_1FutureTollTR[1]);
//      if(_1FutureTollTR_Income || _1FutureTollTR_ReduceIncome){
//        candidateTR._1FutureTollTR={};
//        candidateTR._1FutureTollTR.income=_1FutureTollTR_Income;
//        candidateTR._1FutureTollTR.reduceIncome=_1FutureTollTR_ReduceIncome;
//        candidateTR._1FutureTollTR.netIncome=_1FutureTollTR_Income-_1FutureTollTR_ReduceIncome;
//      }
//
//      //_1FutureInterestTR
//      var _1FutureInterestTR = eachRow.FUTURE_PROFIT.split('##'),_1FutureInterestTR_Income=0,_1FutureInterestTR_ReduceIncome=0;
//      if(Number(_1FutureInterestTR[0]))
//        _1FutureInterestTR_Income=Number(_1FutureInterestTR[0]);
//      if(Number(_1FutureInterestTR[1]))
//        _1FutureInterestTR_ReduceIncome=Number(_1FutureInterestTR[1]);
//      if(_1FutureInterestTR_Income || _1FutureInterestTR_ReduceIncome){
//        candidateTR._1FutureInterestTR={};
//        candidateTR._1FutureInterestTR.income=_1FutureInterestTR_Income;
//        candidateTR._1FutureInterestTR.reduceIncome=_1FutureInterestTR_ReduceIncome;
//        candidateTR._1FutureInterestTR.netIncome=_1FutureInterestTR_Income-_1FutureInterestTR_ReduceIncome;
//      }
//
//      //_1VehicleTR
//      var _1VehicleTR = eachRow.INCOME.split('##'),_1VehicleTR_Income=0,_1VehicleTR_ReduceIncome=0;
//      if(Number(_1VehicleTR[0]))
//        _1VehicleTR_Income=Number(_1VehicleTR[0]);
//      if(Number(_1VehicleTR[1]))
//        _1VehicleTR_ReduceIncome=Number(_1VehicleTR[1]);
//      if(_1VehicleTR_Income || _1VehicleTR_ReduceIncome){
//        candidateTR._1VehicleTR={};
//        candidateTR._1VehicleTR.income=_1VehicleTR_Income;
//        candidateTR._1VehicleTR.reduceIncome=_1VehicleTR_ReduceIncome;
//        candidateTR._1VehicleTR.netIncome=_1VehicleTR_Income-_1VehicleTR_ReduceIncome;
//      }
//
//      //_1FreeHouseTR
//      var _1FreeHouseTR = eachRow.FREE_INCOME.split('##'),_1FreeHouseTR_Income=0,_1FreeHouseTR_ReduceIncome=0;
//      if(Number(_1FreeHouseTR[0]))
//        _1FreeHouseTR_Income=Number(_1FreeHouseTR[0]);
//      if(Number(_1FreeHouseTR[1]))
//        _1FreeHouseTR_ReduceIncome=Number(_1FreeHouseTR[1]);
//      if(_1FreeHouseTR_Income || _1FreeHouseTR_ReduceIncome){
//        candidateTR._1FreeHouseTR={};
//        candidateTR._1FreeHouseTR.income=_1FreeHouseTR_Income;
//        candidateTR._1FreeHouseTR.reduceIncome=_1FreeHouseTR_ReduceIncome;
//        candidateTR._1FreeHouseTR.netIncome=_1FreeHouseTR_Income-_1FreeHouseTR_ReduceIncome;
//      }
//
//      //__1OtherOptionalIncomeTR
//      var __1OtherOptionalIncomeTR = eachRow.OTHERS.split('##'),__1OtherOptionalIncomeTR_Income=0,__1OtherOptionalIncomeTR_ReduceIncome=0;
//      if(Number(__1OtherOptionalIncomeTR[0]))
//        __1OtherOptionalIncomeTR_Income=Number(__1OtherOptionalIncomeTR[0]);
//      if(Number(__1OtherOptionalIncomeTR[1]))
//        __1OtherOptionalIncomeTR_ReduceIncome=Number(__1OtherOptionalIncomeTR[1]);
//      if(__1OtherOptionalIncomeTR_Income || __1OtherOptionalIncomeTR_ReduceIncome){
//        candidateTR.__1OtherOptionalIncomeTR={};
//        candidateTR.__1OtherOptionalIncomeTR.income=__1OtherOptionalIncomeTR_Income;
//        candidateTR.__1OtherOptionalIncomeTR.reduceIncome=__1OtherOptionalIncomeTR_ReduceIncome;
//        candidateTR.__1OtherOptionalIncomeTR.netIncome=__1OtherOptionalIncomeTR_Income-__1OtherOptionalIncomeTR_ReduceIncome;
//      }
//
//      //___1TotalnetSalaryIncomeTR
//      var ___1TotalnetSalaryIncomeTR = eachRow.NEET_INCOME.split('##'),___1TotalnetSalaryIncomeTR_Income=0,___1TotalnetSalaryIncomeTR_ReduceIncome=0;
//      if(Number(___1TotalnetSalaryIncomeTR[0]))
//        ___1TotalnetSalaryIncomeTR_Income=Number(___1TotalnetSalaryIncomeTR[0]);
//      if(Number(___1TotalnetSalaryIncomeTR[1]))
//        ___1TotalnetSalaryIncomeTR_ReduceIncome=Number(___1TotalnetSalaryIncomeTR[1]);
//      if(___1TotalnetSalaryIncomeTR_Income || ___1TotalnetSalaryIncomeTR_ReduceIncome){
//        candidateTR.___1TotalnetSalaryIncomeTR={};
//        candidateTR.___1TotalnetSalaryIncomeTR.income=___1TotalnetSalaryIncomeTR_Income;
//        candidateTR.___1TotalnetSalaryIncomeTR.reduceIncome=___1TotalnetSalaryIncomeTR_ReduceIncome;
//        candidateTR.___1TotalnetSalaryIncomeTR.netIncome=___1TotalnetSalaryIncomeTR_Income-___1TotalnetSalaryIncomeTR_ReduceIncome;
//      }
//
//
//
//      candidateTR._2_1AnnualIncomeTR= Number(eachRow.ANNUAL_INCOME);
//      candidateTR._2_2a_landTR= Number(eachRow.LAND);
//      candidateTR._2_2b_insuranceTR= Number(eachRow.INSURANCE);
//      candidateTR._2_2c_loanTR= Number(eachRow.LOAN);
//      candidateTR._2_2d_localTaxTR= Number(eachRow.LOCAL_TAX);
//      candidateTR._2_2e_modificationTR= Number(eachRow.MODIFICATION);
//      candidateTR._2_2f_emptyHouseTR= Number(eachRow.EMPTY_HOUSE);
//      candidateTR._2_2g_otherHouseTR= Number(eachRow.OTHERS_2);
//      candidateTR._2_2h_totalHouseTR= Number(eachRow.LAND)+Number(eachRow.INSURANCE)+Number(eachRow.LOAN)+Number(eachRow.LOCAL_TAX)+Number(eachRow.MODIFICATION)+Number(eachRow.EMPTY_HOUSE)+Number(eachRow.OTHERS_2);
//      candidateTR._2_3_1sub_2_netIncomTR= Number(eachRow.ANNUAL_INCOME)-candidateTR._2_2h_totalHouseTR;
//      //
//      candidateTR._3a_lifeInsuranceTR= Number(eachRow.life_insurance);
//      candidateTR._3b_futureAllowanceTR= Number(eachRow.future_allowance);
//      candidateTR._3c_donationFutureAcctTR= Number(eachRow.donation_future_acct);
//      candidateTR._3d_donationOwnAcctTR= Number(eachRow.donation_own_acct);
//      candidateTR._3e_ageAcctTR= Number(eachRow['5_amount']);
//      candidateTR._3f_shareAmountTR= Number(eachRow['6_share_amount']);
//      candidateTR._3g_depositAmountTR= Number(eachRow['7_deposit_amount']);
//      candidateTR._3h_welfareAmountTR= Number(eachRow['8_welfare_amount']);
//      candidateTR._3i_jakatAmountTR= Number(eachRow['9_amount']);
//      candidateTR._3j_othersAmountTR= Number(eachRow.others_amount);
//      candidateTR._3_totalInvestmentRelatedAmountTR= Number(eachRow.life_insurance)+Number(eachRow.future_allowance)+Number(eachRow.donation_future_acct)+Number(eachRow.donation_own_acct)+Number(eachRow['5_amount'])+Number(eachRow['6_share_amount'])+Number(eachRow['7_deposit_amount'])+Number(eachRow['8_welfare_amount'])+Number(eachRow['9_amount'])+Number(eachRow.others_amount);
//      //
//      //console.log(candidateTR);
//
//      app.models.candidate.updateAll({oldId: eachRow.candidate_id}, candidateTR, function (errr, info) {
//        if (errr)
//          throw errr;
//
//        console.log(info, iter++);
//      });
//
//    })
//  }
//
//
//  //oldds.disconnect();
//});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////MERGE profiles_it10b (income tax - assets liability expense)////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//oldds.connector.query("SELECT _10b.*,c.publish,c.candidate_id FROM profiles_it10b _10b LEFT JOIN profiles_17c c ON _10b.PROFILE_ID=c.PROFILE_ID WHERE c.candidate_id<>0 AND c.publish='publish' limit 0,8000", '', function (err, rows, fields) {
////oldds.connector.query("SELECT * FROM profiles_17c  limit 0,40", '', function (err, rows, fields) {
//  if (err) {
//    console.log(err);
//    throw err;
//  }
//
//  console.log(rows.length);
//  //console.log(rows);
//
//  var iter = 1;
//  if (rows.length) {
//    var comitbefore = {};
//    var arr = [];
//    var arr2 = [],i=0;
//    rows.forEach(function (eachRow) {
//      //console.log("updating person: ", eachRow.person_id, " ,CandidateId: ", eachRow.candidate_id, " ,IncomeTaxId: ", eachRow.PROFILE_ID);
//      //console.log(eachRow);
//      var candidateTR = {},_10_1_to_10_totalAssetTR=0;
//      candidateTR.oldIncomeTaxId = eachRow.PROFILE_ID;
//      candidateTR.statusTR = true;
//
//      ////asset liability
//      if(Number(eachRow.CAPITAL)){
//        candidateTR._1a_capitalTR= Number(eachRow.CAPITAL);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.CAPITAL);
//      }
//
//      if(Number(eachRow.share_investment)){
//        candidateTR._1b_shareInvestmentTR= Number(eachRow.share_investment);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.share_investment);
//      }
//
//      if(Number(eachRow.CAPITAL) || Number(eachRow.share_investment)){
//        candidateTR._1_totalCapitalTR= Number(eachRow.CAPITAL)+Number(eachRow.share_investment);
//      }
//
//      if(eachRow.company_name){
//        candidateTR._1b_a_companyNameTR= eachRow.company_name;
//      }
//
//      if(eachRow.number_of_shares){
//        candidateTR._1b_b_numberOfSharesTR= eachRow.number_of_shares;
//
//      }
//
//      if(Number(eachRow.NOT_AGRI)){
//        candidateTR._2_notAgriLandHomePriceTR= Number(eachRow.NOT_AGRI);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.NOT_AGRI);
//      }
//
//      //candidateTR._2_notAgriLandHomeDescTR= eachRow.;
//      if(Number(eachRow.AGRI)){
//        candidateTR._3_agriLandPriceTR= Number(eachRow.AGRI);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.AGRI);
//      }
//
//      //candidateTR._3_agriLandPriceDescTR= eachRow.;
//
//
//      var _4_totalInvestTR=0;
//      var _4a_investShareDebentureTR = eachRow.INVESTA.split('##');
//      if(_4a_investShareDebentureTR.length){
//        candidateTR._4a_investShareDebentureTR={};
//        for(i=0;i<_4a_investShareDebentureTR.length;i++){
//          if(i==0){
//            if(Number(_4a_investShareDebentureTR[i])){
//              candidateTR._4a_investShareDebentureTR.price=Number(_4a_investShareDebentureTR[i]);
//              _4_totalInvestTR+=Number(_4a_investShareDebentureTR[i]);
//            }
//
//          }else{
//            if(_4a_investShareDebentureTR[i]=='শেয়ার')
//              candidateTR._4a_investShareDebentureTR.share=true;
//            else if(_4a_investShareDebentureTR[i]=='ডিবেঞ্চার')
//              candidateTR._4a_investShareDebentureTR.debenture=true;
//          }
//        }
//      }
//
//      var _4b_investSavingsTR = eachRow.INVESTB.split('##');
//      if(_4b_investSavingsTR.length){
//        candidateTR._4b_investSavingsTR={};
//        for(i=0;i<_4b_investSavingsTR.length;i++){
//          if(i==0){
//            if(Number(_4b_investSavingsTR[i])){
//              candidateTR._4b_investSavingsTR.price=Number(_4b_investSavingsTR[i]);
//              _4_totalInvestTR+=Number(_4b_investSavingsTR[i]);
//            }
//
//          }else{
//            if(_4b_investSavingsTR[i]=='সঞ্চয়পত্র')
//              candidateTR._4b_investSavingsTR.savings=true;
//            else if(_4b_investSavingsTR[i]=='ইউনিট সার্টিফিকেট')
//              candidateTR._4b_investSavingsTR.unitCertificate=true;
//            else if(_4b_investSavingsTR[i]=='বন্ড')
//              candidateTR._4b_investSavingsTR.bond=true;
//          }
//        }
//      }
//
//      var _4c_investPricebondTR = eachRow.INVESTC.split('##');
//      if(_4c_investPricebondTR.length){
//        candidateTR._4c_investPricebondTR={};
//        for(i=0;i<_4c_investPricebondTR.length;i++){
//          if(i==0){
//            if(Number(_4c_investPricebondTR[i])){
//              candidateTR._4c_investPricebondTR.price=Number(_4c_investPricebondTR[i]);
//              _4_totalInvestTR+=Number(_4c_investPricebondTR[i]);
//            }
//
//          }else{
//            if(_4c_investPricebondTR[i]=='প্রাইজবন্ড')
//              candidateTR._4c_investPricebondTR.priceBond=true;
//            else if(_4c_investPricebondTR[i]=='সঞ্চয় স্কীম')
//              candidateTR._4c_investPricebondTR.scheme=true;
//          }
//        }
//      }
//
//      if(Number(eachRow.INVESTD)){candidateTR._4d_investPayloanTR= Number(eachRow.INVESTD);}
//
//      if(Number(eachRow.INVESTE)){candidateTR._4e_otherInvestTR= Number(eachRow.INVESTE);}
//
//
//      if(_4_totalInvestTR || Number(eachRow.INVESTD) || Number(eachRow.INVESTE)){
//        candidateTR._4_totalInvestTR= _4_totalInvestTR+Number(eachRow.INVESTD)+Number(eachRow.INVESTE);
//        _10_1_to_10_totalAssetTR+= _4_totalInvestTR+Number(eachRow.INVESTD)+Number(eachRow.INVESTE);}
//
//
//      if(Number(eachRow.MOTOR)){candidateTR._5a_motorPriceTR= Number(eachRow.MOTOR);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.MOTOR);}
//
//      //candidateTR._5b_motorDescTR= eachRow.;
//
//      if(Number(eachRow.ORNAMENTS)){candidateTR._6_ornamentsTR= Number(eachRow.ORNAMENTS);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.ORNAMENTS);
//      }
//
//      if(Number(eachRow.FURNITURE)){candidateTR._7_furnitureTR= Number(eachRow.FURNITURE);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.FURNITURE);}
//
//
//      if(Number(eachRow.ELECTRONIC)){candidateTR._8_electronicTR= Number(eachRow.ELECTRONIC);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.ELECTRONIC);
//      }
//
//      var _9_outOfBusinessTR = eachRow.OUT_OF_BUSINESS.split('##'),_9_totalCashBankOtherTR=0;
//      if(_9_outOfBusinessTR.length){
//        candidateTR._9_outOfBusinessTR={};
//        for(i=0;i<_9_outOfBusinessTR.length;i++){
//          if(i==0 && IsNumeric(_9_outOfBusinessTR[i])){
//            if(Number(_9_outOfBusinessTR[i])){candidateTR._9_outOfBusinessTR.cash=Number(_9_outOfBusinessTR[i]);
//              _9_totalCashBankOtherTR+=Number(_9_outOfBusinessTR[i]);}
//
//          }
//          else if(i==1 && IsNumeric(_9_outOfBusinessTR[i])){
//            if(Number(_9_outOfBusinessTR[i])){candidateTR._9_outOfBusinessTR.bank=Number(_9_outOfBusinessTR[i]);
//              _9_totalCashBankOtherTR+=Number(_9_outOfBusinessTR[i]);}
//
//          }
//          else if(i==2 && IsNumeric(_9_outOfBusinessTR[i])){
//            if(Number(_9_outOfBusinessTR[i])){candidateTR._9_outOfBusinessTR.other=Number(_9_outOfBusinessTR[i]);
//              _9_totalCashBankOtherTR+=Number(_9_outOfBusinessTR[i]);}
//
//          }
//        }
//      }
//
//
//      if(_9_totalCashBankOtherTR){
//
//        candidateTR._9_totalCashBankOtherTR= Number(_9_totalCashBankOtherTR);
//        _10_1_to_10_totalAssetTR+= Number(_9_totalCashBankOtherTR);
//      }
//
//      if(Number(eachRow.OTHERS)){candidateTR._10_otherAssetsPriceTR= Number(eachRow.OTHERS);
//        _10_1_to_10_totalAssetTR+= Number(eachRow.OTHERS);
//        }
//      //candidateTR._10_otherAssetsDescTR= eachRow.;
//
//        candidateTR._10_1_to_10_totalAssetTR=0;
//      if(_10_1_to_10_totalAssetTR){candidateTR._10_1_to_10_totalAssetTR= _10_1_to_10_totalAssetTR;}
//
//
//      var _11_liabilitiesTR = eachRow.LIABILITIES.split('##'),_11_totalLiabilitiesTR=0;
//      if(_11_liabilitiesTR.length){
//        candidateTR._11_liabilitiesTR={};
//        for(i=0;i<_11_liabilitiesTR.length;i++){
//          if(i==0 && IsNumeric(_11_liabilitiesTR[i])){
//            if(Number(_11_liabilitiesTR[i])){candidateTR._11_liabilitiesTR.mortgage=Number(_11_liabilitiesTR[i]);
//              _11_totalLiabilitiesTR+=Number(_11_liabilitiesTR[i]);}
//
//          }
//          else if(i==1 && IsNumeric(_11_liabilitiesTR[i])){
//            if(Number(_11_liabilitiesTR[i])){candidateTR._11_liabilitiesTR.securities=Number(_11_liabilitiesTR[i]);
//              _11_totalLiabilitiesTR+=Number(_11_liabilitiesTR[i]);}
//
//          }
//          else if(i==2 && IsNumeric(_11_liabilitiesTR[i])){
//            if(Number(_11_liabilitiesTR[i])){candidateTR._11_liabilitiesTR.bankLoan=Number(_11_liabilitiesTR[i]);
//              _11_totalLiabilitiesTR+=Number(_11_liabilitiesTR[i]);}
//
//          }
//          else if(i==3 && IsNumeric(_11_liabilitiesTR[i])){
//            if(Number(_11_liabilitiesTR[i])){candidateTR._11_liabilitiesTR.other=Number(_11_liabilitiesTR[i]);
//              _11_totalLiabilitiesTR+=Number(_11_liabilitiesTR[i]);}
//
//          }
//        }
//      }
//
//
//      candidateTR._11_totalLiabilitiesTR=0;
//      if(_11_totalLiabilitiesTR){
//        candidateTR._11_totalLiabilitiesTR= Number(_11_totalLiabilitiesTR);
//      }
//
//
//      candidateTR._12_netAssetsTR= candidateTR._10_1_to_10_totalAssetTR-candidateTR._11_totalLiabilitiesTR;
//        candidateTR._13_netAssetLastYearTR=0;
//      if(Number(eachRow.net_asset_last_year)){candidateTR._13_netAssetLastYearTR= Number(eachRow.net_asset_last_year);}
//
//      candidateTR._14_assetBalanceTR= candidateTR._12_netAssetsTR-candidateTR._13_netAssetLastYearTR;
//
//      var _15_familyExpenseTR = eachRow.FAMILY.split('##'),_15_familyExpenseAmountTR=0;
//      if(_15_familyExpenseTR.length){
//        candidateTR._15_familyExpenseTR={};
//        candidateTR._15_familyExpenseTR.amount=0;
//        for(i=0;i<_15_familyExpenseTR.length;i++){
//          if(i==0 && IsNumeric(_15_familyExpenseTR[i])){
//            if(Number(_15_familyExpenseTR[i])){candidateTR._15_familyExpenseTR.amount=Number(_15_familyExpenseTR[i]);
//              _15_familyExpenseAmountTR=Number(_15_familyExpenseTR[i]);}
//
//          }
//          else if(i==2 && IsNumeric(_15_familyExpenseTR[i])){
//            if(Number(_15_familyExpenseTR[i])){candidateTR._15_familyExpenseTR.noAdult=Number(_15_familyExpenseTR[i]);}
//
//          }
//          else if(i==3 && IsNumeric(_15_familyExpenseTR[i])){
//            if(Number(_15_familyExpenseTR[i])){candidateTR._15_familyExpenseTR.noChild=Number(_15_familyExpenseTR[i]);}
//
//          }
//        }
//      }
//
//
//      candidateTR._16_totalAssetBalanceTR= candidateTR._14_assetBalanceTR-_15_familyExpenseAmountTR;
//
//      if(Number(eachRow['17_return_income']) || Number(eachRow['17_2_tax_free_income']) || Number(eachRow['17_3_other_income'])){
//        candidateTR._17_earnedFundTR={};
//        if(Number(eachRow['17_return_income'])){candidateTR._17_earnedFundTR.returnIncome= Number(eachRow['17_return_income']);}
//
//        if(Number(eachRow['17_2_tax_free_income'])){candidateTR._17_earnedFundTR.taxFreeIncome= Number(eachRow['17_2_tax_free_income']);}
//
//        if(Number(eachRow['17_3_other_income'])){candidateTR._17_earnedFundTR.otherIncome= Number(eachRow['17_3_other_income']);}
//
//      }
//
//        candidateTR._17_totalEarnedFunTR=0;
//      if(Number(eachRow['17_return_income'])||Number(eachRow['17_2_tax_free_income'])||Number(eachRow['17_3_other_income'])){candidateTR._17_totalEarnedFunTR= Number(eachRow['17_return_income'])+Number(eachRow['17_2_tax_free_income'])+Number(eachRow['17_3_other_income']);}
//
//        candidateTR._18_differenceAmountTR=0;
//      if(candidateTR._16_totalAssetBalanceTR || candidateTR._17_totalEarnedFunTR){candidateTR._18_differenceAmountTR= candidateTR._16_totalAssetBalanceTR-candidateTR._17_totalEarnedFunTR;}
//
//
//      //console.log(candidateTR);
//
//      app.models.candidate.updateAll({oldId: eachRow.candidate_id}, candidateTR, function (errr, info) {
//        if (errr)
//          throw errr;
//
//        console.log(info, iter++);
//      });
//
//    })
//  }
//
//
//  //oldds.disconnect();
//});



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////MERGE profiles_it10bb (income tax - assets liability expense)////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

oldds.connector.query("SELECT _10bb.*,c.publish,c.candidate_id FROM profiles_it10bb _10bb LEFT JOIN profiles_17c c ON _10bb.PROFILE_ID=c.PROFILE_ID WHERE c.candidate_id<>0 AND c.publish='publish' limit 0,8000", '', function (err, rows, fields) {
//oldds.connector.query("SELECT * FROM profiles_17c  limit 0,40", '', function (err, rows, fields) {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log(rows.length);
  //console.log(rows);

  var iter = 1;
  if (rows.length) {
    var comitbefore = {};
    var arr = [];
    var arr2 = [],i=0;
    rows.forEach(function (eachRow) {
      //console.log("updating person: ", eachRow.person_id, " ,CandidateId: ", eachRow.candidate_id, " ,IncomeTaxId: ", eachRow.PROFILE_ID);
      //console.log(eachRow);
      var candidateTR = {},_10_1_to_10_totalAssetTR=0;
      candidateTR.oldIncomeTaxId = eachRow.PROFILE_ID;
      candidateTR.statusTR = true;

      var totalLifeStyleCostTR=0;
      ////life style
      if(Number(eachRow.personal_cost)){
        candidateTR._1_personalCostTR= Number(eachRow.personal_cost);
        totalLifeStyleCostTR+= Number(eachRow.personal_cost);
      }

      if(eachRow.personal_cost_comment)
      candidateTR._1_personalCostCommentTR= eachRow.personal_cost_comment;
      if(Number(eachRow.tax_paid_last_year)){
        candidateTR._2_taxPaidLastYearTR= Number(eachRow.tax_paid_last_year);
        totalLifeStyleCostTR+= Number(eachRow.tax_paid_last_year);
      }

      if(eachRow.tax_paid_comment)
      candidateTR._2_taxPaidCommentTR= eachRow.tax_paid_comment;
      if(Number(eachRow.residential_cost)){
        candidateTR._3_residentialCostTR= Number(eachRow.residential_cost);
        totalLifeStyleCostTR+= Number(eachRow.residential_cost);
      }

      if(eachRow.residential_cost_comment)
      candidateTR._3_residentialCostCommentTR= eachRow.residential_cost_comment;
      if(Number(eachRow.vehicle_cost)){
        candidateTR._4_vehicleCostTR= Number(eachRow.vehicle_cost);
        totalLifeStyleCostTR+= Number(eachRow.vehicle_cost);
      }

      if(eachRow.vehicle_cost_comment)
      candidateTR._4_vehicleCostCommentTR= eachRow.vehicle_cost_comment;
      if(Number(eachRow.electricity_bill)){
        candidateTR._5_electricityBillTR= Number(eachRow.electricity_bill);
        totalLifeStyleCostTR+= Number(eachRow.electricity_bill);
      }

      if(eachRow.electricity_bill_comment)
      candidateTR._5_electricityBillCommentTR= eachRow.electricity_bill_comment;
      if(Number(eachRow.water_bill)){
        candidateTR._6_waterBillTR= Number(eachRow.water_bill);
        totalLifeStyleCostTR+= Number(eachRow.water_bill);
      }

      if(eachRow.water_bill_comment)
      candidateTR._6_waterBillCommentTR= eachRow.water_bill_comment;
      if(Number(eachRow.gas_bill)){
        candidateTR._7_gasBillTR= Number(eachRow.gas_bill);
        totalLifeStyleCostTR+= Number(eachRow.gas_bill);
      }

      if(eachRow.gas_bill_comment)
      candidateTR._7_gasBillCommentTR= eachRow.gas_bill_comment;
      if(Number(eachRow.telephone_bill)){
        candidateTR._8_telephoneBillTR= Number(eachRow.telephone_bill);
        totalLifeStyleCostTR+= Number(eachRow.telephone_bill);
      }

      if(eachRow.telephone_bill_comment)
      candidateTR._8_telephoneBillCommentTR= eachRow.telephone_bill_comment;
      if(Number(eachRow.child_educational_expense)){
        candidateTR._9_childEducationalExpenseTR= Number(eachRow.child_educational_expense);
        totalLifeStyleCostTR+= Number(eachRow.child_educational_expense);
      }

      if(eachRow.child_education_comment)
      candidateTR._9_childEducationCommentTR= eachRow.child_education_comment;
      if(Number(eachRow.travel_expense)){
        candidateTR._10_travelExpenseTR= Number(eachRow.travel_expense);
        totalLifeStyleCostTR+= Number(eachRow.travel_expense);
      }

      if(eachRow.travel_expense_comment)
      candidateTR._10_travelExpenseCommentTR= eachRow.travel_expense_comment;
      if(Number(eachRow.festival_cost)){
        candidateTR._11_festivalCostTR= Number(eachRow.festival_cost);
        totalLifeStyleCostTR+= Number(eachRow.festival_cost);
      }

      if(eachRow.festival_cost_comment)
      candidateTR._11_festivalCostCommentTR= eachRow.festival_cost_comment;
      candidateTR.totalLifeStyleCostTR=0;
      if(totalLifeStyleCostTR){
        candidateTR.totalLifeStyleCostTR= totalLifeStyleCostTR;
      }

      //
      //candidateTR.createdByBnTR = eachRow.UPDATEDBY;
      //candidateTR.modifiedByBnTR = eachRow.UPDATEDBY;
      //
      //candidateTR.isPublishedTR = true;
      //
      //

      //console.log(candidateTR);

      app.models.candidate.updateAll({oldId: eachRow.candidate_id}, candidateTR, function (errr, info) {
        if (errr)
          throw errr;

        console.log(info, iter++);
      });

    })
  }


  //oldds.disconnect();
});


