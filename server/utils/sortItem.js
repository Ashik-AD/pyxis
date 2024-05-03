const sortItem = (items, key, dir = 'asc') => {
    let sortedItem = null;
    if(dir === 'desc'){
            sortedItem = items.sort((cur, nxt) => {
            if(cur[key] < nxt[key]){
                return 1;
            }
            return -1;
        });
    }

        if(dir === 'asc'){
            sortedItem = items.sort((cur, nxt) => {
            if(cur[key] > nxt[key]){
                return 1;
            }
            return -1;
        });
    }
    return sortedItem;
}
export default sortItem;