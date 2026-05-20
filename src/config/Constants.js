import Colors from './Colors';

export let ToastError = message => {
  return {
    type: 'ToastError',
    position: 'bottom',
    text1: message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 0,
    bottomOffset: 30,
    style: { backgroundColor: 'blue' },
    onShow: () => {},
    onHide: () => {},
  };
};
export let ToastSuccess = message => {
  return {
    type: 'ToastSuccess',
    position: 'bottom',
    text1: message,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 0,
    bottomOffset: 30,
    onShow: () => {},
    onHide: () => {},
  };
};

export let TimeZone = [
  {
    label: '(GMT -12:00) Eniwetok, Kwajalein',
    value: '(GMT -12:00) Eniwetok, Kwajalein',
    gmt: '(GMT-1200)',
  },
  {
    label: '(GMT -11:00) Midway Island, Samoa',
    value: '(GMT -11:00) Midway Island, Samoa',
    gmt: '(GMT-1100)',
  },
  {
    label: '(GMT-10:00) Hawaii',
    value: '(GMT-10:00) Hawaii',
    gmt: '(GMT-1000)',
  },
  {
    label: '(GMT -9:30) Taiohae',
    value: '(GMT -9:30) Taiohae',
    gmt: '(GMT-0930)',
  },
  {
    label: '(GMT -9:00) Alaska',
    value: '(GMT -9:00) Alaska',
    gmt: '(GMT-0900)',
  },
  {
    label: '(GMT -8:00) Pacific Time (US & Canada)',
    value: '(GMT -8:00) Pacific Time (US & Canada)',
    gmt: '(GMT-0800)',
  },
  {
    label: '(GMT -7:00) Mountain Time (US & Canada)',
    value: '(GMT -7:00) Mountain Time (US & Canada)',
    gmt: '(GMT-0700)',
  },
  {
    label: '(GMT -6:00) Central Time (US & Canada), Mexico City',
    value: '(GMT -6:00) Central Time (US & Canada), Mexico City',
    gmt: '(GMT-0600)',
  },
  {
    label: '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
    value: '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
    gmt: '(GMT-0500)',
  },
  {
    label: '(GMT -4:30) Caracas',
    value: '(GMT -4:30) Caracas',
    gmt: '(GMT-0430)',
  },
  {
    label: '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
    value: '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
    gmt: '(GMT-0400)',
  },
  {
    label: '(GMT -3:30) Newfoundland',
    value: '(GMT -3:30) Newfoundland',
    gmt: '(GMT-0300)',
  },
  {
    label: '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
    value: '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
    gmt: '(GMT-0300)',
  },
  {
    label: '(GMT -2:00) Mid-Atlantic',
    value: '(GMT -2:00) Mid-Atlantic',
    gmt: '(GMT-0200)',
  },
  {
    label: '(GMT -1:00) Azores, Cape Verde Islands',
    value: '(GMT -1:00) Azores, Cape Verde Islands',
    gmt: '(GMT-0100)',
  },
  {
    label: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
    value: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
    gmt: '(GMT+0000)',
  },
  {
    label: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
    value: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
    gmt: '(GMT+0100)',
  },
  {
    label: '(GMT +2:00) Kaliningrad, South Africa',
    value: '(GMT +2:00) Kaliningrad, South Africa',
    gmt: '(GMT+0200)',
  },
  {
    label: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
    value: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
    gmt: '(GMT+0300)',
  },
  {
    label: '(GMT +3:30) Tehran',
    value: '(GMT +3:30) Tehran',
    gmt: '(GMT+0330)',
  },
  {
    label: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
    value: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
    gmt: '(GMT+0400)',
  },
  { label: '(GMT +4:30) Kabul', value: '(GMT +4:30) Kabul', gmt: '(GMT+0430)' },
  {
    label: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
    value: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
    gmt: '(GMT+0500)',
  },
  {
    label: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
    value: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
    gmt: '(GMT+0530)',
  },
  {
    label: '(GMT +5:45) Kathmandu, Pokhara',
    value: '(GMT +5:45) Kathmandu, Pokhara',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +6:00) Almaty, Dhaka, Colombo',
    value: '(GMT +6:00) Almaty, Dhaka, Colombo',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +6:30) Yangon, Mandalay',
    value: '(GMT +6:30) Yangon, Mandalay',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
    value: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
    value: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
    gmt: '(GMT+1200)',
  },
  { label: '(GMT +8:45) Eucla', value: '(GMT +8:45) Eucla', gmt: '(GMT+1200)' },
  {
    label: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
    value: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +9:30) Adelaide, Darwin',
    value: '(GMT +9:30) Adelaide, Darwin',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
    value: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +10:30) Lord Howe Island',
    value: '(GMT +10:30) Lord Howe Island',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
    value: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +11:30) Norfolk Island',
    value: '(GMT +11:30) Norfolk Island',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
    value: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +12:45) Chatham Islands',
    value: '(GMT +12:45) Chatham Islands',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +13:00) Apia, Nukualofa',
    value: '(GMT +13:00)',
    gmt: '(GMT+1200)',
  },
  {
    label: '(GMT +14:00) Line Islands, Tokelau',
    value: '(GMT +14:00) Line Islands, Tokelau',
    gmt: '(GMT+1200)',
  },
];

export const emailValidityCheck = email => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
export const numbersRegex = /[0-9]/;

export const lettersRegex = /^[a-zA-Z ]+$/;

export const isPasswordAlphaNumeric = password => {
  if (/(?=.*?[A-Za-z])(?=.*\d)/.test(password)) {
    return true;
  }
  return false;
};

export const isPasswordLengthCorrect = password => {
  if (password.length > 5) {
    return true;
  }
  return false;
};

export const validateNumber = amount => {
  if (/^[0-9]+(\.[0-9]+)?$/.test(amount)) {
    return false;
  }
  return true;
};

export const fonts = {
  Bold: 'Gilroy-Black',
  SemiBold: 'Gilroy-Bold',
  Light: 'Gilroy-Light',
  Medium: 'Gilroy-Medium',
  Regular: 'Gilroy-Regular',
  RegularItalic: 'Gilroy-RegularItalic',
  // SemiBold: 'Gilroy-SemiBold',
};

export const phoneNumberValidityCheck = number => {
  if (number.length >= 7 && number.length <= 14) {
    return true;
  }
  return false;
};

export const displayConsole = (key, value) => {
  console.log(`${key}`, value ? value : '');
};

export function showDistance(x1, y1, x2, y2) {
  var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return (distance / 0.62137).toFixed(2);
}
export function numberWithCommas(x) {
  return `$${x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export const validateSpecialCharacters = str => {
  // The regex checks for any character that is not a letter, digit, or whitespace
  if (/[^a-zA-Z0-9\s]/.test(str)) {
    return true; // Contains special characters
  }
  return false; // Does not contain special characters
};

export function getTagBackgroundColor(id) {
  return id == 1
    ? Colors.warn
    : id == 2
    ? Colors.approved
    : id == 3
    ? Colors.lightRed
    : Colors.lightRed;
}

export function getTagTextColor(id) {
  return id == 1
    ? Colors.pending
    : id == 2
    ? Colors.greenDark
    : id == 3
    ? Colors.redDark
    : Colors.redDark;
}

export function priceFormatter(x) {
  x = x && parseFloat(x);
  x = x && x.toFixed(2);
  return `$${x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  //
  const selectedRegion = Store.getState().AuthReducer?.user?.regionId;
  if (x < 0) {
    x = `${
      x &&
      x
        .toString()
        .replace('-', '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }`;
    return `${selectedRegion == 2 ? `-$${x} CAD` : `-$${x}`}`;
  } else {
    return `${
      selectedRegion == 2
        ? `$${x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} CAD`
        : `$${x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    }`;
  }
}

export const statesData = [
  { name: 'Alabama', abbr: 'AL' },
  { name: 'Alaska', abbr: 'AK' },
  { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' },
  { name: 'California', abbr: 'CA' },
  { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' },
  { name: 'Delaware', abbr: 'DE' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' },
  { name: 'Hawaii', abbr: 'HI' },
  { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Indiana', abbr: 'IN' },
  { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' },
  { name: 'Kentucky', abbr: 'KY' },
  { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' },
  { name: 'Maryland', abbr: 'MD' },
  { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' },
  { name: 'Minnesota', abbr: 'MN' },
  { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' },
  { name: 'Montana', abbr: 'MT' },
  { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' },
  { name: 'New Hampshire', abbr: 'NH' },
  { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' },
  { name: 'New York', abbr: 'NY' },
  { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' },
  { name: 'Ohio', abbr: 'OH' },
  { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' },
  { name: 'Pennsylvania', abbr: 'PA' },
  { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' },
  { name: 'South Dakota', abbr: 'SD' },
  { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Utah', abbr: 'UT' },
  { name: 'Vermont', abbr: 'VT' },
  { name: 'Virginia', abbr: 'VA' },
  { name: 'Washington', abbr: 'WA' },
  { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' },
  { name: 'Wyoming', abbr: 'WY' },
  { name: 'District of Columbia', abbr: 'DC' },
];

export const citiesData = [
  { name: 'New York City', abbr: 'NYC' },
  { name: 'Los Angeles', abbr: 'LA' },
  { name: 'Chicago', abbr: 'CHI' },
  { name: 'Houston', abbr: 'HOU' },
  { name: 'Phoenix', abbr: 'PHX' },
  { name: 'Philadelphia', abbr: 'PHL' },
  { name: 'San Antonio', abbr: 'SAT' },
  { name: 'San Diego', abbr: 'SAN' },
  { name: 'Dallas', abbr: 'DAL' },
  { name: 'San Jose', abbr: 'SJC' },
  { name: 'Austin', abbr: 'AUS' },
  { name: 'Jacksonville', abbr: 'JAX' },
  { name: 'Fort Worth', abbr: 'FTW' },
  { name: 'Columbus', abbr: 'CMH' },
  { name: 'Charlotte', abbr: 'CLT' },
  { name: 'Indianapolis', abbr: 'IND' },
  { name: 'San Francisco', abbr: 'SF' },
  { name: 'Seattle', abbr: 'SEA' },
  { name: 'Denver', abbr: 'DEN' },
  { name: 'Nashville', abbr: 'BNA' },
  { name: 'Oklahoma City', abbr: 'OKC' },
  { name: 'El Paso', abbr: 'ELP' },
  { name: 'Washington', abbr: 'DC' },
  { name: 'Las Vegas', abbr: 'LAS' },
  { name: 'Louisville', abbr: 'SDF' },
  { name: 'Memphis', abbr: 'MEM' },
  { name: 'Portland', abbr: 'PDX' },
  { name: 'Baltimore', abbr: 'BWI' },
  { name: 'Milwaukee', abbr: 'MKE' },
  { name: 'Albuquerque', abbr: 'ABQ' },
  { name: 'Tucson', abbr: 'TUS' },
  { name: 'Fresno', abbr: 'FAT' },
  { name: 'Sacramento', abbr: 'SAC' },
  { name: 'Mesa', abbr: 'MSA' },
  { name: 'Kansas City', abbr: 'MCI' },
  { name: 'Atlanta', abbr: 'ATL' },
  { name: 'Omaha', abbr: 'OMA' },
  { name: 'Colorado Springs', abbr: 'COS' },
  { name: 'Raleigh', abbr: 'RDU' },
  { name: 'Long Beach', abbr: 'LGB' },
  { name: 'Virginia Beach', abbr: 'VGB' },
  { name: 'Minneapolis', abbr: 'MSP' },
  { name: 'Tampa', abbr: 'TPA' },
  { name: 'New Orleans', abbr: 'MSY' },
  { name: 'Arlington', abbr: 'ARL' },
  { name: 'Bakersfield', abbr: 'BFL' },
  { name: 'Honolulu', abbr: 'HNL' },
  { name: 'Anaheim', abbr: 'ANA' },
  { name: 'Aurora', abbr: 'AUR' },
  { name: 'Santa Ana', abbr: 'SNA' },
  { name: 'Corpus Christi', abbr: 'CRP' },
  { name: 'Riverside', abbr: 'RAL' },
  { name: 'Lexington', abbr: 'LEX' },
  { name: 'St. Louis', abbr: 'STL' },
  { name: 'Pittsburgh', abbr: 'PIT' },
  { name: 'Stockton', abbr: 'SCK' },
  { name: 'Anchorage', abbr: 'ANC' },
  { name: 'Cincinnati', abbr: 'CVG' },
  { name: 'St. Paul', abbr: 'STP' },
  { name: 'Greensboro', abbr: 'GSO' },
  { name: 'Toledo', abbr: 'TOL' },
  { name: 'Newark', abbr: 'EWR' },
  { name: 'Plano', abbr: 'PLN' },
  { name: 'Henderson', abbr: 'HND' },
  { name: 'Orlando', abbr: 'MCO' },
  { name: 'Lincoln', abbr: 'LNK' },
  { name: 'Jersey City', abbr: 'JCY' },
  { name: 'Chandler', abbr: 'CHD' },
  { name: 'St. Petersburg', abbr: 'PIE' },
  { name: 'Laredo', abbr: 'LRD' },
  { name: 'Norfolk', abbr: 'ORF' },
  { name: 'Madison', abbr: 'MSN' },
  { name: 'Durham', abbr: 'RDU' },
  { name: 'Lubbock', abbr: 'LBB' },
  { name: 'Winston-Salem', abbr: 'INT' },
  { name: 'Garland', abbr: 'GRD' },
  { name: 'Glendale', abbr: 'GLD' },
  { name: 'Hialeah', abbr: 'HIA' },
  { name: 'Reno', abbr: 'RNO' },
  { name: 'Baton Rouge', abbr: 'BTR' },
  { name: 'Irvine', abbr: 'IRV' },
  { name: 'Chesapeake', abbr: 'CPK' },
  { name: 'Irving', abbr: 'IRG' },
  { name: 'Scottsdale', abbr: 'SDL' },
  { name: 'North Las Vegas', abbr: 'NLV' },
  { name: 'Fremont', abbr: 'FMT' },
  { name: 'Gilbert', abbr: 'GBT' },
  { name: 'San Bernardino', abbr: 'SBD' },
  { name: 'Birmingham', abbr: 'BHM' },
  { name: 'Rochester', abbr: 'ROC' },
  { name: 'Richmond', abbr: 'RIC' },
  { name: 'Spokane', abbr: 'GEG' },
  { name: 'Des Moines', abbr: 'DSM' },
  { name: 'Montgomery', abbr: 'MGM' },
  { name: 'Modesto', abbr: 'MOD' },
  { name: 'Fayetteville', abbr: 'FAY' },
  { name: 'Tacoma', abbr: 'TIW' },
  { name: 'Shreveport', abbr: 'SHV' },
  { name: 'Akron', abbr: 'CAK' },
];

// export const downloadPDF = async base64PDF => {
//   try {
//     // Define file path based on the platform
//     const filePath =
//       Platform.OS === 'android'
//         ? `${RNBlobUtil.fs.dirs.DownloadDir}/NT.pdf`
//         : `${RNBlobUtil.fs.dirs.DocumentDir}/NT.pdf`;

//     // Write the Base64 string to a file
//     await RNBlobUtil.fs.writeFile(filePath, base64PDF, 'base64');

//     if (Platform.OS === 'android') {
//       // For Android, open the file directly
//       await RNBlobUtil.android.actionViewIntent(filePath, 'application/pdf');
//       Alert.alert('Success', 'PDF saved to Downloads folder.');
//     } else {
//       // For iOS, show the save-to-file bottom sheet
//       await Share.share({
//         url: `file://${filePath}`,
//         title: 'Save PDF',
//       });
//     }
//   } catch (error) {
//     console.error('Error downloading the PDF:', error);
//     Alert.alert('Error', 'Failed to download the PDF.');
//   }
// };
