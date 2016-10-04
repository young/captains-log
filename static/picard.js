importScripts('./node_modules/dexie/dist/dexie.js');
let db;
const DB_NAME = 'LogDB2';


this.oninstall =  (event) => {
    db = new Dexie(DB_NAME).open();
    event.waitUntil(() => db)
};

this.onactivate = () => {
  debugger;
  startPoll();
};

const headers = new Headers({
  'Content-Type': 'application/json'
});

function startPoll() {
  setInterval(() => {
   db.then((db) => {
    const logTable = db.table('log');
      db.transaction('rw', logTable, function* () {
        let data = yield logTable
          .where('type')
          .equalsIgnoreCase('keyup')
          .limit(25)
          .toArray();

        if (data.length) {
          yield fetch('/logData', {method: 'POST', body: JSON.stringify(data), headers});

          const ids = data.reduce((prev, item) => {
              prev.push(item.id);
              return prev;
            }, []);

          yield logTable.bulkDelete(ids);
        }
      });
    });
  }, 5 * 1000)
}
