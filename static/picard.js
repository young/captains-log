importScripts('./node_modules/dexie/dist/dexie.js');

const DB_NAME = 'LogDB2';
const DB_VERSION = 2;
let db = new Dexie(DB_NAME);

this.oninstall =  () => {
  // db.version(1).stores({
  //      log: null
  //     });

  db.version(DB_VERSION).stores({
       log: '++id,type,data'
  });
};

this.onactivate = () => {
  startPoll();
};



function startPoll() {
  setInterval(() => {
    db.transaction('rw', function* () {
      let foo = yield db.log.where("type").equals('keyup').toArray();
      console.log(JSON.stringify(foo));
    });
  },  1000)
}