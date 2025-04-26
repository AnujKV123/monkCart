
export function generateRandomId() {
    let id = '';
    while (id.length < 20) {
      id += Math.floor(Math.random() * 10); // append single digit
    }
    return Number(id);
  }