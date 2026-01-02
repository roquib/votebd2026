# হলফনামা (Affidavit Form) Documentation

This document describes all fields in the Affidavit Form used for candidate registration in Bangladesh elections.

**File Location:** `client/app/modules/candidates/views/affidavit/edit.html`
**Controller:** `client/app/modules/candidates/controllers/affidavit/affidavit.ctrl.js`

---

## পাতা ১ (Page 1) - Basic Information

### Section: Personal Information (ব্যক্তিগত তথ্য)

| Field Label (Bengali) | Field Label (English) | Model Name | Type | Required |
|-----------------------|----------------------|------------|------|----------|
| নাম | Name | `candidateNameBnAF` | text | Yes |
| প্রচার নাম | Campaign/Popular Name | `campaignNameBnAF` | text | No |
| পিতার নাম | Father's Name | `fatherNameBnAF` | text | Yes |
| মা/স্বামীর নাম | Mother/Husband's Name | `motherHusbandNameBnAF` | text | Yes |
| বর্তমান ঠিকানা | Present Address | `presentAddressBnAF` | textarea | Yes |
| স্থায়ী ঠিকানা | Permanent Address | `permanentAddressBnAF` | textarea | Yes |
| জন্ম তারিখ | Date of Birth | `candidateDateOfBirthBnAF` | text (dd-mm-yyyy) | Yes |
| প্রার্থীর ছবি | Candidate Photo | `candidatePhoto` | file upload | Yes |

### Section: Identification (পরিচয়)

| Field Label (Bengali) | Field Label (English) | Model Name | Type | Options |
|-----------------------|----------------------|------------|------|---------|
| জাতীয় পরিচয়পত্র আছে কি | Has National ID | `hasNationalIdAF` | radio | হ্যাঁ/না |
| জাতীয় পরিচয়পত্র নং | National ID Number | `nationalIdNumberAF` | text | - |
| ভোটার নম্বর | Voter Number | `voterNumberAF` | text | - |
| অতীতে নাগরিকত্ব ত্যাগ | Abandoned Citizenship | `abandonedCitizenshipAF` | radio | হ্যাঁ/না |
| আগের দেশ | Previous Country | `previousCountryAF` | text | - |

### Section: Electoral Information (নির্বাচনী তথ্য)

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| সীট নং | Seat Number | `seatInfoBnAF` | text |
| নির্বাচনী এলাকার নাম ও নং | Electoral Area Name & No | `electoralAreaNameAF` | text |

### Section: Income Tax Information (আয়কর তথ্য)

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| আয়কর ফাইল জমার তারিখ ১ | Income Tax File Date 1 | `incomeTaxFile1AF` | text |
| আয়কর ফাইল জমার তারিখ ২ | Income Tax File Date 2 | `incomeTaxFile2AF` | text |
| আয়কর ফাইল জমার তারিখ ৩ | Income Tax File Date 3 | `incomeTaxFile3AF` | text |
| সার্টিফিকেট জমা অঙ্গীকার | Certificate Submission Pledge | `willSubmitCertificatesAF` | checkbox |
| সৌজন্যে সদস্য | Courtesy Member Status | `isCurrentCourtesyMemberAF` | radio |
| সৌজন্যে সদস্য বিবরণ | Courtesy Member Details | `courtesyMemberDetailsAF` | text |

### Section: Education (শিক্ষা) - Item ১

| Field Label (Bengali) | Field Label (English) | Model Name | Type | Options |
|-----------------------|----------------------|------------|------|---------|
| সবোর্চ্চ শিক্ষাগত যোগ্যতা | Highest Educational Qualification | `highestDegreeBnAF` | text | - |
| শিক্ষাগত যোগ্যতা প্রকার | Education Type | `degreeTypeBnAF` | select | এসএসসির নীচে, এসএসসি, এইচএসসি, স্নাতক, স্নাতকোত্তর, স্বশিক্ষিত, পিএইচডি, উল্লেখ নেই |

### Section: Criminal Cases - Present (বর্তমান মামলা) - Item ২

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| ফৌজদারী মামলায় অভিযুক্ত নহি | Not Accused in Criminal Case | `criminalCourtStatusAF` | checkbox |

**Present Cases Table (`lawPresentAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type |
|------------------|------------------|------------|------|
| ক্রমিক নং | Serial No | (auto) | - |
| যে আইন ও আইনের ধারায় | Law & Section | `whichLaw` | textarea |
| মামলা নম্বর | Case Number | `courtFileNo` | textarea |
| যে আদালত মামলাটি আমলে নিয়াছে | Court Name | `whichCourt` | textarea |
| আদালত নির্দেশনা | Court Direction | `courtDirection` | textarea |
| মামলার বর্তমান অবস্থা/ফলাফল | Current Status/Result | `currentStatusResult` | textarea |

### Section: Criminal Cases - Past (অতীত মামলা) - Item ৩

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| অতীতে ফৌজদারী মামলা হয় নাই | No Past Criminal Case | `pastCriminalCourtStatusAF` | checkbox |

**Past Cases Table (`lawPastAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type |
|------------------|------------------|------------|------|
| ক্রমিক নং | Serial No | (auto) | - |
| যে আইন ও আইনের ধারায় | Law & Section | `whichLaw` | textarea |
| মামলা নম্বর | Case Number | `courtFileNo` | textarea |
| যে আদালত মামলাটি আমলে নিয়াছে | Court Name | `whichCourt` | textarea |
| আদালত নির্দেশনা | Court Direction | `courtDirection` | textarea |
| মামলার ফলাফল | Case Result | `currentStatusResult` | textarea |

### Section: Profession (পেশা) - Item ৪

| Field Label (Bengali) | Field Label (English) | Model Name | Type | Options |
|-----------------------|----------------------|------------|------|---------|
| ব্যবসা/পেশার বিবরণী | Business/Profession Description | `candidateProfessionBusinessBnAF` | textarea | - |
| ব্যবসা/পেশার ধরণ | Profession Type | `professionTypeBnAF` | select | কৃষি, ব্যবসা, চাকুরি, আইনজীবী, রাজনীতিবিদ, শিক্ষকতা, গৃহিনী, উল্লেখ নেই, অন্যান্য |

### Section: Dependents (নির্ভরশীল ব্যক্তিবর্গ) - Item ৫

**Dependents Table (`dependentsAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type | Options |
|------------------|------------------|------------|------|---------|
| ক্রম | Serial | (auto) | - | - |
| নাম | Name | `name` | text | - |
| সম্পর্ক | Relationship | `relationship` | select | স্বামী/স্ত্রী, পুত্র, কন্যা, পিতা, মাতা, ভাই, বোন, অন্যান্য |
| জন্ম তারিখ | Date of Birth | `dateOfBirth` | text | - |
| বয়স | Age | `age` | number | - |
| মন্তব্য | Remarks | `remarks` | text | - |

### Section: Income Sources (আয়ের উৎস) - Item ৬

**Income Sources Table (`incomeSourceAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type | Options |
|------------------|------------------|------------|------|---------|
| ক্রমিক নং | Serial No | `order` | auto | - |
| আয়ের উৎসের বিবরণ | Income Source Type | `type` | select | ব্যবসা, কৃষিখাত, বাড়ি/ভাড়া, শেয়ার/সঞ্চয়পত্র, পেশা, চাকুরি, অন্যান্য |
| প্রার্থীর বাৎসরিক আয় | Candidate's Annual Income | `own` | number | - |
| নির্ভরশীলদের আয় | Dependents' Income | `dependents` | number | - |

**Calculated Fields:**
- `totalOwnIncomeAF` - Total own income
- `totalDependentIncomeAF` - Total dependent income
- `grandTotalIncomeAF` - Grand total income

---

## পাতা ২ (Page 2) - Assets

### Section: Movable Assets (অস্থাবর সম্পদ) - Item ৬(ক)

**Movable Assets Table (`assetMaterialAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type |
|------------------|------------------|------------|------|
| ক্রমিক নং | Serial No | `order` | auto |
| সম্পদের ধরণ | Asset Type | `type` | select |
| নিজ নামে (পরিমান) | Own Name (Quantity) | `amountOwn` | textarea |
| নিজ নামে (মূল্য) | Own Name (Value) | `priceOwn` | number |
| স্ত্রী/স্বামীর নামে (পরিমান) | Spouse Name (Quantity) | `amountHusbandWife` | textarea |
| স্ত্রী/স্বামীর নামে (মূল্য) | Spouse Name (Value) | `priceHusbandWife` | number |
| নির্ভরশীলদের নামে (পরিমান) | Dependents Name (Quantity) | `amountDependants` | textarea |
| নির্ভরশীলদের নামে (মূল্য) | Dependents Name (Value) | `priceDependants` | number |

**Asset Types:**
- `cash_taka` - নগদ টাকার পরিমাণ
- `foreign_currency` - বৈদেশিক মুদ্রার পরিমাণ
- `bank_deposit` - ব্যাংক ও আর্থিক প্রতিষ্ঠানে জমা
- `all_shares` - বন্ড, ঋণপত্র, শেয়ার
- `dps` - সঞ্চয় পত্র/স্থায়ী আমানত
- `vehicles` - বাস, ট্রাক, মটর গাড়ী
- `gold_ornaments` - স্বর্ণ ও অলংকারাদি
- `electronic_goods` - ইলেকট্রনিক সামগ্রী
- `furnitures` - আসবাবপত্র
- `others` - অন্যান্য

### Section: Immovable Assets (স্থাবর সম্পদ) - Item ৬(খ)

**Immovable Assets Table (`assetImmaterialAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type |
|------------------|------------------|------------|------|
| ক্রমিক নং | Serial No | `order` | auto |
| সম্পদের বিবরণ | Asset Description | `type` | select |
| নিজ নামে (পরিমান) | Own (Quantity) | `amountOwn` | textarea |
| নিজ নামে (মূল্য) | Own (Value) | `priceOwn` | number |
| স্ত্রী/স্বামীর নামে (পরিমান) | Spouse (Quantity) | `amountHusbandWife` | textarea |
| স্ত্রী/স্বামীর নামে (মূল্য) | Spouse (Value) | `priceHusbandWife` | number |
| নির্ভরশীলদের নামে (পরিমান) | Dependents (Quantity) | `amountDependants` | textarea |
| নির্ভরশীলদের নামে (মূল্য) | Dependents (Value) | `priceDependants` | number |
| যৌথ মালিকানা (পরিমান) | Joint Ownership (Quantity) | `amountJointOwnership` | textarea |
| যৌথ মালিকানা (মূল্য) | Joint Ownership (Value) | `priceJointOwnership` | number |
| প্রার্থীর অংশ (পরিমান) | Candidate's Share (Quantity) | `amountJointSharePart` | textarea |
| প্রার্থীর অংশ (মূল্য) | Candidate's Share (Value) | `priceJointSharePart` | number |

**Asset Types:**
- `cultivated_land` - কৃষি জমি
- `noncultivated_land` - অকৃষি জমি
- `building` - দালান (আবাসিক/বাণিজ্যিক)
- `house_apartment` - বাড়ি/এপার্টমেন্ট
- `garden_farm` - চা বাগান, রাবার বাগান, মৎস্য খামার
- `others` - অন্যান্য

---

## পাতা ৩ (Page 3) - Liabilities & Loans

### Section: Liabilities (দায়-দেনা) - Item ৬(গ)

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| দায় সমূহের প্রকৃতি ও বর্ণনা | Nature & Description of Liabilities | `liabilitiesDetailsBnAF` | textarea |
| পরিমান | Amount | `liabilitiesAmountAF` | number |

### Section: Previous MP Status (পূর্ববর্তী এমপি) - Item ৭

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| ইতিপুর্বে এমপি নির্বাচিত হই নাই | Not Previously Elected as MP | `isPastMpAF` | checkbox |

**Commitments & Achievements Table (`commitmentAndAchievementWhileMpAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type | Options |
|------------------|------------------|------------|------|---------|
| ক্রমিক | Serial | (auto) | - | - |
| প্রতিশ্রুতিসমূহ | Commitments | `commitment` | select | See below |
| অর্জনসমূহ | Achievements | `achievement` | textarea | - |

**Commitment Options:**
- `development_of_power_system` - বিদ্যুৎ ব্যবস্থার উন্নয়ন
- `development_of_educational_institutions` - শিক্ষা প্রতিষ্টানের উন্নয়ন
- `development_of_communication_systems` - যোগাযোগ ব্যবস্থার উন্নয়ন
- `development_of_medical_health_sector` - চিকিৎসা/স্বাস্থ্য খাতের উন্নয়ন
- `development_of_water_resources` - পানি সম্পদের উন্নয়ন
- `culvert_construction` - কালভার্ট নির্মাণ
- `road_construction_renovation` - রাস্তা নির্মাণ/সংস্কার
- `tree_planting_programme` - বৃক্ষ রোপন কর্মসূচী
- `park_construction` - পার্ক নির্মাণ
- `bridge_construction` - ব্রিজ নির্মাণ
- `sports_space_version` - খেলাধূলার স্থান সংস্করণ
- `development_of_sanitation_arsenic_waste_disposal_system` - স্যানিটেশন উন্নয়ন
- `rehabilitation_of_river_canal_ponds` - নদী/খাল পুকুর সংস্কার
- `agricultural_development` - কৃষি উন্নয়ন
- `development_of_internet_mobile_phone_services` - ইন্টারনেট/মোবাইল সেবার উন্নয়ন
- `other_social_activities` - অন্যান্য সামাজিক কার্যক্রম

### Section: Loan Information (ঋণ তথ্য) - Item ৮

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| কোন ঋণ গ্রহণ করি নাই | No Loans Taken | `noLoansAF` | checkbox |

**Loans Table (`loanAF[]`):**

| Column (Bengali) | Column (English) | Field Name | Type | Options |
|------------------|------------------|------------|------|---------|
| ঋণের ধরণ | Loan Type | `loanType` | select | একক, যৌথ, নির্ভরশীল, ডিরেক্টর/চেয়ারম্যান |
| ব্যাংক/প্রতিষ্ঠানের নাম | Bank/Institution Name | `bankOrganization` | textarea | - |
| ঋণের পরিমান | Loan Amount | `loanAmount` | number | - |
| খেলাপী ঋণের পরিমাণ | Defaulted Loan Amount | `debitedLoanAmount` | number | - |
| পূনঃ তফসিলীকরণ তারিখ | Rescheduling Date | `extendedLastDate` | textarea | - |

**Loan Types:**
- `single` - একক
- `joint` - যৌথ
- `dependants` - নির্ভরশীল ব্যক্তি বা ব্যক্তিবর্গ
- `director_chairman` - চেয়ারম্যান/ম্যানেজিং ডিরেক্টর/ডিরেক্টর হিসেবে

---

## Signature Section (স্বাক্ষর অংশ)

| Field Label (Bengali) | Field Label (English) | Model Name | Type |
|-----------------------|----------------------|------------|------|
| তারিখ | Submission Date | `submitDateAF` | date |
| প্রার্থীর নাম | Candidate Name | `candidateNameBnAF` | text (readonly) |
| মাতার নাম | Mother's Name | `motherNameBnAF` | text (readonly) |
| পিতার নাম | Father's Name | `fatherNameBnAF` | text (readonly) |
| স্বামী/স্ত্রীর নাম | Spouse Name | `spouseNameAF` | text |
| বর্তমান ঠিকানা | Present Address | `presentAddressBnAF` | textarea (readonly) |
| স্থায়ী ঠিকানা | Permanent Address | `permanentAddressBnAF` | textarea (readonly) |
| সাক্ষীর নাম | Identifier Name | `identifierNameBnAF` | text |
| সাক্ষীর ঠিকানা | Identifier Address | `identifierAddressBnAF` | textarea |
| বয়স | Age at Submission | `ageAtSubmissionDateAF` | text |
| শেষ তারিখ | Last Date | `lastDateAF` | text |
| পিডিএফ ফাইল নাম | PDF File Path | `pdfFilePathAF` | text |
| মন্তব্য | Review/Comments | `reviewAF` | textarea |

---

## Controller Functions

### Add/Delete Functions

| Function Name | Description | Array Field |
|---------------|-------------|-------------|
| `add_lawPresentAF()` | Add present case | `lawPresentAF[]` |
| `delete_lawPresentAF()` | Delete last present case | `lawPresentAF[]` |
| `add_lawPastAF()` | Add past case | `lawPastAF[]` |
| `delete_lawPastAF()` | Delete last past case | `lawPastAF[]` |
| `add_incomeSourceAF()` | Add income source | `incomeSourceAF[]` |
| `delete_incomeSourceAF()` | Delete last income source | `incomeSourceAF[]` |
| `add_assetMaterialAF()` | Add movable asset | `assetMaterialAF[]` |
| `delete_assetMaterialAF()` | Delete last movable asset | `assetMaterialAF[]` |
| `add_assetImmaterialAF()` | Add immovable asset | `assetImmaterialAF[]` |
| `delete_assetImmaterialAF()` | Delete last immovable asset | `assetImmaterialAF[]` |
| `add_commitmentAndAchievementWhileMpAF()` | Add commitment | `commitmentAndAchievementWhileMpAF[]` |
| `delete_commitmentAndAchievementWhileMpAF()` | Delete last commitment | `commitmentAndAchievementWhileMpAF[]` |
| `add_loanAF()` | Add loan | `loanAF[]` |
| `delete_loanAF()` | Delete last loan | `loanAF[]` |
| `add_dependentsAF()` | Add dependent | `dependentsAF[]` |
| `delete_dependentsAF()` | Delete last dependent | `dependentsAF[]` |

### Calculated Totals

| Field Name | Description |
|------------|-------------|
| `totalOwnIncomeAF` | Total own income |
| `totalDependentIncomeAF` | Total dependent income |
| `grandTotalIncomeAF` | Grand total income |
| `assetMaterialOwnTotalAF` | Total movable assets (own) |
| `assetMaterialHusbandWifeTotalAF` | Total movable assets (spouse) |
| `assetMaterialDependantsTotalAF` | Total movable assets (dependents) |
| `assetMaterialTotalAF` | Grand total movable assets |
| `assetImmaterialOwnTotalAF` | Total immovable assets (own) |
| `assetImmaterialHusbandWifeTotalAF` | Total immovable assets (spouse) |
| `assetImmaterialDependantsTotalAF` | Total immovable assets (dependents) |
| `assetJointOwnershipTotalAF` | Total joint ownership |
| `assetJointSharePartTotalAF` | Total candidate's share |
| `assetImmaterialTotalAF` | Grand total immovable assets |
| `assetGrandTotalAF` | Grand total all assets |
| `totalLoanAF` | Total loans |
| `totalSingleAmountAF` | Total single loans |
| `totalJointAmoutAF` | Total joint loans |
| `totalDependedantsAmountAF` | Total dependent loans |
| `totalDirectorOrChairmenAmoutAF` | Total director/chairman loans |
