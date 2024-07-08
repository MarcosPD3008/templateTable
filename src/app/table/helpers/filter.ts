export const sortList = (arr: any[], column: string, dir: 'asc' | 'desc') => {
  return arr.sort((a: any, b: any) => {
    let valA = a[column];
    let valB = b[column];

    const compareValues = (valA: any, valB: any) => {
      if (dir === 'asc') {
        if (valA < valB) return -1;
        if (valA > valB) return 1;
      } else {
        if (valA < valB) return 1;
        if (valA > valB) return -1;
      }
      return 0;
    };

    // Handle undefined or null values to always appear at the end
    if (valA == null && valB == null) return 0;
    if (valA == null) return dir === 'asc' ? 1 : -1;
    if (valB == null) return dir === 'asc' ? -1 : 1;

    // Handle Date values
    if (typeof valA === 'string' && typeof valB === 'string' && Date.parse(valA) && Date.parse(valB)) {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    // Handle Boolean values
    if (typeof valA === 'boolean' && typeof valB === 'boolean') {
      return compareValues(valA, valB);
    }

    // Handle Number values
    if (typeof valA === 'number' && typeof valB === 'number') {
      return compareValues(valA, valB);
    }

    // Handle String values
    if (typeof valA === 'string' && typeof valB === 'string') {
      return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    // Handle mixed types (e.g., number vs string)
    return compareValues(valA, valB);
  });
};



export interface Sorter{
    [key:string]: 'asc' | 'desc';
} 