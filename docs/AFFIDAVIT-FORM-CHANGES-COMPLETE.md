# Affidavit Form Changes - Complete Changelog

This document describes **all changes** made to the Affidavit Form (হলফনামা) from commit `1666d89` to the latest version.

**Base Commit:** `1666d89f0b59cb7ac5c99f6aea107abbff14048f`
**Updated:** January 2026

---

## Files Modified

1. `client/app/modules/candidates/views/affidavit/edit.html`
2. `client/app/modules/candidates/controllers/affidavit/affidavit.ctrl.js`

---

## GENDER OPTION UPDATE (তৃতীয় লিঙ্গ)

Added **তৃতীয় লিঙ্গ** (Third Gender) as a gender option across the entire system:

### Frontend Forms Updated

| File | Change |
|------|--------|
| `candidates/services/persons.service.js` | Added `{name: 'তৃতীয় লিঙ্গ', value: 'তৃতীয় লিঙ্গ'}` and `{name: 'Third Gender', value: 'third_gender'}` to genderBn/genderEn selects |
| `persons/services/persons.service.js` | Same as above |
| `candidates/services/candidates.service.js` | Added তৃতীয় লিঙ্গ option to both genderBn select fields |
| `candidates/views/addform.html` | Added `<option value="তৃতীয় লিঙ্গ">তৃতীয় লিঙ্গ</option>` |
| `candidates/views/candidateMerge.html` | Same as above |

### Controllers Updated (genderBn → genderEn mapping)

| File | Change |
|------|--------|
| `candidates/controllers/editform.Ctrl.js` | Added `তৃতীয় লিঙ্গ` → `third_gender` mapping |
| `candidates/controllers/addedit.ctrl.js` | Added mapping in both new candidate and edit candidate save blocks |

### Backend Analysis Updated

| File | Change |
|------|--------|
| `common/models/candidate.js` | `getC3DataGender()`: added "third_gender" category with key "তৃতীয় লিঙ্গ", included in total count and c3 chart data |
| `common/models/candidate.js` | `groupData` seat analysis: added `states.other` counter for তৃতীয় লিঙ্গ candidates |

### Report Views Updated

| File | Change |
|------|--------|
| `f-election-result/views/gender-analysis.html` | Added তৃতীয় লিঙ্গ column in header, body rows, and footer totals |
| `f-election-result/views/election-menu.html` | Menu label updated to "Male/Female/Third Gender Candidates Analysis" |
| `core/views/front.html` | Navigation menu label updated |
| `core/views/front-new.html` | Navigation menu label updated |

### Profile Photo Fallback Updated

| File | Change |
|------|--------|
| `f-candidate-search/views/affidavit/view.html` | Added fallback photo for `genderEn=='third_gender'` or `genderBn=='তৃতীয় লিঙ্গ'` |
| `constituencies/views/electionSeat.html` | Same fallback added in both candidate list and detail sections |

---

## NEW FIELDS

### Page 1 - Basic Information

| Field (Bengali) | Model Name | Type | Description |
|-----------------|------------|------|-------------|
| নির্বাচনী এলাকার নম্বর ও নাম | `constituencyNameNumberAF` | text | Constituency number and name |
| জন্ম তারিখ | `candidateDateOfBirthBnAF` | text | Date of birth (dd-mm-yyyy) |
| বয়স (বৎসর) | `ageYearsAF` | text | Age in years |
| বয়স (মাস) | `ageMonthsAF` | text | Age in months |
| বয়স (দিন) | `ageDaysAF` | text | Age in days |
| মাতার নাম | `motherNameBnAF` | text | Mother's name (separate field) |
| স্বামী/স্ত্রীর নাম | `spouseNameBnAF` | text | Spouse name |
| জাতীয় পরিচয়পত্র নম্বর | `nidNumberAF` | text | NID number |
| জন্ম নাগরিকত্বধারী | `isBirthCitizenAF` | radio (yes/no) | Birth citizen status |
| নাগরিকত্বধারী দেশের নাম | `citizenCountryNameAF` | text | Citizen country name |
| পূর্বে নাগরিকত্বধারী ছিলাম | `wasPreviousCitizenAF` | radio (yes/no) | Was previous citizen |
| পূর্বের নাগরিকত্বধারী দেশের নাম | `previousCitizenCountryAF` | text | Previous citizen country |
| নাগরিকত্ব ত্যাগের তারিখ | `citizenshipRenounceDate` | text | Citizenship renounce date |

---

### Section 2 - Criminal Cases (অভিযোগসমূহ)

| Field (Bengali) | Model Name | Type | Description |
|-----------------|------------|------|-------------|
| কখনই ফৌজদারি মামলায় অভিযুক্ত হইনি | `neverChargedCriminalAF` | radio (yes/no) | Never charged criminal |
| বর্তমান মামলার মোট সংখ্যা | `totalPresentCasesAF` | text | Total present cases count |
| অতীত মামলার মোট সংখ্যা | `totalPastCasesAF` | text | Total past cases count |

#### Past Cases Table - New Columns

| Field | Model Name | Type |
|-------|------------|------|
| মামলা দায়েরের বছর | `lawPastAF[].caseFiledYear` | text |
| মামলা নিষ্পত্তি বছর | `lawPastAF[].caseSettledYear` | text |

---

### Section 4 - Profession (৪. পেশা) - NEW SECTION

| Field (Bengali) | Model Name | Type | Options |
|-----------------|------------|------|---------|
| আমার বর্তমান পেশা | `currentProfessionAF` | dropdown | কৃষি, ব্যবসা, চাকুরি, আইনজীবী, রাজনীতিবিদ, শিক্ষকতা, গৃহিণী, উল্লেখ নেই, অন্যান্য |
| আমার পূর্বতন পেশা | `previousProfessionAF` | dropdown | (same options) |
| স্বামী/স্ত্রীর পেশা | `spouseProfessionAF` | dropdown | (same options) |
| স্বামী/স্ত্রীর পূর্বতন পেশা | `spousePreviousProfessionAF` | dropdown | (same options) |

---

### Section 5 - Dependents (নির্ভরশীলদের পেশার তালিকা) - MODIFIED

| Field (Bengali) | Model Name | Type |
|-----------------|------------|------|
| নাম | `dependentsAF[].name` | text |
| ডিওবি/বয়স | `dependentsAF[].dobOrAge` | text |
| জন্মনিবন্ধন নম্বর | `dependentsAF[].birthRegNo` | text |
| মন্তব্য | `dependentsAF[].remarks` | text |

---

### Income Source Section - MODIFIED (Split into Domestic/Foreign)

| Field (Bengali) | Model Name | Type |
|-----------------|------------|------|
| প্রার্থীর আয় (দেশের ভেতরে) | `incomeSourceAF[].ownDomestic` | number |
| প্রার্থীর আয় (দেশের বাইরে) | `incomeSourceAF[].ownForeign` | number |
| নির্ভরশীলদের আয় (দেশের ভেতরে) | `incomeSourceAF[].dependentsDomestic` | number |
| নির্ভরশীলদের আয় (দেশের বাইরে) | `incomeSourceAF[].dependentsForeign` | number |

---

### অস্থাবর সম্পদ (Movable Assets) - NEW OPTIONS

| Value | Label (Bengali) |
|-------|-----------------|
| `cryptocurrency` | ক্রিপটোকারেন্সি (আনুমানিক বাজার মূল্য) |
| `mobile_laptop` | মোবাইল/ল্যাপটপ/কম্পিউটার (অর্জনকালীন সময়ের মূল্য) |
| `business_capital` | ব্যক্তিগত ব্যবসা প্রতিষ্ঠানে নিজস্ব মূলধন |
| `weapons` | অস্ত্রশস্ত্র |
| `livestock` | গবাদি পশু, হাঁস-মুরগি ও অন্যান্যের সংখ্যা ও মূল্য |
| `total_acquisition_movable` | অর্জনকালীন (মোট মূল্য) (১-১৩ নম্বর পর্যন্ত) |
| `current_value_movable` | বর্তমান আনুমানিক মূল্য (১-১৩ নম্বর পর্যন্ত) |
| `total_movable` | মোট অস্থাবর সম্পদ (১-১৫ নং ক্রমিকের যোগফল) |
| `previous_year_movable` | পূর্ববর্তী বছরের মোট অস্থাবর সম্পদ |

---

### স্থাবর সম্পদ (Immovable Assets) - NEW OPTIONS

| Value | Label (Bengali) |
|-------|-----------------|
| `total_acquisition_immovable` | মোট অর্জনকালীন মূল্য (১-৭ নং ক্রমিকের যোগফল) |
| `current_value_immovable` | বর্তমান আনুমানিক মূল্য (১-৭ নং ক্রমিকের যোগফল) |
| `total_immovable` | মোট স্থাবর সম্পদ (১-৯ নং ক্রমিকের যোগফল) |
| `previous_year_total` | পূর্ববর্তী বছরের মোট স্থাবর সম্পদ |

---

### (গ)(১) দায় Section - NEW

4-row table for liabilities:

| Row | Model Fields |
|-----|--------------|
| ১ - আমার নামে | `liability1TypeAF`, `liability1DescAF`, `liability1AmountAF` |
| ২ - স্বামী/স্ত্রীর নামে | `liability2TypeAF`, `liability2DescAF`, `liability2AmountAF` |
| ৩ - সন্তানের নামে | `liability3TypeAF`, `liability3DescAF`, `liability3AmountAF` |
| ৪ - নির্ভরশীলদের নামে | `liability4TypeAF`, `liability4DescAF`, `liability4AmountAF` |

---

### (গ)(২) সরকারি পাওনাদি Section - NEW

4-row table for government dues with dropdown options: বাসভবন, যানবাহন, টেলিফোন, বিদ্যুৎ, পৌর-কর, অন্যান্য

| Row | Model Fields |
|-----|--------------|
| ১ - আমার নামে | `govDues1TypeAF`, `govDues1CurrentAF`, `govDues1AmountAF` |
| ২ - স্বামী/স্ত্রীর নামে | `govDues2TypeAF`, `govDues2CurrentAF`, `govDues2AmountAF` |
| ৩ - সন্তানের নামে | `govDues3TypeAF`, `govDues3CurrentAF`, `govDues3AmountAF` |
| ৪ - নির্ভরশীলদের নামে | `govDues4TypeAF`, `govDues4CurrentAF`, `govDues4AmountAF` |

---

### Section 8 - প্রতিনিধিত্বের ইতিহাস (Election History) - MODIFIED

| Field (Bengali) | Model Name | Type |
|-----------------|------------|------|
| কখনো সংসদ সদস্য হিসেবে নির্বাচিত হইনি | `neverElectedMpAF` | radio (yes/no) |

#### Election History Table - NEW (`electionHistoryAF[]`)

| Field | Model Name | Type |
|-------|------------|------|
| নির্বাচনের বছর | `electionHistoryAF[].electionYear` | text |
| নির্বাচনী এলাকা | `electionHistoryAF[].constituency` | text |
| দলীয় নাম/স্বতন্ত্র | `electionHistoryAF[].partyName` | text |

---

### Section 10 - সর্বশেষ আয়কর রিটার্ন জমার বিবরণ - NEW SECTION

4-row table for tax return information:

| Row | Model Fields (Year, TIN, Income, Asset, Paid) |
|-----|-----------------------------------------------|
| ১ - আমার | `taxReturn1YearAF`, `taxReturn1TINAF`, `taxReturn1IncomeAF`, `taxReturn1AssetAF`, `taxReturn1PaidAF` |
| ২ - স্বামী/স্ত্রী | `taxReturn2YearAF`, `taxReturn2TINAF`, `taxReturn2IncomeAF`, `taxReturn2AssetAF`, `taxReturn2PaidAF` |
| ৩ - সন্তান | `taxReturn3YearAF`, `taxReturn3TINAF`, `taxReturn3IncomeAF`, `taxReturn3AssetAF`, `taxReturn3PaidAF` |
| ৪ - নির্ভরশীলদের | `taxReturn4YearAF`, `taxReturn4TINAF`, `taxReturn4IncomeAF`, `taxReturn4AssetAF`, `taxReturn4PaidAF` |

---

### Signature Section - NEW FIELDS

| Field (Bengali) | Model Name | Type |
|-----------------|------------|------|
| প্রার্থীর পুরো নাম | `candidateFullNameAF` | text |
| ই-মেইল/মোবাইল ফোন নম্বর/ফোন নম্বর | `emailMobilePhoneAF` | text |
| পিতা/স্বামীর নাম | `fatherHusbandNameBnAF` | text (readonly) |
| ঠিকানা | `addressBnAF` | textarea (readonly) |

---

## REMOVED FIELDS (Existed before 1666d89, removed in HEAD)

These fields existed in the original codebase before commit 1666d89 and have been removed or replaced:

| Old Field | Old Model Name | Replaced By |
|-----------|----------------|-------------|
| ব্যবসা/পেশার ধরন | `professionTypeBnAF` | `currentProfessionAF` (dropdown with more options) |
| ব্যবসা/পেশার বিবরণী | `candidateProfessionBusinessBnAF` | Profession dropdowns |
| ফৌজদারী মামলায় অভিযুক্ত নহি (checkbox) | `criminalCourtStatusAF` | `neverChargedCriminalAF` (radio) |
| ইতিপুর্বে সংসদ সদস্য নির্বাচিত হই নাই (checkbox) | `isPastMpAF` | `neverElectedMpAF` (radio) |
| দায়-দেনার বিবরণ | `liabilitiesDetailsBnAF` | Detailed liability section |
| দায়-দেনার পরিমাণ | `liabilitiesAmountAF` | Detailed liability section |

---

## TEMPORARILY ADDED THEN REVERTED (Added in 1666d89, later removed)

These fields were added in commit 1666d89 but were subsequently removed/reverted in later commits. They never existed before 1666d89 and do not exist in HEAD:

| Field | Model Name | Added In | Removed In | Notes |
|-------|------------|----------|------------|-------|
| প্রচার নাম | `campaignNameBnAF` | 1666d89 | 99f33d0 | Campaign name field |
| জাতীয় পরিচয়পত্র আছে কি | `hasNationalIdAF` | 1666d89 | Later | Replaced by direct `nidNumberAF` |
| জাতীয় পরিচয়পত্র নং | `nationalIdNumberAF` | 1666d89 | Later | Replaced by `nidNumberAF` |
| ভোটার নম্বর | `voterNumberAF` | 1666d89 | Later | Removed entirely |
| অতীতে নাগরিকত্ব ত্যাগ | `abandonedCitizenshipAF` | 1666d89 | Later | Replaced by new citizenship fields |
| আগের দেশ | `previousCountryAF` | 1666d89 | Later | Replaced by `previousCitizenCountryAF` |
| নির্বাচনী এলাকার নাম ও নং | `electoralAreaNameAF` | 1666d89 | Later | Replaced by `constituencyNameNumberAF` |
| আয়কর ফাইল জমার তারিখ ১ | `incomeTaxFile1AF` | 1666d89 | Later | Replaced by Section 10 tax return table |
| আয়কর ফাইল জমার তারিখ ২ | `incomeTaxFile2AF` | 1666d89 | Later | Replaced by Section 10 tax return table |
| আয়কর ফাইল জমার তারিখ ৩ | `incomeTaxFile3AF` | 1666d89 | Later | Replaced by Section 10 tax return table |
| সার্টিফিকেট জমা অঙ্গীকার | `willSubmitCertificatesAF` | 1666d89 | Later | Removed entirely |
| সৌজন্যে সদস্য | `isCurrentCourtesyMemberAF` | 1666d89 | Later | Removed entirely |
| সৌজন্যে সদস্য বিবরণ | `courtesyMemberDetailsAF` | 1666d89 | Later | Removed entirely |
| মা/স্বামীর নাম | `motherHusbandNameBnAF` | 1666d89 | Later | Reverted; original `motherNameBnAF` kept |
| আদালত নির্দেশনা | `lawPresentAF[].courtDirection` | 1666d89 | Later | Removed from present cases table |

---

## MODIFIED FIELDS (Structure/Sub-fields Changed)

| Field | Old Structure | New Structure |
|-------|---------------|---------------|
| প্রার্থীর আয় | `incomeSourceAF[].own` | Split: `ownDomestic`, `ownForeign` |
| নির্ভরশীলদের আয় | `incomeSourceAF[].dependents` | Split: `dependentsDomestic`, `dependentsForeign` |
| নির্ভরশীলদের তথ্য | `dependentsAF[].relationship`, `.dateOfBirth`, `.age` | Simplified: `.dobOrAge`, `.birthRegNo` |

---

## Controller Changes

### New Functions Added

```javascript
// Add election history entry
this.add_electionHistoryAF = function () {
  if (!$scope.gotCandidate.hasOwnProperty("electionHistoryAF"))
    $scope.gotCandidate.electionHistoryAF = [];
  $scope.gotCandidate.electionHistoryAF.push({});
};

// Delete last election history entry
this.delete_electionHistoryAF = function () {
  $scope.gotCandidate.electionHistoryAF.pop();
};
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| New Fields Added (in HEAD) | 65+ |
| Original Fields Removed | 6 |
| Fields Added then Reverted | 15 |
| Fields Modified (structure) | 3 |
| New Sections | 4 |
| New Dropdown Options | 13 |
| New Controller Functions | 2 |

---

## Data Model Updates Required

Add these fields to `common/models/candidate.json`:

```json
{
  "constituencyNameNumberAF": { "type": "string" },
  "ageYearsAF": { "type": "string" },
  "ageMonthsAF": { "type": "string" },
  "ageDaysAF": { "type": "string" },
  "motherNameBnAF": { "type": "string" },
  "spouseNameBnAF": { "type": "string" },
  "nidNumberAF": { "type": "string" },
  "isBirthCitizenAF": { "type": "string" },
  "citizenCountryNameAF": { "type": "string" },
  "wasPreviousCitizenAF": { "type": "string" },
  "previousCitizenCountryAF": { "type": "string" },
  "citizenshipRenounceDate": { "type": "string" },
  "neverChargedCriminalAF": { "type": "string" },
  "totalPresentCasesAF": { "type": "string" },
  "totalPastCasesAF": { "type": "string" },
  "currentProfessionAF": { "type": "string" },
  "previousProfessionAF": { "type": "string" },
  "spouseProfessionAF": { "type": "string" },
  "spousePreviousProfessionAF": { "type": "string" },
  "liability1TypeAF": { "type": "string" },
  "liability1DescAF": { "type": "string" },
  "liability1AmountAF": { "type": "number" },
  "liability2TypeAF": { "type": "string" },
  "liability2DescAF": { "type": "string" },
  "liability2AmountAF": { "type": "number" },
  "liability3TypeAF": { "type": "string" },
  "liability3DescAF": { "type": "string" },
  "liability3AmountAF": { "type": "number" },
  "liability4TypeAF": { "type": "string" },
  "liability4DescAF": { "type": "string" },
  "liability4AmountAF": { "type": "number" },
  "govDues1TypeAF": { "type": "string" },
  "govDues1CurrentAF": { "type": "string" },
  "govDues1AmountAF": { "type": "number" },
  "govDues2TypeAF": { "type": "string" },
  "govDues2CurrentAF": { "type": "string" },
  "govDues2AmountAF": { "type": "number" },
  "govDues3TypeAF": { "type": "string" },
  "govDues3CurrentAF": { "type": "string" },
  "govDues3AmountAF": { "type": "number" },
  "govDues4TypeAF": { "type": "string" },
  "govDues4CurrentAF": { "type": "string" },
  "govDues4AmountAF": { "type": "number" },
  "neverElectedMpAF": { "type": "string" },
  "electionHistoryAF": { "type": "array" },
  "taxReturn1YearAF": { "type": "string" },
  "taxReturn1TINAF": { "type": "string" },
  "taxReturn1IncomeAF": { "type": "number" },
  "taxReturn1AssetAF": { "type": "number" },
  "taxReturn1PaidAF": { "type": "number" },
  "taxReturn2YearAF": { "type": "string" },
  "taxReturn2TINAF": { "type": "string" },
  "taxReturn2IncomeAF": { "type": "number" },
  "taxReturn2AssetAF": { "type": "number" },
  "taxReturn2PaidAF": { "type": "number" },
  "taxReturn3YearAF": { "type": "string" },
  "taxReturn3TINAF": { "type": "string" },
  "taxReturn3IncomeAF": { "type": "number" },
  "taxReturn3AssetAF": { "type": "number" },
  "taxReturn3PaidAF": { "type": "number" },
  "taxReturn4YearAF": { "type": "string" },
  "taxReturn4TINAF": { "type": "string" },
  "taxReturn4IncomeAF": { "type": "number" },
  "taxReturn4AssetAF": { "type": "number" },
  "taxReturn4PaidAF": { "type": "number" },
  "candidateFullNameAF": { "type": "string" },
  "emailMobilePhoneAF": { "type": "string" },
  "fatherHusbandNameBnAF": { "type": "string" },
  "addressBnAF": { "type": "string" }
}
```
