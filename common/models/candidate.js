var multer = require('multer');
var fs = require('fs');
var Promises = require("q");
//var _ = require("underscore");
var getC3Data = function (value, key) {
  var array = [];
  for (var i = 0; i < value.length; i++) {
    if (value[i][key])
      array.push(value[i][key]);
  }
  var uniqueArray = array.filter(function (value, index) {
    return array.indexOf(value) === index;
  });
  var c3data = [];
  for (var i = 0; i < uniqueArray.length; i++) {
    c3data[i] = [];
    var total = 0;
    for (var j = 0; j < array.length; j++) {
      if (uniqueArray[i] === array[j]) {
        total++;
      }
    }
    c3data[i].push(uniqueArray[i]);
    c3data[i].push(total);
  }
  return c3data;
};
var getC3DataGroupBy = function (value, searchKey, groupKey) {


  var searchArray = [];
  var data = [];

  for (var i = 0; i < value.length; i++) {
    if (value[i][searchKey])
      searchArray.push(value[i][searchKey]);
  }
  for (var i = 0; i < value.length; i++) {
    if (value[i][groupKey])
      data.push(value[i][groupKey]().id);
  }

  searchArray = searchArray.filter(function (value, index) {
    return searchArray.indexOf(value) === index;
  });
  var groupArray = data.filter(function (val, index) {
    return data.indexOf(val) === index
  });

  var groupArrayObj = [];
  groupArray.forEach(function (groupString) {
    for (var i = 0; i < value.length; i++) {
      if (groupString === value[i][groupKey]().id) {
        groupArrayObj.push(value[i][groupKey]());
        break;
      }
    }
  });

  var table = [];
  //init table
  table[0] = JSON.parse(JSON.stringify(searchArray));
  if (Array.isArray(table[0]))
    table[0].unshift("Party");

  for (var i = 0; i < groupArray.length; i++) {
    table[i + 1] = new Array(searchArray.length);
    table[i + 1][0] = groupArray[i];
    for (var j = 0; j < searchArray.length; j++) {
      table[i + 1][j + 1] = 0;
    }
  }
  table[groupArray.length + 1] = new Array(searchArray.length);
  table[groupArray.length + 1][0] = "সর্বমোট";
  for (var j = 0; j < searchArray.length; j++) {
    table[groupArray.length + 1][j + 1] = 0;
  }
  var c3data = [];
  for (var i = 0; i < value.length; i++) {
    var searchIndex = searchArray.indexOf(value[i][searchKey]);
    var groupIndex = groupArray.indexOf(value[i][groupKey]().id);
    if (searchIndex !== -1 && groupIndex !== -1) {
      table[groupIndex + 1][searchIndex + 1]++;
    } else {


    }
  }
  for (var i = 0; i < groupArray.length; i++) {
    table[i + 1][0] = groupArrayObj[i].partyNameEn;
  }

  table[0].push("মোট");
  for (var i = 1; i < table.length; i++) {
    var sum = 0;
    for (var j = 1; j < table[i].length; j++) {
      sum += table[i][j];
    }
    table[i].push(sum);
  }
  for (var i = 1; i < table[0].length; i++) {
    var sum = 0;
    for (var j = 1; j < table.length; j++) {
      sum += table[j][i];
    }
    table[table.length - 1][i] = sum;
  }

  return table;
};
var getC3DataForOccupationGroupBy = function (value, searchKey, groupKey, lang) {


  var searchArray = [];
  var data = [];

  for (var i = 0; i < value.length; i++) {
    if (value[i][searchKey])
      searchArray.push(value[i][searchKey]);
  }
  for (var i = 0; i < value.length; i++) {
    if (value[i][groupKey])
      data.push(value[i][groupKey]().id);
  }

  searchArray = searchArray.filter(function (value, index) {
    return searchArray.indexOf(value) === index;
  });
  var groupArray = data.filter(function (val, index) {
    return data.indexOf(val) === index
  });

  var groupArrayObj = [];
  groupArray.forEach(function (groupString) {
    for (var i = 0; i < value.length; i++) {
      if (groupString === value[i][groupKey]().id) {
        groupArrayObj.push(value[i][groupKey]());
        break;
      }
    }
  });

  var table = [];
  //init table
  table[0] = JSON.parse(JSON.stringify(searchArray));
  if (Array.isArray(table[0])) {
    if (lang === "bn_BD") {
      table[0].unshift("পার্টি");
    } else {
      table[0].unshift("Party");
    }
  }


  for (var i = 0; i < groupArray.length; i++) {
    table[i + 1] = new Array(searchArray.length);
    table[i + 1][0] = groupArray[i];
    for (var j = 0; j < searchArray.length; j++) {
      table[i + 1][j + 1] = 0;
    }
  }
  table[groupArray.length + 1] = new Array(searchArray.length);
  if (lang === "bn_BD") {
    table[groupArray.length + 1][0] = "সর্বমোট";
  } else {
    table[groupArray.length + 1][0] = "Grand Total";
  }


  for (var j = 0; j < searchArray.length; j++) {
    table[groupArray.length + 1][j + 1] = 0;
  }
  var c3data = [];
  for (var i = 0; i < value.length; i++) {
    var searchIndex = searchArray.indexOf(value[i][searchKey]);
    var groupIndex = groupArray.indexOf(value[i][groupKey]().id);
    if (searchIndex !== -1 && groupIndex !== -1) {
      table[groupIndex + 1][searchIndex + 1]++;
    } else {


    }
  }
  for (var i = 0; i < groupArray.length; i++) {
    if (lang === "bn_BD") {
      table[i + 1][0] = groupArrayObj[i].partyNameBn;
    } else {
      table[i + 1][0] = groupArrayObj[i].partyNameEn;
    }

  }
  if (lang === "bn_BD") {
    table[0].push("মোট");
  } else {
    table[0].push("Total");
  }

  for (var i = 1; i < table.length; i++) {
    var sum = 0;
    for (var j = 1; j < table[i].length; j++) {
      sum += table[i][j];
    }
    table[i].push(sum);
  }
  for (var i = 1; i < table[0].length; i++) {
    var sum = 0;
    for (var j = 1; j < table.length; j++) {
      sum += table[j][i];
    }
    table[table.length - 1][i] = sum;
  }

  return table;
};
var groupCandidateByPoliticalParty = function (value, lang) {
  var groupKey = 'politicalPartyId';
  var groupModel = 'politicalParty';
  var groupCandidateData = [];
  var data = [];
  var counter = 0;
  for (var i = 0; i < value.length; i++) {
    if (value[i][groupKey]) {
      data.push(value[i][groupKey].toString());
      counter++;
    }

  }
  ////console.log("raw ", counter);

  var groupArray = data.filter(function (val, index) {
    return data.indexOf(val) === index
  });


  for (var i = 0; i < groupArray.length; i++) {
    groupCandidateData[i] = {};
    groupCandidateData[i].key = groupArray[i];
    groupCandidateData[i].value = [];
    for (var j = 0; j < value.length; j++) {
      if (value[j][groupKey] && groupArray[i] === value[j][groupKey].toString()) {
        groupCandidateData[i].value.push(value[j]);
        if (lang === 'bn_BD') {
          groupCandidateData[i].party = value[j].politicalParty().partyNameBn;
        }
        else {
          groupCandidateData[i].party = value[j].politicalParty().partyNameEn;
        }

      }
    }
  }


  return groupCandidateData;
};

var getC3DataPoliticalParty = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "বাংলাদেশ আওয়ামী লীগ" : "Bangladesh Awami Leage",
      key: "56a5e63d2d3f0c241322fc0c",
      total: 0
    },
    "_2": {
      title: lang === 'bn_BD' ? "বাংলাদেশ জাতীয়তাবাদী দল - বি.এন.পি" : "Bangladesh Nationalist Party-BNP",
      key:"56a5e63d2d3f0c241322fc0d",
      total: 0
    },
    "_3": {
      title: lang === 'bn_BD' ? "জাতীয় পার্টি" : "The Jatiya Party",
      key:"56a5e63d2d3f0c241322fc0f",
      total: 0
    },
    "_4": {
      title: lang === 'bn_BD' ? "বাংলাদেশ সমাজতান্ত্রিক দল" : "Bangladesh Samajtantrik dal",
      key: "56a5e63d2d3f0c241322fc1a",
      total: 0
    },
    "_5": {
      title: lang === 'bn_BD' ? "বাংলাদেশ জামায়াতে ইসলামী" : "Bangladesh Jamaat-e-Islami",
      key: "56a5e63d2d3f0c241322fc0e",
      total: 0
    },
    "_6": {
      title: lang === 'bn_BD' ? "ইসলামী ঐক্য জোট" : "Islami Oikya Jot",
      key: "56a5e63d2d3f0c241322fc10",
      total: 0
    },
    "_7": {
      title: lang === 'bn_BD' ? "জাতীয় পার্টি-জেপি" : "Jatiya Party-JP",
      key: "56a5e63d2d3f0c241322fc11",
      total: 0
    },
    "_8": {
      title: lang === 'bn_BD' ? "বাংলাদেশের সাম্যবাদী দল (এমএল)" : "Bangladesher Samyabadi Dal (ML)",
      key: "56a5e63d2d3f0c241322fc13",
      total: 0
    },
    "_9": {
      title: lang === 'bn_BD' ? "বাংলাদেশের কমিউনিষ্ট পার্টি" : "Bangladesher Communist Party",
      key: "56a5e63d2d3f0c241322fc14",
      total: 0
    },
    "_10": {
      title: lang === 'bn_BD' ? "বাংলাদেশ ইসলামী ফ্রন্ট" : "Bangladesh Islami Front",
      key: "56a5e63d2d3f0c241322fc15",
      total: 0
    },
    "_11": {
      title: lang === 'bn_BD' ? "লিবারেল ডেমোক্রেটিক পার্টি-এল.ডি.পি" : "Liberal Democratic Party-LDP",
      key: "56a5e63d2d3f0c241322fc16",
      total: 0
    },
    "_12": {
      title: lang === 'bn_BD' ? "বাংলাদেশ খেলাফত আন্দোলনি" : "Bangladesh Khelafot Andolon",
      key: "56a5e63d2d3f0c241322fc17",
      total: 0
    },
    "_13": {
      title: lang === 'bn_BD' ? "বাংলাদেশ মুসলিম লীগ" : "Bangladesh Muslim League",
      key: "56a5e63d2d3f0c241322fc18",
      total: 0
    },
    "_14": {
      title: lang === 'bn_BD' ? "বাংলাদেশ ন্যাশনাল আওয়ামী পার্টি" : "Bangladesh National Awami Party",
      key: "56a5e63d2d3f0c241322fc19",
      total: 0
    },
    "_15": {
      title: lang === 'bn_BD' ? "জাতীয় সমাজতান্ত্রিক দল-জেএসডি" : "Bangladesh Samajtantrik Dal-JSD",
      key: "56a5e63d2d3f0c241322fc1b",
      total: 0
    },
    "_16": {
      title: lang === 'bn_BD' ? "বাংলাদেশ ওয়ার্কার্স পার্টি" : "Bangladesh Workers Party",
      key: "56a5e63d2d3f0c241322fc1c",
      total: 0
    },
    "_17": {
      title: lang === 'bn_BD' ? "গণফোরাম" : "Gono Forum",
      key: "56a5e63d2d3f0c241322fc1e",
      total: 0
    },
    "_18": {
      title: lang === 'bn_BD' ? "গণতন্ত্রী পার্টি" : "Gonotontry Party",
      key: "56a5e63d2d3f0c241322fc1f",
      total: 0
    },
    "_19": {
      title: lang === 'bn_BD' ? "জাকের পার্টি" : "Jaker Party",
      key: "56a5e63d2d3f0c241322fc21",
      total: 0
    },
    "_20": {
      title: lang === 'bn_BD' ? "জাতীয় গণতান্ত্রিক পার্টি" : "Jatiya Gonotantrik Party",
      key: "56a5e63d2d3f0c241322fc22",
      total: 0
    },
    "_21": {
      title: lang === 'bn_BD' ? "বাংলাদেশ মুসলিম লীগ-বি.এম.এল" : "Bangladesh Muslim Leage - BML",
      key: "571876d43615d6592bf8311b",
      total: 0
    },
    "_22": {
      title: lang === 'bn_BD' ? "বাংলাদেশ সাংস্কৃতিক মুক্তিজোট (মুক্তিজোট)" : "Bangladesh Sangskritik Muktijot (Muktijot)",
      key: "571877243615d6592bf8311c",
      total: 0
    },
    "_23": {
      title: lang === 'bn_BD' ? "ফ্রীডম পার্টি" : "Freedom Party",
      key: "5c07b6e0508f6c640ad5de91",
      total: 0
    },
    "_24": {
      title: lang === 'bn_BD' ? "লিবারেল ডেমোক্রেটিক পার্টি-এল.ডি.পি" : "Liberal Democratic Party-LDP",
      key: "56a5e63d2d3f0c241322fc16",
      total: 0
    },
    "_25": {
      title: lang === 'bn_BD' ? "বাংলাদেশ খেলাফত আন্দোলন" : "Bangladesh Khelafot Andolon",
      key: "56a5e63d2d3f0c241322fc17",
      total: 0
    },
    "_26": {
      title: lang === 'bn_BD' ? "বিএনএফ" : "BNF",
      key: "56a5e63d2d3f0c241322fc38",
      total: 0
    },
    "_27": {
      title: lang === 'bn_BD' ? "জাতীয় সমাজতান্ত্রিক দল-জাসদ" : "Jatiya Shamajtantrik Dal-Jasad",
      key: "56a5e63d2d3f0c241322fc24",
      total: 0
    },
    "_28": {
      title: lang === 'bn_BD' ? "কৃষক শ্রমিক জনতা লীগ" : "Krishak Sramik Janata League",
      key: "56a5e63d2d3f0c241322fc26",
      total: 0
    },
    "_29": {
      title: lang === 'bn_BD' ? "স্বতন্ত্র" : "Shotontro",
      key: "56a5e63d2d3f0c241322fc27",
      total: 0
    },
    "_30": {
      title: lang === 'bn_BD' ? "বিকল্পধারা বাংলাদেশ" : "Bekolpodhara Bangladesh",
      key: "56a5e63d2d3f0c241322fc28",
      total: 0
    },
    "_31": {
      title: lang === 'bn_BD' ? "বাংলাদেশ কল্যাণ পার্টি" : "Bangladesh Kallyan Party",
      key: "56a5e63d2d3f0c241322fc29",
      total: 0
    },
    "_32": {
      title: lang === 'bn_BD' ? "ইসলামী আন্দোলন বাংলাদেশ" : "Islami Andolon Bangladesh",
      key: "56a5e63d2d3f0c241322fc2a",
      total: 0
    },
    "_33": {
      title: lang === 'bn_BD' ? "ন্যাশনাল পিপলস পার্টি" : "National Peoples Party",
      key: "56a5e63d2d3f0c241322fc2b",
      total: 0
    },
    "_34": {
      title: lang === 'bn_BD' ? "বাংলাদেশ জাতীয় পার্টি-বিজেপি" : "Bangladesh Jatiya Party-BJP",
      key: "56a5e63d2d3f0c241322fc2c",
      total: 0
    },
    "_35": {
      title: lang === 'bn_BD' ? "গণফ্রন্ট" : "Gonofront",
      key: "56a5e63d2d3f0c241322fc2e",
      total: 0
    },
    "_36": {
      title: lang === 'bn_BD' ? "প্রগতিশীল গণতান্ত্রিক দল" : "Progressive Democratic Party",
      key: "56a5e63d2d3f0c241322fc2f",
      total: 0
    },
    "_37": {
      title: lang === 'bn_BD' ? "বাংলাদেশ তরিকত ফেডারেশন" : "Bangladesh Tarikat Fedaration",
      key: "56a5e63d2d3f0c241322fc2d",
      total: 0
    },
    "_38": {
      title: lang === 'bn_BD' ? "ঐক্যবদ্ধ নাগরিক আন্দোলন" : "Alliance of Nagorik Andolon",
      key: "56a5e63d2d3f0c241322fc31",
      total: 0
    },
    "_39": {
      title: lang === 'bn_BD' ? "ইসলামিক ফ্রন্ট বাংলাদেশ" : "Islamic Front Bangladesh",
      key: "56a5e63d2d3f0c241322fc32",
      total: 0
    },
    "_40": {
      title: lang === 'bn_BD' ? "বাংলাদেশ খেলাফত মজলিস" : "Bangladesh Khelafot Mojlish",
      key: "56a5e63d2d3f0c241322fc33",
      total: 0
    },
    "_41": {
      title: lang === 'bn_BD' ? "বাংলাদেশের বিপ্লবী ওয়ার্কার্স পার্টি" : "Bangladesher Biplobi Workers Party",
      key: "56a5e63d2d3f0c241322fc34",
      total: 0
    },
    "_42": {
      title: lang === 'bn_BD' ? "খেলাফত মজলিস" : "Khelafat Majlish",
      key: "56a5e63d2d3f0c241322fc35",
      total: 0
    },
    "_43": {
      title: lang === 'bn_BD' ? "জমিয়তে উলামায়ে ইসলাম বাংলাদেশ" : "Jamiate Ulamaye Islam Bangladsesh",
      key: "56a5e63d2d3f0c241322fc36",
      total: 0
    },
    "_44": {
      title: lang === 'bn_BD' ? "নির্দলীয় প্রার্থী" : "No Party",
      key: "56a5e63d2d3f0c241322fc37",
      total: 0
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      key: "মোট",
      total: 0
    }
  };
  value.forEach(function (candi) {
    if (candi[key]) {
      if (asset._1.key == candi[key]) {
        asset._1.total++;
      }
      else if (asset._2.key == candi[key]) {
        asset._2.total++;
      }
      else if (asset._3.key == candi[key]) {
        asset._3.total++;
      }
      else if (asset._4.key == candi[key]) {
        asset._4.total++;
      }
      else if (asset._5.key == candi[key]) {
        asset._5.total++;
      }
      else if (asset._6.key == candi[key]) {
        asset._6.total++;
      }
      else if (asset._7.key == candi[key]) {
        asset._7.total++;
      }
      else if (asset._8.key == candi[key]) {
        asset._8.total++;
      }
      else if (asset._9.key == candi[key]) {
        asset._9.total++;
      }
      else if (asset._10.key == candi[key]) {
        asset._10.total++;
      }
      else if (asset._11.key == candi[key]) {
        asset._11.total++;
      }
      else if (asset._12.key == candi[key]) {
        asset._12.total++;
      }
      else if (asset._13.key == candi[key]) {
        asset._13.total++;
      }
      else if (asset._14.key == candi[key]) {
        asset._14.total++;
      }
      else if (asset._15.key == candi[key]) {
        asset._15.total++;
      }
      else if (asset._16.key == candi[key]) {
        asset._16.total++;
      }
      else if (asset._17.key == candi[key]) {
        asset._17.total++;
      }
      else if (asset._18.key == candi[key]) {
        asset._18.total++;
      }
      else if (asset._19.key == candi[key]) {
        asset._19.total++;
      }
      else if (asset._20.key == candi[key]) {
        asset._20.total++;
      }
      else if (asset._21.key == candi[key]) {
        asset._21.total++;
      }
      else if (asset._22.key == candi[key]) {
        asset._22.total++;
      }
      else if (asset._23.key == candi[key]) {
        asset._23.total++;
      }
      else if (asset._24.key == candi[key]) {
        asset._24.total++;
      }
      else if (asset._25.key == candi[key]) {
        asset._25.total++;
      }
      else if (asset._26.key == candi[key]) {
        asset._26.total++;
      }
      else if (asset._27.key == candi[key]) {
        asset._27.total++;
      }
      else if (asset._28.key == candi[key]) {
        asset._28.total++;
      }
      else if (asset._29.key == candi[key]) {
        asset._29.total++;
      }
      else if (asset._30.key == candi[key]) {
        asset._30.total++;
      }
      else if (asset._31.key == candi[key]) {
        asset._31.total++;
      }
      else if (asset._32.key == candi[key]) {
        asset._32.total++;
      }
      else if (asset._33.key == candi[key]) {
        asset._33.total++;
      }
      else if (asset._34.key == candi[key]) {
        asset._34.total++;
      }
      else if (asset._35.key == candi[key]) {
        asset._35.total++;
      }
      else if (asset._36.key == candi[key]) {
        asset._36.total++;
      }
      else if (asset._37.key == candi[key]) {
        asset._37.total++;
      }
      else if (asset._38.key == candi[key]) {
        asset._38.total++;
      }
      else if (asset._39.key == candi[key]) {
        asset._39.total++;
      }
      else if (asset._40.key == candi[key]) {
        asset._40.total++;
      }
      else if (asset._41.key == candi[key]) {
        asset._41.total++;
      }
      else if (asset._42.key == candi[key]) {
        asset._42.total++;
      }
      else if (asset._43.key == candi[key]) {
        asset._43.total++;
      }
      else if (asset._44.key == candi[key]) {
        asset._44.total++;
      }
    }
  });

  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset._7.total +
    asset._8.total +
    asset._9.total +
    asset._10.total +
    asset._11.total +
    asset._12.total +
    asset._13.total +
    asset._14.total +
    asset._15.total +
    asset._16.total +
    asset._17.total +
    asset._18.total +
    asset._19.total +
    asset._20.total +
    asset._21.total +
    asset._22.total +
    asset._23.total +
    asset._24.total +
    asset._25.total +
    asset._26.total +
    asset._27.total +
    asset._28.total +
    asset._29.total +
    asset._30.total +
    asset._31.total +
    asset._32.total +
    asset._33.total +
    asset._34.total +
    asset._35.total +
    asset._36.total +
    asset._37.total +
    asset._38.total +
    asset._39.total +
    asset._40.total +
    asset._41.total +
    asset._42.total +
    asset._43.total +
    asset._44.total;

  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset._7.title, asset._7.total];
  c3data[7] = [asset._8.title, asset._8.total];
  c3data[8] = [asset._9.title, asset._9.total];
  c3data[9] = [asset._10.title, asset._10.total];
  c3data[10] = [asset._11.title, asset._11.total];
  c3data[11] = [asset._12.title, asset._12.total];
  c3data[12] = [asset._13.title, asset._13.total];
  c3data[13] = [asset._14.title, asset._14.total];
  c3data[14] = [asset._15.title, asset._15.total];
  c3data[15] = [asset._16.title, asset._16.total];
  c3data[16] = [asset._17.title, asset._17.total];
  c3data[17] = [asset._18.title, asset._18.total];
  c3data[18] = [asset._19.title, asset._19.total];
  c3data[19] = [asset._20.title, asset._20.total];
  c3data[20] = [asset._21.title, asset._21.total];
  c3data[21] = [asset._22.title, asset._22.total];
  c3data[22] = [asset._23.title, asset._23.total];
  c3data[23] = [asset._24.title, asset._24.total];
  c3data[24] = [asset._25.title, asset._25.total];
  c3data[25] = [asset._26.title, asset._26.total];
  c3data[26] = [asset._27.title, asset._27.total];
  c3data[27] = [asset._28.title, asset._28.total];
  c3data[28] = [asset._29.title, asset._29.total];
  c3data[29] = [asset._30.title, asset._30.total];
  c3data[30] = [asset._31.title, asset._31.total];
  c3data[31] = [asset._32.title, asset._32.total];
  c3data[32] = [asset._33.title, asset._33.total];
  c3data[33] = [asset._34.title, asset._34.total];
  c3data[34] = [asset._35.title, asset._35.total];
  c3data[35] = [asset._36.title, asset._36.total];
  c3data[36] = [asset._37.title, asset._37.total];
  c3data[37] = [asset._38.title, asset._38.total];
  c3data[38] = [asset._39.title, asset._39.total];
  c3data[39] = [asset._40.title, asset._40.total];
  c3data[40] = [asset._41.title, asset._41.total];
  c3data[41] = [asset._42.title, asset._42.total];
  c3data[42] = [asset._43.title, asset._43.total];
  c3data[43] = [asset._44.title, asset._44.total];

  return {table: asset, c3data: c3data};
};

var getCandidateCasesTable = function (data) {
  var totalCandidate = data.length;
  var presentCases = 0;
  var presentCandidate = 0;
  var pastCases = 0;
  var pastCandidate = 0;
  var presentCases302 = 0;
  var presentCandidate302 = 0;
  var pastCases302 = 0;
  var pastCandidate302 = 0;
  var bothCandidate = 0;
  var bothCandidate302 = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].lawPastCountAF) {
      pastCandidate++;
      pastCases += data[i].lawPastCountAF;
      if (JSON.stringify(data[i].lawPastAF)) {
        var count302 = (JSON.stringify(data[i].lawPastAF).match(/৩০২/g) || []).length;
        if (count302) {
          pastCases302 += count302;
          pastCandidate302++;
        }
      } else {
      }
    }
    if (data[i].lawPresentCountAF) {
      presentCandidate++;
      presentCases += data[i].lawPresentCountAF;
      if (JSON.stringify(data[i].lawPresentAF)) {
        var count302 = (JSON.stringify(data[i].lawPresentAF).match(/৩০২/g) || []).length;
        if (count302) {
          presentCases302 += count302;
          presentCandidate302++;
        }
      } else {
        ////console.log("false")
      }
    }
    if (data[i].lawPresentCountAF && data[i].lawPastCountAF) {
      bothCandidate++;
      var count302past = (JSON.stringify(data[i].lawPastAF).match(/৩০২/g) || []).length;
      var count302present = (JSON.stringify(data[i].lawPresentAF).match(/৩০২/g) || []).length;
      if (count302past !== 0 && count302present !== 0) {
        bothCandidate302++;
      }
    }


  }
  return {
    "totalCandidate": totalCandidate,
    "presentCases": presentCases,
    "presentCandidate": presentCandidate,
    "pastCases": pastCases,
    "pastCandidate": pastCandidate,
    "bothCandidate": bothCandidate,
    "presentCases302": presentCases302,
    "presentCandidate302": presentCandidate302,
    "pastCases302": pastCases302,
    "pastCandidate302": pastCandidate302,
    "bothCandidate302": bothCandidate302,
    "totalCases": presentCases + pastCases
  }
};
var getC3DataAsset = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "৫ লাখ টাকার নিচে" : "Below 5 lakh taka",
      total: 0,
      minRange: 0,
      maxRange: 500000,
      candidate1:[]
    },
    "_2": {
      title: lang === 'bn_BD' ? "৫ লাখ ১ টাকা থেকে ২৫ লাখ টাকা" : "5 lakh 1 taka to 25 lakh taka",
      total: 0,
      minRange: 500001,
      maxRange: 2500000,
      candidate2:[]
    },
    "_3": {
      title: lang === 'bn_BD' ? "২৫ লাখ ১ টাকা থেকে ৫০ লাখ টাকা" : "25 lakh 1 taka to 50 lakh taka",
      total: 0,
      minRange: 2500001,
      maxRange: 5000000,
      candidate3:[]
    },
    "_4": {
      title: lang === 'bn_BD' ? "৫০ লাখ ১ টাকা থেকে ১ কোটি টাকা" : "50 lakh 1 taka to 1 crore taka",
      total: 0,
      minRange: 5000001,
      maxRange: 10000000,
      candidate4:[]
    },
    "_5": {
      title: lang === 'bn_BD' ? "১ কোটি ১ টাকা থেকে ৫ কোটি টাকা" : "1 crore 1 taka to 5 crore taka",
      total: 0,
      minRange: 10000001,
      maxRange: 50000000,
      candidate5:[]
    },
    "_6": {
      title: lang === 'bn_BD' ? "৫ কোটি টাকার উপরে" : "Above 5 crore taka",
      total: 0,
      minRange: 50000001,
      maxRange: Infinity,
      candidate6:[]
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Not to mention",
      total: 0,
      minRange: 0,
      maxRange: 0,
      candidate7:[]
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      total: 0,
      minRange: 0,
      maxRange: 0
    }
  };
  value.forEach(function (candi) {
    var totalCandidateAsset=((candi.assetMaterialOwnTotalAF || 0)+(candi.assetImmaterialOwnTotalAF || 0)+(candi.assetJointSharePartTotalAF || 0)+(candi.assetMaterialHusbandWifeTotalAF || 0)+(candi.assetMaterialDependantsTotalAF || 0)+(candi.assetImmaterialHusbandWifeTotalAF || 0)+(candi.assetImmaterialDependantsTotalAF || 0));

    if (Number(candi[key])) {

      if (asset._1.minRange <= Number(totalCandidateAsset) && Number(totalCandidateAsset) <= asset._1.maxRange) {
        asset._1.total++;
        asset._1.candidate1.push(candi.candidateNameBnAF);
      }
      else if (asset._2.minRange <= Number(totalCandidateAsset) && Number(totalCandidateAsset) <= asset._2.maxRange) {
        asset._2.total++;
        asset._2.candidate2.push(candi.candidateNameBnAF);
      }
      else if (asset._3.minRange <= Number(totalCandidateAsset) && Number(totalCandidateAsset) <= asset._3.maxRange) {
        asset._3.total++;
        asset._3.candidate3.push(candi.candidateNameBnAF);
      }
      else if (asset._4.minRange <= Number(totalCandidateAsset) && Number(totalCandidateAsset) <= asset._4.maxRange) {
        asset._4.total++;
        asset._4.candidate4.push(candi.candidateNameBnAF);
      }
      else if (asset._5.minRange <= Number(totalCandidateAsset) && Number(totalCandidateAsset) <= asset._5.maxRange) {
        asset._5.total++;
        asset._5.candidate5.push(candi.candidateNameBnAF);
      }
      else if (asset._6.minRange <= Number(totalCandidateAsset) && Number(totalCandidateAsset) <= asset._6.maxRange) {
        asset._6.total++;
        asset._6.candidate6.push(candi.candidateNameBnAF);
      }

    } else {
      asset.unknown.total++;
      asset.unknown.candidate7.push(candi.candidateNameBnAF);
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset.unknown.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset.unknown.title, asset.unknown.total];
  return {table: asset, c3data: c3data};
};


var getC3DataLoan = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "৫ লাখ টাকার নিচে" : "Below 5 lakh taka",
      total: 0,
      minRange: 0,
      maxRange: 500000,
      candidate1:[]
    },
    "_2": {
      title: lang === 'bn_BD' ? "৫ লাখ ১ টাকা থেকে ২৫ লাখ টাকা" : "5 lakh 1 taka to 25 lakh taka",
      total: 0,
      minRange: 500001,
      maxRange: 2500000,
      candidate2:[]
    },
    "_3": {
      title: lang === 'bn_BD' ? "২৫ লাখ ১ টাকা থেকে ৫০ লাখ টাকা" : "25 lakh 1 taka to 50 lakh taka",
      total: 0,
      minRange: 2500001,
      maxRange: 5000000,
      candidate3:[]
    },
    "_4": {
      title: lang === 'bn_BD' ? "৫০ লাখ ১ টাকা থেকে ১ কোটি টাকা" : "50 lakh 1 taka to 1 crore taka",
      total: 0,
      minRange: 5000001,
      maxRange: 10000000,
      candidate4:[]
    },
    "_5": {
      title: lang === 'bn_BD' ? "১ কোটি ১ টাকা থেকে ৫ কোটি টাকা" : "1 crore 1 taka to 5 crore taka",
      total: 0,
      minRange: 10000001,
      maxRange: 50000000,
      candidate5:[]
    },
    "_6": {
      title: lang === 'bn_BD' ? "৫ কোটি টাকার উপরে" : "Above 5 crore taka",
      total: 0,
      minRange: 50000001,
      maxRange: Infinity,
      candidate6:[]
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Not to mention",
      total: 0,
      minRange: 0,
      maxRange: 0,
      candidate7:[]
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      total: 0,
      minRange: 0,
      maxRange: 0
    }
  };
  value.forEach(function (candi) {
    console.log(candi.liabilitiesAmountAF);
    var liabilityAF=candi.liabilitiesAmountAF;
    if (Number(candi[key])) {

      if (asset._1.minRange <= Number(liabilityAF) && Number(liabilityAF) <= asset._1.maxRange) {
        asset._1.total++;
        asset._1.candidate1.push(candi.candidateNameBnAF);
      }
      else if (asset._2.minRange <= Number(liabilityAF) && Number(liabilityAF) <= asset._2.maxRange) {
        asset._2.total++;
        asset._2.candidate2.push(candi.candidateNameBnAF);
      }
      else if (asset._3.minRange <= Number(liabilityAF) && Number(liabilityAF) <= asset._3.maxRange) {
        asset._3.total++;
        asset._3.candidate3.push(candi.candidateNameBnAF);
      }
      else if (asset._4.minRange <= Number(liabilityAF) && Number(liabilityAF) <= asset._4.maxRange) {
        asset._4.total++;
        asset._4.candidate4.push(candi.candidateNameBnAF);
      }
      else if (asset._5.minRange <= Number(liabilityAF) && Number(liabilityAF) <= asset._5.maxRange) {
        asset._5.total++;
        asset._5.candidate5.push(candi.candidateNameBnAF);
      }
      else if (asset._6.minRange <= Number(liabilityAF) && Number(liabilityAF) <= asset._6.maxRange) {
        asset._6.total++;
        asset._6.candidate6.push(candi.candidateNameBnAF);
      }

    } else {
      asset.unknown.total++;
      asset.unknown.candidate7.push(candi.candidateNameBnAF);
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset.unknown.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset.unknown.title, asset.unknown.total];
  return {table: asset, c3data: c3data};
};

var getC3DataLiability = function (value, key, lang) {
  var asset = {
    _1: {
      title: lang === "bn_BD" ? "৫ লাখ টাকার নিচে" : "Below 5 lakh taka",
      total: 0,
      minRange: 0,
      maxRange: 500000,
      candidate1: [],
    },
    _2: {
      title:
        lang === "bn_BD"
          ? "৫ লাখ ১ টাকা থেকে ২৫ লাখ টাকা"
          : "5 lakh 1 taka to 25 lakh taka",
      total: 0,
      minRange: 500001,
      maxRange: 2500000,
      candidate2: [],
    },
    _3: {
      title:
        lang === "bn_BD"
          ? "২৫ লাখ ১ টাকা থেকে ৫০ লাখ টাকা"
          : "25 lakh 1 taka to 50 lakh taka",
      total: 0,
      minRange: 2500001,
      maxRange: 5000000,
      candidate3: [],
    },
    _4: {
      title:
        lang === "bn_BD"
          ? "৫০ লাখ ১ টাকা থেকে ১ কোটি টাকা"
          : "50 lakh 1 taka to 1 crore taka",
      total: 0,
      minRange: 5000001,
      maxRange: 10000000,
      candidate4: [],
    },
    _5: {
      title:
        lang === "bn_BD"
          ? "১ কোটি ১ টাকা থেকে ৫ কোটি টাকা"
          : "1 crore 1 taka to 5 crore taka",
      total: 0,
      minRange: 10000001,
      maxRange: 50000000,
      candidate5: [],
    },
    _6: {
      title: lang === "bn_BD" ? "৫ কোটি টাকার উপরে" : "Above 5 crore taka",
      total: 0,
      minRange: 50000001,
      maxRange: Infinity,
      candidate6: [],
    },
    unknown: {
      title: lang === "bn_BD" ? "উল্লেখ নেই" : "Not to mention",
      total: 0,
      minRange: 0,
      maxRange: 0,
      candidate7: [],
    },
    totalCandidate: {
      title: lang === "bn_BD" ? "মোট" : "Total",
      total: 0,
      minRange: 0,
      maxRange: 0,
    },
  };
  value.forEach(function (candi) {
    console.log(candi.liabilitiesAmountAF);
    var liabilityAF = candi.liabilitiesAmountAF;
    if (Number(candi[key])) {
      if (
        asset._1.minRange <= Number(liabilityAF) &&
        Number(liabilityAF) <= asset._1.maxRange
      ) {
        asset._1.total++;
        asset._1.candidate1.push(candi.candidateNameBnAF);
      } else if (
        asset._2.minRange <= Number(liabilityAF) &&
        Number(liabilityAF) <= asset._2.maxRange
      ) {
        asset._2.total++;
        asset._2.candidate2.push(candi.candidateNameBnAF);
      } else if (
        asset._3.minRange <= Number(liabilityAF) &&
        Number(liabilityAF) <= asset._3.maxRange
      ) {
        asset._3.total++;
        asset._3.candidate3.push(candi.candidateNameBnAF);
      } else if (
        asset._4.minRange <= Number(liabilityAF) &&
        Number(liabilityAF) <= asset._4.maxRange
      ) {
        asset._4.total++;
        asset._4.candidate4.push(candi.candidateNameBnAF);
      } else if (
        asset._5.minRange <= Number(liabilityAF) &&
        Number(liabilityAF) <= asset._5.maxRange
      ) {
        asset._5.total++;
        asset._5.candidate5.push(candi.candidateNameBnAF);
      } else if (
        asset._6.minRange <= Number(liabilityAF) &&
        Number(liabilityAF) <= asset._6.maxRange
      ) {
        asset._6.total++;
        asset._6.candidate6.push(candi.candidateNameBnAF);
      }
    } else {
      asset.unknown.total++;
      asset.unknown.candidate7.push(candi.candidateNameBnAF);
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset.unknown.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset.unknown.title, asset.unknown.total];
  return { table: asset, c3data: c3data };
};

// Helper function to calculate total income from new incomeSourceAF array structure
var calculateTotalIncome = function (candi, incomeType) {
  var total = 0;

  // Try new structure first: incomeSourceAF array with ownDomestic, ownForeign, dependentsDomestic, dependentsForeign
  if (candi.incomeSourceAF && Array.isArray(candi.incomeSourceAF)) {
    candi.incomeSourceAF.forEach(function(source) {
      if (incomeType === 'domestic') {
        total += (parseFloat(source.ownDomestic) || 0) + (parseFloat(source.dependentsDomestic) || 0);
      } else if (incomeType === 'foreign') {
        total += (parseFloat(source.ownForeign) || 0) + (parseFloat(source.dependentsForeign) || 0);
      } else {
        // total - all income
        total += (parseFloat(source.ownDomestic) || 0) +
                 (parseFloat(source.ownForeign) || 0) +
                 (parseFloat(source.dependentsDomestic) || 0) +
                 (parseFloat(source.dependentsForeign) || 0);
      }
    });
  }

  // Fallback to old structure if no new data
  if (total === 0) {
    if (candi.grandTotalIncomeAF) {
      total = parseFloat(candi.grandTotalIncomeAF) || 0;
    } else if (candi.totalOwnIncomeAF) {
      total = parseFloat(candi.totalOwnIncomeAF) || 0;
    }
  }

  return total;
};

var getC3DataIncome = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "২ লাখ টাকার নিচে" : "Below 2 lakh taka",
      //titleEn: "Below 2 lakh taka",
      total: 0,
      minRange: 0,
      maxRange: 200000,
      candidate1:[]
    },
    "_2": {
      title: lang === 'bn_BD' ? "২ লাখ ১ টাকা থেকে ৫ লাখ টাকা" : "2 lakh 1 taka to 5 lakh taka",
      //titleEn: "2 lakh 1 taka to 5 lakh taka",
      total: 0,
      minRange: 200001,
      maxRange: 500000,
      candidate2:[]
    },
    "_3": {
      title: lang === 'bn_BD' ? "৫ লাখ ১ টাকা থেকে ২৫ লাখ টাকা" : "5 lakh 1 taka to 25 lakh taka",
      //titleEn: "5 lakh 1 taka to 25 lakh taka",
      total: 0,
      minRange: 500001,
      maxRange: 2500000,
      candidate3:[]
    },
    "_4": {
      title: lang === 'bn_BD' ? "২৫ লাখ ১ টাকা থেকে ৫০ লাখ টাকা" : "25 lakh 1 taka to 50 lakh taka",
      //titleEn: "25 lakh 1 taka to 50 lakh taka",
      total: 0,
      minRange: 2500001,
      maxRange: 5000000,
      candidate4:[]
    },
    "_5": {
      title: lang === 'bn_BD' ? "৫০ লাখ ১ টাকা থেকে ১ কোটি টাকা" : "50 lakh 1 taka to 1 crore taka",
      //titleEn: "50 lakh 1 taka to 1 crore taka",
      total: 0,
      minRange: 5000001,
      maxRange: 10000000,
      candidate5:[]
    },
    "_6": {
      title: lang === 'bn_BD' ? "১ কোটির উপরে" : "Above 1 crore taka",
      //titleEn: "Above 1 crore taka",
      total: 0,
      minRange: 10000001,
      maxRange: Infinity,
      candidate6:[]
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Not to mention",
      //titleEn: "Not to mention",
      total: 0,
      minRange: 0,
      maxRange: 0,
      candidate7:[]
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      //titleEn: "Total",
      total: 0,
      minRange: 0,
      maxRange: 0
    }
  };
  value.forEach(function (candi) {
    // Use new calculateTotalIncome helper for new incomeSourceAF structure, with fallback to old fields
    var incomeValue = calculateTotalIncome(candi, key === 'domestic' ? 'domestic' : (key === 'foreign' ? 'foreign' : 'total'));
    var candidateName = candi.candidateNameBnAF || candi.personNameBn || '';

    if (incomeValue > 0) {
      if (asset._1.minRange <= incomeValue && incomeValue <= asset._1.maxRange) {
        asset._1.total++;
        asset._1.candidate1.push(candidateName);
      }
      else if (asset._2.minRange <= incomeValue && incomeValue <= asset._2.maxRange) {
        asset._2.total++;
        asset._2.candidate2.push(candidateName);
      }
      else if (asset._3.minRange <= incomeValue && incomeValue <= asset._3.maxRange) {
        asset._3.total++;
        asset._3.candidate3.push(candidateName);
      }
      else if (asset._4.minRange <= incomeValue && incomeValue <= asset._4.maxRange) {
        asset._4.total++;
        asset._4.candidate4.push(candidateName);
      }
      else if (asset._5.minRange <= incomeValue && incomeValue <= asset._5.maxRange) {
        asset._5.total++;
        asset._5.candidate5.push(candidateName);
      }
      else if (asset._6.minRange <= incomeValue && incomeValue <= asset._6.maxRange) {
        asset._6.total++;
        asset._6.candidate6.push(candidateName);
      }
    } else {
      asset.unknown.total++;
      asset.unknown.candidate7.push(candidateName);
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset.unknown.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset.unknown.title, asset.unknown.total];
  return {table: asset, c3data: c3data};
};

var getC3DataIncomeWithDependent = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "২ লাখ টাকার নিচে" : "Below 2 lakh taka",
      //titleEn: "Below 2 lakh taka",
      total: 0,
      minRange: 0,
      maxRange: 200000
    },
    "_2": {
      title: lang === 'bn_BD' ? "২ লাখ ১ টাকা থেকে ৫ লাখ টাকা" : "2 lakh 1 taka to 5 lakh taka",
      //titleEn: "2 lakh 1 taka to 5 lakh taka",
      total: 0,
      minRange: 200001,
      maxRange: 500000
    },
    "_3": {
      title: lang === 'bn_BD' ? "৫ লাখ ১ টাকা থেকে ২৫ লাখ টাকা" : "5 lakh 1 taka to 25 lakh taka",
      //titleEn: "5 lakh 1 taka to 25 lakh taka",
      total: 0,
      minRange: 500001,
      maxRange: 2500000
    },
    "_4": {
      title: lang === 'bn_BD' ? "২৫ লাখ ১ টাকা থেকে ৫০ লাখ টাকা" : "25 lakh 1 taka to 50 lakh taka",
      //titleEn: "25 lakh 1 taka to 50 lakh taka",
      total: 0,
      minRange: 2500001,
      maxRange: 5000000
    },
    "_5": {
      title: lang === 'bn_BD' ? "৫০ লাখ ১ টাকা থেকে ১ কোটি টাকা" : "50 lakh 1 taka to 1 crore taka",
      //titleEn: "50 lakh 1 taka to 1 crore taka",
      total: 0,
      minRange: 5000001,
      maxRange: 10000000
    },
    "_6": {
      title: lang === 'bn_BD' ? "১ কোটির উপরে" : "Above 1 crore taka",
      //titleEn: "Above 1 crore taka",
      total: 0,
      minRange: 10000001,
      maxRange: Infinity
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Not to mention",
      //titleEn: "Not to mention",
      total: 0,
      minRange: 0,
      maxRange: 0
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      //titleEn: "Total",
      total: 0,
      minRange: 0,
      maxRange: 0
    }
  };
  value.forEach(function (candi) {
    if (Number(candi[key[0]])) {


      if (asset._1.minRange <= Number(candi[key[0]])  && Number(candi[key[0]]) <= asset._1.maxRange) {
        asset._1.total++;
      }
      else if (asset._2.minRange <= Number(candi[key[0]]) && Number(candi[key[0]]) <= asset._2.maxRange) {
        asset._2.total++;
      }
      else if (asset._3.minRange <= Number(candi[key[0]]) && Number(candi[key[0]]) <= asset._3.maxRange) {
        asset._3.total++;
      }
      else if (asset._4.minRange <= Number(candi[key[0]]) && Number(candi[key[0]]) <= asset._4.maxRange) {
        asset._4.total++;
      }
      else if (asset._5.minRange <= Number(candi[key[0]]) && Number(candi[key[0]]) <= asset._5.maxRange) {
        asset._5.total++;
      }
      else if (asset._6.minRange <= Number(candi[key[0]]) && Number(candi[key[0]]) <= asset._6.maxRange) {
        asset._6.total++;
      }

    } else {
      asset.unknown.total++;
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset.unknown.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset.unknown.title, asset.unknown.total];
  return {table: asset, c3data: c3data};
};

var getC3DataTax = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "৫ হাজার টাকার নিচে" : "Below 5 thousand taka",
      total: 0,
      minRange: 0,
      maxRange: 5000,
      candidate1:[]
    },
    "_2": {
      title: lang === 'bn_BD' ? "৫ হাজার ১ টাকা থেকে ১০ হাজার টাকা" : "5 thousand taka to 10 thousand taka",
      total: 0,
      minRange: 5001,
      maxRange: 10000,
      candidate2:[]
    },
    "_3": {
      title: lang === 'bn_BD' ? "১০ হাজার ১ টাকা থেকে ৫০ হাজার টাকা" : "10 thousand taka to 50 thousand taka",
      total: 0,
      minRange: 10001,
      maxRange: 50000,
      candidate3:[]
    },
    "_4": {
      title: lang === 'bn_BD' ? "৫০ হাজার ১ টাকা থেকে ১ লাখ টাকা" : "50 thousand taka to 1 lakh taka",
      total: 0,
      minRange: 50001,
      maxRange: 100000,
      candidate4:[]
    },
    "_5": {
      title: lang === 'bn_BD' ? "১ লাখ ১ টাকা থেকে ৫ লাখ টাকা" : "1 lakh taka to 5 lakh taka",
      total: 0,
      minRange: 100001,
      maxRange: 500000,
      candidate5:[]
    },
    "_6": {
      title: lang === 'bn_BD' ? "৫ লাখ ১ টাকা থেকে ১০ লাখ টাকা" : "5 lakh taka to 10 lakh taka",
      total: 0,
      minRange: 500001,
      maxRange: 1000000,
      candidate6:[]
    },
    "_7": {
      title: lang === 'bn_BD' ? "১০ লাখ টাকার উপরে" : "Above 10 lakh taka",
      total: 0,
      minRange: 1000001,
      maxRange: Infinity,
      candidate7:[]
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Unknown",
      total: 0,
      minRange: 0,
      maxRange: 0,
      candidate8:[]
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      total: 0,
      minRange: 0,
      maxRange: 0
    }
  };
  value.forEach(function (candi) {
    if (Number(candi[key])) {

      if (asset._1.minRange <= Number(candi[key]) && Number(candi[key]) <= asset._1.maxRange) {
        asset._1.total++;
        asset._1.candidate1.push(candi.candidateNameBnAF);
      }
      else if (asset._2.minRange <= Number(candi[key]) && Number(candi[key]) <= asset._2.maxRange) {
        asset._2.total++;
        asset._2.candidate2.push(candi.candidateNameBnAF);
      }
      else if (asset._3.minRange <= Number(candi[key]) && Number(candi[key]) <= asset._3.maxRange) {
        asset._3.total++;
        asset._3.candidate3.push(candi.candidateNameBnAF);
      }
      else if (asset._4.minRange <= Number(candi[key]) && Number(candi[key]) <= asset._4.maxRange) {
        asset._4.total++;
        asset._4.candidate4.push(candi.candidateNameBnAF);
      }
      else if (asset._5.minRange <= Number(candi[key]) && Number(candi[key]) <= asset._5.maxRange) {
        asset._5.total++;
        asset._5.candidate5.push(candi.candidateNameBnAF);
      }
      else if (asset._6.minRange <= Number(candi[key]) && Number(candi[key]) <= asset._6.maxRange) {
        asset._6.total++;
        asset._6.candidate6.push(candi.candidateNameBnAF);
      }
      else if (asset._7.minRange <= Number(candi[key]) && Number(candi[key]) <= asset._7.maxRange) {
        asset._7.total++;
        asset._7.candidate7.push(candi.candidateNameBnAF);
      }

    } else {
      asset.unknown.total++;
      asset.unknown.candidate8.push(candi.candidateNameBnAF);
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset._7.total +
    asset.unknown.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset._7.title, asset._7.total];
  c3data[7] = [asset.unknown.title, asset.unknown.total];
  return {table: asset, c3data: c3data};
};

var getC3DataTopCandidate = function (value, lang) {

  var c3data = [];
  for(var i=0; i<value.length; i++){
    c3data[i] = [{candidateName:value[i].candidateNameBnAF, percentageofCandidateVote:value[i].totalCountVote}];
  }
  return {c3data: c3data};
};

var getC3DataOccupation = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "কৃষি" : "Agriculture",
      key: "কৃষি",
      total: 0,
      candidate1:[]
    },
    "_2": {
      title: lang === 'bn_BD' ? "ব্যবসা" : "Business",
      key: "ব্যবসা",
      total: 0,
      candidate2:[]
    },
    "_3": {
      title: lang === 'bn_BD' ? "চাকুরি" : "Job",
      key: "চাকুরি",
      total: 0,
      candidate3:[]
    },
    "_4": {
      title: lang === 'bn_BD' ? "আইনজীবী" : "Lawyer",
      key: "আইনজীবী",
      total: 0,
      candidate4:[]
    },
    "_5": {
      title: lang === 'bn_BD' ? "গৃহিনী" : "Housewife",
      keys: ["গৃহিনী", "গৃহিণী"],
      total: 0,
      candidate5:[]
    },
    "_6": {
      title: lang === 'bn_BD' ? "রাজনীতিবিদ" : "Politician",
      keys: ["রাজনীতিবিদ", "রাজনীতি"],
      total: 0,
      candidate6:[]
    },
    "_7": {
      title: lang === 'bn_BD' ? "শিক্ষকতা" : "Teaching",
      key: "শিক্ষকতা",
      total: 0,
      candidate7:[]
    },
    "_8": {
      title: lang === 'bn_BD' ? "অবসরপ্রাপ্ত" : "Retired",
      key: "অবসরপ্রাপ্ত-চাকুরীজীবি",
      total: 0,
      candidate8:[]
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Not to mention",
      key: "উল্লেখ নেই",
      total: 0,
      candidate9:[]
    },
    "other": {
      title: lang === 'bn_BD' ? "অন্যান্য" : "Other",
      key: "অন্যান্য",
      total: 0,
      candidate10:[]
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      key: "মোট",
      total: 0
    }
  };
  value.forEach(function (candi) {
    // Use currentProfessionAF with fallback to professionTypeBnAF
    var profValue = candi.currentProfessionAF || candi[key];
    if (profValue) {
      if (asset._1.key == profValue) {
        asset._1.total++;
        asset._1.candidate1.push(candi.candidateNameBnAF);
      }
      else if (asset._2.key == profValue) {
        asset._2.total++;
        asset._2.candidate2.push(candi.candidateNameBnAF);
      }
      else if (asset._3.key == profValue) {
        asset._3.total++;
        asset._3.candidate3.push(candi.candidateNameBnAF);
      }
      else if (asset._4.key == profValue) {
        asset._4.total++;
        asset._4.candidate4.push(candi.candidateNameBnAF);
      }
      else if (asset._5.keys && asset._5.keys.indexOf(profValue) !== -1) {
        asset._5.total++;
        asset._5.candidate5.push(candi.candidateNameBnAF);
      }
      else if (asset._6.keys && asset._6.keys.indexOf(profValue) !== -1) {
        asset._6.total++;
        asset._6.candidate6.push(candi.candidateNameBnAF);
      }
      else if (asset._7.key == profValue) {
        asset._7.total++;
        asset._7.candidate7.push(candi.candidateNameBnAF);
      }
      else if (asset._8.key == profValue) {
        asset._8.total++;
        asset._8.candidate8.push(candi.candidateNameBnAF);
      }
      else if (asset.unknown.key == profValue) {
        asset.unknown.total++;
        asset.unknown.candidate9.push(candi.candidateNameBnAF);
      }
      else if (asset.other.key == profValue) {
        asset.other.total++;
        asset.other.candidate10.push(candi.candidateNameBnAF);
      }
      else {
        // Any unrecognized value goes to other
        asset.other.total++;
        asset.other.candidate10.push(candi.candidateNameBnAF);
      }
    } else {
      asset.unknown.total++;
      asset.unknown.candidate9.push(candi.candidateNameBnAF);
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset._7.total +
    asset._8.total +
    asset.unknown.total +
    asset.other.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset._7.title, asset._7.total];
  c3data[7] = [asset._8.title, asset._8.total];
  c3data[8] = [asset.unknown.title, asset.unknown.total];
  c3data[9] = [asset.other.title, asset.other.total];

  return {table: asset, c3data: c3data};
};
var getC3DataCommitmentsAchievements = function (value, key, lang) {
  var asset = {
    _1: {
      title: lang === "bn_BD" ? "প্রতিশ্রুতিসমূহ" : "Commitment",
      key: "প্রতিশ্রুতিসমূহ",
      commitments: []
    },
    _2: {
      title: lang === "bn_BD" ? "অর্জনসমূহ" : "Achievement",
      key: "অর্জনসমূহ",
      achievements: []
    },
  };
  value.forEach(function (candi) {
    if (candi[key]) {
      if (asset._1.key == candi[key]) {
        asset._1.commitments.push(candi.commitmentAndAchievementWhileMpAF);
      } else if (asset._2.key == candi[key]) {
        asset._2.achievements.push(candi.commitmentAndAchievementWhileMpAF);
      }
    }
  });
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];

  return { table: asset, c3data: c3data };
};
var getC3DataEducation = function (value, key, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "এসএসসির নীচে" : "Below SSC",
      key: "এসএসসির নীচে",
      total: 0,
      candidate1:[]
    },
    "_2": {
      title: lang === 'bn_BD' ? "এসএসসি" : "SSC",
      key: "এসএসসি",
      total: 0,
      candidate2:[]
    },
    "_3": {
      title: lang === 'bn_BD' ? "এইচএসসি" : "HSC",
      key: "এইচএসসি",
      total: 0,
      candidate3:[]
    },
    "_4": {
      title: lang === 'bn_BD' ? "স্নাতক" : "Graduate",
      key: "স্নাতক",
      total: 0,
      candidate4:[]
    },
    "_5": {
      title: lang === 'bn_BD' ? "স্নাতকোত্তর" : "Postgraduate",
      key: "স্নাতকোত্তর",
      total: 0,
      candidate5:[]
    },
    "_6": {
      title: lang === 'bn_BD' ? "পিএইচডি" : "PhD",
      key: "পিএইচডি",
      total: 0,
      candidate6:[]
    },
    "_7": {
      title: lang === 'bn_BD' ? "স্ব-শিক্ষিত" : "Self-educated",
      keys: ["স্ব-শিক্ষিত", "স্বশিক্ষিত"],
      total: 0,
      candidate7:[]
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Not to mention",
      key: "উল্লেখ নেই",
      total: 0,
      candidate8:[]
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      key: "মোট",
      total: 0
    }
  };
  value.forEach(function (candi) {
    if (candi[key]) {
      if (asset._1.key == candi[key]) {
        asset._1.total++;
        asset._1.candidate1.push(candi.candidateNameBnAF);
      }
      else if (asset._2.key == candi[key]) {
        asset._2.total++;
        asset._2.candidate2.push(candi.candidateNameBnAF);
      }
      else if (asset._3.key == candi[key]) {
        asset._3.total++;
        asset._3.candidate3.push(candi.candidateNameBnAF);
      }
      else if (asset._4.key == candi[key]) {
        asset._4.total++;
        asset._4.candidate4.push(candi.candidateNameBnAF);
      }
      else if (asset._5.key == candi[key]) {
        asset._5.total++;
        asset._5.candidate5.push(candi.candidateNameBnAF);
      }
      else if (asset._6.key == candi[key]) {
        asset._6.total++;
        asset._6.candidate6.push(candi.candidateNameBnAF);
      }
      else if (asset._7.keys.indexOf(candi[key]) !== -1) {
        asset._7.total++;
        asset._7.candidate7.push(candi.candidateNameBnAF);
      }
      else if (asset.unknown.key == candi[key]) {
        asset.unknown.total++;
        asset.unknown.candidate8.push(candi.candidateNameBnAF);
      }
    } else {
      asset.unknown.total++;
    }
  });
  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset._7.total +
    asset.unknown.total;
  var c3data = [];

  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset._7.title, asset._7.total];
  c3data[7] = [asset.unknown.title, asset.unknown.total];

  return {table: asset, c3data: c3data};
};
var getC3DataGender = function (value, key, lang) {
  var asset = {
    "male": {
      title: lang === 'bn_BD' ? "পুরুষ" : "Man",
      key: "পুরুষ",
      total: 0
    },
    "female": {
      title: lang === 'bn_BD' ? "মহিলা" : "Women",
      key: "মহিলা",
      total: 0
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      key: "মোট",
      total: 0
    }
  };
  value.forEach(function (candi) {
    if (candi[key]) {

      if (asset.male.key == candi[key]) {
        asset.male.total++;
      }
      else if (asset.female.key == candi[key]) {
        asset.female.total++;
      }

    } else {
      asset.female.total++;
    }
  });
  asset.totalCandidate.total =
    asset.male.total +
    asset.female.total;
  var c3data = [];

  c3data[0] = [asset.male.title, asset.male.total];
  c3data[1] = [asset.female.title, asset.female.total];
  return {table: asset, c3data: c3data};
};

// Helper function to calculate age from DOB
var calculateAge = function(candi) {
  // Try new ageYearsAF field first (direct age value from new form)
  if (candi.ageYearsAF) {
    // Convert Bengali numerals to English if needed
    var ageStr = String(candi.ageYearsAF);
    var bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    var english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (var i = 0; i < bengali.length; i++) {
      ageStr = ageStr.split(bengali[i]).join(english[i]);
    }
    var age = parseInt(ageStr);
    if (!isNaN(age) && age > 0) {
      return age;
    }
  }

  var dobDate = null;

  // Try candidateDateOfBirthBnAF
  var dob = candi.candidateDateOfBirthBnAF;
  if (dob && dob !== 'NULL' && dob !== 'null' && dob.indexOf && dob.indexOf('Invalid') === -1) {
    // Convert Bengali numerals to English if needed
    var bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    var english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (var i = 0; i < bengali.length; i++) {
      dob = dob.split(bengali[i]).join(english[i]);
    }
    dobDate = new Date(dob);
  }

  // Fallback to dobTR
  if (!dobDate || isNaN(dobDate.getTime())) {
    if (candi.dobTR && candi.dobTR !== 0) {
      dobDate = new Date(candi.dobTR);
    }
  }

  if (dobDate && !isNaN(dobDate.getTime())) {
    var today = new Date();
    var age = today.getFullYear() - dobDate.getFullYear();
    var monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age > 0 ? age : null;
  }
  return null;
};

var getC3DataAge = function (value, lang) {
  var asset = {
    "_1": {
      title: lang === 'bn_BD' ? "২৫-৩৫ বছর" : "25-35 years",
      min: 25,
      max: 35,
      total: 0,
      candidate1: []
    },
    "_2": {
      title: lang === 'bn_BD' ? "৩৬-৪৫ বছর" : "36-45 years",
      min: 36,
      max: 45,
      total: 0,
      candidate2: []
    },
    "_3": {
      title: lang === 'bn_BD' ? "৪৬-৫৫ বছর" : "46-55 years",
      min: 46,
      max: 55,
      total: 0,
      candidate3: []
    },
    "_4": {
      title: lang === 'bn_BD' ? "৫৬-৬৫ বছর" : "56-65 years",
      min: 56,
      max: 65,
      total: 0,
      candidate4: []
    },
    "_5": {
      title: lang === 'bn_BD' ? "৬৬-৭৫ বছর" : "66-75 years",
      min: 66,
      max: 75,
      total: 0,
      candidate5: []
    },
    "_6": {
      title: lang === 'bn_BD' ? "৭৫+ বছর" : "75+ years",
      min: 76,
      max: 200,
      total: 0,
      candidate6: []
    },
    "unknown": {
      title: lang === 'bn_BD' ? "উল্লেখ নেই" : "Not mentioned",
      total: 0,
      candidate7: []
    },
    "totalCandidate": {
      title: lang === 'bn_BD' ? "মোট" : "Total",
      total: 0
    }
  };

  value.forEach(function (candi) {
    var age = calculateAge(candi);
    var candidateName = candi.candidateNameBnAF || candi.personNameBn || '';

    if (age !== null) {
      if (age >= asset._1.min && age <= asset._1.max) {
        asset._1.total++;
        asset._1.candidate1.push(candidateName);
      } else if (age >= asset._2.min && age <= asset._2.max) {
        asset._2.total++;
        asset._2.candidate2.push(candidateName);
      } else if (age >= asset._3.min && age <= asset._3.max) {
        asset._3.total++;
        asset._3.candidate3.push(candidateName);
      } else if (age >= asset._4.min && age <= asset._4.max) {
        asset._4.total++;
        asset._4.candidate4.push(candidateName);
      } else if (age >= asset._5.min && age <= asset._5.max) {
        asset._5.total++;
        asset._5.candidate5.push(candidateName);
      } else if (age >= asset._6.min) {
        asset._6.total++;
        asset._6.candidate6.push(candidateName);
      } else {
        asset.unknown.total++;
        asset.unknown.candidate7.push(candidateName);
      }
    } else {
      asset.unknown.total++;
      asset.unknown.candidate7.push(candidateName);
    }
  });

  asset.totalCandidate.total =
    asset._1.total +
    asset._2.total +
    asset._3.total +
    asset._4.total +
    asset._5.total +
    asset._6.total +
    asset.unknown.total;

  var c3data = [];
  c3data[0] = [asset._1.title, asset._1.total];
  c3data[1] = [asset._2.title, asset._2.total];
  c3data[2] = [asset._3.title, asset._3.total];
  c3data[3] = [asset._4.title, asset._4.total];
  c3data[4] = [asset._5.title, asset._5.total];
  c3data[5] = [asset._6.title, asset._6.total];
  c3data[6] = [asset.unknown.title, asset.unknown.total];

  return {table: asset, c3data: c3data};
};

// Tax Return Summary by Party - shows income, assets, tax paid
var getTaxReturnSummaryByParty = function (data, lang) {
  var partyData = {};

  data.forEach(function(candi) {
    var partyName;
    if (candi.politicalPartyId && candi.politicalParty()) {
      var party = candi.politicalParty();
      partyName = lang === 'bn_BD' ? party.partyNameBn : party.partyNameEn;
    } else {
      partyName = lang === 'bn_BD' ? 'স্বতন্ত্র' : 'Independent';
    }

    if (!partyData[partyName]) {
      partyData[partyName] = {
        partyName: partyName,
        totalIncome: 0,
        totalAsset: 0,
        totalTaxPaid: 0,
        candidateCount: 0,
        candidates: []
      };
    }

    var income = parseFloat(candi.taxReturn1IncomeAF) || 0;
    var asset = parseFloat(candi.taxReturn1AssetAF) || 0;
    var taxPaid = parseFloat(candi.taxReturn1PaidAF) || 0;

    partyData[partyName].totalIncome += income;
    partyData[partyName].totalAsset += asset;
    partyData[partyName].totalTaxPaid += taxPaid;
    partyData[partyName].candidateCount++;
    partyData[partyName].candidates.push({
      name: candi.candidateNameBnAF || '',
      income: income,
      asset: asset,
      taxPaid: taxPaid
    });
  });

  // Convert to array and calculate averages
  var result = [];
  var grandTotal = {
    totalIncome: 0,
    totalAsset: 0,
    totalTaxPaid: 0,
    candidateCount: 0
  };

  Object.keys(partyData).forEach(function(key) {
    var party = partyData[key];
    party.avgIncome = party.candidateCount > 0 ? Math.round(party.totalIncome / party.candidateCount) : 0;
    party.avgAsset = party.candidateCount > 0 ? Math.round(party.totalAsset / party.candidateCount) : 0;
    party.avgTaxPaid = party.candidateCount > 0 ? Math.round(party.totalTaxPaid / party.candidateCount) : 0;
    result.push(party);

    grandTotal.totalIncome += party.totalIncome;
    grandTotal.totalAsset += party.totalAsset;
    grandTotal.totalTaxPaid += party.totalTaxPaid;
    grandTotal.candidateCount += party.candidateCount;
  });

  // Sort by candidate count descending
  result.sort(function(a, b) { return b.candidateCount - a.candidateCount; });

  return {
    table: result,
    grandTotal: grandTotal
  };
};

var simplifyPfse = function (table, lang) {
  //console.log("before simple");

  var simpleData = [];
  if (lang === 'bn_BD') {
    table.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameBn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "totalVoter": row.electionSeat ? (row.electionSeat.totalVoterMale+row.electionSeat.totalVoterFemale):null,
        "totalCastingVote": row.electionSeat ? row.electionSeat.totalCastingVote : null,
        "totalCountVote": row.candidate ? row.candidate.totalCountVote : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "candidateName": row.person ? row.person.personNameBn : null,
        "amount": row.income,
        "personId": row.person ? row.person.id : null
      });
    });
  } else {
    table.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameEn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "candidateName": row.person ? row.person.personNameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "personId": row.person ? row.person.id : null,
        "amount": row.income
      });
    });
  }
  //console.log("after simple");

  return sortByKey(simpleData, 'seatId');
};
var simplifyPfsePP = function (table, lang) {
  //console.log("before simple");

  var simpleData = [];
  if (lang === 'bn_BD') {
    table.forEach(function (row) {
      if(row.candidate.lawPresentAF){
        var countPresent302 = (JSON.stringify(row.candidate.lawPresentAF).match(/৩০২/g) || []).length;
      }
      if(row.candidate.lawPastAF){
        var countPast302 = (JSON.stringify(row.candidate.lawPastAF).match(/৩০২/g) || []).length;
      }
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameBn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "candidateName": row.person ? row.candidate.personNameBn : null,
        "amount": row.income ? row.income : null,
        "personId": row.person ? row.person.id : null,
        "fatherName": row.person ? row.candidate.fatherNameBn : null,
        "partyName": row.politicalParty ? row.politicalParty.partyNameBn : null,
        "professionTypeBnAF":row.candidate? row.candidate.professionTypeBnAF :null,
        "highestDegreeBnAF":row.candidate? row.candidate.highestDegreeBnAF :null,
        "totalOwnIncomeAF":row.candidate? row.candidate.totalOwnIncomeAF :null,
        "totalDependentIncomeAF":row.candidate? row.candidate.totalDependentIncomeAF :null,
        "asset":row.candidate? ((row.candidate.assetMaterialOwnTotalAF || 0)+(row.candidate.assetImmaterialOwnTotalAF || 0)+(row.candidate.assetJointSharePartTotalAF || 0)+(row.candidate.assetMaterialHusbandWifeTotalAF || 0)+(row.candidate.assetMaterialDependantsTotalAF || 0)+(row.candidate.assetImmaterialHusbandWifeTotalAF || 0)+(row.candidate.assetImmaterialDependantsTotalAF || 0)) :null,
        "loan":row.candidate? ((row.candidate.totalSingleAmountAF || 0)+(row.candidate.totalJointAmoutAF || 0)+(row.candidate.totalDirectorOrChairmenAmoutAF || 0)+(row.candidate.totalDependedantsAmountAF || 0)) :null,
        "_13Tax":row.candidate? row.candidate._13ApplicableTaxTR :null,
        "_14Tax":row.candidate? row.candidate._14TaxCommissionTR :null,
        "candidateDateOfBirthBnAF":row.candidate? row.candidate.candidateDateOfBirthBnAF :null,
        "liabilitiesAmountAF":row.candidate? row.candidate.liabilitiesAmountAF : null,
        "lawPresentCountAF":row.candidate? row.candidate.lawPresentCountAF : null,
        "lawPresentAF": countPresent302? "*" : null,
        "lawPastCountAF":row.candidate? row.candidate.lawPastCountAF : null,
        "lawPastAF":countPast302? "*" : null,
        "commitmentAndAchievementWhileMpAF": row.candidate.commitmentAndAchievementWhileMpAF ? row.candidate.commitmentAndAchievementWhileMpAF : []
      });
    });
  } else {
    table.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameEn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "candidateName": row.person ? row.person.personNameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "amount": row.income ? row.income : null,
        "personId": row.person ? row.person.id : null,
        "fatherName": row.person ? row.person.fatherNameEn : null,
        "partyName": row.politicalParty ? row.politicalParty.partyNameEn : null,
        "professionTypeBnAF":row.candidate? row.candidate.professionTypeBnAF :null,
        "highestDegreeBnAF":row.candidate? row.candidate.highestDegreeBnAF :null,
        "totalOwnIncomeAF":row.candidate? row.candidate.totalOwnIncomeAF :null,
        "totalDependentIncomeAF":row.candidate? row.candidate.totalDependentIncomeAF :null,
        "asset":row.candidate? (row.candidate.assetMaterialOwnTotalAF+row.candidate.assetImmaterialOwnTotalAF+row.candidate.assetJointSharePartTotalAF+row.candidate.assetMaterialHusbandWifeTotalAF+row.candidate.assetMaterialDependantsTotalAF+row.candidate.assetImmaterialHusbandWifeTotalAF+row.candidate.assetImmaterialDependantsTotalAF) :null,
        "loan":row.candidate? (row.candidate.totalSingleAmountAF+row.candidate.totalJointAmoutAF+row.candidate.totalDirectorOrChairmenAmoutAF+row.candidate.totalDependedantsAmountAF) :null,
        "_13Tax":row.candidate? row.candidate._13ApplicableTaxTR :null,
        "_14Tax":row.candidate? row.candidate._14TaxCommissionTR :null,
        "candidateDateOfBirthBnAF":row.candidate? row.candidate.candidateDateOfBirthBnAF :null
      });
    });
  }
  //console.log("after simple");

  return sortByKey(simpleData, 'seatId');
};
var simplifyPfseWhoCommitsForDonation = function (table, lang) {
  //console.log("before simple");

  var simpleData = [];
  if (lang === 'bn_BD') {
    table.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameBn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "candidateName": row.person ? row.person.personNameBn : null,
        "_1g_freeOtherTotalFSEE": row.candidate ? row.candidate._1g_freeOtherTotalFSEE : null,
        "_1g_freeOtherFSEE": row.candidate ? row.candidate._1g_freeOtherFSEE : null

      });
    });
  } else {
    table.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection?row.currentElection.electionId:null,
        //"currentElectionName": row.currentElection?row.currentElection.currentElectionNameEn:null,
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "candidateName": row.person ? row.person.personNameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "_1g_freeOtherTotalFSEE": row.candidate ? row.candidate._1g_freeOtherTotalFSEE : null,
        "_1g_freeOtherFSEE": row.candidate ? row.candidate._1g_freeOtherFSEE : null
      });
    });
  }
  //console.log("after simple");

  return sortByKey(simpleData, 'seatId');
};
var simplifyPfseGroupBySeatData = function (table, lang) {
  //console.log("before simple");

  var simpleData = [];
  if (lang === 'bn_BD') {
    table.forEach(function (row) {
      simpleData.push({
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "totalCandidate": row.totalCandidate,
        "totalAmount": row.totalAmount,
        "averageAmount": row.averageAmount
      });
    });
  } else {
    table.forEach(function (row) {
      simpleData.push({
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "totalCandidate": row.totalCandidate,
        "totalAmount": row.totalAmount,
        "averageAmount": row.averageAmount
      });
    });
  }
  //console.log("after simple");

  return sortByKey(simpleData, 'seatId');
};

var getC3Data6 = function (data) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    if (income >= 250000) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });


  return table;

};
var getC3Data5 = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });


  return table;

};
var getC3DataCandidatesDonation = function (data, limit, lang) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1c_freeRelativeTotalFSEE) || 0) + (Number(candidate._1e_freeManTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });


  return simplifyPfse(table, lang);

};

var getC3DataCandidatesLoan = function (data, limit, lang) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1b_loanRelativeTotalFSEE) || 0) + (Number(candidate._1d_loanManTotalFSEE) || 0);
    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });

  return simplifyPfse(table, lang);

};
var getC3DataCandidatesTotalIncome = function (data, limit, lang) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });

  return simplifyPfse(table, lang);

};
var getC3DataCandidatesPiWhichExceedsSpendingLimits = function (data, limit, lang) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });
  return simplifyPfse(table, lang);

};
var getC3DataCandidatesWhoAreElected = function (data, limit, lang) {

  var table = [];
  data.forEach(function (candidate) {
    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      income: 0,
      person: candidate.person()
    })
  });
  return simplifyPfse(table, lang);

};
var getC3DataCandidatesWhoWithPP = function (data, limit, lang) {

  var table = [];
  data.forEach(function (candidate) {
    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      income: 0,
      person: candidate.person(),
      politicalParty: candidate.politicalParty()
    })
  });
  return simplifyPfsePP(table, lang);

};
var sortByKey = function (array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};
var simplifyData = function (data, lang) {
  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameBn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "candidateName": row.person ? row.person.personNameBn : null
      });
    });
  } else {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection?row.currentElection.electionId:null,
        //"currentElectionName": row.currentElection?row.currentElection.currentElectionNameEn:null,
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "candidateName": row.person ? row.person.personNameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null
      });
    });
  }
  return sortByKey(simpleData, 'seatId');
};
var simplifyDataFormSubmit = function (data, lang) {
  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameBn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "candidateName": row.person ? row.person.personNameBn : null,
        "statusAF": row.candidate ? row.candidate.statusAF : null,
        "statusFSEE": row.candidate ? row.candidate.statusFSEE : null,
        "statusEER": row.candidate ? row.candidate.statusEER : null,
        "statusTR": row.candidate ? row.candidate.statusTR : null,
        "statusALIE": row.candidate ? row.candidate.statusALIE : null,

        "reviewAF": row.candidate ? row.candidate.reviewAF  : null,
        "reviewFSEE": row.candidate ? row.candidate.reviewFSEE  : null,
        "reviewEER": row.candidate ? row.candidate.reviewEER  : null,
        "reviewTR": row.candidate ? row.candidate.reviewTR  : null,
        "reviewALIE": row.candidate ? row.candidate.reviewALIE  : null
      });
    });
  } else {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection?row.currentElection.electionId:null,
        //"currentElectionName": row.currentElection?row.currentElection.currentElectionNameEn:null,
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "candidateName": row.person ? row.person.personNameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "statusAF": row.candidate ? row.candidate.statusAF : null,
        "statusFSEE": row.candidate ? row.candidate.statusFSEE : null,
        "statusEER": row.candidate ? row.candidate.statusEER : null,
        "statusTR": row.candidate ? row.candidate.statusTR : null,
        "statusALIE": row.candidate ? row.candidate.statusALIE : null,
        "reviewAF": row.candidate ? row.candidate.reviewAF  : null,
        "reviewFSEE": row.candidate ? row.candidate.reviewFSEE  : null,
        "reviewEER": row.candidate ? row.candidate.reviewEER  : null,
        "reviewTR": row.candidate ? row.candidate.reviewTR  : null,
        "reviewALIE": row.candidate ? row.candidate.reviewALIE  : null

      });
    });
  }
  return sortByKey(simpleData, 'seatId');
};
var simplifyDataForEERBCost = function (data, lang) {
    var simpleData = [];
    if (lang === 'bn_BD') {
      data.forEach(function (row) {
        simpleData.push({
          //"electionId": row.currentElection.electionId,
          //"currentElectionName": row.currentElection.currentElectionNameBn,
          "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
          "seatId": row.electionSeat ? row.electionSeat.id : null,
          "districtName": row.district ? row.district.nameBn : null,
          "candidateName": row.person ? row.person.personNameBn : null,
          _1b_22_CampaignCostAmountEER: row.candidate ? (row.candidate._1b_22_CampaignCostAmountEER || 0 ) : null,
          _1b_22_ConveyanceCostAmountEER: row.candidate ? (row.candidate._1b_22_ConveyanceCostAmountEER || 0 ) : null,
          _1b_22_PublicMeetingCostAmountEER: row.candidate ? (row.candidate._1b_22_PublicMeetingCostAmountEER || 0 ) : null,
          _1b_22_CampCostAmountEER: row.candidate ? (row.candidate._1b_22_CampCostAmountEER || 0 ) : null,
          _1b_22_AgentCostAmountEER: row.candidate ? (row.candidate._1b_22_AgentCostAmountEER || 0 ) : null,
          _1b_22_AdministrationCostAmountEER: row.candidate ? (row.candidate._1b_22_AdministrationCostAmountEER || 0 ) : null,
          _1b_22_ElectionCostAmountEER: row.candidate ?

            ((row.candidate._1b_22_CampaignCostAmountEER || 0 ) +
            (row.candidate._1b_22_ConveyanceCostAmountEER || 0 ) +
            (row.candidate._1b_22_PublicMeetingCostAmountEER || 0 ) +
            (row.candidate._1b_22_CampCostAmountEER || 0 ) +
            (row.candidate._1b_22_AgentCostAmountEER || 0 ) +
            (row.candidate._1b_22_AdministrationCostAmountEER || 0 )) : null
        });
      });
    } else {
      data.forEach(function (row) {
          simpleData.push({
            //"electionId": row.currentElection?row.currentElection.electionId:null,
            //"currentElectionName": row.currentElection?row.currentElection.currentElectionNameEn:null,
            "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
            "districtName": row.district ? row.district.nameEn : null,
            "candidateName": row.person ? row.person.personNameEn : null,
            "seatId": row.electionSeat ? row.electionSeat.id : null,
            _1b_22_CampaignCostAmountEER: row.candidate ? (row.candidate._1b_22_CampaignCostAmountEER || 0 ) : null,
            _1b_22_ConveyanceCostAmountEER: row.candidate ? (row.candidate._1b_22_ConveyanceCostAmountEER || 0 ) : null,
            _1b_22_PublicMeetingCostAmountEER: row.candidate ? (row.candidate._1b_22_PublicMeetingCostAmountEER || 0 ) : null,
            _1b_22_CampCostAmountEER: row.candidate ? (row.candidate._1b_22_CampCostAmountEER || 0 ) : null,
            _1b_22_AgentCostAmountEER: row.candidate ? (row.candidate._1b_22_AgentCostAmountEER || 0 ) : null,
            _1b_22_AdministrationCostAmountEER: row.candidate ? (row.candidate._1b_22_AdministrationCostAmountEER || 0 ) : null,
            _1b_22_ElectionCostAmountEER: row.candidate ?

              ((row.candidate._1b_22_CampaignCostAmountEER || 0 ) +
              (row.candidate._1b_22_ConveyanceCostAmountEER || 0 ) +
              (row.candidate._1b_22_PublicMeetingCostAmountEER || 0 ) +
              (row.candidate._1b_22_CampCostAmountEER || 0 ) +
              (row.candidate._1b_22_AgentCostAmountEER || 0 ) +
              (row.candidate._1b_22_AdministrationCostAmountEER || 0 )) : null
          });
        }
      )
      ;
    }

    return sortByKey(simpleData, 'seatId');
  }
  ;
var getC3DataCandidatesEERBDidNotSubmitReturn = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });


  return table;

};
var simplifyDataForEERBCount = function (data, lang) {

  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameBn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "notSubmitted": row.notSubmitted,
        "submitted": row.submitted,
        "totalCandidate": row.totalCandidate
      });
    });
  } else {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameEn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "notSubmitted": row.notSubmitted,
        "submitted": row.submitted,
        "totalCandidate": row.totalCandidate
      });
    });
  }
  return sortByKey(simpleData, 'seatId');
};
var simplifyDataForCandidateSate = function (data, lang) {

  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameBn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,

        "state": row.states
      });
    });
  } else {
    data.forEach(function (row) {
      simpleData.push({
        //"electionId": row.currentElection.electionId,
        //"currentElectionName": row.currentElection.currentElectionNameEn,
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,

        "state": row.states
      });
    });
  }
  return sortByKey(simpleData, 'seatId');
};
var getC3DataCandidatesEERBCountSubmitReturn = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });

  return table;

};
var getC3DataCandidatesForCandidateType = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });

  return table;

};
var getC3DataCandidatesEERBMoneySpentForCampaigning = function (data, limit) {


  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    //if (income >= limit) {
    candidate.totalAtoF = income;
    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      income: income,
      person: candidate.person()
    });
    //}

  });

  return table;

};

function findCommonnCandidate(a, b, c){
  var commonCandidate=[];
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      if (b[j].personId.toString() === b[j].personId.toString()) {
        commonCandidate.push({
          one: a[i],
          two: b[j],
          seatId: a[i].seatId
        });
        break;
      }
    }
  }
  return commonCandidate;
}
var getC3DataCandidatesEERBMoneySpentMoreThanSpendingLimit = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1b_22_ElectionCostAmountEER) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      });
    }

  });

  return table;

};
var getC3DataCandidatesEERBRangeWiseMoneySpent = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    //if (income >= limit) {
    candidate.totalAtoF = income;
    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      income: income,
      person: candidate.person()
    });
    //}

  });

  return table;

};
var getC3DataCandidatesEERBComparisonMoneySpentAmount = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    //if (income >= limit) {
    candidate.totalAtoF = income;
    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      income: income,
      person: candidate.person()
    });
    //}

  });

  return table;

};
var getC3DataCandidatesEERBComparisonMoneySpentPercentage = function (data, limit) {

  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1a_personalIncomeTotalFSEE) || 0) +

      (Number(candidate._1b_loanRelativeTotalFSEE) || 0) +

      (Number(candidate._1c_freeRelativeTotalFSEE) || 0) +

      (Number(candidate._1d_loanManTotalFSEE) || 0) +

      (Number(candidate._1e_freeManTotalFSEE) || 0) +

      (Number(candidate._1f_freePartyTotalFSEE) || 0);

    //if (income >= limit) {
    candidate.totalAtoF = income;
    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      income: income,
      person: candidate.person()
    });
    //}

  });

  return table;

};
var getC3DataCandidatesEERBComparisonGender = function (data, limit) {

  var table = [];
  var maleCampaignExpense = [];
  var femaleCampaignExpense = [];
  data.forEach(function (candidate) {

    //table.push({
    //  candidate: candidate,
    //  currentElection: candidate.currentElection(),
    //  electionSeat: candidate.electionSeat(),
    //  district: candidate.district(),
    //  upazilla: candidate.upazilla(),
    //  union: candidate.union(),
    //  person: candidate.person()
    //});
    if (candidate.person().genderBn === "পুরুষ") {
      maleCampaignExpense.push(Number(candidate._1b_22_ElectionCostAmountEER) || 0)
    } else if (candidate.person().genderBn === "মহিলা") {
      femaleCampaignExpense.push(Number(candidate._1b_22_ElectionCostAmountEER) || 0)
    }

  });
////console.log("data", data.length);
////console.log("maleCampaignExpense", maleCampaignExpense.reduce(function(prev, current){return prev + current;})/maleCampaignExpense.length);
//  //console.log("femaleCampaignExpense", femaleCampaignExpense.reduce(function(prev, current){return prev + current;})/femaleCampaignExpense.length);
////console.log("maleCampaignExpense arr", JSON.stringify(maleCampaignExpense));
//  //console.log("femaleCampaignExpense arr", JSON.stringify(femaleCampaignExpense));

  return {
    male: {
      array: maleCampaignExpense,
      average: maleCampaignExpense.reduce(function (prev, current) {
        return prev + current;
      }) / maleCampaignExpense.length
    },
    female: {
      array: femaleCampaignExpense,
      average: femaleCampaignExpense.reduce(function (prev, current) {
        return prev + current;
      }) / femaleCampaignExpense.length
    }
  };

};
var getC3DataALIE = function (data, limit) {


  var table = [];
  data.forEach(function (candidate) {


    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      person: candidate.person()
    });


  });
  //console.log("before return ", data.length);

  return table;

};
var getC3DataDiscrepancy = function (data, limit) {


  var table = [];
  data.forEach(function (candidate) {


    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      person: candidate.person()
    });


  });
  //console.log("before return ", data.length);

  return table;

};
var simplifyDataALIE = function (data, lang) {
  //console.log("in simplify", data.length)
  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {
      simpleData.push({
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "candidateName": row.person ? row.person.personNameBn : null,
        "personId": row.person ? row.person.id : null,
        annualExpenseTotalAmountALIE: (row.candidate.annualExpenseTotalAmountALIE || 0 ),
        annualIncomeTotalAmountALIE: (row.candidate.annualIncomeTotalAmountALIE || 0 ),
        liabilityTotalAmountALIE: (row.candidate.liabilityTotalAmountALIE || 0 ),
        allProperties: (Number(row.candidate.exceptHousePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.housePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.otherPropertyTotalPriceALIE) || 0),
        housePropertyTotalPriceALIE: (row.candidate.housePropertyTotalPriceALIE || 0 ),
        exceptHousePropertyTotalPriceALIE: (row.candidate.exceptHousePropertyTotalPriceALIE || 0 ),
        otherPropertyTotalPriceALIE: (row.candidate.otherPropertyTotalPriceALIE || 0 )

      });
    });
  } else {
    data.forEach(function (row) {
      simpleData.push({
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "candidateName": row.person ? row.person.personNameEn : null,
        "personId": row.person ? row.person.id : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        annualExpenseTotalAmountALIE: (row.candidate.annualExpenseTotalAmountALIE || 0 ),
        annualIncomeTotalAmountALIE: (row.candidate.annualIncomeTotalAmountALIE || 0 ),
        liabilityTotalAmountALIE: (row.candidate.liabilityTotalAmountALIE || 0 ),
        allProperties: (Number(row.candidate.exceptHousePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.housePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.otherPropertyTotalPriceALIE) || 0),
        housePropertyTotalPriceALIE: (row.candidate.housePropertyTotalPriceALIE || 0 ),
        exceptHousePropertyTotalPriceALIE: (row.candidate.exceptHousePropertyTotalPriceALIE || 0 ),
        otherPropertyTotalPriceALIE: (row.candidate.otherPropertyTotalPriceALIE || 0 )

      });
    });
  }
  return sortByKey(simpleData, 'seatId');
};
var simplifyDataDiscrepancy = function (data, lang) {
  //console.log("in simplify", data.length)
  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {

      // //console.log(row.candidate);

      simpleData.push({
        "seatName": row.electionSeat ? row.electionSeat.seatNameBn : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,
        "districtName": row.district ? row.district.nameBn : null,
        "candidateName": row.person ? row.person.personNameBn : null,
        "personId": row.person ? row.person.id : null,
        "assetAF":
        (row.candidate.assetMaterialOwnTotalAF || 0 ) +
        (row.candidate.assetMaterialHusbandWifeTotalAF || 0 ) +
        (row.candidate.assetMaterialDependantsTotalAF || 0 ) +

        (row.candidate.assetImmaterialOwnTotalAF || 0 ) +
        (row.candidate.assetImmaterialHusbandWifeTotalAF || 0 ) +
        (row.candidate.assetImmaterialDependantsTotalAF || 0 ) +
        (row.candidate.assetJointOwnershipTotalAF || 0 ) +

        (row.candidate.assetJointSharePartTotalAF || 0 ),


        // (row.candidate.assetMaterialOwnTotalAF || 0 ) + (row.candidate.assetImmaterialOwnTotalAF || 0 ) + (row.candidate.assetJointSharePartTotalAF || 0 ),

        "incomeAF": (row.candidate.totalOwnIncomeAF || 0 ),
        "liabilityAF": (row.candidate.liabilitiesAmountAF || 0 ),
        "expenseAF": 0,


        expenseALIE: (row.candidate.annualExpenseTotalAmountALIE || 0 ),
        incomeALIE: (row.candidate.annualIncomeTotalAmountALIE || 0 ),
        liabilityALIE: (row.candidate.liabilityTotalAmountALIE || 0 ),
        assetALIE: (Number(row.candidate.exceptHousePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.housePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.otherPropertyTotalPriceALIE) || 0),

        assetTR: (Number(row.candidate._10_1_to_10_totalAssetTR) || 0),
        liabilityTR: (Number(row.candidate._11_totalLiabilitiesTR) || 0),
        incomeTR: (Number(row.candidate._12_10to11_totalTR) || 0),
        expenseTR: (Number(row.candidate.totalLifeStyleCostTR) || 0),

        neatAssetTR: (Number(row.candidate._12_netAssetsTR) || 0),


      });
    });
  } else {
    data.forEach(function (row) {
      simpleData.push({
        "seatName": row.electionSeat ? row.electionSeat.seatNameEn : null,
        "districtName": row.district ? row.district.nameEn : null,
        "candidateName": row.person ? row.person.personNameEn : null,
        "personId": row.person ? row.person.id : null,
        "seatId": row.electionSeat ? row.electionSeat.id : null,

        "assetAF":
        (row.candidate.assetMaterialOwnTotalAF || 0 ) +
        (row.candidate.assetMaterialHusbandWifeTotalAF || 0 ) +
        (row.candidate.assetMaterialDependantsTotalAF || 0 ) +

        (row.candidate.assetImmaterialOwnTotalAF || 0 ) +
        (row.candidate.assetImmaterialHusbandWifeTotalAF || 0 ) +
        (row.candidate.assetImmaterialDependantsTotalAF || 0 ) +
        (row.candidate.assetJointOwnershipTotalAF || 0 ) +
        (row.candidate.assetJointSharePartTotalAF || 0 ),
        //(row.candidate.assetMaterialOwnTotalAF || 0 ) + (row.candidate.assetImmaterialOwnTotalAF || 0 ) + (row.candidate.assetJointSharePartTotalAF || 0 ),
        "incomeAF": (row.candidate.totalOwnIncomeAF || 0 ),
        "liabilityAF": (row.candidate.liabilitiesAmountAF || 0 ),
        "expenseAF": 0,


        expenseALIE: (row.candidate.annualExpenseTotalAmountALIE || 0 ),
        incomeALIE: (row.candidate.annualIncomeTotalAmountALIE || 0 ),
        liabilityALIE: (row.candidate.liabilityTotalAmountALIE || 0 ),
        assetALIE: (Number(row.candidate.exceptHousePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.housePropertyTotalPriceALIE) || 0) +
        (Number(row.candidate.otherPropertyTotalPriceALIE) || 0),

        assetTR: (Number(row.candidate._10_1_to_10_totalAssetTR) || 0),
        liabilityTR: (Number(row.candidate._11_totalLiabilitiesTR) || 0),
        incomeTR: (Number(row.candidate._12_10to11_totalTR) || 0),
        expenseTR: (Number(row.candidate.totalLifeStyleCostTR) || 0),

        neatAssetTR: (Number(row.candidate._12_netAssetsTR) || 0),
      });
    });
  }
  return sortByKey(simpleData, 'seatId');
};
var simplifyCandidateAffidavitComparison = function (data, lang) {
  //console.log("in simplify", data.length)
  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {

      // Calculate age from DOB
      var age = null;
      var dob = row.candidateDateOfBirthBnAF;
      if (dob && dob !== 'NULL' && dob !== 'null' && dob.indexOf && dob.indexOf('Invalid') === -1) {
        var dobDate = new Date(dob.replace(/[০-৯]/g, function(d) { return '০১২৩৪৫৬৭৮৯'.indexOf(d); }));
        if (!isNaN(dobDate.getTime())) {
          var today = new Date();
          age = today.getFullYear() - dobDate.getFullYear();
          var monthDiff = today.getMonth() - dobDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
          }
        }
      } else if (row.dobTR && row.dobTR !== 0) {
        var dobDate = new Date(row.dobTR);
        if (!isNaN(dobDate.getTime())) {
          var today = new Date();
          age = today.getFullYear() - dobDate.getFullYear();
          var monthDiff = today.getMonth() - dobDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
          }
        }
      }

      simpleData.push({
        "seatName": row.electionSeat() ? row.electionSeat().seatNameBn : null,
        "seatId": row.electionSeat() ? row.electionSeat().id : null,
        "districtName": row.district() ? row.district().nameBn : null,
        "candidateName": row.person() ? row.person().personNameBn : null,
        "personId": row.person() ? row.person().id : null,
        "partyName": row.politicalParty() ? row.politicalParty().partyNameBn : null,
        "age": age,
        // Education
        "degreeType": row.degreeTypeBnAF || '',
        "highestDegree": row.highestDegreeBnAF || '',
        // Profession with fallback: currentProfessionAF -> professionTypeBnAF -> candidateProfessionBusinessBnAF
        "profession": row.currentProfessionAF || row.professionTypeBnAF || row.candidateProfessionBusinessBnAF || '',
        "currentProfession": row.currentProfessionAF || '',
        "previousProfession": row.previousProfessionAF || '',
        "spouseProfession": row.spouseProfessionAF || '',
        "spousePreviousProfession": row.spousePreviousProfessionAF || '',
        // Gender
        "gender": row.genderBn || row.genderBnAF || '',
        // Tax Return from Affidavit
        "taxReturn1TIN": row.taxReturn1TINAF || '',
        "taxReturn1Year": row.taxReturn1YearAF || '',
        "taxReturn1Income": row.taxReturn1IncomeAF || 0,
        "taxReturn1Asset": row.taxReturn1AssetAF || 0,
        "taxReturn1Paid": row.taxReturn1PaidAF || 0,
        // Liability breakdown
        "liability1": row.liability1AmountAF || 0,
        "liability2": row.liability2AmountAF || 0,
        "liability3": row.liability3AmountAF || 0,
        "liability4": row.liability4AmountAF || 0,
        // Government dues
        "govDues1": row.govDues1AmountAF || 0,
        "govDues2": row.govDues2AmountAF || 0,
        "govDues3": row.govDues3AmountAF || 0,
        "govDues4": row.govDues4AmountAF || 0,
        // TR fields
        "trTotalIncome": row._12_10to11_totalTR || 0,
        "trTotalAsset": row._10_1_to_10_totalAssetTR || 0,
        "trTaxPaid": row._15_13_sub_14_givenTaxTR || 0,

        "assetMaterialOwnTotalAF": (row.assetMaterialOwnTotalAF || 0 ),
        "assetImmaterialOwnTotalAF": (row.assetImmaterialOwnTotalAF || 0 ),
        "assetJointSharePartTotalAF": (row.assetJointSharePartTotalAF || 0 ),
        "assetOwn": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ),
        "assetMaterialHusbandWifeTotalAF": (row.assetMaterialHusbandWifeTotalAF || 0 ),
        "assetMaterialDependantsTotalAF": (row.assetMaterialDependantsTotalAF || 0 ),
        "assetImmaterialHusbandWifeTotalAF": (row.assetImmaterialHusbandWifeTotalAF || 0 ),
        "assetImmaterialDependantsTotalAF": (row.assetImmaterialDependantsTotalAF || 0 ),
        "assetDependent": (row.assetMaterialHusbandWifeTotalAF || 0 ) + (row.assetMaterialDependantsTotalAF || 0 ) + (row.assetImmaterialHusbandWifeTotalAF || 0 ) + (row.assetImmaterialDependantsTotalAF || 0 ),
        "assetTotal": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ) + (row.assetMaterialHusbandWifeTotalAF || 0 ) + (row.assetMaterialDependantsTotalAF || 0 ) + (row.assetImmaterialHusbandWifeTotalAF || 0 ) + (row.assetImmaterialDependantsTotalAF || 0 ),

        "incomeOwn": (row.totalOwnIncomeAF || 0 ),
        "incomeDependent": (row.totalDependentIncomeAF || 0 ),
        "incomeTotal": (row.grandTotalIncomeAF || 0 ),

        "totalSingleAmountAF": (row.totalSingleAmountAF || 0 ),
        "totalJointAmoutAF": (row.totalJointAmoutAF || 0 ),
        "totalDirectorOrChairmenAmoutAF": (row.totalDirectorOrChairmenAmoutAF || 0 ),
        "loanOwn": (row.totalSingleAmountAF || 0 ) + (row.totalJointAmoutAF || 0 ) + (row.totalDirectorOrChairmenAmoutAF || 0 ),
        "loanDependent": (row.totalDependedantsAmountAF || 0 ),
        "loanTotal": (row.totalSingleAmountAF || 0 ) + (row.totalJointAmoutAF || 0 ) + (row.totalDirectorOrChairmenAmoutAF || 0 ) + (row.totalDependedantsAmountAF || 0 ),

        // Liability with fallback: sum of new fields (liability1-4AmountAF) -> old field (liabilitiesAmountAF)
        "liabilityOwn": ((row.liability1AmountAF || 0) + (row.liability2AmountAF || 0) + (row.liability3AmountAF || 0) + (row.liability4AmountAF || 0)) || (row.liabilitiesAmountAF || 0),
        "liabilityTotal": ((row.liability1AmountAF || 0) + (row.liability2AmountAF || 0) + (row.liability3AmountAF || 0) + (row.liability4AmountAF || 0)) || (row.liabilitiesAmountAF || 0),

        "neatAsset": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ),
        "neatLiability": ((row.liability1AmountAF || 0) + (row.liability2AmountAF || 0) + (row.liability3AmountAF || 0) + (row.liability4AmountAF || 0)) || (row.liabilitiesAmountAF || 0),
        "neatNeatAsset": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ) - (((row.liability1AmountAF || 0) + (row.liability2AmountAF || 0) + (row.liability3AmountAF || 0) + (row.liability4AmountAF || 0)) || (row.liabilitiesAmountAF || 0)),

        "_19_previousTaxTR": ((row._13ApplicableTaxTR || 0)-(row._14TaxCommissionTR || 0)),
        "totalLifeStyleCostTR": (row.totalLifeStyleCostTR || 0 )
      });
    });
  } else {
    data.forEach(function (row) {
      // Calculate liability with fallback for English section
      var liabilityTotal = ((row.liability1AmountAF || 0) + (row.liability2AmountAF || 0) + (row.liability3AmountAF || 0) + (row.liability4AmountAF || 0)) || (row.liabilitiesAmountAF || 0);

      // Calculate age from DOB
      var age = null;
      var dob = row.candidateDateOfBirthBnAF;
      if (dob && dob !== 'NULL' && dob !== 'null' && dob.indexOf && dob.indexOf('Invalid') === -1) {
        var dobDate = new Date(dob.replace(/[০-৯]/g, function(d) { return '০১২৩৪৫৬৭৮৯'.indexOf(d); }));
        if (!isNaN(dobDate.getTime())) {
          var today = new Date();
          age = today.getFullYear() - dobDate.getFullYear();
          var monthDiff = today.getMonth() - dobDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
          }
        }
      } else if (row.dobTR && row.dobTR !== 0) {
        var dobDate = new Date(row.dobTR);
        if (!isNaN(dobDate.getTime())) {
          var today = new Date();
          age = today.getFullYear() - dobDate.getFullYear();
          var monthDiff = today.getMonth() - dobDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
          }
        }
      }

      simpleData.push({
        "seatName": row.electionSeat() ? row.electionSeat().seatNameEn : null,
        "districtName": row.district() ? row.district().nameEn : null,
        "candidateName": row.person() ? row.person().personNameEn : null,
        "personId": row.person() ? row.person().id : null,
        "seatId": row.electionSeat() ? row.electionSeat().id : null,
        "partyName": row.politicalParty() ? row.politicalParty().partyNameEn : null,
        "age": age,
        // Education
        "degreeType": row.degreeTypeBnAF || '',
        "highestDegree": row.highestDegreeBnAF || '',
        // Profession with fallback: currentProfessionAF -> professionTypeBnAF -> candidateProfessionBusinessBnAF
        "profession": row.currentProfessionAF || row.professionTypeBnAF || row.candidateProfessionBusinessBnAF || '',
        "currentProfession": row.currentProfessionAF || '',
        "previousProfession": row.previousProfessionAF || '',
        "spouseProfession": row.spouseProfessionAF || '',
        "spousePreviousProfession": row.spousePreviousProfessionAF || '',
        // Gender
        "gender": row.genderEn || row.genderEnAF || '',
        // Tax Return from Affidavit
        "taxReturn1TIN": row.taxReturn1TINAF || '',
        "taxReturn1Year": row.taxReturn1YearAF || '',
        "taxReturn1Income": row.taxReturn1IncomeAF || 0,
        "taxReturn1Asset": row.taxReturn1AssetAF || 0,
        "taxReturn1Paid": row.taxReturn1PaidAF || 0,
        // Liability breakdown
        "liability1": row.liability1AmountAF || 0,
        "liability2": row.liability2AmountAF || 0,
        "liability3": row.liability3AmountAF || 0,
        "liability4": row.liability4AmountAF || 0,
        // Government dues
        "govDues1": row.govDues1AmountAF || 0,
        "govDues2": row.govDues2AmountAF || 0,
        "govDues3": row.govDues3AmountAF || 0,
        "govDues4": row.govDues4AmountAF || 0,
        // TR fields
        "trTotalIncome": row._12_10to11_totalTR || 0,
        "trTotalAsset": row._10_1_to_10_totalAssetTR || 0,
        "trTaxPaid": row._15_13_sub_14_givenTaxTR || 0,

        "assetOwn": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ),
        "assetDependent": (row.assetMaterialHusbandWifeTotalAF || 0 ) + (row.assetMaterialDependantsTotalAF || 0 ) + (row.assetImmaterialHusbandWifeTotalAF || 0 ) + (row.assetImmaterialDependantsTotalAF || 0 ),
        "assetTotal": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ) + (row.assetMaterialHusbandWifeTotalAF || 0 ) + (row.assetMaterialDependantsTotalAF || 0 ) + (row.assetImmaterialHusbandWifeTotalAF || 0 ) + (row.assetImmaterialDependantsTotalAF || 0 ),

        "incomeOwn": (row.totalOwnIncomeAF || 0 ),
        "incomeDependent": (row.totalDependentIncomeAF || 0 ),
        "incomeTotal": (row.grandTotalIncomeAF || 0 ),

        "loanOwn": (row.totalSingleAmountAF || 0 ) + (row.totalJointAmoutAF || 0 ) + (row.totalDirectorOrChairmenAmoutAF || 0 ),
        "loanDependent": (row.totalDependedantsAmountAF || 0 ),
        "loanTotal": (row.totalSingleAmountAF || 0 ) + (row.totalJointAmoutAF || 0 ) + (row.totalDirectorOrChairmenAmoutAF || 0 ) + (row.totalDependedantsAmountAF || 0 ),

        // Liability with fallback: sum of new fields (liability1-4AmountAF) -> old field (liabilitiesAmountAF)
        "liabilityOwn": liabilityTotal,
        "liabilityTotal": liabilityTotal,

        "neatAsset": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ),
        "neatLiability": liabilityTotal,
        "neatNeatAsset": (row.assetMaterialOwnTotalAF || 0 ) + (row.assetImmaterialOwnTotalAF || 0 ) + (row.assetJointSharePartTotalAF || 0 ) - liabilityTotal,

        "_19_previousTaxTR": ((row._13ApplicableTaxTR || 0)-(row._14TaxCommissionTR || 0)),
        "totalLifeStyleCostTR": (row.totalLifeStyleCostTR || 0 )
      });
    });
  }
  return simpleData;
};

var simplifyCandidateYearWise = function (data, lang) {

  var simpleData = [];
  if (lang === 'bn_BD') {
    data.forEach(function (row) {

      simpleData.push({
        "candidateId": row.id,
        "currentElectionId": row.currentElection() ? row.currentElection().id : null,
        "seatName": row.electionSeat() ? row.electionSeat().seatNameBn : null,
        "seatId": row.electionSeat() ? row.electionSeat().id : null,
        "districtName": row.district() ? row.district().nameBn : null,
        "candidateName": row.person() ? row.person().personNameBn : null,
        "personId": row.person() ? row.person().id : null,
        "partyName": row.politicalParty() ? row.politicalParty().partyNameBn : null,
        "fatherName": row.person() ? row.person().fatherNameBn : null,
      });
    });
  } else {
    data.forEach(function (row) {
      simpleData.push({
        "candidateId": row.id,
        "currentElectionId": row.currentElection() ? row.currentElection().id : null,
        "seatName": row.electionSeat() ? row.electionSeat().seatNameEn : null,
        "districtName": row.district() ? row.district().nameEn : null,
        "candidateName": row.person() ? row.person().personNameEn : null,
        "personId": row.person() ? row.person().id : null,
        "seatId": row.electionSeat() ? row.electionSeat().id : null,
        "partyName": row.politicalParty() ? row.politicalParty().partyNameEn : null,
        "fatherName": row.person() ? row.person().fatherNameEn : null,


      });
    });
  }
  return simpleData;
};
var getC3DataCandidatesEERBCase = function (data, limit) {


  var table = [];
  data.forEach(function (candidate) {
    table.push({
      candidate: candidate,
      currentElection: candidate.currentElection(),
      electionSeat: candidate.electionSeat(),
      district: candidate.district(),
      upazilla: candidate.upazilla(),
      union: candidate.union(),
      person: candidate.person()
    })


  });


  return table;

};
var getC3DataCandidatesBusinessOrganization = function (data, limit) {
  //console.log("in bo");


  var table = [];
  data.forEach(function (candidate) {
    var income = (Number(candidate._1g_freeOtherTotalFSEE) || 0);

    if (income >= limit) {
      candidate.totalAtoF = income;
      table.push({
        candidate: candidate,
        currentElection: candidate.currentElection(),
        electionSeat: candidate.electionSeat(),
        district: candidate.district(),
        upazilla: candidate.upazilla(),
        union: candidate.union(),
        income: income,
        person: candidate.person()
      })
    }

  });


  return table;

};
var candidatesGroupBySeat = function (candidate) {
  var groupArray = [];
  candidate.forEach(function (data) {

    groupArray.push(data.electionSeat.id)
  });
  groupArray = groupArray.filter(function (value, index) {
    return groupArray.indexOf(value) === index;
  });

  var groupData = [];

  for (var i = 0; i < groupArray.length; i++) {
    groupData[i] = {};
    groupData[i].seatId = groupArray[i];
    groupData[i].totalCandidate = 0;
    groupData[i].totalAmount = 0;
    groupData[i].averageAmount = 0;


    for (var j = 0; j < candidate.length; j++) {
      if (candidate[j].electionSeat.id === groupArray[i]) {
        groupData[i].totalCandidate++;
        groupData[i].totalAmount += (Number(candidate[j].totalAtoF) || 0);


        groupData[i].currentElection = candidate[j].currentElection;
        groupData[i].electionSeat = candidate[j].electionSeat;
        groupData[i].district = candidate[j].district;

      }
    }
    groupData[i].averageAmount = groupData[i].totalAmount / groupData[i].totalCandidate;
  }

  return groupData;
};
var candidatesGroupBySeatForCandidateType = function (candidate) {
  var groupArray = [];
  candidate.forEach(function (data) {

    groupArray.push(data.electionSeat.id)
  });
  groupArray = groupArray.filter(function (value, index) {
    return groupArray.indexOf(value) === index;
  });

  var groupData = [];

  for (var i = 0; i < groupArray.length; i++) {
    groupData[i] = {};
    groupData[i].states = {};

    groupData[i].seatId = groupArray[i];
    groupData[i].states.possible = 0;
    groupData[i].states.eligible = 0;
    groupData[i].states.withdrawn = 0;
    groupData[i].states.other = 0;
    groupData[i].states.elected = 0;
    groupData[i].states.totalCandidate = 0;
    groupData[i].states.male = 0;
    groupData[i].states.female = 0;


    for (var j = 0; j < candidate.length; j++) {
      if (candidate[j].electionSeat.id === groupArray[i]) {
        groupData[i].states.totalCandidate++;
        if (candidate[j].candidate.candidateType === 'possible') {
          groupData[i].states.possible++;
        } else if (candidate[j].candidate.candidateType === 'eligible') {
          groupData[i].states.eligible++;
        } else if (candidate[j].candidate.candidateType === 'withdrawn') {
          groupData[i].states.withdrawn++;
        } else {
          groupData[i].states.other++;
          //console.log(candidate[j].candidate.candidateType);
        }

        if (candidate[j].candidate.genderBn === "পুরুষ") {
          groupData[i].states.male++;
        } else if (candidate[j].candidate.genderBn === "মহিলা") {
          groupData[i].states.female++;
        }
        if (candidate[j].candidate.candidateType === "elected") {
          groupData[i].states.elected++;
        } else {
        }
        groupData[i].currentElection = candidate[j].currentElection;
        groupData[i].electionSeat = candidate[j].electionSeat;
        groupData[i].district = candidate[j].district;

      }

    }
  }

  return groupData;
};
var candidatesGroupBySeatForReturn = function (candidate) {
  var groupArray = [];
  candidate.forEach(function (data) {

    groupArray.push(data.electionSeat.id)
  });
  groupArray = groupArray.filter(function (value, index) {
    return groupArray.indexOf(value) === index;
  });

  var groupData = [];

  for (var i = 0; i < groupArray.length; i++) {
    groupData[i] = {};
    groupData[i].seatId = groupArray[i];
    groupData[i].totalCandidate = 0;

    groupData[i].submitted = 0;
    groupData[i].notSubmitted = 0;


    for (var j = 0; j < candidate.length; j++) {
      if (candidate[j].electionSeat.id === groupArray[i]) {
        groupData[i].totalCandidate++;  ////console.log(typeof  candidate[j].candidate.statusEER);

        if (candidate[j].candidate.statusEER === true || candidate[j].candidate.statusEER === "true") {
          groupData[i].submitted++;
        } else {
          groupData[i].notSubmitted++;
        }


        groupData[i].currentElection = candidate[j].currentElection;
        groupData[i].electionSeat = candidate[j].electionSeat;
        groupData[i].district = candidate[j].district;

      }
    }
  }

  return groupData;
};
module.exports = function (Candidate) {

  //Candidate.getOccupationChart = function (whereCriteria, type, cb) {
  //  whereCriteria.isPublished = {"neq": false};
  //  var occupationBn = ["অন্যান্য", "ব্যবসা", "আইনজীবী", "কৃষি", "উল্লেখ নেই", "চাকুরি", "গৃহিনী"];
  //  var occupationEn = ["Other", "Business", "Lawyer", "Agriculture", "Not to mention", "Job", "Housewife"];
  //  var query = {
  //    //limit: whereCriteria.filter.limit,
  //    where: whereCriteria,
  //    include: 'politicalParty'
  //  };
  //  Candidate.find(query).then(function (data) {
  //
  //
  //    var c3data = getC3Data(data, "professionTypeBnAF");
  //    var table = [];
  //    try {
  //      table = getC3DataForOccupationGroupBy(data, "professionTypeBnAF", "politicalParty", type);
  //    } catch (e) {
  //
  //
  //    }
  //    if (type === 'bn_BD') {
  //
  //    } else {
  //      for (var i = 0; i < table[0].length; i++) {
  //        if (occupationBn.indexOf(table[0][i]) !== -1) {
  //          table[0][i] = occupationEn[occupationBn.indexOf(table[0][i])];
  //        }
  //      }
  //      for (var i = 0; i < c3data.length; i++) {
  //        if (occupationBn.indexOf(c3data[i][0]) !== -1) {
  //          c3data[i][0] = occupationEn[occupationBn.indexOf(c3data[i][0])];
  //        }
  //      }
  //
  //    }
  //
  //    cb(null, {c3data: c3data, table: table});
  //  });
  //};
  Candidate.updateCandidate=function(id, newId){
    Candidate.update({ personId:id },
     { $push: { "personId": newId }}, { allowExtendedOperators: true }, function(err, res){
        if(err){
            //console.log(err);
        } else {
            //console.log(res);
        }
    });

  }

  Candidate.getPoliticalPartyChartNew = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      //console.log("total candidate " +data.length);


      var c3data = getC3DataPoliticalParty(data, "politicalPartyId", type);
      var table = [];
      try {
        //table = getC3DataGroupBy(data, "totalOwnIncomeAF", "politicalParty");
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            table.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataPoliticalParty(groupCandidate.value, "politicalPartyId", type)
            })
          });
      } catch (e) {
      }
      cb(null, {all: c3data, table: table});
    });
  };

  Candidate.getOccupationChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      // Current profession data (বর্তমান পেশা)
      var currentData = getC3DataOccupation(data, "currentProfessionAF", type);
      var currentTable = [];

      // Previous profession data (পূর্বতন পেশা)
      var previousData = getC3DataOccupation(data, "previousProfessionAF", type);
      var previousTable = [];

      try {
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            currentTable.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataOccupation(groupCandidate.value, "currentProfessionAF", type)
            });
            previousTable.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataOccupation(groupCandidate.value, "previousProfessionAF", type)
            });
          });
      } catch (e) {
      }

      cb(null, {
        current: { all: currentData, table: currentTable },
        previous: { all: previousData, table: previousTable },
        // Keep backward compatibility
        all: currentData,
        table: currentTable
      });
    });
  };
  Candidate.getCommitmentAchievementChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = { neq: false };
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: "politicalParty",
    };
    Candidate.find(query).then(function (data) {
      ////console.log(data.length);

      var c3data = getC3DataCommitmentsAchievements(data, "commitmentAndAchievementWhileMpAF", type);
      var table = [];
      try {
        //table = getC3DataGroupBy(data, "totalOwnIncomeAF", "politicalParty");
        groupCandidateByPoliticalParty(data, type).forEach(function (
          groupCandidate
        ) {
          table.push({
            politicalPartyId: groupCandidate.key,
            partyName: groupCandidate.party,
            data: getC3DataCommitmentsAchievements(
              groupCandidate.value,
              "commitmentAndAchievementWhileMpAF",
              type
            ),
          });
        });
      } catch (e) {}
      cb(null, { all: c3data, table: table });
    });
  };
  Candidate.getCasesChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      where: whereCriteria,
      include: 'politicalParty'
      //where: {or: [{lawPresentCountAF: {gt: 0}},{lawPastCountAF: {gt: 0}}]}
    };
    //console.log("query", JSON.stringify(query));

    Promises.all([
      Candidate.find(query),
      //Candidate.PoliticalParty.find({})
    ]).spread(function (data) {


      var tableData = [];

      var c3data = getC3Data(data, "lawPresentCountAF");
      var all = getCandidateCasesTable(data);
      //
      //////console.log("before");
      groupCandidateByPoliticalParty(data, type)
        .forEach(function (groupCandidate) {
          tableData.push({
            politicalPartyId: groupCandidate.key,
            partyName: groupCandidate.party,
            data: getCandidateCasesTable(groupCandidate.value)
          })
        });
      ////console.log("after", data.length);


      cb(null, {all: all, c3data: c3data, table: tableData, totalCandidate: data.length});
    });
    //PoliticalParty.find({});
    //Candidate.find(query).then(function (data) {
    //
    //  ////console.log(data);
    //
    //});
  };
  Candidate.getEducationChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: 200,
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      ////console.log(data.length);


      var c3data = getC3DataEducation(data, "degreeTypeBnAF", type);
      var table = [];
      try {
        //table = getC3DataGroupBy(data, "totalOwnIncomeAF", "politicalParty");
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            table.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataEducation(groupCandidate.value, "degreeTypeBnAF", type)
            })
          });
      } catch (e) {


      }


      cb(null, {all: c3data, table: table});
    });
  };
  Candidate.getGenderChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      var c3data = getC3DataGender(data, "genderBn", type);
      var table = [];
      try {
        //table = getC3DataGroupBy(data, "totalOwnIncomeAF", "politicalParty");
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            table.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataGender(groupCandidate.value, "genderBn", type)
            })
          });
      } catch (e) {


      }


      cb(null, {all: c3data, table: table});
    });
  };
  Candidate.getAgeChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      var c3data = getC3DataAge(data, type);
      var table = [];
      try {
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            table.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataAge(groupCandidate.value, type)
            })
          });
      } catch (e) {
      }
      cb(null, {all: c3data, table: table});
    });
  };
  Candidate.getTaxReturnSummaryChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      var result = getTaxReturnSummaryByParty(data, type);
      cb(null, result);
    });
  };
  Candidate.getAssetChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      ////console.log(data.length);


      var c3data = getC3DataAsset(data, "assetMaterialTotalAF", type);
      var table = [];
      try {
        //table = getC3DataGroupBy(data, "totalOwnIncomeAF", "politicalParty");
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            table.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataAsset(groupCandidate.value, "assetMaterialTotalAF", type)
            })
          });
      } catch (e) {


      }


      cb(null, {all: c3data, table: table});
    });
  };
  Candidate.getLoanChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {

      var c3data = getC3DataLoan(data, "totalLoanAF", type);
      var table = [];
      try {
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            table.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataLoan(groupCandidate.value, "totalLoanAF", type)
            })
          });
      } catch (e) {
      }

      cb(null, {all: c3data, table: table});
    });
  };
  Candidate.getLiabilityChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = { neq: false };
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: "politicalParty",
    };
    Candidate.find(query).then(function (data) {
      var c3data = getC3DataLiability(data, "liabilitiesAmountAF", type);
      var table = [];
      try {
        groupCandidateByPoliticalParty(data, type).forEach(function (
          groupCandidate
        ) {
          table.push({
            politicalPartyId: groupCandidate.key,
            partyName: groupCandidate.party,
            data: getC3DataLiability(groupCandidate.value, "liabilitiesAmountAF", type),
          });
        });
      } catch (e) {}

      cb(null, { all: c3data, table: table });
    });
  };
  Candidate.getIncomeChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {
      // Get domestic income data
      var domesticData = getC3DataIncome(data, "domestic", type);
      var domesticTable = [];

      // Get foreign income data
      var foreignData = getC3DataIncome(data, "foreign", type);
      var foreignTable = [];

      groupCandidateByPoliticalParty(data, type)
        .forEach(function (groupCandidate) {
          domesticTable.push({
            politicalPartyId: groupCandidate.key,
            partyName: groupCandidate.party,
            data: getC3DataIncome(groupCandidate.value, "domestic", type)
          });
          foreignTable.push({
            politicalPartyId: groupCandidate.key,
            partyName: groupCandidate.party,
            data: getC3DataIncome(groupCandidate.value, "foreign", type)
          });
        });

      cb(null, {
        domestic: { all: domesticData, table: domesticTable },
        foreign: { all: foreignData, table: foreignTable },
        // Keep backward compatibility
        all: domesticData,
        table: domesticTable
      });
    });
  };
  Candidate.getTaxChart = function (whereCriteria, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: 'politicalParty'
    };
    Candidate.find(query).then(function (data) {


      var c3data = getC3DataTax(data, "_15_13_sub_14_givenTaxTR", type);
      var table = [];

      groupCandidateByPoliticalParty(data, type)
        .forEach(function (groupCandidate) {
          //console.log(groupCandidate.party, groupCandidate.length)
          table.push({
            politicalPartyId: groupCandidate.key,
            partyName: groupCandidate.party,
            data: getC3DataTax(groupCandidate.value, "_15_13_sub_14_givenTaxTR", type)
          })
        });


      cb(null, {all: c3data, table: table});
    });
  };
  Candidate.getTopElectedCandidateChart = function (whereCriteria, type, cb) {

    whereCriteria.resultType = 'elected';
    whereCriteria.isPublished = {"neq": false};
    var query = {
      where: whereCriteria,
      include: ['electionSeat','politicalParty']
    };
    Candidate.find(query).then(function (data) {


    var c3data = getC3DataTopCandidate(data, type);

    var table = [];

    groupCandidateByPoliticalParty(data, type)
      .forEach(function (groupCandidate) {
        //console.log(groupCandidate.party, groupCandidate.length)
        table.push({
          partyName: groupCandidate.party,
          data: getC3DataTopCandidate(groupCandidate.value, type)
        })
      });

    cb(null, {all: c3data, table: table});
    });
  };
  Candidate.getPfseCandidates6 = function (whereCriteria, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3Data6(data);
      } catch (e) {


      }


      //console.log("ok");

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getPfseCandidates5 = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    //console.log("in getPfseCandidates5 type ", type);

    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyPfseGroupBySeatData(candidatesGroupBySeat(getC3Data5(data, (limit || 0))), type);
      } catch (e) {


      }


      //console.log("ok");

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getPfseCandidatesDonation = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    //console.log("in getPfseCandidatesDonation type ", type);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesDonation(data, (limit || 0), type);
      } catch (e) {


      }


      //console.log("limit", limit);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getPfseCandidatesLoan = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    //console.log("in getPfseCandidatesLoan type ", type);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesLoan(data, (limit || 0), type);
      } catch (e) {


      }


      //console.log("limit", limit);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getPfseCandidatesTotalIncome = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    //console.log("in getPfseCandidatesTotalIncome type ", type);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesTotalIncome(data, (limit || 0), type); //1211
      } catch (e) {


      }


      //console.log("limit", limit);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getPfseCandidatesPiWhichExceedsSpendingLimits = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    //console.log("in getPfseCandidatesPiWhichExceedsSpendingLimits type ", type);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesPiWhichExceedsSpendingLimits(data, (limit || 0), type);
      } catch (e) {


      }


      //console.log("limit", limit);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getElectedCandidates = function (whereCriteria, limit, type, cb) {
    whereCriteria.resultType = 'elected';
    whereCriteria.isPublished = {"neq": false};

    //console.log("in elected candidate type ", whereCriteria);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesWhoAreElected(data, (limit || 0), type);
      } catch (e) {


      }


      //console.log("limit", limit);

      cb(null, table);
    });
  };
  Candidate.getElectedCandidatesByCw = function (whereCriteria, limit, type, cb) {
    //whereCriteria.resultType = 'elected';
    whereCriteria.isPublished = {"neq": false};

    //console.log("in elected candidate type ", whereCriteria);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataForCandidateSate(candidatesGroupBySeatForCandidateType(getC3DataCandidatesForCandidateType(data, (limit || 0))), type);

      } catch (e) {


      }

      //console.log("limit", limit);

      cb(null, table);
    });
  };
  Candidate.getCandidateFormSubmitStatistics = function (whereCriteria, limit, type, cb) {
    //whereCriteria.resultType = 'elected';
    whereCriteria.isPublished = {"neq": false};
    //whereCriteria.candidateType = "eligible";

    //console.log("in elected candidate type ", whereCriteria);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['electionSeat', "district", "person"]
      //fields: {
      //  statusAF: true,
      //  statusFSEE: true,
      //  statusEER: true,
      //  statusTR: true,
      //  statusALIE: true,
      //  person: true,
      //}
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataFormSubmit(getC3DataCandidatesForCandidateType(data, (limit || 0)), type);

      } catch (e) {


      }

      //console.log("limit", limit);

      cb(null, table);
    });
  };

  Candidate.differentElectionParticipateCandidate=function(cb){

    Candidate.getDataSource().connector.connect(function(err, db) {
      var collection = db.collection('candidate');
      var currentElection = db.collection('currentElection');
      var candidatePost = db.collection('candidatePost');
         collection.aggregate(
          [{$lookup:{
            from: 'currentElection',
            localField:'currentElectionId',
            foreignField:'_id',
            as:'currentElection'

          }},
          {$lookup:{
            from: 'electionCandidatePost',
            localField:'electionCandidatePostId',
            foreignField:'_id',
            as:'electionCandidatePost'
          }},
          {$group: {
              //_id: {personId: "$personId", candidateNameBnAF:"$candidateNameBnAF"},
              _id: {personId: "$personId"},
              candidate: {$addToSet:{
                Id:"$_id",
                totalOwnIncomeAF:"$totalOwnIncomeAF",
                totalDependentIncomeAF:"$totalDependentIncomeAF",
                assetMaterialOwnTotalAF:"$assetMaterialOwnTotalAF",
                assetMaterialDependantsTotalAF:"$assetMaterialDependantsTotalAF",
                totalLoanAF:"$totalLoanAF",
                _19_previousTaxTR:"$_19_previousTaxTR",
                candidateNameBnAF:"$candidateNameBnAF",
                currentElection:"$currentElection",
                fatherNameBn:"$fatherNameBn",
                candidatePostNameBn:"$candidatePostNameBn",
                electionCandidatePost:"$electionCandidatePost",
                candidateNameBnAF:"$candidateNameBnAF"
              }},
              count: {$sum: 1}
              }
          },
          {$match: {
              count: {"$gt": 1}
          }
        }
      ]).toArray(function(err,data){
            if(err){
              console.log(err)
            }else{

            cb(null, data);
            }
        });
     });
   }
  Candidate.getCandidateFormEntryReviewStatistics = function (whereCriteria, limit, type, cb) {
    //whereCriteria.resultType = 'elected';
    whereCriteria.isPublished = {"neq": false};
    //whereCriteria.candidateType = "eligible";

    //console.log("in elected candidate type ", whereCriteria);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['electionSeat', "district", "person"],

    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataFormSubmit(getC3DataCandidatesForCandidateType(data, (limit || 0)), type);

      } catch (e) {


      }

      //console.log("limit", limit);

      cb(null, table);
    });
  };
  Candidate.getCandidateFormEntryStatistics = function (whereCriteria, limit, type, cb) {
    var path = require('path');
    var app = require(path.resolve(__dirname, '../../server/server'));
    //var ds = app.datasources.votebdmongo;
    app.models.user.find({
      //limit: whereCriteria.filter.limit,
      where: {},
      fields: {
        username: true,
        email: true,
        status: true,
        userName: true,
        firstName: true,
        lastName: true,
        id: true
      }
    }, function (err, userlist) {
      if (err) throw err;

      var promisesList = [];
      userlist.forEach(function (user) {

        promisesList.push(
          //Candidate.count(whereCriteria)
          Promises.all([
            Candidate.count({currentElectionId: whereCriteria.currentElectionId, createdByAF: user.id}),
            Candidate.count({currentElectionId: whereCriteria.currentElectionId, createdByFSEE: user.id}),
            Candidate.count({currentElectionId: whereCriteria.currentElectionId, createdByALIE: user.id}),
            Candidate.count({currentElectionId: whereCriteria.currentElectionId, createdByEER: user.id}),
            Candidate.count({currentElectionId: whereCriteria.currentElectionId, createdByTR: user.id}),
            user
          ]).spread(function (countAF, countFSEE, countALIE, countEER, countTR, user) {
            return {
              user: user,
              countAF: countAF,
              countFSEE: countFSEE,
              countALIE: countALIE,
              countEER: countEER,
              countTR: countTR
            }
          })
        )


      });


      var summary = Promises.all([
        Candidate.count({
          currentElectionId: whereCriteria.currentElectionId,
          statusAF: {inq: ['publish', true, 'true']}
        }),
        Candidate.count({currentElectionId: whereCriteria.currentElectionId, statusFSEE: {inq: [true, 'true']}}),
        Candidate.count({currentElectionId: whereCriteria.currentElectionId, statusEER: {inq: [true, 'true']}}),
        Candidate.count({currentElectionId: whereCriteria.currentElectionId, statusTR: {inq: [true, 'true']}}),
        Candidate.count({currentElectionId: whereCriteria.currentElectionId, statusALIE: {inq: [true, 'true']}}),
        Candidate.count({currentElectionId: whereCriteria.currentElectionId}),

        Candidate.count({
          isPublished: {"neq": false},
          currentElectionId: whereCriteria.currentElectionId,
          statusAF: {inq: ['publish', true, 'true']}
        }),
        Candidate.count({
          isPublished: {"neq": false},
          currentElectionId: whereCriteria.currentElectionId,
          statusFSEE: {inq: [true, 'true']}
        }),
        Candidate.count({
          isPublished: {"neq": false},
          currentElectionId: whereCriteria.currentElectionId,
          statusEER: {inq: [true, 'true']}
        }),
        Candidate.count({
          isPublished: {"neq": false},
          currentElectionId: whereCriteria.currentElectionId,
          statusTR: {inq: [true, 'true']}
        }),
        Candidate.count({
          isPublished: {"neq": false},
          currentElectionId: whereCriteria.currentElectionId,
          statusALIE: {inq: [true, 'true']}
        }),
        Candidate.count({isPublished: {"neq": false}, currentElectionId: whereCriteria.currentElectionId})


      ]).spread(function (entryAF,
                          entryFSEE,
                          entryEER,
                          entryTR,
                          entryALIE,
                          entryGrandTotal,
                          publishAF,
                          publishFSEE,
                          publishEER,
                          publishTR,
                          publishALIE,
                          publishGrandTotal) {

        return {
          entryAF: entryAF,
          entryFSEE: entryFSEE,
          entryEER: entryEER,
          entryTR: entryTR,
          entryALIE: entryALIE,
          entryTotal: entryAF + entryFSEE + entryEER + entryTR + entryALIE,
          entryGrandTotal: entryGrandTotal,

          publishAF: publishAF,
          publishFSEE: publishFSEE,
          publishEER: publishEER,
          publishTR: publishTR,
          publishALIE: publishALIE,
          publishTotal: publishAF + publishFSEE + publishEER + publishTR + publishALIE,
          publishGrandTotal: publishGrandTotal
        }


      });
      Promises.all([
        Promises.all(promisesList),
        summary
      ])
        .spread(function (stat, summary) {
          //console.log(summary);
          cb(null, {user: stat, summary: summary})
        });
    });

  };
  Candidate.getCandidateLists = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};

    //console.log("in elected candidate type ", whereCriteria);
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['politicalParty', 'currentElection', 'electionSeat', "district", "upazilla", "union", "person"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesWhoWithPP(data, (limit || 0), type);
      } catch (e) {


      }


      //console.log("limit", limit);

      cb(null, table);
    });
  };
  Candidate.getEERB = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesPiWhichExceedsSpendingLimits(data, (limit || 0));
      } catch (e) {


      }


      //console.log("type", type);

      cb(null, {c3data: c3data, table: table});
    });
  };
  Candidate.getPfseCandidatesBusinessOrganization = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyPfseWhoCommitsForDonation(getC3DataCandidatesBusinessOrganization(data, (limit || 0)), type); //1255
      } catch (e) {


      }


      //console.log("limit", limit);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBDidNotSubmitReturn = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    whereCriteria.statusEER = {"neq": true};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyData(getC3DataCandidatesEERBDidNotSubmitReturn(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type i m in did not submit", type);


      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBCountSubmitReturn = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = {
        notSubmitted: 0,
        submitted: 0,
        totalCandidate: 0
      }; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataForEERBCount(candidatesGroupBySeatForReturn(getC3DataCandidatesEERBCountSubmitReturn(data, (limit || 0))), type);
        table.forEach(function (row) {
          c3data.notSubmitted += row.notSubmitted;
          c3data.submitted += row.submitted;
          c3data.totalCandidate += row.totalCandidate;
        })
      } catch (e) {


      }


      //console.log("type fix", type);

      cb(null, {all: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBMoneySpentForCampaigning = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    whereCriteria.statusEER = true;
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataForEERBCost(getC3DataCandidatesEERBMoneySpentForCampaigning(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type cw camp", type);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBMoneySpentMoreThanSpendingLimit = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    whereCriteria.statusEER = true;
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataForEERBCost(getC3DataCandidatesEERBMoneySpentMoreThanSpendingLimit(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type  getC3DataCandidatesEERBMoneySpentMoreThanSpendingLimit", type);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBRangeWiseMoneySpent = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    whereCriteria.statusEER = true;
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['politicalParty', 'currentElection', 'electionSeat', "district", "upazilla", "union", "person"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = getC3DataAsset(data, "_1b_22_ElectionCostAmountEER", type);
      var table = [];
      try {
        groupCandidateByPoliticalParty(data, type)
          .forEach(function (groupCandidate) {
            table.push({
              politicalPartyId: groupCandidate.key,
              partyName: groupCandidate.party,
              data: getC3DataAsset(groupCandidate.value, "_1b_22_ElectionCostAmountEER", type)
            })
          });
      } catch (e) {


      }


      //console.log("type RANGE camp", type);

      cb(null, {all: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBComparisonMoneySpentAmount = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    whereCriteria.statusEER = true;
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        //table = getC3DataCandidatesEERBComparisonMoneySpentAmount(data, (limit || 0));
        table = table = simplifyDataForEERBCost(getC3DataCandidatesEERBMoneySpentForCampaigning(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type money spent amount", type);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBComparisonMoneySpentPercentage = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    whereCriteria.statusEER = true;
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = table = simplifyDataForEERBCost(getC3DataCandidatesEERBMoneySpentForCampaigning(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type money spent percentage", type);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getEERBComparisonGender = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    whereCriteria.statusEER = true;
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = getC3DataCandidatesEERBComparisonGender(data, (limit || 0));
      } catch (e) {


      }


      //console.log("type gender", type);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getALIE = function (whereCriteria, limit, type, for_what, cb) {
    whereCriteria.isPublished = {"neq": false};
    //whereCriteria._1b_22_CampaignCostAmountEER = {"gt": 0};
    whereCriteria.statusALIE = true;
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataALIE(getC3DataALIE(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type", type);
      //console.log("for_what", for_what);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getDiscrepancy = function (whereCriteria, limit, type, for_what, cb) {
    whereCriteria.isPublished = {"neq": false};
    //whereCriteria._1b_22_CampaignCostAmountEER = {"gt": 0};
    //whereCriteria.statusALIE = { inq: [ true, 'true'] };
    //whereCriteria.statusAF = { inq: ['publish', true, 'true'] };
    //whereCriteria.statusTR = { inq: [ true, 'true'] };
    var query = {
      //limit: whereCriteria.filter.limit,
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyDataDiscrepancy(getC3DataDiscrepancy(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type", type);
      //console.log("for_what", for_what);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };
  Candidate.getALIEComparison = function (criteria, limit, type, for_what, cb) {
    //console.log("for_what in pfse", for_what);
    //console.log("type", type);
    //whereCriteria.statusALIE = true;

    var whereQuery1 = {};
    var whereQuery2 = {};
    if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId && criteria.hasOwnProperty("currentElectionId2") && criteria.currentElectionId2) {
      whereQuery1.currentElectionId = criteria.currentElectionId;
      whereQuery2.currentElectionId = criteria.currentElectionId2;
      whereQuery1.isPublished = {"neq": false};
      whereQuery2.isPublished = {"neq": false};
      //whereQuery1.statusALIE = true;
      //whereQuery2.statusALIE = true;
    } else {
      cb(null, "must select both election");
      return;
    }
    if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId){
      //whereQuery1.politicalPartyId=criteria.politicalPartyId;
      whereQuery2.politicalPartyId=criteria.politicalPartyId;
    }
    if (criteria.hasOwnProperty("constitutionalPostId") && criteria.constitutionalPostId){
      //whereQuery1.constitutionalPostId=criteria.constitutionalPostId;
      whereQuery2.constitutionalPostId=criteria.constitutionalPostId;
    }
    if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
      if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
        whereQuery1.candidateType = criteria.candidateType;
        whereQuery2.candidateType = criteria.candidateType;
      } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
        whereQuery1.resultType = criteria.candidateType;
        whereQuery2.resultType = criteria.candidateType;
        whereQuery1.candidateType = 'eligible';
        whereQuery2.candidateType = 'eligible';
      }
    }
    Promises.all([
      Candidate.find({
        where: whereQuery1,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      }),
      Candidate.find({
        where: whereQuery2,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      })
    ]).spread(function (candidateListUnsorted1, candidateListUnsorted2) {
      //console.log("in spread");


      var candidateList1 = simplifyDataALIE(getC3DataALIE(candidateListUnsorted1, (limit || 0)), type);
      var candidateList2 = simplifyDataALIE(getC3DataALIE(candidateListUnsorted2, (limit || 0)), type);

      //console.log("candidate list 1", candidateList1.length);
      //console.log("candidate list 2", candidateList2.length);
      var commonCandidate = [];
      for (var i = 0; i < candidateList1.length; i++) {
        for (var j = 0; j < candidateList2.length; j++) {
          if (candidateList1[i].personId.toString() === candidateList2[j].personId.toString()) {
            commonCandidate.push({
              one: candidateList1[i],
              two: candidateList2[j],
              seatId: candidateList1[i].seatId.toString()
            });

            break;
          }
        }
      }
      cb(null, {
        candidateList: sortByKey(commonCandidate, "seatId"),
        one: (candidateListUnsorted1.length > 0 ) ? new Date(candidateListUnsorted1[0].currentElection().electionDate).getFullYear() : null,
        two: (candidateListUnsorted2.length > 0 ) ? new Date(candidateListUnsorted2[0].currentElection().electionDate).getFullYear() : null,
      });
    });
  };

  Candidate.getCandidateAffidavitComparison = function (criteria, limit, type, for_what, cb) {
    console.log(criteria);
    //console.log("type", type);

    var whereQuery1 = {};
    var whereQuery2 = {};
    var whereQuery3 = {};
    var whereQuery4 = {};
    if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId && criteria.hasOwnProperty("currentElectionId2") && criteria.currentElectionId2 && criteria.hasOwnProperty("currentElectionId3") && criteria.currentElectionId3 && criteria.hasOwnProperty("currentElectionId4") && criteria.currentElectionId4) {
      whereQuery1.currentElectionId = criteria.currentElectionId;
      whereQuery2.currentElectionId = criteria.currentElectionId2;
      whereQuery3.currentElectionId = criteria.currentElectionId3;
      whereQuery4.currentElectionId = criteria.currentElectionId4;
      whereQuery1.isPublished = {"neq": false};
      whereQuery2.isPublished = {"neq": false};
      whereQuery3.isPublished = {"neq": false};
      whereQuery4.isPublished = {"neq": false};

      if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
        if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
          whereQuery1.candidateType = criteria.candidateType;
          whereQuery2.candidateType = criteria.candidateType;
          whereQuery3.candidateType = criteria.candidateType;
          whereQuery4.candidateType = criteria.candidateType;
        } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
          whereQuery1.resultType = criteria.candidateType;
          whereQuery2.resultType = criteria.candidateType;
          whereQuery3.resultType = criteria.candidateType;
          whereQuery4.resultType = criteria.candidateType;
          whereQuery1.candidateType = 'eligible';
          whereQuery2.candidateType = 'eligible';
          whereQuery3.candidateType = 'eligible';
          whereQuery4.candidateType = 'eligible';
        }
      }

      Promises.all([
        Candidate.find({
          where: whereQuery1,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        }),
        Candidate.find({
          where: whereQuery2,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        }),
        Candidate.find({
          where: whereQuery3,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        }),
        Candidate.find({
          where: whereQuery4,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        })
      ]).spread(function (candidateListUnsorted1, candidateListUnsorted2, candidateListUnsorted3, candidateListUnsorted4) {
        ////console.log("candidate list 1", candidateList1.length);
        ////console.log("candidate list 2", candidateList2.length);
        var candidateList1 = simplifyCandidateAffidavitComparison(candidateListUnsorted1, type);
        // //console.log("after simplify 1");

        var candidateList2 = simplifyCandidateAffidavitComparison(candidateListUnsorted2, type);
        // //console.log("after simplify 2");

        var candidateList3 = simplifyCandidateAffidavitComparison(candidateListUnsorted3, type);
        // //console.log("after simplify 3");
        var candidateList4 = simplifyCandidateAffidavitComparison(candidateListUnsorted4, type);
        // //console.log("after simplify 3");

        var commonCandidate = [];
        var collectedCandidates = [];
        for (var i = 0; i < candidateList1.length; i++) {
          for (var j = 0; j < candidateList2.length; j++) {
            if (candidateList1[i].personId.toString() === candidateList2[j].personId.toString()) {
              commonCandidate.push({
                one: candidateList1[i],
                two: candidateList2[j],
                seatId: candidateList1[i].seatId
              });
              break;
            }
          }
        }

        for (var i = 0; i < candidateList1.length; i++) {
          for (var k = 0; k < candidateList3.length; k++) {
            if (candidateList1[i].personId.toString() === candidateList3[k].personId.toString()) {
              if(commonCandidate.one.indexOf(candidateList1[i].personId) === -1){
                commonCandidate.push({
                  one: candidateList1[i],
                  three: candidateList3[k],
                  seatId: candidateList1[i].seatId
                });
              }else{
                commonCandidate.push({
                  three: candidateList3[k],
                  seatId: candidateList1[i].seatId
                });
              }
              break;
            }
          }
        }
        for (var i = 0; i < candidateList1.length; i++) {
          for (var l = 0; l < candidateList4.length; l++) {
            if (candidateList1[i].personId.toString() === candidateList4[l].personId.toString()) {
              if(commonCandidate.one.indexOf(candidateList1[i].personId) === -1){
                commonCandidate.push({
                  one: candidateList1[i],
                  four: candidateList4[l],
                  seatId: candidateList1[i].seatId
                });
              }else {
                commonCandidate.push({
                  four: candidateList4[l],
                  seatId: candidateList1[i].seatId
                });
              }
              break;
            }
          }
        }
        for (var j = 0; j < candidateList2.length; j++) {
          for (var k = 0; k < candidateList3.length; k++) {
            if (candidateList2[j].personId.toString() === candidateList3[k].personId.toString()) {
              if(commonCandidate.two.indexOf(candidateList2[j].personId) === -1){
                commonCandidate.push({
                  two: candidateList2[j],
                  three: candidateList3[k],
                  seatId: candidateList2[j].seatId
                });
              }else {
                commonCandidate.push({
                  three: candidateList3[k],
                  seatId: candidateList2[j].seatId
                });
              }
              break;
            }
          }
        }

        for (var j = 0; j < candidateList2.length; j++) {
          for (var l = 0; l < candidateList4.length; l++) {
            if (candidateList2[j].personId.toString() === candidateList4[l].personId.toString()) {
              commonCandidate.push({
                two: candidateList2[j],
                four: candidateList4[l],
                seatId: candidateList2[j].seatId
              });
              break;
            }
          }
        }

        for (var k = 0; k < candidateList3.length; k++) {
          for (var l = 0; l < candidateList4.length; l++) {
            if (candidateList3[k].personId.toString() === candidateList4[l].personId.toString()) {
              commonCandidate.push({
                three: candidateList3[k],
                four: candidateList4[l],
                seatId: candidateList3[k].seatId
              });
              break;
            }
          }
        }


        //console.log("o");

        cb(null, {
          candidateList: sortByKey(commonCandidate, "seatId"),
          one: (candidateListUnsorted1.length > 0 ) ? new Date(candidateListUnsorted1[0].currentElection().electionDate).getFullYear() : null,
          two: (candidateListUnsorted2.length > 0 ) ? new Date(candidateListUnsorted2[0].currentElection().electionDate).getFullYear() : null,
          three: (candidateListUnsorted3.length > 0 ) ? new Date(candidateListUnsorted3[0].currentElection().electionDate).getFullYear() : null,
          four: (candidateListUnsorted4.length > 0 ) ? new Date(candidateListUnsorted4[0].currentElection().electionDate).getFullYear() : null
        });
      });

    }
    else if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId && criteria.hasOwnProperty("currentElectionId2") && criteria.currentElectionId2 && criteria.hasOwnProperty("currentElectionId3") && criteria.currentElectionId3) {
      whereQuery1.currentElectionId = criteria.currentElectionId;
      whereQuery2.currentElectionId = criteria.currentElectionId2;
      whereQuery3.currentElectionId = criteria.currentElectionId3;
      whereQuery1.isPublished = {"neq": false};
      whereQuery2.isPublished = {"neq": false};
      whereQuery3.isPublished = {"neq": false};

      if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId){
        whereQuery1.politicalPartyId=criteria.politicalPartyId;
        whereQuery2.politicalPartyId=criteria.politicalPartyId;
        whereQuery3.politicalPartyId=criteria.politicalPartyId;
      }
      if (criteria.hasOwnProperty("constitutionalPostId") && criteria.constitutionalPostId){
        whereQuery1.constitutionalPostId=criteria.constitutionalPostId;
        whereQuery2.constitutionalPostId=criteria.constitutionalPostId;
        whereQuery3.constitutionalPostId=criteria.constitutionalPostId;
      }
      if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
        if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
          whereQuery1.candidateType = criteria.candidateType;
          whereQuery2.candidateType = criteria.candidateType;
          whereQuery3.candidateType = criteria.candidateType;
        } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
          whereQuery1.resultType = criteria.candidateType;
          whereQuery2.resultType = criteria.candidateType;
          whereQuery3.resultType = criteria.candidateType;
          whereQuery1.candidateType = 'eligible';
          whereQuery2.candidateType = 'eligible';
          whereQuery3.candidateType = 'eligible';
        }
      }

      Promises.all([
        Candidate.find({
          where: whereQuery1,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        }),
        Candidate.find({
          where: whereQuery2,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        }),
        Candidate.find({
          where: whereQuery3,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        })
      ]).spread(function (candidateListUnsorted1, candidateListUnsorted2, candidateListUnsorted3) {
        ////console.log("candidate list 1", candidateList1.length);
        ////console.log("candidate list 2", candidateList2.length);
        var candidateList1 = simplifyCandidateAffidavitComparison(candidateListUnsorted1, type);
        // //console.log("after simplify 1");

        var candidateList2 = simplifyCandidateAffidavitComparison(candidateListUnsorted2, type);
        // //console.log("after simplify 2");

        var candidateList3 = simplifyCandidateAffidavitComparison(candidateListUnsorted3, type);

        var commonCandidate = [];
        var commondata=findCommonnCandidate(candidateList1, candidateList2);
        for (var i = 0; i < candidateList3.length; i++) {
          for (var j = 0; j < commondata.length; j++) {
            if (candidateList3[i].personId.toString() === commondata[j].one.personId.toString()) {
              commonCandidate.push({
                one: commondata[j].one,
                two: commondata[j].two,
                three:candidateList3[i],
                seatId: candidateList3[i].seatId
              });
              break;
            }
          }
        }
        cb(null, {
          candidateList: sortByKey(commonCandidate, "seatId"),
          one: (candidateListUnsorted1.length > 0 ) ? new Date(candidateListUnsorted1[0].currentElection().electionDate).getFullYear() : null,
          two: (candidateListUnsorted2.length > 0 ) ? new Date(candidateListUnsorted2[0].currentElection().electionDate).getFullYear() : null,
          three: (candidateListUnsorted3.length > 0 ) ? new Date(candidateListUnsorted3[0].currentElection().electionDate).getFullYear() : null
        });
      });

     }
     else if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId && criteria.hasOwnProperty("currentElectionId2") && criteria.currentElectionId2) {
      whereQuery1.currentElectionId = criteria.currentElectionId;
      whereQuery2.currentElectionId = criteria.currentElectionId2;
      whereQuery1.isPublished = {"neq": false};
      whereQuery2.isPublished = {"neq": false};

      if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId){
        //whereQuery1.politicalPartyId=criteria.politicalPartyId;
        whereQuery2.politicalPartyId=criteria.politicalPartyId;
      }

      if (criteria.hasOwnProperty("constitutionalPostId") && criteria.constitutionalPostId){
        //whereQuery1.constitutionalPostId=criteria.constitutionalPostId;
        whereQuery2.constitutionalPostId=criteria.constitutionalPostId;
      }
      if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
        if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
          whereQuery1.candidateType = criteria.candidateType;
          whereQuery2.candidateType = criteria.candidateType;
        } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
          whereQuery1.resultType = criteria.candidateType;
          whereQuery2.resultType = criteria.candidateType;
          whereQuery1.candidateType = 'eligible';
          whereQuery2.candidateType = 'eligible';
        }
      }

      Promises.all([
        Candidate.find({
          where: whereQuery1,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        }),
        Candidate.find({
          where: whereQuery2,
          include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
        })
      ]).spread(function (candidateListUnsorted1, candidateListUnsorted2) {
        ////console.log("candidate list 1", candidateList1.length);
        ////console.log("candidate list 2", candidateList2.length);
        var candidateList1 = simplifyCandidateAffidavitComparison(candidateListUnsorted1, type);
        // //console.log("after simplify 1");

        var candidateList2 = simplifyCandidateAffidavitComparison(candidateListUnsorted2, type);
        // //console.log("after simplify 2");

        var commonCandidate = [];
        for (var i = 0; i < candidateList1.length; i++) {
          for (var j = 0; j < candidateList2.length; j++) {
            if (candidateList1[i].personId.toString() === candidateList2[j].personId.toString()) {
              commonCandidate.push({
                one: candidateList1[i],
                two: candidateList2[j],
                seatId: candidateList1[i].seatId
              });
              break;
            }
          }
        }

        //console.log("o");

        cb(null, {
          candidateList: sortByKey(commonCandidate, "seatId"),
          one: (candidateListUnsorted1.length > 0 ) ? new Date(candidateListUnsorted1[0].currentElection().electionDate).getFullYear() : null,
          two: (candidateListUnsorted2.length > 0 ) ? new Date(candidateListUnsorted2[0].currentElection().electionDate).getFullYear() : null
        });
      });

     }
     else {
      cb(null, "must select more election");
      return;
    }

  };
  Candidate.getSingleCandidateReportYearWise = function (criteria, limit, type, for_what, cb) {
    //console.log("for_what", for_what);
    //console.log("type", type);

    var c1Query = {};
    var c2Query = {};
    var pQuery = {};
    if (
      criteria.hasOwnProperty("pid") &&
      criteria.hasOwnProperty("cid1") &&
      criteria.hasOwnProperty("eid1") &&
      criteria.hasOwnProperty("cid2") &&
      criteria.hasOwnProperty("eid2")
    ) {
      c1Query.id = criteria.cid1;
      c2Query.id = criteria.cid2;
      pQuery.personId = criteria.pid;
    } else {
      cb(null, "parameter doesn't valid!");
      return;
    }


    Promises.all([
      Candidate.findOne({
        where: c1Query,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      }),
      Candidate.findOne({
        where: c2Query,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      }),
      Candidate.find({
        where: pQuery,
        limit: 10,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      })
    ]).spread(function (c1Data, c2Data, pData) {

      c1Data.assetOwn = (c1Data.assetMaterialOwnTotalAF || 0 ) + (c1Data.assetImmaterialOwnTotalAF || 0 ) + (c1Data.assetJointSharePartTotalAF || 0 );
      c1Data.assetDependent = (c1Data.assetMaterialHusbandWifeTotalAF || 0 ) + (c1Data.assetMaterialDependantsTotalAF || 0 ) + (c1Data.assetImmaterialHusbandWifeTotalAF || 0 ) + (c1Data.assetImmaterialDependantsTotalAF || 0 );
      c1Data.assetTotal = (c1Data.assetMaterialOwnTotalAF || 0 ) + (c1Data.assetImmaterialOwnTotalAF || 0 ) + (c1Data.assetJointSharePartTotalAF || 0 ) + (c1Data.assetMaterialHusbandWifeTotalAF || 0 ) + (c1Data.assetMaterialDependantsTotalAF || 0 ) + (c1Data.assetImmaterialHusbandWifeTotalAF || 0 ) + (c1Data.assetImmaterialDependantsTotalAF || 0 );

      c1Data.incomeOwn = (c1Data.totalOwnIncomeAF || 0 );
      c1Data.incomeDependent = (c1Data.totalDependentIncomeAF || 0 );
      c1Data.incomeTotal = (c1Data.grandTotalIncomeAF || 0 );

      c1Data.loanOwn = (c1Data.totalSingleAmountAF || 0 ) + (c1Data.totalJointAmoutAF || 0 ) + (c1Data.totalDirectorOrChairmenAmoutAF || 0 );
      c1Data.loanDependent = (c1Data.totalDependedantsAmountAF || 0 );
      c1Data.loanTotal = (c1Data.totalSingleAmountAF || 0 ) + (c1Data.totalJointAmoutAF || 0 ) + (c1Data.totalDirectorOrChairmenAmoutAF || 0 ) + (c1Data.totalDependedantsAmountAF || 0 );

      c1Data.liabilityOwn = (c1Data.liabilitiesAmountAF || 0 );
      c1Data.liabilityTotal = (c1Data.liabilitiesAmountAF || 0 );

      c1Data.neatAsset = (c1Data.assetMaterialOwnTotalAF || 0 ) + (c1Data.assetImmaterialOwnTotalAF || 0 ) + (c1Data.assetJointSharePartTotalAF || 0 );
      c1Data.neatLiability = (c1Data.liabilitiesAmountAF || 0 );
      c1Data.neatNeatAsset = (c1Data.assetMaterialOwnTotalAF || 0 ) + (c1Data.assetImmaterialOwnTotalAF || 0 ) + (c1Data.assetJointSharePartTotalAF || 0 ) - (c1Data.liabilitiesAmountAF || 0 );


      c2Data.assetOwn = (c2Data.assetMaterialOwnTotalAF || 0 ) + (c2Data.assetImmaterialOwnTotalAF || 0 ) + (c2Data.assetJointSharePartTotalAF || 0 );
      c2Data.assetDependent = (c2Data.assetMaterialHusbandWifeTotalAF || 0 ) + (c2Data.assetMaterialDependantsTotalAF || 0 ) + (c2Data.assetImmaterialHusbandWifeTotalAF || 0 ) + (c2Data.assetImmaterialDependantsTotalAF || 0 );
      c2Data.assetTotal = (c2Data.assetMaterialOwnTotalAF || 0 ) + (c2Data.assetImmaterialOwnTotalAF || 0 ) + (c2Data.assetJointSharePartTotalAF || 0 ) + (c2Data.assetMaterialHusbandWifeTotalAF || 0 ) + (c2Data.assetMaterialDependantsTotalAF || 0 ) + (c2Data.assetImmaterialHusbandWifeTotalAF || 0 ) + (c2Data.assetImmaterialDependantsTotalAF || 0 );

      c2Data.incomeOwn = (c2Data.totalOwnIncomeAF || 0 );
      c2Data.incomeDependent = (c2Data.totalDependentIncomeAF || 0 );
      c2Data.incomeTotal = (c2Data.grandTotalIncomeAF || 0 );

      c2Data.loanOwn = (c2Data.totalSingleAmountAF || 0 ) + (c2Data.totalJointAmoutAF || 0 ) + (c2Data.totalDirectorOrChairmenAmoutAF || 0 );
      c2Data.loanDependent = (c2Data.totalDependedantsAmountAF || 0 );
      c2Data.loanTotal = (c2Data.totalSingleAmountAF || 0 ) + (c2Data.totalJointAmoutAF || 0 ) + (c2Data.totalDirectorOrChairmenAmoutAF || 0 ) + (c2Data.totalDependedantsAmountAF || 0 );

      c2Data.liabilityOwn = (c2Data.liabilitiesAmountAF || 0 );
      c2Data.liabilityTotal = (c2Data.liabilitiesAmountAF || 0 );

      c2Data.neatAsset = (c2Data.assetMaterialOwnTotalAF || 0 ) + (c2Data.assetImmaterialOwnTotalAF || 0 ) + (c2Data.assetJointSharePartTotalAF || 0 );
      c2Data.neatLiability = (c2Data.liabilitiesAmountAF || 0 );
      c2Data.neatNeatAsset = (c2Data.assetMaterialOwnTotalAF || 0 ) + (c2Data.assetImmaterialOwnTotalAF || 0 ) + (c2Data.assetJointSharePartTotalAF || 0 ) - (c2Data.liabilitiesAmountAF || 0 );

      var arrayToJson = {
        incomeDetails: ["agriculture", "building_fare", "business", "shares", "profession", "service", "others"],
        assetMaterialDetails: ["cash_taka", "foreign_currency", "bank_deposit", "all_shares", "dps", "vehicles", "gold_ornaments", "electronic_goods", "furnitures", "others"],
        assetImmaterialDetails: ["cultivated_land", "noncultivated_land", "building", "house_apartment", "garden_farm", "others"]
      };

      c1Data.incomeDetails = {};
      c1Data.incomeDetails.sum = {
        own: 0,
        dependent: 0,
        total: 0
      };
      arrayToJson.incomeDetails.forEach(function (key) {
        c1Data.incomeDetails[key] = {
          own: 0,
          dependent: 0,
          total: 0
        };
        if (c1Data.incomeSourceAF && c1Data.incomeSourceAF.length > 0) {
          for (var i = 0; i < c1Data.incomeSourceAF.length; i++) {
            if (c1Data.incomeSourceAF[i].type === key) {
              c1Data.incomeDetails[key].own += (Number(c1Data.incomeSourceAF[i].own) || 0);
              c1Data.incomeDetails[key].dependent += (Number(c1Data.incomeSourceAF[i].dependents) || 0);
            }
          }
          c1Data.incomeDetails[key].total = c1Data.incomeDetails[key].own + c1Data.incomeDetails[key].dependent;
          c1Data.incomeDetails.sum.own += c1Data.incomeDetails[key].own;
          c1Data.incomeDetails.sum.dependent += c1Data.incomeDetails[key].dependent;
          c1Data.incomeDetails.sum.total += c1Data.incomeDetails[key].total;
        }
      });

      c1Data.assetMaterialDetails = {};
      c1Data.assetMaterialDetails.sum = {
        own: 0,
        dependent: 0,
        total: 0
      };
      arrayToJson.assetMaterialDetails.forEach(function (key) {
        c1Data.assetMaterialDetails[key] = {
          own: 0,
          dependent: 0,
          total: 0
        };
        if (c1Data.assetMaterialAF && c1Data.assetMaterialAF.length > 0) {
          for (var i = 0; i < c1Data.assetMaterialAF.length; i++) {
            if (c1Data.assetMaterialAF[i].type === key) {
              c1Data.assetMaterialDetails[key].own += (Number(c1Data.assetMaterialAF[i].priceOwn) || 0);
              c1Data.assetMaterialDetails[key].dependent += (Number(c1Data.assetMaterialAF[i].priceHusbandWife) || 0) + (Number(c1Data.assetMaterialAF[i].priceDependants) || 0);
            }
          }
          c1Data.assetMaterialDetails[key].total = c1Data.assetMaterialDetails[key].own + c1Data.assetMaterialDetails[key].dependent;
          c1Data.assetMaterialDetails.sum.own += c1Data.assetMaterialDetails[key].own;
          c1Data.assetMaterialDetails.sum.dependent += c1Data.assetMaterialDetails[key].dependent;
          c1Data.assetMaterialDetails.sum.total += c1Data.assetMaterialDetails[key].total;
        }
      });
      c1Data.assetImmaterialDetails = {};
      c1Data.assetImmaterialDetails.sum = {
        own: 0,
        dependent: 0,
        total: 0
      };
      arrayToJson.assetImmaterialDetails.forEach(function (key) {
        c1Data.assetImmaterialDetails[key] = {
          own: 0,
          dependent: 0,
          total: 0
        };
        if (c1Data.assetImmaterialAF && c1Data.assetImmaterialAF.length > 0) {

          for (var i = 0; i < c1Data.assetImmaterialAF.length; i++) {
            if (c1Data.assetImmaterialAF[i].type === key) {
              c1Data.assetImmaterialDetails[key].own += (Number(c1Data.assetImmaterialAF[i].priceOwn) || 0) + (Number(c1Data.assetImmaterialAF[i].priceJointSharePart) || 0);
              c1Data.assetImmaterialDetails[key].dependent += (Number(c1Data.assetImmaterialAF[i].priceHusbandWife) || 0) + (Number(c1Data.assetMaterialAF[i].priceDependants) || 0);
            }
          }
          c1Data.assetImmaterialDetails[key].total = c1Data.assetImmaterialDetails[key].own + c1Data.assetImmaterialDetails[key].dependent;
          c1Data.assetImmaterialDetails.sum.own += c1Data.assetImmaterialDetails[key].own;
          c1Data.assetImmaterialDetails.sum.dependent += c1Data.assetImmaterialDetails[key].dependent;
          c1Data.assetImmaterialDetails.sum.total += c1Data.assetImmaterialDetails[key].total;
        }
      });

      c2Data.incomeDetails = {};
      c2Data.incomeDetails.sum = {
        own: 0,
        dependent: 0,
        total: 0
      };
      arrayToJson.incomeDetails.forEach(function (key) {
        c2Data.incomeDetails[key] = {
          own: 0,
          dependent: 0,
          total: 0
        };
        if (c2Data.incomeSourceAF && c2Data.incomeSourceAF.length > 0) {
          //console.log(c2Data.incomeSourceAF )
          for (var i = 0; i < c2Data.incomeSourceAF.length; i++) {
            if (c2Data.incomeSourceAF[i].type === key) {
              c2Data.incomeDetails[key].own += (Number(c2Data.incomeSourceAF[i].own) || 0);
              c2Data.incomeDetails[key].dependent += (Number(c2Data.incomeSourceAF[i].dependents) || 0);
            }
          }
          c2Data.incomeDetails[key].total = c2Data.incomeDetails[key].own + c2Data.incomeDetails[key].dependent;
          c2Data.incomeDetails.sum.own += c2Data.incomeDetails[key].own;
          c2Data.incomeDetails.sum.dependent += c2Data.incomeDetails[key].dependent;
          c2Data.incomeDetails.sum.total += c2Data.incomeDetails[key].total;
        }
      });

      c2Data.assetMaterialDetails = {};
      c2Data.assetMaterialDetails.sum = {
        own: 0,
        dependent: 0,
        total: 0
      };
      arrayToJson.assetMaterialDetails.forEach(function (key) {
        c2Data.assetMaterialDetails[key] = {
          own: 0,
          dependent: 0,
          total: 0
        };
        if (c2Data.assetMaterialAF && c2Data.assetMaterialAF.length > 0) {
          for (var i = 0; i < c2Data.assetMaterialAF.length; i++) {
            if (c2Data.assetMaterialAF[i].type === key) {
              c2Data.assetMaterialDetails[key].own += (Number(c2Data.assetMaterialAF[i].priceOwn) || 0);
              c2Data.assetMaterialDetails[key].dependent += (Number(c2Data.assetMaterialAF[i].priceHusbandWife) || 0) + (Number(c2Data.assetMaterialAF[i].priceDependants) || 0);
            }
          }
          c2Data.assetMaterialDetails[key].total = c2Data.assetMaterialDetails[key].own + c2Data.assetMaterialDetails[key].dependent;
          c2Data.assetMaterialDetails.sum.own += c2Data.assetMaterialDetails[key].own;
          c2Data.assetMaterialDetails.sum.dependent += c2Data.assetMaterialDetails[key].dependent;
          c2Data.assetMaterialDetails.sum.total += c2Data.assetMaterialDetails[key].total;
        }
      });
      c2Data.assetImmaterialDetails = {};
      c2Data.assetImmaterialDetails.sum = {
        own: 0,
        dependent: 0,
        total: 0
      };
      arrayToJson.assetImmaterialDetails.forEach(function (key) {
        c2Data.assetImmaterialDetails[key] = {
          own: 0,
          dependent: 0,
          total: 0
        };
        if (c2Data.assetImmaterialAF && c2Data.assetImmaterialAF.length > 0) {

          for (var i = 0; i < c2Data.assetImmaterialAF.length; i++) {
            if (c2Data.assetImmaterialAF[i].type === key) {
              c2Data.assetImmaterialDetails[key].own += (Number(c2Data.assetImmaterialAF[i].priceOwn) || 0) + (Number(c2Data.assetImmaterialAF[i].priceJointSharePart) || 0);
              c2Data.assetImmaterialDetails[key].dependent += (Number(c2Data.assetImmaterialAF[i].priceHusbandWife) || 0) + (Number(c2Data.assetMaterialAF[i].priceDependants) || 0);
            }
          }
          c2Data.assetImmaterialDetails[key].total = c2Data.assetImmaterialDetails[key].own + c2Data.assetImmaterialDetails[key].dependent;
          c2Data.assetImmaterialDetails.sum.own += c2Data.assetImmaterialDetails[key].own;
          c2Data.assetImmaterialDetails.sum.dependent += c2Data.assetImmaterialDetails[key].dependent;
          c2Data.assetImmaterialDetails.sum.total += c2Data.assetImmaterialDetails[key].total;
        }
      });


      cb(null, {
        c1Data: c1Data,
        c2Data: c2Data,
        pData: pData,
        e1Year: c1Data.currentElection() ? new Date(c1Data.currentElection().electionDate).getFullYear() : null,
        e2Year: c2Data.currentElection() ? new Date(c2Data.currentElection().electionDate).getFullYear() : null,
        arrayToJson: arrayToJson,
      });
    });

  };
  Candidate.getCandidateUnionPerson = function (criteria, limit, type, for_what, cb) {
    //console.log("in uni");


    //console.log("for_what", for_what);
    //console.log("type", type);

    var whereQuery1 = {};
    var whereQuery2 = {};
    if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId && criteria.hasOwnProperty("currentElectionId2") && criteria.currentElectionId2) {
      whereQuery1.currentElectionId = criteria.currentElectionId;
      whereQuery2.currentElectionId = criteria.currentElectionId2;
      whereQuery1.isPublished = {"neq": false};
      whereQuery2.isPublished = {"neq": false};
    } else {
      cb(null, "must select both election");
      return;
    }

    if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId){
      //whereQuery1.politicalPartyId=criteria.politicalPartyId;
      whereQuery2.politicalPartyId=criteria.politicalPartyId;
    }

    if (criteria.hasOwnProperty("constitutionalPostId") && criteria.constitutionalPostId){
      //whereQuery1.constitutionalPostId=criteria.constitutionalPostId;
      whereQuery2.constitutionalPostId=criteria.constitutionalPostId;
    }

    if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
      if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
        whereQuery1.candidateType = criteria.candidateType;
        whereQuery2.candidateType = criteria.candidateType;
      } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
        whereQuery1.resultType = criteria.candidateType;
        whereQuery2.resultType = criteria.candidateType;
        whereQuery1.candidateType = 'eligible';
        whereQuery2.candidateType = 'eligible';
      }
    }

    Promises.all([
      Candidate.find({
        where: whereQuery1,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      }),
      Candidate.find({
        where: whereQuery2,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      })
    ]).spread(function (candidateListUnsorted1, candidateListUnsorted2) {
      ////console.log("candidate list 1", candidateList1.length);
      ////console.log("candidate list 2", candidateList2.length);
      var candidateList1 = simplifyCandidateYearWise(candidateListUnsorted1, type);
      //console.log("after simplify 1");

      var candidateList2 = simplifyCandidateYearWise(candidateListUnsorted2, type);
      //console.log("after simplify 2");
      var commonCandidate = [];
      for (var i = 0; i < candidateList1.length; i++) {
        for (var j = 0; j < candidateList2.length; j++) {
          if (candidateList1[i].personId.toString() === candidateList2[j].personId.toString()) {
            commonCandidate.push({
              one: candidateList1[i],
              two: candidateList2[j],
              seatId: candidateList1[i].seatId,
              personId: candidateList1[i].personId
            });

            break;
          }
        }
      }
      //console.log("o");
      //var intData = _.union(candidateList1, candidateList2);

      ////console.log(intData.length);

      cb(null, {
        candidateList: sortByKey(commonCandidate, "seatId"),
        one: (candidateListUnsorted1.length > 0 ) ? new Date(candidateListUnsorted1[0].currentElection().electionDate).getFullYear() : null,
        two: (candidateListUnsorted2.length > 0 ) ? new Date(candidateListUnsorted2[0].currentElection().electionDate).getFullYear() : null,
      });
    });

  };
  Candidate.getCandidatePfseComparison = function (criteria, limit, type, for_what, cb) {
    //console.log("for_what in pfse", for_what);
    //console.log("type", type);

    var whereQuery1 = {};
    var whereQuery2 = {};
    if (criteria.hasOwnProperty("currentElectionId") && criteria.currentElectionId && criteria.hasOwnProperty("currentElectionId2") && criteria.currentElectionId2) {
      whereQuery1.currentElectionId = criteria.currentElectionId;
      whereQuery2.currentElectionId = criteria.currentElectionId2;
    } else {
      cb(null, "must select both election");
      return;
    }
    if (criteria.hasOwnProperty("politicalPartyId") && criteria.politicalPartyId){
      //whereQuery1.politicalPartyId=criteria.politicalPartyId;
      whereQuery2.politicalPartyId=criteria.politicalPartyId;
    }
    if (criteria.hasOwnProperty("constitutionalPostId") && criteria.constitutionalPostId){
      //whereQuery1.constitutionalPostId=criteria.constitutionalPostId;
      whereQuery2.constitutionalPostId=criteria.constitutionalPostId;
    }
    if (criteria.hasOwnProperty("candidateType") && criteria.candidateType) {
      if (criteria.candidateType === 'possible' || criteria.candidateType === 'eligible' || criteria.candidateType === 'withdrawn') {
        whereQuery1.candidateType = criteria.candidateType;
        whereQuery2.candidateType = criteria.candidateType;
      } else if (criteria.candidateType === 'elected' || criteria.candidateType === 'notelected') {
        whereQuery1.resultType = criteria.candidateType;
        whereQuery2.resultType = criteria.candidateType;
        whereQuery1.candidateType = 'eligible';
        whereQuery2.candidateType = 'eligible';
      }
    }
    Promises.all([
      Candidate.find({
        where: whereQuery1,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      }),
      Candidate.find({
        where: whereQuery2,
        include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
      })
    ]).spread(function (candidateListUnsorted1, candidateListUnsorted2) {
      var candidateList1 = [];
      var candidateList2 = [];
      if (for_what === "IncomeAll") {
        candidateList1 = getC3DataCandidatesTotalIncome(candidateListUnsorted1, (limit || 0), type);
        candidateList2 = getC3DataCandidatesTotalIncome(candidateListUnsorted2, (limit || 0), type);
      } else if (for_what === "IncomeLoan") {
        candidateList1 = getC3DataCandidatesLoan(candidateListUnsorted1, (limit || 0), type);
        candidateList2 = getC3DataCandidatesLoan(candidateListUnsorted2, (limit || 0), type);
      } else if (for_what === "IncomeDonation") {
        candidateList1 = getC3DataCandidatesDonation(candidateListUnsorted1, (limit || 0), type);
        candidateList2 = getC3DataCandidatesDonation(candidateListUnsorted2, (limit || 0), type);
      } else {
        //console.log("in tax maybe");
        cb(null, "no data");
        return;

      }

      //console.log("candidate list 1", candidateList1.length);
      //console.log("candidate list 2", candidateList2.length);
      var commonCandidate = [];
      for (var i = 0; i < candidateList1.length; i++) {
        for (var j = 0; j < candidateList2.length; j++) {
          if (candidateList1[i].personId.toString() === candidateList2[j].personId.toString()) {
            commonCandidate.push({
              one: candidateList1[i],
              two: candidateList2[j],
              seatId: candidateList1[i].seatId.toString()
            });

            break;
          }
        }
      }
      cb(null, {
        candidateList: sortByKey(commonCandidate, "seatId"),
        one: (candidateListUnsorted1.length > 0 ) ? new Date(candidateListUnsorted1[0].currentElection().electionDate).getFullYear() : null,
        two: (candidateListUnsorted2.length > 0 ) ? new Date(candidateListUnsorted2[0].currentElection().electionDate).getFullYear() : null,
      });
    });

  };
  Candidate.getEERBCase = function (whereCriteria, limit, type, cb) {
    whereCriteria.isPublished = {"neq": false};
    //whereCriteria.statusEER = true;
    whereCriteria.isCaseFiledByECB_EER = true;
    var query = {
      where: whereCriteria,
      include: ['currentElection', 'electionSeat', "district", "upazilla", "union", "person", "politicalParty"]
    };
    Candidate.find(query).then(function (data) {


      var c3data = []; // getC3Data(data, "professionTypeBnAF");
      var table = [];
      try {
        table = simplifyData(getC3DataCandidatesEERBCase(data, (limit || 0)), type);
      } catch (e) {


      }


      //console.log("type getEERBCase", type);

      cb(null, {c3data: c3data, table: table, totalCandidate: data.length});
    });
  };



  var candidatePhoto = '';
   var storage = multer.diskStorage({
       destination: function (req, file, cb) {
           // checking and creating uploads folder where files will be uploaded
           var dirPath = '/client/app/images/candidate_photo'
           if (!fs.existsSync(dirPath)) {
               var dir = fs.mkdirSync(dirPath);
           }
           cb(null, dirPath + '/');
       },
       filename: function (req, file, cb) {
           // file will be accessible in `file` variable
           var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
           var fileName = Date.now() + ext;
           candidatePhoto = fileName;
           cb(null, fileName);
       }
   });


   Candidate.upload = function (req, res, cb) {
       var upload = multer({
           storage: storage
       }).array('file', 12);
       upload(req, res, function (err) {
           if (err) {
               // An error occurred when uploading
               res.json(err);
           }
           res.json(candidatePhoto);
       });
   };

   Candidate.remoteMethod('upload', {
     http: {path: '/upload', verb: 'post'},
     accepts: [{
         arg: 'req',
         type: 'object',
         http: {
             source: 'req'
         }
     }, {
         arg: 'res',
         type: 'object',
         http: {
             source: 'res'
         }
     }],
     returns: {
          arg: 'result',
          type: 'string'
     }
   });


  Candidate.remoteMethod('updateCandidate', {
    accepts: [{
            arg: 'id',
            type: 'string',
            required: true
        },
        {
            arg: 'newId',
            type: 'string',
            required: true
        }
    ],
    http: {
      path: '/updateCandidate',
      verb: 'POST'
    }
  })

  Candidate.remoteMethod(
    'differentElectionParticipateCandidate',
    {
      http: {path: '/differentElectionParticipateCandidate', verb: 'get'},
      returns: {arg: "data", type: 'json'}
    }
  );

  Candidate.remoteMethod(
    'getPoliticalPartyChartNew',
    {
      http: {path: '/getPoliticalPartyChartNew', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );

  Candidate.remoteMethod(
    'getTopElectedCandidateChart',
    {
      http: {path: '/getTopElectedCandidateChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );

  Candidate.remoteMethod(
    'getOccupationChart',
    {
      http: {path: '/getOccupationChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod("getCommitmentAchievementChart", {
    http: { path: "/getCommitmentAchievementChart", verb: "get" },
    accepts: [
      { arg: "whereCriteria", type: "json", http: { source: "query" } },
      { arg: "type", type: "string", http: { source: "query" } },
    ],
    returns: { arg: "data", type: "json" },
  });
  Candidate.remoteMethod(
    'getCasesChart',
    {
      http: {path: '/getCasesChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEducationChart',
    {
      http: {path: '/getEducationChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getGenderChart',
    {
      http: {path: '/getGenderChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getAgeChart',
    {
      http: {path: '/getAgeChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getTaxReturnSummaryChart',
    {
      http: {path: '/getTaxReturnSummaryChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getAssetChart',
    {
      http: {path: '/getAssetChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getLoanChart',
    {
      http: {path: '/getLoanChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod("getLiabilityChart", {
    http: { path: "/getLiabilityChart", verb: "get" },
    accepts: [
      { arg: "whereCriteria", type: "json", http: { source: "query" } },
      { arg: "type", type: "string", http: { source: "query" } },
    ],
    returns: { arg: "data", type: "json" },
  });
  Candidate.remoteMethod(
    'getIncomeChart',
    {
      http: {path: '/getIncomeChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getTaxChart',
    {
      http: {path: '/getTaxChart', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getPfseCandidatesPiWhichExceedsSpendingLimits',
    {
      http: {path: '/getPfseCandidatesPiWhichExceedsSpendingLimits', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getElectedCandidates',
    {
      http: {path: '/getElectedCandidates', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );

  Candidate.remoteMethod(
    'getElectedCandidatesByCw',
    {
      http: {path: '/getElectedCandidatesByCw', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getCandidateFormSubmitStatistics',
    {
      http: {path: '/getCandidateFormSubmitStatistics', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getCandidateFormEntryStatistics',
    {
      http: {path: '/getCandidateFormEntryStatistics', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getCandidateFormEntryReviewStatistics',
    {
      http: {path: '/getCandidateFormEntryReviewStatistics', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getCandidateLists',
    {
      http: {path: '/getCandidateLists', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getPfseCandidates5',
    {
      http: {path: '/getPfseCandidates5', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getPfseCandidates6',
    {
      http: {path: '/getPfseCandidates6', verb: 'get'},
      accepts: {arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getPfseCandidatesDonation',
    {
      http: {path: '/getPfseCandidatesDonation', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],

      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getPfseCandidatesLoan',
    {
      http: {path: '/getPfseCandidatesLoan', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],

      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getPfseCandidatesTotalIncome',
    {
      http: {path: '/getPfseCandidatesTotalIncome', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],

      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getPfseCandidatesBusinessOrganization',
    {
      http: {path: '/getPfseCandidatesBusinessOrganization', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}],

      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERB',
    {
      http: {path: '/getEERB', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBDidNotSubmitReturn',
    {
      http: {path: '/getEERBDidNotSubmitReturn', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBCountSubmitReturn',
    {
      http: {path: '/getEERBCountSubmitReturn', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBCase',
    {
      http: {path: '/getEERBCase', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBMoneySpentForCampaigning',
    {
      http: {path: '/getEERBMoneySpentForCampaigning', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBMoneySpentMoreThanSpendingLimit',
    {
      http: {path: '/getEERBMoneySpentMoreThanSpendingLimit', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBRangeWiseMoneySpent',
    {
      http: {path: '/getEERBRangeWiseMoneySpent', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBComparisonMoneySpentAmount',
    {
      http: {path: '/getEERBComparisonMoneySpentAmount', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBComparisonMoneySpentPercentage',
    {
      http: {path: '/getEERBComparisonMoneySpentPercentage', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getEERBComparisonGender',
    {
      http: {path: '/getEERBComparisonGender', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getALIE',
    {
      http: {path: '/getALIE', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}},
        {arg: 'for_what', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getDiscrepancy',
    {
      http: {path: '/getDiscrepancy', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}},
        {arg: 'for_what', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getALIEComparison',
    {
      http: {path: '/getALIEComparison', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}},
        {arg: 'for_what', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getCandidateAffidavitComparison',
    {
      http: {path: '/getCandidateAffidavitComparison', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}},
        {arg: 'for_what', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getSingleCandidateReportYearWise',
    {
      http: {path: '/getSingleCandidateReportYearWise', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}},
        {arg: 'for_what', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getCandidateUnionPerson',
    {
      http: {path: '/getCandidateUnionPerson', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}},
        {arg: 'for_what', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
  Candidate.remoteMethod(
    'getCandidatePfseComparison',
    {
      http: {path: '/getCandidatePfseComparison', verb: 'get'},
      accepts: [{arg: 'whereCriteria', type: 'json', http: {source: 'query'}},
        {arg: 'limit', type: 'number', http: {source: 'query'}},
        {arg: 'type', type: 'string', http: {source: 'query'}},
        {arg: 'for_what', type: 'string', http: {source: 'query'}}
      ],
      returns: {arg: "data", type: 'json'}
    }
  );
};
