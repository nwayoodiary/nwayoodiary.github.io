const heros_container = document.querySelector('.heroes');
const dropdowns_container = document.querySelector('.dropdowns');
const loading_container = document.querySelector('.loading-container');
const loading_title = document.querySelector('.loading-container .loading-title');
const loading_dots = document.querySelector('.loading-container .dots-loading');
const states_container = document.querySelector('.dropdowns .bycity .container');
const pages_container = document.querySelector('.dropdowns .pages');
const popup_close = document.querySelector('.popup .close');
const popup_div = document.querySelector('.popup');
const popup_container = document.querySelector('.popup .container');
const website_setting_container = document.querySelector('.website-setting .container');
const btn_detail = document.querySelector('.heroes .hero .detail .show');

let data_array = [];
let currentPage, currentState, currentLang;

hideUi = () => {
    hideMe(heros_container);
    hideMe(dropdowns_container);
}

showUi = () => {
    showMe(heros_container);
    showMe(dropdowns_container);
    hideMe(loading_container);
}

setUp = () => {
    popup_close.addEventListener('click', e => {
        popup_div.className = 'popup';
        document.body.className = '';
    });
    currentPage = getCurrentPage();
    currentState = getCurrentState();
    currentLang = getCurrentLanguage();
    makeWebsiteSetting();
}

makeWebsiteSetting = () => {
    let arr = ['', '', ''];
    if (currentLang === LANG_UNICODE) arr[2] = 'class="active"';
    else if (currentLang === LANG_ZAWGYI) arr[1] = 'class="active"';
    else arr[0] = 'class="active"';
    let html = `
    <div class="website-setting-icon">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" xml:space="preserve">
    <g>
        <g style="fill: #ff0000; stroke: #ff0000;">
            <path d="M496.659,312.107l-47.061-36.8c0.597-5.675,1.109-12.309,1.109-19.328c0-7.019-0.491-13.653-1.109-19.328l47.104-36.821
                c8.747-6.912,11.136-19.179,5.568-29.397L453.331,85.76c-5.227-9.557-16.683-14.464-28.309-10.176l-55.531,22.293
                c-10.645-7.68-21.803-14.165-33.344-19.349l-8.448-58.901C326.312,8.448,316.584,0,305.086,0h-98.133
                c-11.499,0-21.205,8.448-22.571,19.456l-8.469,59.115c-11.179,5.035-22.165,11.435-33.28,19.349l-55.68-22.357
                C76.52,71.531,64.04,76.053,58.856,85.568L9.854,170.347c-5.781,9.771-3.392,22.464,5.547,29.547l47.061,36.8
                c-0.747,7.189-1.109,13.44-1.109,19.307s0.363,12.117,1.109,19.328l-47.104,36.821c-8.747,6.933-11.115,19.2-5.547,29.397
                l48.939,84.672c5.227,9.536,16.576,14.485,28.309,10.176l55.531-22.293c10.624,7.659,21.781,14.144,33.323,19.349l8.448,58.88
                C185.747,503.552,195.454,512,206.974,512h98.133c11.499,0,21.227-8.448,22.592-19.456l8.469-59.093
                c11.179-5.056,22.144-11.435,33.28-19.371l55.68,22.357c2.688,1.045,5.483,1.579,8.363,1.579c8.277,0,15.893-4.523,19.733-11.563
                l49.152-85.12C507.838,331.349,505.448,319.083,496.659,312.107z M256.019,341.333c-47.061,0-85.333-38.272-85.333-85.333
                s38.272-85.333,85.333-85.333s85.333,38.272,85.333,85.333S303.08,341.333,256.019,341.333z"/>
        </g>
    </g>
    </svg>
    </div>
    <div class="website-setting-items">
        <p>Change Language</p>
        <a href="#" ${arr[0]} onclick="changeLang(1)">English</a>
        <a href="#" ${arr[1]} onclick="changeLang(2)">Myanmar (Zawgyi)</a>
        <a href="#" ${arr[2]} onclick="changeLang(3)">Myanmar (Unicode)</a>
    </div>`;
    website_setting_container.innerHTML = html;
}

changeLang = id => {
    switch (id) {
        case 1:
            setCurrentLanguage(LANG_ENG);
            doMe(data_array);
            break;
        case 2:
            setCurrentLanguage(LANG_ZAWGYI);
            doMe(data_array);
            break;
        case 3:
            setCurrentLanguage(LANG_UNICODE);
            doMe(data_array);
            break;
    }
}

getEntryToDisplay = (entry, lang) => {
    let age = htmlEncode(entry[KEY_HERO_AGE].$t);
    let name = htmlEncode(entry[KEY_HERO_NAME].$t);
    let name_mm = htmlEncode(entry[KEY_HERO_NAME_MM].$t);
    let nick = htmlEncode(entry[KEY_HERO_NICK].$t);
    let nick_mm = htmlEncode(entry[KEY_HERO_NICK_MM].$t);
    let cause = htmlEncode(entry[KEY_HERO_CAUSE].$t);
    let cause_mm = htmlEncode(entry[KEY_HERO_CAUSE_MM].$t);
    let dd = htmlEncode(entry[KEY_HERO_DD].$t);
    let state = htmlEncode(entry[KEY_HERO_STATE].$t);
    let state_mm = htmlEncode(entry[KEY_HERO_STATE_MM].$t);
    let addr = htmlEncode(entry[KEY_HERO_ADDR].$t);
    let addr_mm = htmlEncode(entry[KEY_HERO_ADDR_MM].$t);
    let fplace = htmlEncode(entry[KEY_HERO_FALLEN_PLACE].$t);
    let fplace_mm = htmlEncode(entry[KEY_HERO_FALLEN_PLACE_MM].$t);
    let gender = htmlEncode(entry[KEY_HERO_GENDER].$t);
    let ftownship = htmlEncode(entry[KEY_HERO_FALLEN_TOWNSHIP].$t);
    let ftownship_mm = htmlEncode(entry[KEY_HERO_FALLEN_TOWNSHIP_MM].$t);
    let img_url = htmlEncode(entry[KEY_HERO_IMG_URL].$t);

    let state_eng = state;

    img_url = changeImgUrl(img_url);
    if (lang !== LANG_ENG) {
        if (lang === LANG_ZAWGYI) {
            name = changeZawgyi(name_mm);
            nick = changeZawgyi(nick_mm);
            cause = changeZawgyi(cause_mm);
            state = changeZawgyi(state_mm);
            addr = changeZawgyi(addr_mm);
            fplace = changeZawgyi(fplace_mm);
            ftownship = changeZawgyi(ftownship_mm);
        } else {
            name = name_mm;
            nick = nick_mm;
            cause = cause_mm;
            state = state_mm;
            addr = addr_mm;
            fplace = fplace_mm;
            ftownship = ftownship_mm;
        }
    }
    if (nick === '') {
        if (lang === LANG_ZAWGYI) {
            nick = changeZawgyi(nick_mm);
        } else {
            nick = nick_mm;
        }
    }
    let returnData = {
        name,
        nick,
        age,
        cause,
        dd,
        state_eng,
        state,
        addr,
        fplace,
        gender,
        ftownship,
        img_url
    };
    for (let key in returnData) {
        let d = returnData[key];
        if (!d || d == '' || d == undefined) {
            returnData[key] = DEFAULT_NO_DATA;
        }
    }
    return returnData;
}

showpopup = id => {
    let entry = getEntryToDisplay(data_array[id], currentLang);
    let hnick = '';
    if (entry['nick'] != '' && entry['nick_mm'] != '') {
        hnick = `<span>(${entry['nick']})</span>`;
    }
    let html = `
<div class="img-box">
    <div class="border"></div>
    <img src="${entry['img_url']}" alt="" class="profile">
</div>
<div class="content">
    <table>
        <tr>
            <td>Name</td>
            <td>-</td>
            <td>${entry['name']} ${hnick}</td>
        </tr>
        <tr>
            <td>Age</td>
            <td>-</td>
            <td>${entry['age']}</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>-</td>
            <td>${entry['gender']}</td>
        </tr>
        <tr>
            <td>Date</td>
            <td>-</td>
            <td>${entry['dd']}</td>
        </tr>
        <tr>
            <td>Fallen Place</td>
            <td>-</td>
            <td>${entry['state']}, ${entry['ftownship']}, ${entry['fplace']}</td>
        </tr>
        <tr>
            <td>Cause</td>
            <td>-</td>
            <td>${entry['cause']}</td>
        </tr>
        <tr>
            <td>Address</td>
            <td>-</td>
            <td>${entry['addr']}</td>
        </tr>
    </table>
</div>`;
    console.log(entry);

    document.body.className = 'popuped';
    popup_div.className = 'popup show';
    popup_container.innerHTML = html;
}

singleEntry = (entry, id) => {
    let hnick = '';
    if (entry['nick'] != '' && entry['nick_mm'] != '') {
        hnick = `<span>(${entry['nick']})</span>`;
    }
    if (entry['cause'] == '') entry['cause'] = entry['cause_mm'];

    let inner = `
    <div class="hero">
        <div class="detail">
            <p>${entry['cause']}</p>
            <button onclick="showpopup(${id})" class="show">Detail</button>
        </div>
        <h1>နွေဦးတော်လှန်ရေးသူရဲကောင်း</h1>
        <p class="date">${entry['dd']}</p>
        <div class="img-box">
            <div class="border"></div><img src="${entry['img_url']}" alt="" class="profile"></div>
        <h2 class="name">${entry['name']}${hnick}</h2>
        <p class="age">Age - ${entry['age']}</p>
        <p class="city">${entry['ftownship']}</p>
    </div>`;
    return inner;
}

getCurrentPage = () => {
    let page = getParameter('page');
    if (!page) return 1;
    return parseInt(page);
}

getCurrentState = () => {
    let state = getParameter('state');
    if (!state) return 'All';
    return state;
}

makePages = (len) => {
    let maxPage = Math.ceil(len / MAX_HERO_PER_PAGE);
    let html = '';
    let extra = "state=" + currentState;
    if (maxPage <= 1) {
        html = `
        <a href="" class="page active">${maxPage}/${maxPage}</a>`;
    } else if (currentPage <= 1) {
        html = `
        <a href="" class="page active">1 / ${maxPage}</a>
        <a href="?page=2&${extra}" class="page">&gt;</a>
        <a href="?page=${maxPage}&${extra}" class="page">&gt;&gt;</a>`;
    } else if (currentPage >= maxPage) {
        html = `
        <a href="?page=${1}&${extra}" class="page">&lt;&lt;</a>
        <a href="?page=${maxPage-1}&${extra}" class="page">&lt;</a>
        <a href="" class="page active">${maxPage} / ${maxPage}</a>`;
    } else {
        html = `
        <a href="?page=${1}&${extra}" class="page">&lt;&lt;</a>
        <a href="?page=${currentPage-1}&${extra}" class="page">&lt;</a>
        <a href="" class="page active">${currentPage} / ${maxPage}</a>
        <a href="?page=${currentPage+1}&${extra}" class="page">&gt;</a>
        <a href="?page=${maxPage}&${extra}" class="page">&gt;&gt;</a>`;
    }
    pages_container.innerHTML = html;
}

makeCityCategory = (states, states_mm) => {
    let html = `<button class="current">${currentState}</button>
    <div class="bycity-items">
        <a href="?state=All">All</a>`;
    for (let i = 0; i < states.length; i++) {
        const st = states[i];
        const stmm = states_mm[i];
        if (currentLang == LANG_ZAWGYI)
            html += `<a href="?state=${st}">${changeZawgyi(stmm)}</a>\n`;
        else if (currentLang == LANG_UNICODE)
            html += `<a href="?state=${st}">${stmm}</a>\n`;
        else {
            html += `<a href="?state=${st}">${st}</a>\n`;
        }
    }
    html += `</div>`;
    states_container.innerHTML = html;
}

doMe = (json_arr) => {
    setUp();
    data_array = json_arr;
    let html = "";
    let states_mm = [];
    let states = [];
    let resultLength = 0;

    let pageCounter = 0;
    let startIndex = (currentPage - 1) * 10;

    let check = currentState.toLowerCase() !== 'all';

    for (let i = 0; i < json_arr.length; i++) {
        const entry = json_arr[i];
        const state = htmlEncode(entry[KEY_HERO_STATE].$t);
        const state_mm = htmlEncode(entry[KEY_HERO_STATE_MM].$t);
        if (!states.includes(state)) {
            states.push(state);
            states_mm.push(state_mm);
        }
        if (!check || currentState.toLowerCase() === state.toLowerCase()) {
            resultLength++;
            if (i >= startIndex && pageCounter < MAX_HERO_PER_PAGE) {
                html += singleEntry(getEntryToDisplay(entry, currentLang), i);
                pageCounter++;
            }
        }
    }
    makePages(resultLength);
    makeCityCategory(states, states_mm);

    heros_container.innerHTML = html;
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