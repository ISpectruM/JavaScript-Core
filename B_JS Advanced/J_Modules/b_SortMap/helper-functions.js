    function mapSort(map, sortFn) {

        if (sortFn !== undefined) {
            return new Map([...map.entries()].sort(sortFn));
        } else {
            return new Map([...map.entries()].sort((a, b) => a[0] > b[0]));
        }
    };

module.exports = mapSort;