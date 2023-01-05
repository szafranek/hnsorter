(function () {
    const itemlist = document.querySelector("body > center > table > tbody > tr:nth-child(3) > td > table");
    const clonedItemlist = itemlist.cloneNode(true);
    const clonedTbody = clonedItemlist.querySelector("tbody");
    const footerRows = [clonedTbody.removeChild(clonedTbody.lastElementChild), clonedTbody.removeChild(clonedTbody.lastElementChild)].reverse();

    const getRowsOfType = (i) => Array.from(clonedTbody.querySelectorAll(`tr:nth-child(3n+${i})`));

    const titleRows = getRowsOfType(1);
    const metaRows = getRowsOfType(2);
    const separatorRows = getRowsOfType(3);

    const newRows = [];
    for (let i = 0; i < titleRows.length; i++) {
        const points = parseInt(metaRows[i].querySelector(".score")?.innerHTML.split(" ")[0], 10) ?? 0;

        newRows.push({
            title: titleRows[i],
            meta: metaRows[i],
            separator: separatorRows[i],
            points: points
        });
    }
    newRows.sort((rowA, rowB) => rowB.points - rowA.points);

    const sortedItemlist = document.createElement("tbody");
    newRows.forEach((rowSet) => sortedItemlist.append(rowSet.title, rowSet.meta, rowSet.separator));
    sortedItemlist.append(...footerRows);

    itemlist.replaceChild(sortedItemlist, itemlist.querySelector("tbody"));

}());
