export function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_IP}/admin/adminhome`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        resolve(result);
      });
  });
}
