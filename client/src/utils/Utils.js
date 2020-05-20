export default class Utils {
  getArrayFromObjectKey(obj) {
    const list = [];
    for (const key in obj) {
      list.push({
        ...obj[key],
        _id: key
      });
    }

    return list;
  }
}