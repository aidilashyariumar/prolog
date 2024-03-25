import axios from 'axios';


export default axios.create({
    baseURL: 'https://api-prolog-dev.binaries.id/',
    headers: {
        Authorization: `Bearer ${'v2.local.ok27zrliz9nKGS2_eEHqfU4vI9qSrQTRNNU1GMEtVjXWsjhzl_P3zEop_nHPLE5Q5XYlLXpXjCtAj77nK2gdUQ2bN2qBvHLCdQ9qNVNM_ykrBOWLDACQeyXfTIHKYe-p0V8YkzHR1_rtsgiye-TXiajGCRT-pBjLwm05ZsE0oS9EyZ17z4pO0wBDd02sCBasIMKnV06CQP0RtBIQwy5nRpo40bcrot0r_HRHZs8i-dtt52phJhLtVM8RPeKa2JvSoawXapAjxsVj_6dslGAFElzp13seznKXPaik1iAC1NAacD2WywxUPV8clkAtW2f4YlbQU4esbBDsG9BHz9BOlne30cj9j_8.bnVsbA'}`
        // Authorization: `Bearer ${localStorage.getItem('Token')}`
    }
})
