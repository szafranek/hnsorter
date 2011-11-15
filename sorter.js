/*jshint*/
(function() {
    var i, rows=[];
    var postTable=document.querySelector("center>table tr:nth-child(3) table");
    for(i=1;i<=3;i++) {
        rows.push(postTable.querySelectorAll("tr:nth-child(3n+" + i + ")"));
    }
    var slice=Array.prototype.slice;
    
    var titleRows=slice.call(rows[0]);
    var metaRows=slice.call(rows[1]);
    var oneButLastRow=titleRows.pop();
    var lastRow=metaRows.pop();
    
    var separatorRows=slice.call(rows[2]);
    
    
    var newRows=[];
    for (i=0, l=titleRows.length; i < l; i++) {
        var pointSpan=metaRows[i].querySelector("td.subtext>span");
        var points=0;
        if (pointSpan!==null) {
            points = parseInt(pointSpan.innerHTML.split(" ")[0], 10);
        }

        newRows.push({
            title: titleRows[i],
            meta: metaRows[i],
            separator: separatorRows[i],
            points: points
        });
    }
    newRows.sort(function(rowA, rowB) {
        return rowB.points - rowA.points;
    });
    
    var newRowsFragment=document.createDocumentFragment();
    
    newRows.forEach(function(rowSet) {
        newRowsFragment.appendChild(rowSet.title);
        newRowsFragment.appendChild(rowSet.meta);
        newRowsFragment.appendChild(rowSet.separator);
    });
    newRowsFragment.appendChild(oneButLastRow);
    newRowsFragment.appendChild(lastRow);
    
    while(postTable.firstChild) {
      postTable.removeChild(postTable.firstChild);
    }
    
    
    postTable.appendChild(newRowsFragment);

}());