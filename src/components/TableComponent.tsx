import React, {useState, useEffect, forwardRef} from 'react';
import {Container, Button} from '@material-ui/core';
import axios from 'axios';
import MaterialTable from 'material-table';

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

//Icons 
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { grey } from '@material-ui/core/colors';

const TABLEICONS = {
  Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
};

//color theme of date/time picker
const colorTheme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

function TableComponent() {

  //column props
  const [columns, setColumns] = useState<any>([
    { title: 'UID', field: 'uid', editable: 'never', hidden: true}, //ID from firebase
    { title: 'ID', field: 'id', editable: 'never'}, // Fake id
    { title: '指名', field: 'name',
      cellStyle: {
        width: 30,
        maxWidth: 20,
      },
      headerStyle: {
        width: '50px'
      }
    },
    { title: 'キャスト名', field: 'surname'},
    { title: '区分', field: 'type'},
    { title: '预定時間', field: 'bookTime', 
      render: (row:any) => { 
        //set time format
        let s = new Date(row.bookTime);
        let date = s.toLocaleDateString();
        let time = s.toLocaleTimeString('en-GB');
      
        let dateArray = date.split('/');
        let timeArray = time.split(':');
        
        let year = dateArray[2];
        let month = dateArray[0];
        let day = dateArray[1];
       
        let hours = timeArray[0];
        let minutes = timeArray[1];
        let seconds = timeArray[2];
        
        let finalBookTime = year + '/' + month + '/' + day + '\n' + 
                            hours + ':' + minutes;
        
        row.bookTime = finalBookTime;

        let result = hours + ':' + minutes; //set date or time format at here

        return(
          <span>{result}</span>
        );
      },
        editComponent: (props:any) => {
          return(
            <ThemeProvider theme={colorTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  variant="inline"
                  ampm={false}
                  value={props.value || null}
                  onChange={props.onChange}
                  disablePast
                  format="HH:mm"
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          )
        },
    },
    { title: '打刻時間', field: 'stampingTime',
    render: (row:any) => { 
        //set time format
        let s = new Date(row.stampingTime);
        let date = s.toLocaleDateString();
        let time = s.toLocaleTimeString('en-GB');
      
        let dateArray = date.split('/');
        let timeArray = time.split(':');
        
        let year = dateArray[2];
        let month = dateArray[0];
        let day = dateArray[1];

        let hours = timeArray[0];
        let minutes = timeArray[1];
        let seconds = timeArray[2];

        let finalStampingTime = year + '/' + month + '/' + day + '\n' + 
                            hours + ':' + minutes;
        
        row.bookTime = finalStampingTime;

        let result = hours + ':' + minutes; //set date or time format at here
        
        return(
          <span>{result}</span>
        );
  },
    editComponent: (props:any) => {
      const newDate = new Date();
      return(
        <ThemeProvider theme={colorTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              autoOk={true}
              variant="inline"
              ampm={false}
              value={props.value || null}
              onChange={props.onChange}
              disablePast
              format="HH:mm"
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      )
    }
  },
    { title: '出勤時間', field: 'attendanceTime', 
      render: (row:any) => { 
        //set time format
        let s = new Date(row.attendanceTime);
        let date = s.toLocaleDateString();
        let time = s.toLocaleTimeString('en-GB');
      
        let dateArray = date.split('/');
        let timeArray = time.split(':');
        
        let year = dateArray[2] ;
        let month = dateArray[0];
        let day = dateArray[1];

        let hours = timeArray[0];
        let minutes = timeArray[1];
        let seconds = timeArray[2];

        let finalAttendanceTime = year + '/' + month + '/' + day + '\n' + 
                            hours + ':' + minutes;
        
        row.attendanceTime = finalAttendanceTime;

        let result = hours + ':' + minutes; //set date or time format at here

        return(
          <span>{result}</span>
        );
    },
      editComponent: (props:any) => {
        return(
          <ThemeProvider theme={colorTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                variant="inline"
                ampm={false}
                value={props.value || null}
                onChange={props.onChange}
                disablePast
                format="HH:mm"
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        )
      }
    },
    { title: '退勤時間', field: 'leaveTime',
      render: (row:any) => { 
        //set time format
        let s = new Date(row.leaveTime);
        let date = s.toLocaleDateString();
        let time = s.toLocaleTimeString('en-GB');
      
        let dateArray = date.split('/');
        let timeArray = time.split(':');
        
        let year = dateArray[2] ;
        let month = dateArray[0];
        let day = dateArray[1];

        let hours = timeArray[0];
        let minutes = timeArray[1];
        let seconds = timeArray[2];

        let finalLeaveTime = year + '/' + month + '/' + day + '\n' + 
                            hours + ':' + minutes;
        
        row.leaveTime = finalLeaveTime;

        let result = hours + ':' + minutes; //set date or time format at here

        return(
          <span>{result}</span>
        );
    },
      editComponent: (props:any) => {
        return(
          <ThemeProvider theme={colorTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                autoOk
                variant="inline"
                ampm={false}
                value={props.value || null}
                onChange={props.onChange}
                disablePast
                format="HH:mm"
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        )
      } 
    },
    { title: '欠', field: 'x'},
    { title: '遅刻', field: 'lateTime',
    render: (row:any) => { 
      //set time format
      let s = new Date(row.lateTime);
      let date = s.toLocaleDateString();
      let time = s.toLocaleTimeString('en-GB');
    
      let dateArray = date.split('/');
      let timeArray = time.split(':');
      
      let year = dateArray[2] ;
      let month = dateArray[0];
      let day = dateArray[1];

      let hours = timeArray[0];
      let minutes = timeArray[1];
      let seconds = timeArray[2];

      let finalLateTime = year + '/' + month + '/' + day + '\n' + 
                            hours + ':' + minutes;
      row.lateTime = finalLateTime;

      let result = hours + ':' + minutes; //set date or time format at here

      return(
        <span>{result}</span>
      );
  },
    editComponent: (props:any) => {
      return(
        <ThemeProvider theme={colorTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              autoOk
              variant="inline"
              ampm={false}
              value={props.value || null}
              onChange={props.onChange}
              disablePast
              format="HH:mm"
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      )
    }
    },
    { title: '状态', field: 'status'},
  ]);

  const [data, setData] = useState<any>([]);
  const api = axios.create({
    baseURL: `https://table-component-b8876.firebaseio.com/`
  });

  //error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState<any>([]);

  //get data from database and display on the table
   useEffect(() => { 
      getTableData();
    }, []);

    //retrieve data from database
    const getTableData = () => {
      api.get('/table.json')
      .then(res => {
        const getData = [];
        for(let key in res.data){
          getData.unshift({
            ...res.data[key],
            uid: key, // get uid from firebase
            id: Math.floor(Math.random() * 10000) // random create fake id
          })
        }  
        setData(getData);
      })
      .catch(error=>{
          console.log('Error');
      })
    }

    //function to add row in database
    //datatime is return ISO format
    //datetime depends on server location
    const handleRowAdd = (newData: any , resolve: any) => {
      let errorList = [];

      if(newData.name === undefined){
        errorList.push('Please enter name');
      }

      if(newData.type === undefined){
        errorList.push('Please enter type');
      }

      if(newData.surname === undefined){
        errorList.push('Please enter last name');
      }

      if(newData.bookTime === undefined){
        errorList.push('Please enter book time');
      }

      if(newData.stampingTime === undefined){
        errorList.push('please enter stamping time');
      }

      if(newData.attendanceTime === undefined){
        errorList.push('please enter attendance time')
      }

      if(newData.leaveTime === undefined){
        errorList.push('please enter leave time')
      }

      if(newData.x === undefined){
        errorList.push('Please enter type');
      }

      if(newData.lateTime === undefined){
        errorList.push('please enter late time')
      }
      
      //Perform this action when there is no error.
      if(errorList.length < 1){ 
        api.post('/table.json', newData)
        .then(res => {
          let postData = [...res.data];
          postData.push(newData);
          console.log(postData);
          setData(postData);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch(error => {
          setErrorMessages(["There are something went wrong!"]);
          setIserror(true);
          resolve();
        });
      }else{
        setErrorMessages(errorList);
        setIserror(true);
        alert("Please fill in all the field!");
        resolve();
      }
      setInterval(() => {
        window.location.reload();
      }, 1500);
      // getTableData();
    }

  //function to update row in database
  const handleRowUpdate = (newData: any, oldData: any, resolve: any) => {
    let errorList = [];
    if(newData.surname === undefined){
      errorList.push('Please enter last name');
    }

    if(newData.bookTime === undefined){
      errorList.push('Please enter book time');
    }

    if(newData.stampingTime === undefined){
      errorList.push('please enter stamping time');
    }

    if(newData.attendanceTime === undefined){
      errorList.push('please enter attendance time')
    }

    if(newData.leaveTime === undefined){
      errorList.push('please enter leave time')
    }

    if(newData.lateTime === undefined){
      errorList.push('please enter late time')
    }

    if(errorList.length < 1){
      api.patch("/table/"+ oldData.uid +".json", newData)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.uid;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          console.log(res);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch(error => {
          setErrorMessages(["There are something went wrong!"]);
          setIserror(true);
          resolve();
      })
      
      setInterval(() => {
        window.location.reload();
      }, 1500);

      // getTableData();
    }else{
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  }

  //function to delete row in database
  const handleRowDelete = (oldData: any, resolve: any) => {
    for(const [index, value] of oldData.entries()) {
      api.delete('/table/'+ value.uid +'.json')
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.uid;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch(error => {
        setErrorMessages(['Delete failed! There are something went wrong!']);
        setIserror(true);
        resolve();
      })
    }
    const interval = setInterval(() => {
      window.location.reload();
    }, 1500);

    // getTableData();
  }

  return (
    <Container>
      <ThemeProvider theme={createMuiTheme()}>
      <MaterialTable
        title="Table"
        columns={columns}
        data={data}
        icons={TABLEICONS}
        options={{
          toolbar: true,
          // selection: true, //checkbox of each row
          actionsColumnIndex: -1
        }}
        //action button
        // actions={[
        //   {
        //     icon: () => {
        //       return(
        //         <Button
        //           variant='outlined'
        //         >指名</Button>
        //       )
        //     },
        //     tooltip: '指名',
        //     onClick: (event, rowData) => {
              
        //     }     
        //   },
        //   {
        //     icon: () => {
        //       return(
        //         <Button
        //           variant='outlined'
        //         >退勤</Button>
        //       )
        //     },
        //     tooltip: '退勤',
        //     onClick: (event, rowData) => {
        //       //退勤 function at here
        //     }     
        //   },
        //   {
        //     icon: () => {
        //       return(
        //         <Button
        //           variant='outlined'
        //         >消除</Button>
        //       )
        //     },
        //     tooltip: '削除',
        //     onClick: (event, rowData) => {
        //       new Promise((resolve) => {
        //         handleRowDelete(rowData, resolve);
        //       })
        //     }     
        //   },
        // ]}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
        }}
    />
    </ThemeProvider>
    </Container>
  )
}

export default TableComponent;
