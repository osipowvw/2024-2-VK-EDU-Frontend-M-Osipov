/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof bytes !== 'number' || bytes < 0 || !Number.isFinite(bytes)) {
    return false;
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let ind = 0;

  while (bytes >= 1024 && ind < units.length - 1) {
    bytes /= 1024;
    ind++;
  }

  let format;
  if (Number.isInteger(bytes)) {
    format = bytes.toFixed(0);    
  } else if (Number.isInteger(bytes * 10)) {
    format = bytes.toFixed(1);
  } else {
    format = bytes.toFixed(2);
  }

  return `${format} ${units[ind]}`;
}
