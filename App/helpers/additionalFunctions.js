function containsObject(obj, list) {
	var i;
	var j = 0;
	for (i = 0; i < list.length; i++) {
		if (list[i].login === obj) {
			return true;
		}
	}		
	return false;
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return array[i];
        }
    }
}
