var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = CashbillService;
Util.inherits(CashbillService,BaseService);

function CashbillService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('140');
};

CashbillService.prototype.getURL = function(CorpNum, TOGO, UserID, success, error){
  this._executeAction({
    uri : '/Cashbill?TG=' + TOGO,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
}

CashbillService.prototype.getUnitCost = function(CorpNum,success,error) {
  this._executeAction({
    uri : '/Cashbill?cfg=UNITCOST',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

CashbillService.prototype.checkMgtKeyInUse = function (CorpNum, MgtKey, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri :'/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    success : function(response){
      if(success) {
        if(response.itemKey != null) {
          success(true);
        } else {
          success(false);
        }
      }
    },
    error : error
  });
};

BaseService.addMethod(CashbillService.prototype, "register", function(CorpNum, Cashbill, success, error){
  this.register(CorpNum,Cashbill,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "register", function(CorpNum, Cashbill, UserID, success, error){
  if(Object.keys(Cashbill).length === 0) {
    this._throwError(-99999999,'현금영수증 정보가 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(Cashbill);

  this._executeAction({
    uri : '/Cashbill',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'POST',
    Data : postData,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "update", function(CorpNum, MgtKey, Cashbill, success, error){
  this.update(CorpNum,MgtKey,Cashbill,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "update", function(CorpNum, MgtKey, Cashbill, UserID, success, error){
    if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  if(Object.keys(Cashbill).length === 0) {
    this._throwError(-99999999,'현금영수증 정보가 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(Cashbill);
  
  this._executeAction({
    uri : '/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'PATCH',
    Data : postData,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "delete", function(CorpNum, MgtKey, success, error){
  this.delete(CorpNum,MgtKey,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "delete", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri :'/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'DELETE',
    success :function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "issue", function(CorpNum, MgtKey, Memo, success, error){
  this.issue(CorpNum, MgtKey, Memo, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "issue", function(CorpNum, MgtKey, Memo, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData, 
    Method : 'ISSUE',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "cancelIssue", function(CorpNum, MgtKey, Memo, success, error){
  this.cancelIssue(CorpNum,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "cancelIssue", function(CorpNum, MgtKey, Memo, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'CANCELISSUE',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "sendEmail", function(CorpNum, MgtKey, Receiver, success, error){
  this.sendEmail(CorpNum,MgtKey,Receiver,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "sendEmail", function(CorpNum, MgtKey, Receiver, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    receiver : Receiver
  };
  var postData = this._stringify(req);
  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'EMAIL',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "sendSMS", function(CorpNum, MgtKey, Sender, Receiver, Contents, success, error){
  this.sendSMS(CorpNum,MgtKey,Sender,Receiver,Contents,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "sendSMS", function(CorpNum, MgtKey, Sender, Receiver, Contents, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver,
    contents : Contents
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'SMS',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "sendFAX", function(CorpNum, MgtKey, Sender, Receiver, success, error){
  this.sendFAX(CorpNum,MgtKey,Sender,Receiver,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "sendFAX", function(CorpNum, MgtKey, Sender, Receiver, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver
  };
  var postData = this._stringify(req);
  
  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'FAX',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

CashbillService.prototype.getDetailInfo = function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?Detail',
    CorpNum : CorpNum,
    UserID : UserID,
    Method :'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
}; 

CashbillService.prototype.getInfo = function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
};

CashbillService.prototype.getInfos = function(CorpNum, MgtKeyList, UserID, success, error){
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'문서관리번호 배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(MgtKeyList);

  this._executeAction({
    uri : '/Cashbill/States', 
    CorpNum : CorpNum, 
    UserID : UserID,
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

CashbillService.prototype.getLogs = function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '/Logs',
    CorpNum : CorpNum,
    UserID : UserID,
    Method :'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

CashbillService.prototype.getPrintURL = function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=PRINT',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};

CashbillService.prototype.getEPrintURL = function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=EPRINT',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};

CashbillService.prototype.getMassPrintURL = function(CorpNum, MgtKeyList, UserID, success, error){
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'문서관리번호 배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(MgtKeyList);
  this._executeAction({
    uri : '/Cashbill/Prints',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};

CashbillService.prototype.getMailURL = function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=MAIL',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};

CashbillService.prototype.getPopUpURL = function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=POPUP',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};













