import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");
export const init = () => {
  const promiss = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, long REAL NOT NULL)",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promiss;
};

export const insertPlaces = (title, image, address, lat, long) => {
  const promiss = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO places (title, image, address, lat, long) VALUES (?, ?, ?, ?, ?)",
        [title, image, address, lat, long],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promiss;
};

export const fetchPlaces = () => {
  const promiss = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promiss;
};
