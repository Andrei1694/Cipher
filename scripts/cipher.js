class Cypher {
  constructor(key) {
    this.key = key;
    this.log = [];
    this.store = new Map();
  }

  async encode(message) {
   
    if (message === null) {
      console.log("error");
      return null;
    }
    const encoded = [];
    message.split("").forEach(chr => {
      encoded.push(chr.charCodeAt() * this.key);
    });
    const result = encoded.join("-");
    this.store.set(result, message);
    this.log.push(
      `${new Date().toLocaleString()}: "${message}" encoded as "${result}"`
    );
    await waitForPromise(message.length*100);
    return result;
  }

  async decode(message) {
    

    if (message === null) {
      console.log("null error");
      return null;
    }
    let decoded = "";
    if (this.store.has(message)) {
      decoded = this.store.get(message);
    } else {
      message.split("-").forEach(chr => {
        decoded += String.fromCharCode(chr / this.key);
      });
    }
    this.log.push(
      `${new Date().toLocaleString()}: "${message}" decoded as "${decoded}"`
    );
    await waitForPromise(message.length*100);
    return decoded;
  }

  readLog() {
    this.log.forEach(element => {
      console.log(element);
    });
  }
}

function waitForPromise(time){
    return new Promise(resolve => setTimeout(resolve=>{
       
    }, time));
}

const cipher = new Cypher(5);
cipher.encode("hello");
cipher.encode("hello DevSchool");
cipher.decode("520-505-540-540-555-160-340-505-590-415-495-520-555-555-540");
cipher.readLog();
