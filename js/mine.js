pushCards = (json_arr, holder) => {
    for (const i in json_arr) {
        const json = json_arr[i];
        let data = getCardPreview(i, json);
        if (data != null)
            holder.appendChild(data);
    }
    return holder;
}

getCardPreview = (index, data) => {
    if (!data || (data && Object.keys(data).length === 0 && data.constructor === Object)) {
        return null;
    }
    let card = document.createElement('div');
    card.className = 'card';
    let dateSpan = document.createElement('span');
    dateSpan.innerHTML = data.date;
    let h2 = document.createElement('h2');
    let title = data.title;
    if (title.length > MAX_TITLE_PREVIEW_LENGTH) {
        title = title.substr(0, MAX_TITLE_PREVIEW_LENGTH - 3) + '...';
    }
    h2.innerHTML = title;
    card.appendChild(dateSpan);
    let btn = document.createElement('a');
    btn.setAttribute('href', '/day.html?id=' + index);
    btn.innerHTML = "See More";

    if (data.image_url) {
        let image = document.createElement('img');
        image.setAttribute('src', data.image_url);
        image.setAttribute('alt', data.title);
        card.appendChild(image);
    }
    card.appendChild(h2);
    if (data.detail) {
        let detail = data.detail;
        if (detail.length > MAX_DETAIL_PREVIEW_LENGTH) {
            detail = detail.substr(0, MAX_DETAIL_PREVIEW_LENGTH - 3) + "...";
        }
        let detailP = document.createElement('p');
        detailP.innerHTML = detail;
        card.appendChild(detailP);
    }
    card.appendChild(btn);

    return card;
}

checkParameter = parameter => {
    if (!parameter) return false;
    var letterNumber = /^[0-9a-zA-Z_./-]+$/;
    if (parameter.match(letterNumber)) return true;
    else return false;
}

getParaURL = () => {
    var url = new URL(window.location.href);
    var url = url.searchParams.get('url');
    if (!checkParameter(url)) return null;
    return url.toString().trim();
}

getParameter = (para) => {
    var url = new URL(window.location.href);
    var url = url.searchParams.get(para);
    if (!checkParameter(url)) return null;
    return url.toString().trim();
}

sortByDate = json_arr => {
    return json_arr.sort((a, b) => {
        let d1 = new Date(a.date).getTime();
        let d2 = new Date(b.date).getTime();
        return d1 > d2 ? 1 : -1;
    })
}

hideMe = element => {
    element.style = 'display: none;';
}

showMe = element => {
    element.style = '';
}

changeImgUrl = img_url => {

    if (img_url === '') {
        img_url = '/img/salute.svg';
    } else {
        try {
            let id = img_url.split('file/d/')[1].split('/view?')[0];
            img_url = "https://drive.google.com/uc?export=view&id=" + id;
        } catch {
            img_url = '/img/salute.svg';
        }
    }
    return img_url;
}

getStorage = (key) => {
    return localStorage.getItem(key);
}

clearStorage = () => {
    localStorage.clear();
}

hasInStorage = key => {
    return localStorage.getItem(key) != null;
}

setStorage = (key, value) => {
    localStorage.setItem(key, value);
}

getCurrentLanguage = () => {
    let lang = localStorage.getItem('language');
    if (lang) return lang;
    return 'eng';
}


setCurrentLanguage = (lang) => {
    localStorage.setItem('language', lang);
}

changeZawgyi = text => {
    const converter = new google_myanmar_tools.ZawgyiConverter();
    return converter.unicodeToZawgyi(text);
}

changeUnicode = text => {
    const converter = new google_myanmar_tools.ZawgyiConverter();
    return converter.zawgyiToUnicode(text);
}

htmlEncode = (s) => {
    var el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
}