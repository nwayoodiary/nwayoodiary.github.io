const loading_container = document.querySelector('.loading-container');
const main_content = document.querySelector('.main .content');
const loading_dots = document.querySelector('.loading-container .dots-loading');
const loading_title = document.querySelector('.loading-container .loading-title');
const svg_paths = document.querySelectorAll('.main .content .deaths .map svg path');
const svg_map = document.querySelector('.main .content .deaths .map svg');
const detail_popup = document.querySelector('.detail-popup');
const detail_popup_container = document.querySelector('.detail-popup .container');
const detail_popup_close = document.querySelector('.detail-popup .close');
const btn_next = document.querySelector('.detail-popup .btn-right');
const btn_prev = document.querySelector('.detail-popup .btn-left');
const summary_container = document.querySelector('.main .content .deaths .values');

let state_array = {};
let currentIndex = 0;
let updatedDate;

hideUi = () => {
    loading_container.className = 'loading-container active';
    hideMe(main_content);
}

showUi = () => {
    loading_container.className = 'loading-container';
    showMe(main_content);
}

findStateById = id => {
    for (let key in state_array) {
        if (state_array[key][0] === id) return key;
    }
    return -1;
}

extractData = (key, entry) => {
    if (!(key in state_array)) {
        state_array[key] = { total: 0, male: 0, female: 0, nogender: 0, underage: 0, overage: 0, noage: 0 };
    }

    countDataInObj(state_array[key], 'total');
    let gender = htmlEncode(entry[KEY_HERO_GENDER].$t);
    let age = htmlEncode(entry[KEY_HERO_AGE].$t);
    if (gender.toLowerCase() === 'male') {
        countDataInObj(state_array[key], 'male');
    } else if (gender.toLowerCase() === 'female') {
        countDataInObj(state_array[key], 'female');
    } else {
        countDataInObj(state_array[key], 'nogender');
    }
    try {
        age = parseInt(age);
        if (age < 18) {
            countDataInObj(state_array[key], 'underage');
        } else if (age >= 18) {
            countDataInObj(state_array[key], 'overage');
        } else {
            countDataInObj(state_array[key], 'noage');
        }
    } catch {

    }
}

countDataInObj = (obj, key) => {
    if (isNaN(obj[key])) obj[key] = 1;
    else obj[key]++;
}

statesPercents = (states, value) => {
    for (let key in states) {
        states[key] = calcPercentageColor(states[key], value);
    }
    return states;
}

showDetailWithout = () => {
    let id = currentIndex;
    let key = state_array[id][0];
    let title = '';
    if (key === ID_SAGAING) { title = 'SaGaing' } else if (key === ID_KACHIN) { title = 'KaChin' } else if (key === ID_TANINTHARYI) { title = 'TaninTharYi' } else if (key === ID_SHAN) { title = 'Shan' } else if (key === ID_MAGWAY) { title = 'MaGway' } else if (key === ID_AYEYARWADY) { title = 'AyeYarWady' } else if (key === ID_CHIN) { title = 'Chin' } else if (key === ID_RAKHINE) { title = 'RaKhine' } else if (key === ID_MON) { title = 'Mon' } else if (key === ID_YANGON) { title = 'Yangon' } else if (key === ID_BAGO) { title = 'Bago' } else if (key === ID_MANDALAY) { title = 'Mandalay' } else if (key === ID_KAYIN) { title = 'KaYin' } else if (key === ID_KAYAH) { title = 'KaYah' }
    showDetail(id, title);
}
showDetail = (id, title) => {
    let total = 0,
        male = 0,
        female = 0,
        nogender = 0,
        under = 0,
        over = 0,
        noage = 0;
    if (id in state_array) {
        let state = state_array[id];
        total = state[1]['total'];
        male = state[1]['male'];
        female = state[1]['female'];
        nogender = state[1]['nogender'];
        under = state[1]['underage'];
        noage = state[1]['noage'];
        over = state[1]['overage'];
    }

    let html = `
<h3>${title}</h3>
<table>
    <tr>
        <td>Total</td>
        <td>-</td>
        <td>${total}</td>
    </tr>
    <tr>
        <td>Male</td>
        <td>-</td>
        <td>${male}</td>
    </tr>
    <tr>
        <td>Female</td>
        <td>-</td>
        <td>${female}</td>
    </tr>
    <tr>
        <td>Unknown Gender</td>
        <td>-</td>
        <td>${nogender}</td>
    </tr>
    <tr>
        <td>Under 18</td>
        <td>-</td>
        <td>${under}</td>
    </tr>
    <tr>
        <td>18 and over</td>
        <td>-</td>
        <td>${over}</td>
    </tr>
    <tr>
        <td>Unknown Age</td>
        <td>-</td>
        <td>${noage}</td>
    </tr>
</table>`;
    detail_popup_container.innerHTML = html;
}

showSummary = () => {
    let total = 0,
        male = 0,
        female = 0,
        nogender = 0,
        under = 0,
        over = 0,
        noage = 0;
    state_array.forEach(e => {
        total += e[1]['total'] | 0;
        male += e[1]['male'] | 0;
        female += e[1]['female'] | 0;
        nogender += e[1]['nogender'] | 0;
        under += e[1]['underage'] | 0;
        over += e[1]['overage'] | 0;
        noage += e[1]['noage'] | 0;
    });
    let html = `
    <h3>Total Summary</h3>
    <p>updated: <span>${updatedDate}</span></p>
<table>
    <tr>
        <td>Total</td>
        <td>-</td>
        <td>${total}</td>
    </tr>
    <tr>
        <td>Male</td>
        <td>-</td>
        <td>${male}</td>
    </tr>
    <tr>
        <td>Female</td>
        <td>-</td>
        <td>${female}</td>
    </tr>
    <tr>
        <td>Unknown Gender</td>
        <td>-</td>
        <td>${nogender}</td>
    </tr>
    <tr>
        <td>Under 18</td>
        <td>-</td>
        <td>${under}</td>
    </tr>
    <tr>
        <td>18 and over</td>
        <td>-</td>
        <td>${over}</td>
    </tr>
    <tr>
        <td>Unknown Age</td>
        <td>-</td>
        <td>${noage}</td>
    </tr>
</table>`;
    summary_container.innerHTML = html;
}

setup = () => {
    detail_popup_close.addEventListener('click', e => {
        detail_popup.className = 'detail-popup';
    });
    svg_paths.forEach(path => {
        path.addEventListener('click', ele => {
            detail_popup.className = 'detail-popup active';
            let id = ele.path[0].id.toString();
            let index = parseInt(findStateById(id));
            currentIndex = index;
            let title = ele.path[0].firstChild.innerHTML.trim();
            showDetail(index, title);
        });
    });
    btn_next.addEventListener('click', ele => {
        currentIndex++;
        if (currentIndex >= state_array.length) currentIndex = 0;
        showDetailWithout();
    });
    btn_prev.addEventListener('click', ele => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = state_array.length - 1;
        showDetailWithout();
    });
}

doMe = entry => {
    setup();
    let total = entry.length;
    let states = {
        cYgn: 0,
        cBgo: 0,
        cSg: 0,
        cKaChin: 0,
        cTaNty: 0,
        cShan: 0,
        cMgy: 0,
        cAywd: 0,
        cChin: 0,
        cRk: 0,
        cMon: 0,
        cMdy: 0,
        cKayin: 0,
        cKaya: 0,
        cNpt: 0
    };

    for (const key in entry) {
        const data = entry[key];
        const state = htmlEncode(data[KEY_HERO_STATE].$t);
        updatedDate = htmlEncode(data[KEY_HERO_DD].$t);
        if (state.toLowerCase() === "Mandalay".toLowerCase()) {
            states['cMdy']++;
            extractData(ID_MANDALAY, data);
        } else if (state.toLowerCase() === "NayPyiTaw".toLowerCase()) {
            //mandalay
            states['cNpt']++;
            extractData(ID_MANDALAY, data);
        } else if (state.toLowerCase() === "TaNinTharYi".toLowerCase()) {
            states['cTaNty']++;
            extractData(ID_TANINTHARYI, data);
        } else if (state.toLowerCase() === "Chin".toLowerCase()) {
            states['cChin']++;
            extractData(ID_CHIN, data);

        } else if (state.toLowerCase() === "Yangon".toLowerCase()) {
            states['cYgn']++;
            extractData(ID_YANGON, data);

        } else if (state.toLowerCase() === "MawLaMyine".toLowerCase()) {
            states['cMon']++;
            extractData(ID_MON, data);

        } else if (state.toLowerCase() === "MaGway".toLowerCase()) {
            states['cMgy']++;
            extractData(ID_MAGWAY, data);

        } else if (state.toLowerCase() === "SaGaing".toLowerCase()) {
            states['cSg']++;
            extractData(ID_SAGAING, data);

        } else if (state.toLowerCase() === "Mon".toLowerCase()) {
            states['cMon']++;
            extractData(ID_MON, data);

        } else if (state.toLowerCase() === "AyeYarWady".toLowerCase()) {
            states['cAywd']++;
            extractData(ID_AYEYARWADY, data);

        } else if (state.toLowerCase() === "Bago".toLowerCase()) {
            states['cBgo']++;
            extractData(ID_BAGO, data);

        } else if (state.toLowerCase() === "KaChin".toLowerCase()) {
            states['cKaChin']++;
            extractData(ID_KACHIN, data);

        } else if (state.toLowerCase() === "Shan".toLowerCase()) {
            states['cShan']++;
            extractData(ID_SHAN, data);

        } else if (state.toLowerCase() === "RaKhine".toLowerCase()) {
            states['cRk']++;
            extractData(ID_RAKHINE, data);

        } else if (state.toLowerCase() === "KaYin".toLowerCase()) {
            states['cKayin']++;
            extractData(ID_KAYIN, data);

        } else if (state.toLowerCase() === "KaYah".toLowerCase()) {
            states['cKaya']++;
            extractData(ID_KAYAH, data);
        }
    }
    // naypyitaw in mandalay
    state_array = Object.entries(state_array);
    states['cMdy'] += states['cNpt'];
    let maximum = objMax(states);
    showSummary();
    states = statesPercents(states, maximum);
    document.querySelector('svg path#' + ID_YANGON).style = `fill: rgb(255,${states['cYgn']},${states['cYgn']})`;
    document.querySelector('svg path#' + ID_BAGO).style = `fill: rgb(255,${states['cBgo']},${states['cBgo']})`;
    document.querySelector('svg path#' + ID_SAGAING).style = `fill: rgb(255,${states['cSg']},${states['cSg']})`;
    document.querySelector('svg path#' + ID_KACHIN).style = `fill: rgb(255,${states['cKaChin']},${states['cKaChin']})`;
    document.querySelector('svg path#' + ID_TANINTHARYI).style = `fill: rgb(255,${states['cTaNty']},${states['cTaNty']})`;
    document.querySelector('svg path#' + ID_SHAN).style = `fill: rgb(255,${states['cShan']},${states['cShan']})`;
    document.querySelector('svg path#' + ID_MAGWAY).style = `fill: rgb(255,${states['cMgy']},${states['cMgy']})`;
    document.querySelector('svg path#' + ID_AYEYARWADY).style = `fill: rgb(255,${states['cAywd']},${states['cAywd']})`;
    document.querySelector('svg path#' + ID_CHIN).style = `fill: rgb(255,${states['cChin']},${states['cChin']})`;
    document.querySelector('svg path#' + ID_RAKHINE).style = `fill: rgb(255,${states['cRk']},${states['cRk']})`;
    document.querySelector('svg path#' + ID_MON).style = `fill: rgb(255,${states['cMon']},${states['cMon']})`;
    document.querySelector('svg path#' + ID_MANDALAY).style = `fill: rgb(255,${states['cMdy']},${states['cMdy']})`;
    document.querySelector('svg path#' + ID_KAYIN).style = `fill: rgb(255,${states['cKayin']},${states['cKayin']})`;
    document.querySelector('svg path#' + ID_KAYAH).style = `fill: rgb(255,${states['cKaya']},${states['cKaya']})`;
}

hideUi();


fetch(URL_HEROES)
    .then(res => res.json())
    .then(json => {
        showUi();
        doMe(json.feed.entry);
    })
    .catch(err => {
        showMe(loading_container);
        hideMe(loading_dots);
        loading_title.innerHTML = "Something went wrong :(";
        console.log(err);
    });