class Obj {
  constructor(index, active) {
    this.index = index;
    this.active = active;
    this.todeactivate = false;
  }

  setActive() {
    this.active = true;
  }

  setInactive() {
    this.todeactivate = true;
  }
}

function printPool() {
  console.log("#####");
  for (let index = 0; index < pool.length; index++) {
    let obj = pool[index];
    if (!obj) console.log(index + ":null");
    else console.log(index + ":" + obj.index + " " + obj.active);
  }
}

function reclaim(index) {
  pool[index].active = pool[index].todeactivate = false;
  let temp = pool[avail];
  pool[avail] = pool[index];
  pool[index] = temp;
  avail++;
}

function update() {
  for (let index = 0; index < pool.length; index++) {
    console.log(index, pool.length);
    obj = pool[index];
    console.log("visited:" + obj.index);
    if (obj.todeactivate) reclaim(index);
  }
}

function get() {
  if (avail > 0) {
    avail--;
    obj = pool[avail];
    obj.active = true;
    return obj;
  }
}

pool = new Array(10);
avail = 10;

for (let index = 0; index < pool.length; index++) {
  pool[index] = new Obj(index, false);
}

for (index = 0; index < 5; index++) get();

printPool();
pool[8].setInactive();
printPool();
update();
printPool();

pool[8].setInactive();
printPool();
update();
printPool();

console.log(avail);
