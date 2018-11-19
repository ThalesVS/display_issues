export const formatUrl = function(state) {
    return `${state.url}state=${state.status}&per_page=${state.pageSize}&page=${state.activePage}`
};
export const formatDate = function (dt) {
    let ret = dt;
    if (typeof dt === "string") {
        if (dt.indexOf("T") > 0) {
            let formatBR = dt.substring(0, 10);
            formatBR = formatBR.split("-");
            dt = formatBR[2] + "/" + formatBR[1] + "/" + formatBR[0];
        }
        ret = dt;
    }
    /**/
    return ret;
};

export const formatIssues = function (data, columns, wantedLabels) {
    if (!data.length) { return '' }
    else {
        return retrieveData(data, columns)
            .map(item => {
                item.labels = retrieveData(item.labels, wantedLabels);
                return item;
            });
    }
};

export const retrieveData = function (items, obj) {
    return items.map(item => {
        const resultObj = {};
        obj.forEach(attr => {
            resultObj[attr] = item[attr];
        });
        return resultObj;
    });
};

export const getTotalPages = function (link) {
    let page = 1;
    const item = link.split(",").find(item => item.includes('rel="last"'));
    if (item) {
        page = item
            .split(";")[0]
            .match(/&page=([^&]*)/)[1]
            .replace(">", "");
    }
    return page;
};