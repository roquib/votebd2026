# Testing Field Fallback Changes - votebd2026

## Prerequisites

1. Start the development server:
```bash
npm run dev
# or
grunt serve
```

2. Ensure MongoDB is running with test data:
```bash
MONGODB_URL="mongodb://localhost:27017/votebd" npm run dev
```

3. Access the application at: `http://localhost:9003`

---

## Test Scenarios

### Scenario 1: Test with New 2025 Data Format

**Objective:** Verify new fields display correctly when present.

**Test Data Requirements:**
- Candidate with `currentProfessionAF` field populated
- Candidate with `liability1AmountAF`, `liability2AmountAF`, `liability3AmountAF`, `liability4AmountAF` fields
- Candidate with `candidateDateOfBirthBnAF` field

**Steps:**

1. **Individual Affidavit Page**
   - URL: `http://localhost:9003/#/front/candidates/affidavit/{candidateId}`
   - Check:
     - [ ] Date of birth displays correctly
     - [ ] Profession shows `currentProfessionAF` value
     - [ ] Liability total equals sum of 4 liability fields
     - [ ] Income source shows domestic + foreign split if available

2. **All Candidate Info Page**
   - URL: `http://localhost:9003/#/front/election-result/all-candidate-info`
   - Check:
     - [ ] DOB column shows dates correctly
     - [ ] Profession column shows new profession field
     - [ ] Liability column shows correct sum

3. **Candidate Comparison Table**
   - URL: `http://localhost:9003/#/front/candidate-comparison-table`
   - Check:
     - [ ] All comparison fields display correctly
     - [ ] Asset type translations show in Bengali (when language is bn_BD)
     - [ ] Income source types translate correctly

---

### Scenario 2: Test with Legacy Data Format

**Objective:** Verify fallback to legacy fields when new fields are empty.

**Test Data Requirements:**
- Candidate with only `professionTypeBnAF` (no `currentProfessionAF`)
- Candidate with only `liabilitiesAmountAF` (no liability1-4 fields)
- Candidate with only `dobTR` timestamp (no `candidateDateOfBirthBnAF`)

**Steps:**

1. **Individual Affidavit Page**
   - URL: `http://localhost:9003/#/front/candidates/affidavit/{legacyCandidateId}`
   - Check:
     - [ ] Date of birth shows date from `dobTR` timestamp
     - [ ] Profession shows `professionTypeBnAF` value
     - [ ] Liability shows `liabilitiesAmountAF` value

2. **Candidate Profile Page**
   - URL: `http://localhost:9003/#/front/candidates/profile/{legacyCandidateId}`
   - Check:
     - [ ] DOB displays from fallback field

3. **Year-wise Comparison**
   - URL: `http://localhost:9003/#/front/candidate-comparison/year-wise-comparison`
   - Check:
     - [ ] Profession comparison works with legacy data

---

### Scenario 3: Test Mixed Data (New + Legacy)

**Objective:** Verify both formats display correctly in the same list.

**Steps:**

1. **All Candidate Info Page**
   - URL: `http://localhost:9003/#/front/election-result/all-candidate-info`
   - Select an election with mixed data
   - Check:
     - [ ] New format candidates show new field values
     - [ ] Legacy candidates show fallback values
     - [ ] No errors in browser console
     - [ ] Export to Excel works correctly

2. **Comparison Pages**
   - URL: `http://localhost:9003/#/front/candidate-comparison-affidavit/Asset-Comparison-Of-Own-Dependent`
   - Check:
     - [ ] Liability values display correctly for both formats
     - [ ] Net asset calculations are correct

---

### Scenario 4: Test Backend API

**Objective:** Verify backend aggregation includes fallback logic.

**Steps:**

1. **Test API Directly**
   ```bash
   # Get comparison data
   curl "http://localhost:3000/api/candidates/getCandidateAffidavitComparison?whereCriteria={\"currentElectionId\":\"ELECTION_ID\",\"currentElectionId2\":\"ELECTION_ID2\"}"
   ```

2. **Check Response:**
   - [ ] `liabilityOwn` and `liabilityTotal` have values
   - [ ] `neatNeatAsset` calculation is correct (asset - liability)

---

### Scenario 5: Test Language Switching

**Objective:** Verify translations work correctly.

**Steps:**

1. Switch to Bengali: Click language toggle or add `?lang=bn_BD`
2. Check translateKey filter:
   - [ ] Asset types show Bengali names (নগদ টাকা, ব্যাংকে জমা, etc.)
   - [ ] Income sources show Bengali names (বেতন, ব্যবসা, etc.)
   - [ ] Loan types show Bengali names

3. Switch to English:
   - [ ] Asset types show formatted English (Cash Taka, Bank Deposit, etc.)

---

## Pages to Test

| Page | URL | Key Fields to Check |
|------|-----|---------------------|
| Individual Affidavit | `/#/front/candidates/affidavit/:id` | DOB, Profession, Income, Liability |
| Candidate Profile | `/#/front/candidates/profile/:id` | DOB |
| All Candidate Info | `/#/front/election-result/all-candidate-info` | DOB, Profession, Liability |
| Comparison Table | `/#/front/candidate-comparison-table` | All fields |
| Year-wise Comparison | `/#/front/candidate-comparison/year-wise-comparison` | Profession |
| Asset Comparison | `/#/front/candidate-comparison-affidavit/Asset-Comparison-Of-Own-Dependent` | Asset, Liability |
| Income Comparison | `/#/front/candidate-comparison-affidavit/Income-Comparison-Of-Own-Dependent` | Income |
| Liability Comparison | `/#/front/candidate-comparison-affidavit/Liability-Comparison-Of-Own-Dependent` | Liability |
| At a Glance | `/#/front/candidate-comparison-affidavit/Candidate-Comparison-At-A-Glance` | All aggregated fields |

---

## Debug Tips

### Check Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for:
   - [ ] No undefined errors
   - [ ] No filter errors
   - [ ] No API errors

### Check Network Tab

1. Open Developer Tools (F12)
2. Go to Network tab
3. Filter by XHR
4. Check API responses contain expected data

### Test Filter in Console

```javascript
// Test getDob filter
var $filter = angular.element(document.body).injector().get('$filter');
var testRow = {candidateDateOfBirthBnAF: '০১-০১-১৯৮০'};
console.log($filter('getDob')(testRow));

// Test getProfession filter
var testRow2 = {currentProfessionAF: '', professionTypeBnAF: 'ব্যবসা'};
console.log($filter('getProfession')(testRow2));

// Test getLiability filter
var testRow3 = {liability1AmountAF: 100000, liability2AmountAF: 50000};
console.log($filter('getLiability')(testRow3));
```

---

## Sample Test Data

### New Format (2025) Candidate

```json
{
  "currentProfessionAF": "ব্যবসায়ী",
  "candidateDateOfBirthBnAF": "০১-০১-১৯৮০",
  "liability1AmountAF": 100000,
  "liability2AmountAF": 50000,
  "liability3AmountAF": 25000,
  "liability4AmountAF": 10000,
  "incomeSourceAF": [
    {"type": "business", "ownDomestic": 500000, "ownForeign": 100000}
  ]
}
```

### Legacy Format Candidate

```json
{
  "professionTypeBnAF": "কৃষি",
  "dobTR": 315532800000,
  "liabilitiesAmountAF": 200000,
  "incomeSourceAF": [
    {"type": "agriculture", "own": 300000, "dependents": 50000}
  ]
}
```

---

## Checklist Summary

- [ ] New format data displays correctly
- [ ] Legacy format data falls back correctly
- [ ] Mixed data in same list works
- [ ] Backend API returns correct aggregated values
- [ ] Bengali translations work
- [ ] English formatting works
- [ ] No console errors
- [ ] Export functionality works
