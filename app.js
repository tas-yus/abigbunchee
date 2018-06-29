var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var fs = require("fs");
var Employee = require("./employee");
var Daily = require("./daily");
var Monthly = require("./monthly");
var Holiday = require("./holiday");
var Break = require("./break");
var Schedule = require("./schedule");
var async = require("async");

var appRoutes = require('./routes/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
mongoose.connect("mongodb://localhost:27017/abigbunchee");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

seedDB();

function seedDB() {
  var schedules = [
    {
      type: 0,
      title: "Backline รูปแบบ 1",
      usual: {
        0: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 1,
      title: "Backline รูปแบบ 2",
      usual: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 12,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 12,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 12,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 2,
      title: "BW",
      usual: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        2: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        3: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        4: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        5: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      }
    },
    {
      type: 3,
      title: "BW แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      }
    },
    {
      type: 4,
      title: "BB",
      usual: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 5,
      title: "BB แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 6,
      title: "BP",
      usual: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 7,
      title: "BP แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 8,
      title: "BNG",
      usual: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 9,
      title: "BNG แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 10,
      title: "BPK",
      usual: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 11,
      title: "BPK แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 12,
      title: "BQ",
      usual: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        2: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        3: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        4: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        5: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      }
    },
    {
      type: 13,
      title: "BQ แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      }
    },
    {
      type: 14,
      title: "BC",
      usual: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 15,
      title: "BC แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 16,
      title: "BS",
      usual: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 17,
      title: "BS แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 18,
      title: "BR",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      }
    },
    {
      type: 19,
      title: "BR แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      }
    },
    {
      type: 20,
      title: "BH",
      usual: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 21,
      title: "BH แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 22,
      title: "BU",
      usual: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 8,
            minute: 0
          },
          out: {
            hour: 17,
            minute: 0
          }
        }
      }
    },
    {
      type: 23,
      title: "BU แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 24,
      title: "BN",
      usual: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 0
          },
          out: {
            hour: 18,
            minute: 0
          }
        }
      }
    },
    {
      type: 25,
      title: "BN แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        2: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        3: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        4: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        5: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        6: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 9,
            minute: 30
          },
          out: {
            hour: 18,
            minute: 30
          }
        }
      }
    },
    {
      type: 26,
      title: "BA",
      usual: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        1: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        2: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        3: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        4: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        5: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        6: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        },
        7: {
          in: {
            hour: 7,
            minute: 30
          },
          out: {
            hour: 16,
            minute: 30
          }
        }
      }
    },
    {
      type: 27,
      title: "BA แม่บ้าน",
      usual: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 0,
            minute: 0
          },
          out: {
            hour: 0,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 14,
            minute: 0
          },
          out: {
            hour: 20,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      },
      break: {
        0: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        1: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        2: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        3: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        4: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        5: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        6: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        },
        7: {
          in: {
            hour: 10,
            minute: 0
          },
          out: {
            hour: 19,
            minute: 0
          }
        }
      }
    },
  ];

  var employees = [
      {
        firstname: "วิษณุ",
        lastname: "ประยูรสุข",
        alias: "นุ",
        code: "0001",
        branch: 0,
        status: 0,
        scheduleCode: 0
      },
      {
        firstname: "สมสิริ",
        alias: "ปู",
        lastname: "แซ่จึง",
        code: "0002",
        branch: 0,
        status: 0,
        scheduleCode: 1
      },
      {
        firstname: "วิรัช",
        alias: "เต๊นท์",
        lastname: "เกตุเปี่ยม",
        code: "0003",
        branch: 0,
        status: 0,
        scheduleCode: 0
      },
      {
        firstname: "ธีรวัฒน์",
        alias: "บอม",
        lastname: "หงส์จูมพล",
        code: "0004",
        branch: 0,
        scheduleCode: 1
      },
      {
        firstname: "ชานนท์",
        alias: "จี๋",
        lastname: "เสนาพล",
        code: "0005",
        branch: 0,
        scheduleCode: 1
      },
      {
        firstname: "ชารีรัตน์",
        lastname: "ปัตระวรรณ",
        alias: "ป้าแอน",
        code: "0006",
        branch: 9,
        scheduleCode: 21
      },
      {
        firstname: "นุชนาฏ",
        lastname: "บุญมีโชติ",
        alias: "แจง",
        code: "0007",
        branch: 0,
        scheduleCode: 1
      },
      {
        firstname: "เอกรัตน์",
        lastname: "บังเกิด",
        alias: "บอย",
        code: "0008",
        branch: 0,
        scheduleCode: 0
      },
      {
        firstname: "เอกลักษณ์",
        lastname: "วันพิคต",
        alias: "แทค",
        code: "0009",
        branch: 14,
        scheduleCode: 12
      },
      {
        firstname: "พนัชกร",
        lastname: "สิงห์แก้ว",
        alias: "พลอย",
        code: "0010",
        branch: 14,
        salary: 9000,
        scheduleCode: 12
      },
      {
        firstname: "สมพงษ์",
        lastname: "ตาติจันทร์",
        alias: "ป้าโสม",
        code: "0011",
        branch: 14,
        scheduleCode: 13
      },
      {
        firstname: "สรีวรรณ",
        lastname: "ขอนแก่น",
        alias: "อุ๋ย",
        code: "0012",
        branch: 14,
        scheduleCode: 12
      },
      {
        firstname: "อรุณี",
        lastname: "หาระมี",
        alias: "ป้าเตี้ย",
        code: "0013",
        branch: 14,
        scheduleCode: 13
      },
      {
        firstname: "นันทิชา",
        lastname: "เปาริก",
        alias: "พี่เก๋",
        code: "0014",
        branch: 13,
        scheduleCode: 27
      },
      {
        firstname: "นายพงศธร",
        lastname: "ทรัพย์มูล",
        alias: "เอ็ม",
        code: "0015",
        branch: 13,
        scheduleCode: 26
      },
      {
        firstname: "นางสาวภัทราภรณ์",
        lastname: "ตุงคะศิริ",
        alias: "หน่อย",
        code: "0016",
        branch: 13,
        scheduleCode: 26
      },
      {
        firstname: "ชัญญาพรรณ์",
        lastname: "ลีลา",
        alias: "-",
        code: "0017",
        branch: 3,
        scheduleCode: 5
      },
      {
        firstname: "อนุพงศ์",
        lastname: "คงกลิ่น",
        alias: "-",
        code: "0018",
        branch: 3,
        scheduleCode: 4
      },
      {
        firstname: "มัณฑนา",
        lastname: "เพ็ญสมบูรณ์",
        alias: "แอ็ปเปิ้ล",
        code: "0019",
        branch: 3,
        scheduleCode: 4
      },
      {
        firstname: "ทาริกา",
        lastname: "เพียรชอบ",
        alias: "กบ",
        code: "0020",
        branch: 4,
        scheduleCode: 14
      },
      {
        firstname: "ศุภร",
        lastname: "ชื่อหลาย",
        alias: "แนท",
        code: "0021",
        branch: 4,
        scheduleCode: 14
      },
      {
        firstname: "ภัศรา",
        lastname: "ขัดศรี",
        alias: "แหมว",
        code: "0022",
        branch: 4,
        scheduleCode: 14
      },
      {
        firstname: "มาลีวรรณ",
        lastname: "ธรรมขัน",
        alias: "ป้าวัน",
        code: "0023",
        branch: 4,
        scheduleCode: 15
      },
      {
        firstname: "จิตราภรณ์",
        lastname: "หอมจัด",
        alias: "แข",
        code: "0024",
        branch: 9,
        scheduleCode: 20
      },
      {
        firstname: "วัลภา",
        lastname: "ศรีวิลัย",
        alias: "ติ๊ก",
        code: "0025",
        branch: 9,
        scheduleCode: 20
      },
      {
        firstname: "วรินทร์ทิพย์",
        lastname: "ปฐมทัศน์",
        alias: "ปุย",
        code: "0026",
        branch: 12,
        scheduleCode: 24
      },
      {
        firstname: "จุฑารัตน์",
        lastname: "ทองอินทร์",
        alias: "จูน",
        code: "0027",
        branch: 12,
        scheduleCode: 24
      },
      {
        firstname: "พภัสสรณ์",
        lastname: "เปาริก",
        alias: "ป้าติ๊ก",
        code: "0028",
        branch: 12,
        scheduleCode: 25
      },
      {
        firstname: "ธีรศักดิ์",
        lastname: "ตั้งวงศ์ดีเลิศ",
        alias: "-",
        code: "0029",
        branch: 7,
        scheduleCode: 8
      },
      {
        firstname: "อลิสา",
        lastname: "ยืนยง",
        alias: "-",
        code: "0030",
        branch: 7,
        scheduleCode: 8
      },
      {
        firstname: "สุดารัตน์",
        lastname: "จันทะยา",
        alias: "-",
        code: "0031",
        branch: 7,
        scheduleCode: 9
      },
      {
        firstname: "ศราวุธ",
        lastname: "พูลทรัพย์",
        alias: "วุธ",
        code: "0032",
        branch: 6,
        scheduleCode: 6
      },
      {
        firstname: "นันทวรรณ",
        lastname: "วิบูลชาติ",
        alias: "-",
        code: "0033",
        branch: 6,
        scheduleCode: 7
      },
      {
        firstname: "เกวลี",
        lastname: "ธัญญาวัฒนา",
        alias: "เกว",
        code: "0034",
        branch: 6,
        scheduleCode: 6
      },
      {
        firstname: "ณัฐนันทร",
        lastname: "ทองมี",
        alias: "ดิว",
        code: "0035",
        branch: 11,
        scheduleCode: 10
      },
      {
        firstname: "ชนิตา",
        lastname: "สุขประเสริฐ",
        alias: "แนน",
        code: "0036",
        branch: 11,
        scheduleCode: 10
      },
      {
        firstname: "ลำจง",
        lastname: "อินทรสุรันต์",
        alias: "พี่นก",
        code: "0037",
        branch: 11,
        scheduleCode: 11
      },
      {
        firstname: "เรวดี",
        lastname: "นาคะ",
        alias: "ป้าม่วย",
        code: "0038",
        branch: 8,
        scheduleCode: 19
      },
      {
        firstname: "หัสยา",
        lastname: "ผลศิริ",
        alias: "เอ้",
        code: "0039",
        branch: 8,
        scheduleCode: 18
      },
      {
        firstname: "จิรสุตา",
        lastname: "ภักดีผล",
        alias: "นุ๊ก",
        code: "0040",
        branch: 8,
        scheduleCode: 18
      },
      {
        firstname: "โยภิตตา",
        lastname: "ณ นคร",
        alias: "เมย์",
        code: "0041",
        branch: 8,
        scheduleCode: 18
      },
      {
        firstname: "มะลิ",
        lastname: "แดงสง่า",
        alias: "ป้าตุ๊ก",
        code: "0042",
        branch: 5,
        scheduleCode: 17
      },
      {
        firstname: "ร่มเย็น",
        lastname: "เปรี่ยมนอง",
        alias: "น้ำเย็น",
        code: "0043",
        branch: 5,
        scheduleCode: 16
      },
      {
        firstname: "ปาริชาติ",
        lastname: "สุขกาย",
        alias: "อุ๊",
        code: "0044",
        branch: 5,
        scheduleCode: 16
      },
      {
        firstname: "จิราพร",
        lastname: "บุนนท์",
        alias: "แนน2",
        code: "0045",
        branch: 10,
        scheduleCode: 22
      },
      {
        firstname: "เจนจิรา",
        lastname: "กุหลาบหอม",
        alias: "แอน",
        code: "0046",
        branch: 10,
        scheduleCode: 22
      },
      {
        firstname: "พัชนีย์",
        lastname: "จำนงค์ใจ",
        alias: "พี่พัช",
        code: "0047",
        branch: 10,
        scheduleCode: 23
      },
      {
        firstname: "รพีพรรณ",
        lastname: "แก่นพิมพ์",
        alias: "แอน",
        code: "0048",
        branch: 2,
        scheduleCode: 2
      },
      {
        firstname: "สรารัตน์",
        lastname: "แก้วนาเหนือ",
        alias: "เป้",
        code: "0049",
        branch: 2,
        scheduleCode: 2
      },
      {
        firstname: "จันทนา",
        lastname: "สารีบุต",
        alias: "น้าอึ่ง",
        code: "0050",
        branch: 2,
        scheduleCode: 3
      },
      {
        firstname: "ทานทอง",
        lastname: "สิงห์ทอง",
        alias: "ทาน",
        code: "0051",
        branch: 2,
        scheduleCode: 2
      },
  ];

  var holidays = [
    {
      year: 2018,
      month: 5,
      date: 2,
      title: "วันวิสาขบูชา"
    },
    {
      year: 2018,
      month: 5,
      date: 5,
      title: "วันมาฆบูชา"
    },
    {
      year: 2018,
      month: 5,
      date: 4,
      title: "วันอาสาฬหบูชา"
    }
  ];

  var breaks = [
    {
      year: 2018,
      from: new Date(2018, 2, 12),
      to: new Date(2018, 4, 13)
    }
  ];

  async.waterfall([
    function(callback) {
      Schedule.remove({}).then((err) => {
        async.forEach(schedules, (schedule, cb) => {
          Schedule.create(schedule, (err, schedule) => {
            console.log(`schedule ${schedule.title} created`);
            cb();
          });
        }, (err) => {
          callback();
        });
      });
    },
    function (callback) {
      Holiday.remove({}).then((err) => {
        async.forEach(holidays, (holiday, cb) => {
          Holiday.create(holiday, (err, holiday) => {
            console.log(`Holiday created`);
            cb();
          });
        }, (err) => {
          callback();
        });
      });
    },
    function (callback) {
      Break.remove({}).then((err) => {
        async.forEach(breaks, (br, cb) => {
          Break.create(br, (err, br) => {
            console.log(`Break created`);
            cb();
          });
        }, (err) => {
          callback();
        });
      });
    },
    function (callback) {
      Employee.remove({}).then((err) => {
        console.log("Employees removed!");
        async.forEach(employees, (employee, cb) => {
          var employee = new Employee(employee);
          Schedule.findOne({type: employee.scheduleCode}, (err, schedule) => {
            employee.schedule = schedule._id;
            employee.save((err) => {
              if (err) {
                console.log(err);
              }
              console.log(`${employee.firstname}, ${employee.code} saved`);
            });
          });
        });
      });
    }
  ], (err) => {
    console.log(err);
  });

  Monthly.remove({}).then((err) => {
    if (err) {
      console.log(err);
    }
    console.log('monthlyReports deleted');
  });

  Daily.remove({}).then((err) => {
    if (err) {
      console.log(err);
    }
    console.log('dailyReports deleted');
  });

}

module.exports = app;
