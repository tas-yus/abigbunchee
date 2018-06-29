var express = require('express');
var router = express.Router();
var Excel = require('exceljs');
var path = require("path");
var multer = require("multer");
var fs = require("fs");
var async = require("async");
var Employee = require("./../employee");
var Daily = require("./../daily");
var Monthly = require("./../monthly");
var Schedule = require("./../schedule");
var Holiday = require("./../holiday");
var Break = require("./../break");
var workbook = new Excel.Workbook();
var processFormBody = multer({storage: multer.memoryStorage()}).single('file');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/api/excel/parse', (req, res) => {
  var month = req.body.month;
  var year = req.body.year;
  var sheetArray = [];
  // for(var i = 1; i <= 31; i++){
  //     sheetArray.push(i);
  // }
  // workbook.xlsx.readFile(path.join(__dirname, '../public/', req.body.filename)).then(function() {
  //   async.forEachSeries((sheetArray), (sheet, callback) => {
  //     var worksheet = workbook.getWorksheet(String(sheet));
  //     if (!worksheet || !validateSheet(sheet)) {
  //       corrupted = true;
  //       return callback();
  //     }
  //     var count = 1;
  //     worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
  //       if (worksheet.actualRowCount == 1) {
  //         return callback();
  //       }
  //       if (rowNumber > 1) {
  //         Employee.findOne({code: row.values[1]}).populate({path: "schedule"}).exec((err, employee) => {
  //           if (err) {
  //             console.log(err);
  //             return res.status(400).send({err, message: "Something went wrong"});
  //           }
  //           if (!employee) {
  //             count++;
  //             if (count === worksheet.actualRowCount) {
  //               return callback();
  //             }
  //             return;
  //           }
  //           var date = new Date(year, month, sheet);
  //           Daily.findOne({date, employee: employee._id}, (err, daily) => {
  //             if (err) {
  //               console.log(err);
  //               return res.status(400).send({err, message: "Something went wrong"});
  //             }
  //             if (!daily) {
  //               Holiday.findOne({year, month, date: sheet}, (err, holiday) => {
  //                 if (err) {
  //                   console.log(err);
  //                   return res.status(400).send({message: "Something went wrong"});
  //                 }
  //                 Break.findOne({year, from: {$lte: date}, to: {$gte: date}}, (err, br) => {
  //                   if (err) {
  //                     console.log(err);
  //                     return res.status(400).send({message: "Something went wrong"});
  //                   }
  //                   var checkIn = row.values[2];
  //                   var checkOut = row.values[3];
  //                   var daily = {checkIn, checkOut, date};
  //                   if (br) {
  //                     daily.isBreak = true;
  //                     if (holiday) {
  //                       daily.isHoliday = true;
  //                       var currentSchedule = employee.schedule.break[`${date.getUTCDay()}`];
  //                     } else {
  //                       var currentSchedule = employee.schedule.break["7"];
  //                     }
  //                   } else {
  //                     if (holiday) {
  //                       daily.isHoliday = true;
  //                       var currentSchedule = employee.schedule.usual[`${date.getUTCDay()}`];
  //                     } else {
  //                       var currentSchedule = employee.schedule.usual["7"];
  //                     }
  //                   }
  //                   var dayOff = checkDayOff(currentSchedule);
  //                   if (!checkIn || !checkOut) {
  //                     daily.absent = true;
  //                     if (dayOff) {
  //                       daily.absentStatus = 2
  //                       daily.absentDays = 0;
  //                     } else {
  //                       daily.absentStatus = 5
  //                       daily.absentDays = 1;
  //                     }
  //                   } else {
  //                     if (holiday && dayOff) {
  //                       if (employee.status != 0) {
  //                         daily.onHoliday = true;
  //                         daily.onDayOff = true;
  //                       }
  //                     } else if (holiday) {
  //                       if (employee.status != 0) {
  //                         daily.onHoliday = true;
  //                       }
  //                     } else if (dayOff) {
  //                       if (employee.status != 0) {
  //                         daily.onDayOff = true;
  //                       }
  //                     }
  //                     // if (dayOff && employee.status == 0) {
  //                     //   daily.excused = true
  //                     // }
  //                     if (currentSchedule) {
  //                       if (!dayOff) {
  //                         daily.lateStatus = getLateStatus(currentSchedule.in, checkIn);
  //                       }
  //                       if (employee.status != 0) {
  //                         if (detectOT(currentSchedule.out, checkOut)) {
  //                           if (!employee.weekDaysOff.includes(date.getUTCDay())) {
  //                             daily.otDetected = true;
  //                             daily.otHours = checkOut.getUTCHours() - Number(currentSchedule.out.hour);
  //                           }
  //                         }
  //                       }
  //                     }
  //                   }
  //                   daily.employee = employee._id;
  //                   newDaily = new Daily(daily);
  //                   newDaily.save((err, daily) => {
  //                     if (err) {
  //                       console.log(err);
  //                       return res.status(400).send({message: "Something went wrong"});
  //                     }
  //                     employee.reports.push(daily._id);
  //                     employee.save((err, employee) => {
  //                       if (err) {
  //                         console.log(err);
  //                         return res.status(400).send({message: "Something went wrong"});
  //                       }
  //                       count++;
  //                       if (count === worksheet.actualRowCount) {
  //                         return callback();
  //                       }
  //                     });
  //                   });
  //                 });
  //               });
  //             } else {
  //               count++;
  //               if (count === worksheet.actualRowCount) {
  //                 return callback();
  //               }
  //             }
  //           });
  //         });
  //       }
  //     });
  //   }, (err) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(400).send({message: "Something went wrong"});
  //     }
  //     return res.status(200).send({message: "Parse Completed"});
  //   });
  // });
  workbook.xlsx.readFile(path.join(__dirname, '../public/', req.body.filename)).then(function() {
    var countAdd = 0;
    var countUpdate = 0;
    async.forEachSeries([0], (sheet, callback) => {
      var worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        corrupted = true;
        return callback();
      }
      var count = 1;
      worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
        if (worksheet.actualRowCount == 1) {
          return callback();
        }
        if (rowNumber == 1 && (row.values[1] != "รหัสที่เครื่อง" || row.values[3] != "ชื่อ-นามสกุล" || row.values[5] != "Date")) {
          corrupted = true;
          return callback();
        }
        if (rowNumber > 1) {
          var name = row.values[3];
          if (!name) {
            count++;
            if (count === worksheet.actualRowCount) {
              return callback();
            }
            return;
          }
          if (typeof name == "string") {
            if (name.split(" ").length == 4) {
              var firstname = name.split(" ")[0];
              var lastname = name.split(" ")[1] + " " + name.split(" ")[2];
            } else {
              var firstname = name.split(" ")[0];
              var lastname = name.split(" ")[1];
            }
            if (lastname == "") {
              lastname = name.split(" ")[2];
            }
          } else if (name.richText) {
            var firstname = name.richText[0].text;
            if (name.richText.length >= 7) {
              var lastname = name.richText[2].text + " " + name.richText[4].text;
            } else {
              var lastname = name.richText[2].text.replace(" ", "");
            }
          } else {
            count++;
            if (count === worksheet.actualRowCount) {
              return callback();
            }
            return;
          }
          // var alias = name.split(" ")[2];
          // alias = alias.replace("(", "");
          // alias = alias.replace(")", "");
          Employee.findOne({firstname, lastname}).populate({path: "schedule"}).exec((err, employee) => {
            if (err) {
              console.log(err);
              return res.status(400).send({err, message: "Something went wrong"});
            }
            if (!employee) {
              count++;
              if (count === worksheet.actualRowCount) {
                return callback();
              }
              return;
            }
            var splittedDateString = row.values[5].split("/");
            var year = splittedDateString[2];
            var month = splittedDateString[1];
            var dateNum = splittedDateString[0];
            if (Number(year) > 2200) {
              year = Number(year) - 543;
            }
            var date = new Date(year, Number(month)-1, dateNum);
            var checkInObject = findCheckInOut(row.values);
            var checkIn = getTime(checkInObject.checkIn);
            var checkOut = getTime(checkInObject.checkOut);
            Daily.findOne({date, employee: employee._id}, (err, daily) => {
              if (err) {
                console.log(err);
                return res.status(400).send({err, message: "Something went wrong"});
              }
              if (!daily) {
                Holiday.findOne({year, month: month-1, date: dateNum}, (err, holiday) => {
                  if (err) {
                    console.log(err);
                    return res.status(400).send({message: "Something went wrong"});
                  }
                  Break.findOne({year, from: {$lte: date}, to: {$gte: date}}, (err, br) => {
                    if (err) {
                      console.log(err);
                      return res.status(400).send({message: "Something went wrong"});
                    }
                    var daily = {checkIn, checkOut, date};
                    if (br) {
                      daily.isBreak = true;
                      if (holiday) {
                        daily.isHoliday = true;
                        var currentSchedule = employee.schedule.break["7"];
                      } else {
                        var currentSchedule = employee.schedule.break[`${date.getDay()}`];
                      }
                    } else {
                      if (holiday) {
                        daily.isHoliday = true;
                        var currentSchedule = employee.schedule.usual["7"];
                      } else {
                        var currentSchedule = employee.schedule.usual[`${date.getDay()}`];
                      }
                    }
                    if (!br || employee.status == 0) {
                      var dayOff = checkDayOff(currentSchedule);
                    } else {
                      var dayOff = date.getDay() == employee.weekDayOff;
                    }
                    if (dayOff) {
                      daily.isDayOff = true;
                    }
                    if (!checkIn || !checkOut) {
                      daily.absent = true;
                      if (dayOff) {
                        daily.absentStatus = 2
                        daily.absentDays = 1;
                      } else {
                        daily.absentStatus = 5
                        daily.absentDays = 1;
                      }
                    } else {
                      if (holiday && dayOff) {
                        if (employee.status != 0) {
                          daily.onHoliday = true;
                          daily.onDayOff = true;
                        }
                      } else if (holiday) {
                        if (employee.status != 0) {
                          daily.onHoliday = true;
                        }
                      } else if (dayOff) {
                        if (employee.status != 0) {
                          daily.onDayOff = true;
                        }
                      }
                      // if (dayOff && employee.status == 0) {
                      //   daily.excused = true
                      // }
                      if (currentSchedule) {
                        if (!dayOff) {
                          daily.lateStatus = getLateStatus(currentSchedule.in, checkIn);
                        }
                        // if (employee.status != 0 && !dayOff) {
                        //   if (detectOT(currentSchedule.out, checkOut)) {
                        //     daily.otDetected = true;
                        //     daily.otHours = checkOut.getHours() - Number(currentSchedule.out.hour);
                        //   }
                        // }
                      }
                    }
                    daily.employee = employee._id;
                    newDaily = new Daily(daily);
                    newDaily.save((err, daily) => {
                      if (err) {
                        console.log(err);
                        return res.status(400).send({message: "Something went wrong"});
                      }
                      employee.reports.push(daily._id);
                      employee.save((err, employee) => {
                        if (err) {
                          console.log(err);
                          return res.status(400).send({message: "Something went wrong"});
                        }
                        count++;
                        countAdd++;
                        if (count === worksheet.actualRowCount) {
                          return callback();
                        }
                      });
                    });
                  });
                });
              } else if (!daily.checkIn && !daily.checkOut) {
                if (!checkIn && !checkOut) {
                  count++;
                  if (count === worksheet.actualRowCount) {
                    return callback();
                  }
                  return;
                }
                daily.lateStatus = 0;
                daily.absent = false;
                daily.absentStatus = null;
                Holiday.findOne({year, month: month-1, date: dateNum}, (err, holiday) => {
                  if (err) {
                    console.log(err);
                    return res.status(400).send({message: "Something went wrong"});
                  }
                  Break.findOne({year, from: {$lte: date}, to: {$gte: date}}, (err, br) => {
                    if (err) {
                      console.log(err);
                      return res.status(400).send({message: "Something went wrong"});
                    }
                    daily.checkIn = checkIn;
                    daily.checkOut = checkOut
                    if (br) {
                      daily.isBreak = true;
                      if (holiday) {
                        daily.isHoliday = true;
                        var currentSchedule = employee.schedule.break["7"];
                      } else {
                        var currentSchedule = employee.schedule.break[`${date.getDay()}`];
                      }
                    } else {
                      if (holiday) {
                        daily.isHoliday = true;
                        var currentSchedule = employee.schedule.usual["7"];
                      } else {
                        var currentSchedule = employee.schedule.usual[`${date.getDay()}`];
                      }
                    }
                    if (!br || employee.status == 0) {
                      var dayOff = checkDayOff(currentSchedule);
                    } else {
                      var dayOff = date.getDay() == employee.weekDayOff;
                    }
                    if (dayOff) {
                      daily.isDayOff = true;
                    }
                    if (!checkIn || !checkOut) {
                      daily.absent = true;
                      if (dayOff) {
                        daily.absentStatus = 2
                        daily.absentDays = 1;
                      } else {
                        daily.absentStatus = 5
                        daily.absentDays = 1;
                      }
                    } else {
                      if (holiday && dayOff) {
                        if (employee.status != 0) {
                          daily.onHoliday = true;
                          daily.onDayOff = true;
                        }
                      } else if (holiday) {
                        if (employee.status != 0) {
                          daily.onHoliday = true;
                        }
                      } else if (dayOff) {
                        if (employee.status != 0) {
                          daily.onDayOff = true;
                        }
                      }
                      // if (dayOff && employee.status == 0) {
                      //   daily.excused = true
                      // }
                      if (currentSchedule) {
                        if (!dayOff) {
                          daily.lateStatus = getLateStatus(currentSchedule.in, checkIn);
                        }
                        // if (employee.status != 0 && !dayOff) {
                        //   if (detectOT(currentSchedule.out, checkOut)) {
                        //     daily.otDetected = true;
                        //     daily.otHours = checkOut.getHours() - Number(currentSchedule.out.hour);
                        //   }
                        // }
                      }
                    }
                    daily.save((err, daily) => {
                      if (err) {
                        console.log(err);
                        return res.status(400).send({message: "Something went wrong"});
                      }
                      count++;
                      countUpdate++;
                      if (count === worksheet.actualRowCount) {
                        return callback();
                      }
                    });
                  });
                });
              } else {
                count++;
                if (count === worksheet.actualRowCount) {
                  return callback();
                }
              }
            });
          });
        }
      });
    }, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send({message: `อัพโหลดสำเร็จ เพิ่มข้อมูล ${countAdd} รายการ | อัพเดท ${countUpdate} รายการ`, countAdd, countUpdate});
    });
  });
});

function findCheckInOut(values) {
  var object = {checkIn: null, checkOut: null};
  var i = 6;
  while(values[i] && i != 10) {
    i++;
  }
  if (i != 6) {
    object.checkIn = values[6];
    object.checkOut = values[(i-1)];
  }
  console.log(object);
  return object;
}

var getTime = (time) => {
  if (!time) {
    return null;
  }
  if (typeof time == "string") {
    if (time.split(" ")[1] == "AM" || time.split(" ")[1] == "PM") {
      var hour = time.split(" ")[0].split(":")[0];
      var minute = time.split(" ")[0].split(":")[1];
      if (time.split(" ")[1] == "PM" && hour != 12) {
        hour = Number(hour) + 12;
      }
      return new Date(0, 0, 0, hour,  minute, 0, 0);
    } else {
      var splittedTime = time.split(":");
      return new Date(0, 0, 0, Number(splittedTime[0]),  Number(splittedTime[1]), 0, 0);
    }
  } else if (typeof time.getMonth === "function") {
    return time;
  }
}

router.post('/api/excel/create', (req, res) => {
  var workbook = new Excel.Workbook();
  var worksheet = workbook.addWorksheet("Sheet1");
  var rows = [["ชื่อ-สกุล", "รหัส", "สาขา", "ลากิจ", "ลาป่วย", "พักร้อน",
  "1-5 นาที", "สาย 6 นาที", "สาย 11 นาที", "OT*1.5", "ค่าแรงนักขัต",
  "รายได้อื่นๆ", "โบนัส", "คืนพักร้อน", "หักเงิน", "หมายเหตุ",
  "เงินเดือน", "ค่าล่วงเวลา", "ค่าเบี้ย", "โบนัส", "คืนพักร้อน",
  "รายได้อื่นๆ", "เงินเดือนสุทธิ", "หักเงิน", "หักสาย", "ประกันสังคม",
  "ภาษี(ภงด1)", "กองทุน", "รับเงินสุทธิ", "สถานะ", ]];
  const branchArray = [
    "BL",
    "BG", "BW", "BB",
    "BC", "BS", "BP",
    "BNG", "BR", "BH",
    "BU", "BPK", "BN",
    "BA", "BQ"
  ];
  const statusArray = [
    "super", "พนักงานประจำ", "รายวัน"
  ]
  Employee.find({}).populate({path: "monthlyReports", match: {month: req.body.month, year: req.body.year}}).exec((err, employees) => {
    if (err) {
      return res.status(400).send({message: "something's wrong "})
    }
    async.forEach(employees, (employee, cb) => {
      var currentRow = [`${employee.firstname} ${employee.lastname}`, employee.code, branchArray[employee.branch]];
      if (employee.monthlyReports.length == 0) {
        rows.push(currentRow);
        cb();
      } else {
        var report = employee.monthlyReports[0];
        var ot = 0;
        var extra = 0;
        var lateFee = 0;
        if (employee.status != 0) {
          extra = 1300;
          ot += employee.salary/30/8*report.result.numOT*1.5 + (report.result.numHoliday)*(employee.salary)/30*3;
          if (report.result.numLate1 == 0 && report.result.numLate2 == 0 && report.result.numLate3 == 0) {
            extra += 200;
          }
          extra -= (report.result.numAffair+report.result.numSick+report.result.numVacation)*50;
          lateFee += (report.result.numLate2) * 100 + (report.result.numLate3) * 300;
        }
        var ins = 0.05 * employee.salary;
        ins >= 15000? ins = 15000 : '';
        employee.salary <= 1650? ins = 83 : '';
        var fund = employee.percentFund/100*employee.salary;
        var tax = 0;
        currentRow.push(report.result.numAffair);
        currentRow.push(report.result.numSick);
        currentRow.push(report.result.numVacation);
        currentRow.push(report.result.numLate1);
        currentRow.push(report.result.numLate2);
        currentRow.push(report.result.numLate3);
        currentRow.push(report.result.numOT);
        currentRow.push(report.result.numHoliday);
        currentRow.push(report.result.others);
        currentRow.push(report.result.bonus);
        currentRow.push(report.result.returnVacation);
        currentRow.push(report.result.offset);
        // หมายเหตุ
        currentRow.push("");
        // เงินเดือน
        currentRow.push(employee.salary);
        // ค่าล่วงเวลา
        currentRow.push(ot);
        // ค่าเบี้ย
        currentRow.push(extra);
        // โบนัส
        currentRow.push(report.result.bonus);
        // คืนพักร้อน
        currentRow.push(report.result.returnVacation);
        // รายได้อื่นๆ
        currentRow.push(report.result.others);
        // เงินเดือนสุทธิ
        var overall = employee.salary+ot+extra+report.result.bonus+report.result.returnVacation+report.result.others;
        currentRow.push(overall);
        // หักเงิน
        currentRow.push(report.result.offset);
        // หักสาย
        currentRow.push(lateFee);
        // ประกันสังคม
        currentRow.push(ins);
        // ภาษี
        currentRow.push(tax);
        // กองทุน
        currentRow.push(fund);
        // รับเงินสุทธิ
        currentRow.push(overall - lateFee - ins - report.result.offset - tax - fund);
        // สถานะ
        currentRow.push(statusArray[employee.status]);
        rows.push(currentRow);
        cb();
      }
    }, (err) => {
      if (err) {
        return res.status(400).send({message: "something's wrong "})
      }
      worksheet.addRows(rows);
      var filename = `เงินเดือน ${Number(req.body.month)+1}, ${req.body.year}.xlsx`;
      workbook.xlsx.writeFile(path.join(__dirname, '../public/', filename)).then(function() {
        console.log("xlsx file is written.");
        res.status(200).send({message: 'xlsx file is written.', filename: filename});
      });
    });
  });
});

// function getTax(salary, fund, ins) {
//   var yearly = salary * 12;
//   var yearIns = ins * 12;
//   yearIns > 10000? yearIns = 10000 : '';
//   var yearFund = fund * 12;
//   var net = yearly - 160000 - yearIns - yearFund;
//   if (net < 150000) {
//     return 0;
//   } else if (net < 300000) {
//     return (net - 150000)*0.05;
//   } else if (net < 500000) {
//     return (net - 300000)*0.10 + 7500;
//   } else if (net < 750000) {
//     return (net - 500000)*0.15 + 7500 + 20000;
//   } else if (net < 1000000) {
//     return (net - 750000)*0.20 + 7500 + 20000 + 37500;
//   } else if (net < 2000000) {
//     return (net - 1000000)*0.25 + 7500 + 20000 + 37500 + 50000;
//   } else if (net < 5000000) {
//     return (net - 2000000)*0.30 + 7500 + 20000 + 37500 + 50000 + 250000;
//   } else {
//     return (net - 5000000)*0.35 + 7500 + 20000 + 37500 + 50000 + 250000 + 900000;
//   }
// }

function checkDayOff(timeObject) {
  return timeObject.in.hour == 0 && timeObject.in.minute == 0 && timeObject.out.hour == 0 && timeObject.out.minute == 0;
}

function isHoliday(year, month, date) {
  return new Promise(function(resolve, reject) {
    Holiday.findOne({year, month, date}, (err, holiday) => {
      if (err) {
        reject(err);
      }
      resolve(!!holiday);
    });
  });
}

function getLateStatus(timeObject, date) {
  if (date.getHours() < timeObject.hour) {
    return 0;
  } else if (date.getHours() == timeObject.hour) {
    if (Number(date.getMinutes()) <= Number(timeObject.minute)) {
      return 0;
    }
    var diff = Number(date.getMinutes()) - Number(timeObject.minute);
    if (diff < 5) {
      return 1;
    } else if (diff < 10) {
      return 2;
    } else {
      return 3
    }
  } else {
    return 3;
  }
}

function detectOT(timeObject, date) {
  if ((date.getHours() - Number(timeObject.hour)) >= 1) {
    return true;
  }
  return false;
}

function validateSheet(str) {
  if (isNaN(Number(str)) || Number(str) > 31 || Number(str) < 1) return false;
  return true;
}

router.post('/api/excel/upload', (req, res) => {
  processFormBody(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send({err, message: "Something went wrong"});
    }
    if (!req.file) {
      return res.status(400).send({message: "โปรดอัพโหลดไฟล์"});
    }
    if (extractFileType(req.file.originalname) != "xlsx") {
      return res.status(400).send({message: "โปรดอัพโหลดไฟล์ excel นามสกุล .xlsx เท่านั้น"});
    }
    // request.file has the following properties of interest
    //      fieldname      - Should be 'uploadedphoto' since that is what we sent
    //      originalname:  - The name of the file the user uploaded
    //      mimetype:      - The mimetype of the image (e.g. 'image/jpeg',  'image/png')
    //      buffer:        - A node Buffer containing the contents of the file
    //      size:          - The size of the file in bytes
    if (req.file.size >= 3*1024*1024) {
      return res.status(400).send("File too large");
    }
    // We need to create the file in the directory "images" under an unique name. We make
    // the original file name unique by adding a unique prefix with a timestamp.
    // var timestamp = new Date().valueOf();
    var filename = req.file.originalname;
    fs.writeFile(path.join(__dirname, '../public', filename), req.file.buffer, function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send({err, message: "Something went wrong"});
      }
      res.status(200).send({message: "File Uploaded!", filename});
    });
  });
});

router.get("/api/reports", (req, res) => {
  Daily.find({}).populate({path: "employee"}).exec((err, dailies) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(dailies);
  });
});

router.get("/api/reports/:id", (req, res) => {
  Daily.findById(req.params.id).populate({path: "employee"}).exec((err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(daily);
  });
});

router.get("/api/holidays", (req, res) => {
  Holiday.find({}, (err, holiday) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(holiday.dates);
  });
});

router.put("/api/employees/:id/monthlies/approve", (req, res) => {
  Monthly.findOne({employee: req.params.id, month: req.body.month, year: req.body.year}, (err, monthly) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    // if (monthly.reports.length != daysInMonth(req.body.month + 1, req.body.year)) {
    //   return res.status(400).send({message: `ไม่สามารถอนุมัตเพราะมีข้อมูลในเดือนไม่ครบถ้วน: ${monthly.reports.length} จาก ${daysInMonth(req.body.month + 1, req.body.year)} วัน`});
    // }
    monthly.result = req.body.result;
    monthly.checked = true;
    monthly.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  });
});

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

router.post("/api/employees/:id/monthlies", (req, res) => {
  var result = req.body.result;
  var reports = req.body.reportIds;
  Monthly.findOne({employee: req.params.id, month: req.body.month, year: req.body.year}, (err, monthly) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    if (monthly) {
      res.status(200).send({checked: monthly.checked});
    } else {
      var monthly = new Monthly({
        month: req.body.month,
        year: req.body.year,
        result,
        reports,
        employee: req.params.id
      });
      monthly.save((err, monthly) => {
        if (err) {
          console.log(err);
          return res.status(400).send({message: "Something went wrong"});
        }
        Employee.findByIdAndUpdate(req.params.id, {$push: {monthlyReports: monthly._id}}, (err) => {
          if (err) {
            console.log(err);
            return res.status(400).send({message: "Something went wrong"});
          }
          res.status(200).send({checked: monthly.checked});
        });
      });
    }
  });
});

router.put("/api/employees/:id/monthlies", (req, res) => {
  Monthly.findOneAndUpdate({employee: req.params.id, month: req.body.month, year: req.body.year}, {result: req.body.result}, (err, monthly) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    res.status(200).send();
  });
});

router.delete("/api/reports/:id/detectOT", (req, res) => {
  Daily.findByIdAndUpdate(req.params.id, {otDetected: false}, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  });
});

router.put("/api/reports/:id/ot/approve", (req, res) => {
  Daily.findByIdAndUpdate(req.params.id, {otHours: req.body.hours, ot: true, otDetected: false}, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  });
});


router.put("/api/reports/:id/absent", (req, res) => {
  if (req.body.type != 6) {
    var updateObject = {absentStatus: req.body.type};
  } else {
    var updateObject = {absentStatus: null, absent: false, absentDays: 0};
  }
  Daily.findByIdAndUpdate(req.params.id, updateObject, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  });
});

router.put("/api/reports/:id/lateStatus", (req, res) => {
  Daily.findById(req.params.id, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    daily.lateStatus = (daily.lateStatus + 1)%4;
    daily.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
        if (err) {
          console.log(err);
          return res.status(400).send({message: "Something went wrong"});
        }
        return res.status(200).send();
      });
    });
  });
});

router.post("/api/reports/:id/comments", (req, res) => {
  Daily.findByIdAndUpdate(req.params.id, {comment: req.body.comment}, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send();
  });
});

router.put("/api/reports/:id/onHoliday", (req, res) => {
  Daily.findById(req.params.id, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    daily.onHoliday = !daily.onHoliday;
    daily.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
        if (err) {
          console.log(err);
          return res.status(400).send({message: "Something went wrong"});
        }
        return res.status(200).send();
      });
    });
  });
});

router.put("/api/reports/:id/onDayOff", (req, res) => {
  Daily.findById(req.params.id, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    daily.onDayOff = !daily.onDayOff;
    daily.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
        if (err) {
          console.log(err);
          return res.status(400).send({message: "Something went wrong"});
        }
        return res.status(200).send();
      });
    });
  });
});

router.put("/api/reports/:id/absent/force", (req, res) => {
  Daily.findByIdAndUpdate(req.params.id, {absent: true, absentStatus: 5, absentDays: 1}, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  });
});

router.put("/api/reports/:id/absentDays", (req, res) => {
  Daily.findByIdAndUpdate(req.params.id, req.body, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  });
});

router.delete("/api/reports/:id/special", (req, res) => {
  if (req.query.type == 1) {
    var updateObject = {onHoliday: false};
  } else if (req.query.type == 2) {
    var updateObject = {onDayOff: false};
  } else {
    return res.status(400).send({message: "Type not valid"});
  }
  Daily.findByIdAndUpdate(req.params.id, updateObject, (err, daily) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    Monthly.findOneAndUpdate({reports: daily._id}, {checked:false}, (err, monthly) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  });
});

router.get("/api/schedules", (req, res) => {
  Schedule.find({}, (err, schedules) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(schedules);
  });
});

router.get("/api/schedules/list", (req, res) => {
  Schedule.find({}).select("title").exec((err, schedules) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(schedules);
  });
});

router.post("/api/schedules", (req, res) => {
  var schedule = new Schedule({
    title: req.body.title,
    usual: req.body.schedule.usual,
    break: req.body.schedule.break,
  });
  schedule.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send();
  });
});

router.put("/api/schedules/:id", (req, res) => {
  Schedule.findById(req.params.id, (err, schedule) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    schedule.title = req.body.schedule.title;
    schedule.usual = req.body.schedule.usual;
    schedule.break = req.body.schedule.break;
    schedule.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send({});
    })
  });
});

router.get("/api/employees", (req, res) => {
  Employee.find({})
  .populate({path: "monthlyReports", match: {year: req.query.year, month: req.query.month, checked: true}})
  .populate({path: "schedule", select: "title"}).sort({branch: 1, code: 1})
  .exec((err, employees) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(employees);
  });
});

router.post("/api/employees", (req, res) => {
  var employee = new Employee(req.body.employee);
  employee.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send();
  });
});

router.get("/api/employees/:id", (req, res) => {
  var from = new Date(req.query.year, req.query.month, 26);
  var to = new Date(req.query.year, Number(req.query.month)+1, 26);
  var matchObject = {
    date: {
        $gte: from,
        $lt: to
    }
  }
  Employee.findById(req.params.id)
  .populate({path: "schedule"})
  .populate({path: "reports", match: matchObject, options: { sort: {date: 1} }})
  .populate({path: "monthlyReports", match: {month: req.query.month, year: req.query.year}})
  .exec((err, employee) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(employee);
  });
});

router.put("/api/employees/:id", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body.employee, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(employee);
  });
});

router.put("/api/employees/:id/schedule", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, {schedule: req.body.scheduleId}, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send();
  });
});

router.get("/api/employees/:id/reports", (req, res) => {
  // var daysInMonth = function (month, year) {
  //   return new Date(year, month, 0).getDate();
  // }
  var from = new Date(req.query.year, req.query.month, 26);
  var to = new Date(req.query.year, Number(req.query.month)+1, 26);
  var matchObject = {
    date: {
        $gte: from,
        $lt: to
    }
  };
  Employee.findById(req.params.id).populate({path: "reports", match: matchObject}).exec((err, employee) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send(employee);
  });
});

function extractFileType(filename) {
  var array = filename.split(".");
  console.log(array);
  return array[array.length-1];
}

router.get("/api/days", (req, res) => {
  var year = req.query.year;
  Holiday.find({year}).sort({month: 1, date: 1}).exec((err, holidays) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    Break.find({year}).sort({from: 1}).exec((err, breaks) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send({holidays, breaks});
    });
  });
});

router.post("/api/holidays", (req, res) => {
  var splittedDate = req.body.date.split("/")
  var month = splittedDate[1];
  var date = splittedDate[0];
  var year = splittedDate[2];
  var title = req.body.title;
  if (year != req.body.year) {
    return res.status(400).send({message: `โปรดเลือกวันที่ ที่อยู่ในปี ${this.year}`});
  }
  if (!req.body.title) {
    return res.status(400).send({message: `โปรดระบุชื่อวัน`});
  }
  var holiday = new Holiday({
    year, month: Number(month)-1, date, title
  });
  holiday.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send();
  })
});

router.post("/api/breaks", (req, res) => {
  var splittedFrom = req.body.from.split("/")
  var monthFrom = splittedFrom[1];
  var dateFrom = splittedFrom[0];
  var yearFrom = splittedFrom[2];
  var splittedTo = req.body.to.split("/")
  var monthTo = splittedTo[1];
  var dateTo = splittedTo[0];
  var yearTo = splittedTo[2];
  if (yearFrom != req.body.year) {
    return res.status(400).send({message: `โปรดเลือกวันเริ่มต้น ในปี ${this.year}`});
  }
  var from = new Date(yearFrom, Number(monthFrom)-1, dateFrom);
  var to = new Date(yearTo, Number(monthTo)-1, dateTo);
  if (from >= to) {
    return res.status(400).send({message: `วันที่เริ่มต้นต้องน้อยกว่าวันที่สุดท้าย`});
  }
  Break.findOne({$or: [
    {from: {$gte: from, $lte: to}},
    {to: {$gte: from, $lte: to}},
    {from: {$gte: from}, to: {$lte: to}},
    {from: {$lte: from}, to: {$gte: to}}
  ]}, (err, br) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    if (br) {
      return res.status(400).send({message: "ช่วงวันที่ระบุ คาบเกี่ยวกับช่วงเวลาที่เคยมี"});
    }
    var br = new Break({
      from, to, year: req.body.year
    });
    br.save((err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({message: "Something went wrong"});
      }
      return res.status(200).send();
    });
  })
});

router.delete("/api/holidays/:id", (req, res) => {
  Holiday.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send();
  });
});

router.delete("/api/breaks/:id", (req, res) => {
  Break.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({message: "Something went wrong"});
    }
    return res.status(200).send();
  });
});


module.exports = router;
