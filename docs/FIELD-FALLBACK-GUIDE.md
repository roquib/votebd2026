# Field Fallback Implementation Guide

## Overview

This document describes the field fallback implementation for the 2025 affidavit form changes. The new form format introduced new field names, and we need to support both old and new data formats for backward compatibility.

## Fallback Pattern

**Pattern:** Show new field value first; if empty/null, fall back to legacy field value.

```
New Field Value -> Legacy Field Value
```

## Frontend Filters (AngularJS)

Location: `client/app/modules/core/filters/custom-filter.js`

### 1. getDob - Date of Birth Filter

```javascript
.filter('getDob', function($filter) {
  return function(row) {
    // Try candidateDateOfBirthBnAF first
    // Fallback to dobTR (timestamp)
  };
})
```

**Fallback Chain:**
- `candidateDateOfBirthBnAF` (Bengali date string)
- `dobTR` (Unix timestamp)

**Usage:**
```html
<td>{{row | getDob}}</td>
```

### 2. getProfession - Profession Filter

```javascript
.filter('getProfession', function() {
  return function(row) {
    return row.currentProfessionAF || row.professionTypeBnAF || row.candidateProfessionBusinessBnAF || '';
  };
})
```

**Fallback Chain:**
- `currentProfessionAF` (new 2025 field)
- `professionTypeBnAF` (legacy field)
- `candidateProfessionBusinessBnAF` (older legacy field)

**Usage:**
```html
<td>{{row | getProfession}}</td>
```

### 3. getLiability - Liability Filter

```javascript
.filter('getLiability', function() {
  return function(row) {
    var newLiability = (parseInt(row.liability1AmountAF) || 0) +
                      (parseInt(row.liability2AmountAF) || 0) +
                      (parseInt(row.liability3AmountAF) || 0) +
                      (parseInt(row.liability4AmountAF) || 0);
    return newLiability > 0 ? newLiability : (row.liabilitiesAmountAF || 0);
  };
})
```

**Fallback Chain:**
- Sum of `liability1AmountAF` + `liability2AmountAF` + `liability3AmountAF` + `liability4AmountAF` (new 2025 fields)
- `liabilitiesAmountAF` (legacy single field)

**New Fields Breakdown:**
| Field | Description |
|-------|-------------|
| `liability1AmountAF` | Self (নিজ) |
| `liability2AmountAF` | Spouse (স্বামী/স্ত্রী) |
| `liability3AmountAF` | Children (সন্তান) |
| `liability4AmountAF` | Dependents (নির্ভরশীল) |

**Usage:**
```html
<td>{{row | getLiability | translateNumber}}</td>
```

### 4. getIncome / getDependentsIncome - Income Filters

```javascript
.filter('getIncome', function() {
  return function(item) {
    var ownNew = (parseInt(item.ownDomestic) || 0) + (parseInt(item.ownForeign) || 0);
    return ownNew > 0 ? ownNew : (item.own || 0);
  };
})

.filter('getDependentsIncome', function() {
  return function(item) {
    var depNew = (parseInt(item.dependentsDomestic) || 0) + (parseInt(item.dependentsForeign) || 0);
    return depNew > 0 ? depNew : (item.dependents || 0);
  };
})
```

**Fallback Chain (Income):**
- `ownDomestic` + `ownForeign` (new 2025 split)
- `own` (legacy single field)

**Usage:**
```html
<td>{{income | getIncome | translateNumber}}</td>
<td>{{income | getDependentsIncome | translateNumber}}</td>
```

### 5. translateKey - Dropdown Key Translation

Translates English dropdown keys to Bengali for asset types, income sources, and loan types.

```javascript
.filter('translateKey', function($rootScope) {
  var translations = {
    'cash_taka': 'নগদ টাকা',
    'bank_deposit': 'ব্যাংকে জমা',
    'salary': 'বেতন',
    'business': 'ব্যবসা',
    // ... more translations
  };
  return function(key) {
    if ($rootScope.locale && $rootScope.locale.lang === 'bn_BD') {
      return translations[key] || key;
    }
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
})
```

**Usage:**
```html
<td>{{asset.type | translateKey}}</td>
```

---

## Backend API (LoopBack)

Location: `common/models/candidate.js`

### simplifyCandidateAffidavitComparison Function

This function computes aggregated values for comparison pages. Updated to include liability fallback:

```javascript
// Calculate liability with fallback
var liabilityTotal = ((row.liability1AmountAF || 0) +
                      (row.liability2AmountAF || 0) +
                      (row.liability3AmountAF || 0) +
                      (row.liability4AmountAF || 0)) ||
                     (row.liabilitiesAmountAF || 0);

simpleData.push({
  // ... other fields
  "liabilityOwn": liabilityTotal,
  "liabilityTotal": liabilityTotal,
  "neatLiability": liabilityTotal,
  "neatNeatAsset": assetTotal - liabilityTotal,
});
```

---

## Updated Templates

| Template | Filters Used |
|----------|--------------|
| `f-election-result/views/all-candidate-info.html` | getDob, getProfession, getLiability |
| `f-candidate-comparison/views/candidate-comparison/table.html` | All filters |
| `f-candidate-search/views/affidavit/view.html` | getDob, getProfession, getIncome, getDependentsIncome, getLiability |
| `f-candidate-search/views/candidateprofile.html` | getDob |
| `f-candidate-comparison/views/year-wise-comparison/details.html` | getProfession |

---

## Testing

1. **Test with new data (2025 format):**
   - Verify new fields display correctly
   - Verify liability sum is calculated from 4 separate fields

2. **Test with old data (legacy format):**
   - Verify fallback to legacy fields works
   - Verify no errors when new fields are missing

3. **Test mixed data:**
   - Some candidates with new format, some with old
   - Verify both display correctly in the same list

---

## Related Commits

```
87f1b27 Add liability fallback logic in backend simplifyCandidateAffidavitComparison
73fefea Update more pages to use field fallback filters
c323016 Update affidavit view page to use field fallback filters
6b0f713 Add field fallback filters and update templates for 2025 affidavit fields
```
