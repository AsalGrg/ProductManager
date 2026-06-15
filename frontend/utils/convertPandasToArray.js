export default function convertPandasToArray(pandasObj) {
    const indices = Object.keys(pandasObj.id);

    return indices.map(index => ({
        id:          pandasObj.id[index],
        name:        pandasObj.name[index],
        description: pandasObj.description[index],
        price:       pandasObj.price[index],
        category:    pandasObj.category[index],
        status:      pandasObj.status[index],
    }));
}