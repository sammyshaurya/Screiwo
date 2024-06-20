import React from "react";


export const Table = (props) => {
    console.log(props)
    // const keys = []

    // if (props){
    //      keys.push(Object.keys(props))
    // }
    // console.log(keys)



    return (
    <div>
      <table>
        <thead>
          <tr>
            {/* {keys && keys.map((tr)=> {
            return <th key={tr.id}>{tr}</th>
            })} */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>a</td>
            <td>b</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table