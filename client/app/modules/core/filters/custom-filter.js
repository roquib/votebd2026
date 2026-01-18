var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();


(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name com.module.core.directive:adminBox
   * @description
   * # adminBox
   */
  angular
    .module('com.module.core')
    .filter('translateNumber', function($rootScope) {
      return function(x) {
        if(x && $rootScope.locale.lang == 'bn_BD'){
          //if(x){
          //  if(typeof x =='number'){
          //    x = x.toString();
          //  }
          //  //console.log(typeof x);
          //  console.log('x',x);
          //
          //
          //  var numberArr = x.split('');
          //  var i = 0,banglaNumber='';
          //
          //  //console.log(numberArr);
          //  for(i=0;i<numberArr.length;i++){
          //    banglaNumber+= '&#'+ (parseInt(numberArr[i])+2534).toString()+';';
          //  }
          //
          //  return decodeEntities(banglaNumber);
          //}
          //
          //return '';

          var strArray= x.toString().split('');

          for(var i =0; i< strArray.length; i++){
            if(!isNaN(strArray[i])){
              if(strArray[i] === '0'){
                strArray[i] = '০';
              }
              if(strArray[i] === '1'){
                strArray[i] = '১';
              }
              if(strArray[i] === '2'){
                strArray[i] = '২';
              }
              if(strArray[i] === '3'){
                strArray[i] = '৩';
              }
              if(strArray[i] === '4'){
                strArray[i] = '৪';
              }
              if(strArray[i] === '5'){
                strArray[i] = '৫';
              }
              if(strArray[i] === '6'){
                strArray[i] = '৬';
              }
              if(strArray[i] === '7'){
                strArray[i] = '৭';
              }
              if(strArray[i] === '8'){
                strArray[i] = '৮';
              }
              if(strArray[i] === '9'){
                strArray[i] = '৯';
              }
            }
          }
          return strArray.join('');
        }else if(x === 0 && $rootScope.locale.lang == 'bn_BD'){
          return '০';
        }
        else return x;
      };
    })
    .filter('ratio', function () {
      return function (oldValue, newValue) { console.log(oldValue);
        if(isNaN(oldValue) || isNaN(newValue)){
          return Number(0).toFixed(2);
        }if(oldValue == 0 &&newValue == 0){
          return Number(0).toFixed(2);
        }if(oldValue == 0){
          return Number(100).toFixed(2);
        }else if(newValue == 0){
          return Number(-100).toFixed(2);
        }else{
          return Number((newValue - oldValue)*100/oldValue).toFixed(2);
        }
      };
    })
    // Convert Bengali numbers to English numbers
    .filter('bengaliToEnglish', function() {
      return function(str) {
        if (!str) return '';
        str = str.toString();
        var bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        var englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (var i = 0; i < bengaliDigits.length; i++) {
          str = str.split(bengaliDigits[i]).join(englishDigits[i]);
        }
        return str;
      };
    })
    // Get Date of Birth with fallback: candidateDateOfBirthBnAF -> dobTR
    .filter('getDob', function($filter) {
      return function(row) {
        if (!row) return '';
        // First try candidateDateOfBirthBnAF
        var dob = row.candidateDateOfBirthBnAF;
        if (dob && dob !== 'NULL' && dob !== 'null' && dob.indexOf('Invalid') === -1) {
          // Convert Bengali numbers to English
          dob = $filter('bengaliToEnglish')(dob);
          return dob;
        }
        // Fallback to dobTR (timestamp)
        if (row.dobTR && row.dobTR !== 0) {
          var date = new Date(row.dobTR);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0]; // YYYY-MM-DD format
          }
        }
        return '';
      };
    })
    // Get profession with fallback: currentProfessionAF -> professionTypeBnAF
    .filter('getProfession', function() {
      return function(row) {
        if (!row) return '';
        return row.currentProfessionAF || row.professionTypeBnAF || row.candidateProfessionBusinessBnAF || '';
      };
    })
    // Get liability with fallback: sum of new fields -> old field
    .filter('getLiability', function() {
      return function(row) {
        if (!row) return 0;
        var newLiability = (parseInt(row.liability1AmountAF) || 0) +
                          (parseInt(row.liability2AmountAF) || 0) +
                          (parseInt(row.liability3AmountAF) || 0) +
                          (parseInt(row.liability4AmountAF) || 0);
        return newLiability > 0 ? newLiability : (row.liabilitiesAmountAF || 0);
      };
    })
    // Get income with domestic/foreign fallback
    .filter('getIncome', function() {
      return function(item) {
        if (!item) return 0;
        var ownNew = (parseInt(item.ownDomestic) || 0) + (parseInt(item.ownForeign) || 0);
        return ownNew > 0 ? ownNew : (item.own || 0);
      };
    })
    // Get dependents income with domestic/foreign fallback
    .filter('getDependentsIncome', function() {
      return function(item) {
        if (!item) return 0;
        var depNew = (parseInt(item.dependentsDomestic) || 0) + (parseInt(item.dependentsForeign) || 0);
        return depNew > 0 ? depNew : (item.dependents || 0);
      };
    })
    // Translate dropdown keys (asset types, income sources, loan types)
    .filter('translateKey', function($rootScope) {
      var translations = {
        // Movable Asset Types (অস্থাবর সম্পদ) - from affidavit form
        'cash_taka': 'নগদ টাকা',
        'foreign_currency': 'বৈদেশিক মুদ্রা',
        'bank_deposit': 'ব্যাংকে জমা',
        'all_shares': 'বন্ড/ঋণপত্র/শেয়ার',
        'dps': 'সঞ্চয়পত্র/স্থায়ী আমানত',
        'vehicles': 'যানবাহন',
        'cryptocurrency': 'ক্রিপটোকারেন্সি',
        'gold_ornaments': 'স্বর্ণালংকার',
        'electronic_goods': 'ইলেকট্রনিক সামগ্রী',
        'furnitures': 'আসবাবপত্র',
        'furniture': 'আসবাবপত্র',
        'mobile_laptop': 'মোবাইল/ল্যাপটপ/কম্পিউটার',
        'business_capital': 'ব্যবসায়িক মূলধন',
        'weapons': 'অস্ত্রশস্ত্র',
        'livestock': 'গবাদি পশু/হাঁস-মুরগি',
        'insurance_trust': 'বিমা ও ট্রাস্টের মূল্য',
        'foreign_movable': 'বিদেশে থাকা অন্যান্য অস্থাবর সম্পত্তি',
        'others': 'অন্যান্য',
        'other': 'অন্যান্য',
        'total_acquisition_movable': 'মোট অর্জনকালীন মূল্য (অস্থাবর)',
        'current_value_movable': 'বর্তমান মূল্য (অস্থাবর)',
        'total_movable': 'মোট অস্থাবর সম্পদ',
        'previous_year_movable': 'পূর্ববর্তী বছরের অস্থাবর সম্পদ',
        // Legacy movable asset types
        'bonds': 'বন্ড',
        'debentures': 'ঋণপত্র',
        'shares': 'শেয়ার',
        'savings_certificate': 'সঞ্চয়পত্র',
        'fixed_deposit': 'স্থায়ী আমানত',
        'vehicle': 'যানবাহন',
        'motor_vehicle': 'মোটরযান',
        'motorcycle': 'মোটরসাইকেল',
        'car': 'গাড়ি',
        'bus': 'বাস',
        'truck': 'ট্রাক',
        'precious_stones': 'মূল্যবান পাথর',
        'investment': 'বিনিয়োগ',
        'provident_fund': 'প্রভিডেন্ট ফান্ড',
        'insurance': 'বীমা',
        'loan_given': 'প্রদত্ত ঋণ',
        'receivables': 'প্রাপ্য',
        // Immovable Asset Types (স্থাবর সম্পদ) - from affidavit form
        'cultivated_land': 'কৃষি জমি',
        'noncultivated_land': 'অকৃষি জমি',
        'building': 'দালান/ভবন',
        'house_apartment': 'বাড়ি/অ্যাপার্টমেন্ট',
        'garden_farm': 'বাগান/খামার',
        'insurance_trust_immovable': 'বিমা ও ট্রাস্টের মূল্য',
        'foreign_immovable': 'বিদেশে থাকা অন্যান্য স্থাবর সম্পত্তি',
        'total_acquisition_immovable': 'মোট অর্জনকালীন মূল্য (স্থাবর)',
        'current_value_immovable': 'বর্তমান মূল্য (স্থাবর)',
        'total_immovable': 'মোট স্থাবর সম্পদ',
        'previous_year_total': 'পূর্ববর্তী বছরের স্থাবর সম্পদ',
        // Legacy immovable asset types
        'land': 'জমি',
        'house': 'বাড়ি',
        'flat': 'ফ্ল্যাট',
        'shop': 'দোকান',
        'factory': 'কারখানা',
        'agricultural_land': 'কৃষি জমি',
        'non_agricultural_land': 'অকৃষি জমি',
        'non_cultivated_land': 'অকৃষি জমি',
        'commercial_property': 'বাণিজ্যিক সম্পত্তি',
        'residential_property': 'আবাসিক সম্পত্তি',
        'apartment': 'অ্যাপার্টমেন্ট',
        'pond': 'পুকুর',
        'garden': 'বাগান',
        'orchard': 'ফলের বাগান',
        // Income Source Types - from affidavit form
        'business': 'ব্যবসা',
        'agriculture': 'কৃষি',
        'building_fare': 'বাড়ি/দোকান ভাড়া',
        'shares': 'শেয়ার/সঞ্চয়পত্র',
        'profession': 'পেশা',
        'service': 'চাকরি',
        // Legacy income types
        'salary': 'বেতন',
        'house_rent': 'বাড়ি ভাড়া',
        'rent': 'ভাড়া',
        'interest': 'সুদ',
        'dividend': 'লভ্যাংশ',
        'capital_gain': 'মূলধনী লাভ',
        'pension': 'পেনশন',
        'remittance': 'রেমিট্যান্স',
        'gift': 'উপহার',
        'inheritance': 'উত্তরাধিকার',
        'professional_fee': 'পেশাগত ফি',
        'consultancy': 'পরামর্শ',
        'tuition': 'টিউশন',
        'honorarium': 'সম্মানী',
        'royalty': 'রয়্যালটি',
        'commission': 'কমিশন',
        'other_income': 'অন্যান্য আয়',
        // Loan Types - from affidavit form
        'single': 'একক',
        'joint': 'যৌথ',
        'dependants': 'নির্ভরশীল',
        'director_chairman': 'চেয়ারম্যান/ডিরেক্টর',
        // Legacy loan types
        'personal_loan': 'ব্যক্তিগত ঋণ',
        'home_loan': 'গৃহ ঋণ',
        'car_loan': 'গাড়ি ঋণ',
        'business_loan': 'ব্যবসায়িক ঋণ',
        'education_loan': 'শিক্ষা ঋণ',
        'agricultural_loan': 'কৃষি ঋণ',
        'bank_loan': 'ব্যাংক ঋণ',
        'ngo_loan': 'এনজিও ঋণ',
        'personal_borrowing': 'ব্যক্তিগত ধার',
        'overdraft': 'ওভারড্রাফট',
        'credit_card': 'ক্রেডিট কার্ড',
        'other_loan': 'অন্যান্য ঋণ',
        // Commitment/Achievement Types - from affidavit form
        'development_of_power_system': 'বিদ্যুৎ ব্যবস্থার উন্নয়ন',
        'development_of_educational_institutions': 'শিক্ষা প্রতিষ্ঠানের উন্নয়ন',
        'development_of_communication_systems': 'যোগাযোগ ব্যবস্থার উন্নয়ন',
        'development_of_medical_health_sector': 'চিকিৎসা/স্বাস্থ্য খাতের উন্নয়ন',
        'development_of_water_resources': 'পানি সম্পদের উন্নয়ন',
        'culvert_construction': 'কালভার্ট নির্মাণ',
        'road_construction_renovation': 'রাস্তা নির্মাণ/সংস্কার',
        'tree_planting_programme': 'বৃক্ষ রোপন কর্মসূচী',
        'park_construction': 'পার্ক নির্মাণ',
        'bridge_construction': 'ব্রিজ নির্মাণ',
        'sports_space_version': 'খেলাধূলার স্থান উন্নয়ন',
        'development_of_sanitation_arsenic_waste_disposal_system': 'স্যানিটেশন/পয়নিষ্কাশন উন্নয়ন',
        'rehabilitation_of_river_canal_ponds': 'নদী/খাল/পুকুর সংস্কার',
        'agricultural_development': 'কৃষি উন্নয়ন',
        'development_of_internet_mobile_phone_services': 'ইন্টারনেট/মোবাইল সেবার উন্নয়ন',
        'other_social_activities': 'অন্যান্য সামাজিক কার্যক্রম'
      };
      return function(key) {
        if (!key) return '';
        // If Bengali mode, return Bengali translation, else return original key
        if ($rootScope.locale && $rootScope.locale.lang === 'bn_BD') {
          return translations[key] || key;
        }
        // For English mode, convert underscore to space and capitalize
        return key.replace(/_/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
      };
    })
    // Get total own income (domestic)
    .filter('getTotalOwnDomestic', function() {
      return function(row) {
        if (!row || !row.incomeSourceAF || !row.incomeSourceAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.incomeSourceAF.length; i++) {
          var item = row.incomeSourceAF[i];
          var dom = parseInt(item.ownDomestic) || 0;
          var foreign = parseInt(item.ownForeign) || 0;
          // Fallback to old field if new fields are empty
          if (dom === 0 && foreign === 0) dom = parseInt(item.own) || 0;
          total += dom;
        }
        return total;
      };
    })
    // Get total own income (foreign)
    .filter('getTotalOwnForeign', function() {
      return function(row) {
        if (!row || !row.incomeSourceAF || !row.incomeSourceAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.incomeSourceAF.length; i++) {
          total += parseInt(row.incomeSourceAF[i].ownForeign) || 0;
        }
        return total;
      };
    })
    // Get total dependents income (domestic)
    .filter('getTotalDepDomestic', function() {
      return function(row) {
        if (!row || !row.incomeSourceAF || !row.incomeSourceAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.incomeSourceAF.length; i++) {
          var item = row.incomeSourceAF[i];
          var dom = parseInt(item.dependentsDomestic) || 0;
          var foreign = parseInt(item.dependentsForeign) || 0;
          // Fallback to old field if new fields are empty
          if (dom === 0 && foreign === 0) dom = parseInt(item.dependents) || 0;
          total += dom;
        }
        return total;
      };
    })
    // Get total dependents income (foreign)
    .filter('getTotalDepForeign', function() {
      return function(row) {
        if (!row || !row.incomeSourceAF || !row.incomeSourceAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.incomeSourceAF.length; i++) {
          total += parseInt(row.incomeSourceAF[i].dependentsForeign) || 0;
        }
        return total;
      };
    })
    // Get total loan amount
    .filter('getTotalLoan', function() {
      return function(row) {
        if (!row || !row.loanAF || !row.loanAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.loanAF.length; i++) {
          total += parseInt(row.loanAF[i].loanAmount) || 0;
        }
        return total;
      };
    })
    // Get total defaulted loan amount
    .filter('getTotalDefaultedLoan', function() {
      return function(row) {
        if (!row || !row.loanAF || !row.loanAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.loanAF.length; i++) {
          total += parseInt(row.loanAF[i].debitedLoanAmount) || 0;
        }
        return total;
      };
    })
    // Get total movable assets (own)
    .filter('getTotalMovableOwn', function() {
      return function(row) {
        if (!row || !row.assetMaterialAF || !row.assetMaterialAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.assetMaterialAF.length; i++) {
          total += parseInt(row.assetMaterialAF[i].priceOwn) || 0;
        }
        return total;
      };
    })
    // Get total movable assets (spouse + dependents)
    .filter('getTotalMovableSpouse', function() {
      return function(row) {
        if (!row || !row.assetMaterialAF || !row.assetMaterialAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.assetMaterialAF.length; i++) {
          total += (parseInt(row.assetMaterialAF[i].priceHusbandWife) || 0) + (parseInt(row.assetMaterialAF[i].priceDependants) || 0);
        }
        return total;
      };
    })
    // Get total immovable assets (own)
    .filter('getTotalImmovableOwn', function() {
      return function(row) {
        if (!row || !row.assetImmaterialAF || !row.assetImmaterialAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.assetImmaterialAF.length; i++) {
          total += parseInt(row.assetImmaterialAF[i].priceOwn) || 0;
        }
        return total;
      };
    })
    // Get total immovable assets (spouse + dependents)
    .filter('getTotalImmovableSpouse', function() {
      return function(row) {
        if (!row || !row.assetImmaterialAF || !row.assetImmaterialAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.assetImmaterialAF.length; i++) {
          total += (parseInt(row.assetImmaterialAF[i].priceHusbandWife) || 0) + (parseInt(row.assetImmaterialAF[i].priceDependants) || 0);
        }
        return total;
      };
    })
    // Get total immovable assets (joint share)
    .filter('getTotalImmovableJoint', function() {
      return function(row) {
        if (!row || !row.assetImmaterialAF || !row.assetImmaterialAF.length) return 0;
        var total = 0;
        for (var i = 0; i < row.assetImmaterialAF.length; i++) {
          total += parseInt(row.assetImmaterialAF[i].priceJointSharePart) || 0;
        }
        return total;
      };
    })
    // Get total all assets (movable + immovable)
    .filter('getTotalAllAssets', function() {
      return function(row) {
        if (!row) return 0;
        var totalMovableOwn = 0, totalMovableSpouse = 0;
        var totalImmovableOwn = 0, totalImmovableSpouse = 0, totalImmovableJoint = 0;

        if (row.assetMaterialAF && row.assetMaterialAF.length) {
          for (var i = 0; i < row.assetMaterialAF.length; i++) {
            totalMovableOwn += parseInt(row.assetMaterialAF[i].priceOwn) || 0;
            totalMovableSpouse += (parseInt(row.assetMaterialAF[i].priceHusbandWife) || 0) + (parseInt(row.assetMaterialAF[i].priceDependants) || 0);
          }
        }
        if (row.assetImmaterialAF && row.assetImmaterialAF.length) {
          for (var j = 0; j < row.assetImmaterialAF.length; j++) {
            totalImmovableOwn += parseInt(row.assetImmaterialAF[j].priceOwn) || 0;
            totalImmovableSpouse += (parseInt(row.assetImmaterialAF[j].priceHusbandWife) || 0) + (parseInt(row.assetImmaterialAF[j].priceDependants) || 0);
            totalImmovableJoint += parseInt(row.assetImmaterialAF[j].priceJointSharePart) || 0;
          }
        }
        return totalMovableOwn + totalMovableSpouse + totalImmovableOwn + totalImmovableSpouse + totalImmovableJoint;
      };
    });

})();
